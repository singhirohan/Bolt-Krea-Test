from fastapi import FastAPI, APIRouter, HTTPException, Depends
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict, EmailStr
from typing import List, Optional, Dict
import uuid
from datetime import datetime, timezone

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Create the main app without a prefix
app = FastAPI()

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")

# Models
class TeamMember(BaseModel):
    name: str
    email: Optional[str] = None
    phone: str

class SportTeam(BaseModel):
    sport: str
    members: List[TeamMember]

class AccommodationDetails(BaseModel):
    required: bool
    numberOfPeople: Optional[int] = 0
    numberOfNights: Optional[int] = 0
    preferences: Optional[str] = ""

class RegistrationCreate(BaseModel):
    collegeName: str
    sports: List[str]
    teams: List[SportTeam]
    accommodation: AccommodationDetails
    totalAmount: float
    registrationFee: float
    accommodationFee: float
    paymentId: Optional[str] = None
    paymentStatus: str = "pending"

class Registration(BaseModel):
    model_config = ConfigDict(extra="ignore")
    
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    collegeName: str
    sports: List[str]
    teams: List[SportTeam]
    accommodation: AccommodationDetails
    totalAmount: float
    registrationFee: float
    accommodationFee: float
    paymentId: Optional[str] = None
    paymentStatus: str
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class AdminLogin(BaseModel):
    username: str
    password: str

class AdminLoginResponse(BaseModel):
    success: bool
    token: Optional[str] = None
    message: str

# Routes
@api_router.get("/")
async def root():
    return {"message": "BOLT 2026 API"}

@api_router.post("/registrations", response_model=Registration)
async def create_registration(input: RegistrationCreate):
    registration_obj = Registration(**input.model_dump())
    
    # Convert to dict and serialize datetime to ISO string for MongoDB
    doc = registration_obj.model_dump()
    doc['timestamp'] = doc['timestamp'].isoformat()
    
    _ = await db.registrations.insert_one(doc)
    
    # Mock email confirmation
    logging.info(f"[MOCKED] Email confirmation sent to college: {registration_obj.collegeName}")
    
    return registration_obj

@api_router.get("/registrations", response_model=List[Registration])
async def get_registrations():
    registrations = await db.registrations.find({}, {"_id": 0}).to_list(1000)
    
    # Convert ISO string timestamps back to datetime objects
    for reg in registrations:
        if isinstance(reg['timestamp'], str):
            reg['timestamp'] = datetime.fromisoformat(reg['timestamp'])
    
    return registrations

@api_router.get("/registrations/{registration_id}", response_model=Registration)
async def get_registration(registration_id: str):
    registration = await db.registrations.find_one({"id": registration_id}, {"_id": 0})
    
    if not registration:
        raise HTTPException(status_code=404, detail="Registration not found")
    
    if isinstance(registration['timestamp'], str):
        registration['timestamp'] = datetime.fromisoformat(registration['timestamp'])
    
    return registration

@api_router.post("/admin/login", response_model=AdminLoginResponse)
async def admin_login(credentials: AdminLogin):
    # Hardcoded admin credentials
    ADMIN_USERNAME = "Bolt_2026"
    ADMIN_PASSWORD = "Bolt@krea2026"
    
    if credentials.username == ADMIN_USERNAME and credentials.password == ADMIN_PASSWORD:
        # In production, use proper JWT tokens
        token = f"mock_token_{uuid.uuid4()}"
        return AdminLoginResponse(
            success=True,
            token=token,
            message="Login successful"
        )
    else:
        return AdminLoginResponse(
            success=False,
            message="Invalid credentials"
        )

@api_router.post("/payment/create-order")
async def create_razorpay_order(amount: Dict):
    # Mock Razorpay order creation
    order_id = f"order_mock_{uuid.uuid4().hex[:10]}"
    logging.info(f"[MOCKED] Razorpay order created: {order_id} for amount: {amount['amount']}")
    
    return {
        "id": order_id,
        "amount": amount['amount'],
        "currency": "INR",
        "status": "created"
    }

@api_router.post("/payment/verify")
async def verify_payment(payment_data: Dict):
    # Mock payment verification
    logging.info(f"[MOCKED] Payment verified: {payment_data}")
    
    return {
        "success": True,
        "paymentId": payment_data.get('razorpay_payment_id', f"pay_mock_{uuid.uuid4().hex[:10]}"),
        "message": "Payment verified successfully"
    }

@api_router.delete("/registrations/{registration_id}")
async def delete_registration(registration_id: str):
    result = await db.registrations.delete_one({"id": registration_id})
    
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Registration not found")
    
    logging.info(f"Registration deleted: {registration_id}")
    return {"success": True, "message": "Registration deleted successfully"}

# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()