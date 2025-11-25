import requests
import sys
import json
from datetime import datetime

class BoltAPITester:
    def __init__(self, base_url="https://bolt-sports-2026.preview.emergentagent.com"):
        self.base_url = base_url
        self.api_url = f"{base_url}/api"
        self.admin_token = None
        self.tests_run = 0
        self.tests_passed = 0
        self.test_registration_id = None

    def run_test(self, name, method, endpoint, expected_status, data=None, headers=None):
        """Run a single API test"""
        url = f"{self.api_url}/{endpoint}"
        test_headers = {'Content-Type': 'application/json'}
        if headers:
            test_headers.update(headers)

        self.tests_run += 1
        print(f"\n🔍 Testing {name}...")
        print(f"   URL: {url}")
        
        try:
            if method == 'GET':
                response = requests.get(url, headers=test_headers, timeout=10)
            elif method == 'POST':
                response = requests.post(url, json=data, headers=test_headers, timeout=10)

            success = response.status_code == expected_status
            if success:
                self.tests_passed += 1
                print(f"✅ Passed - Status: {response.status_code}")
                try:
                    response_data = response.json()
                    print(f"   Response: {json.dumps(response_data, indent=2)[:200]}...")
                    return True, response_data
                except:
                    return True, {}
            else:
                print(f"❌ Failed - Expected {expected_status}, got {response.status_code}")
                try:
                    error_data = response.json()
                    print(f"   Error: {error_data}")
                except:
                    print(f"   Error: {response.text}")
                return False, {}

        except Exception as e:
            print(f"❌ Failed - Error: {str(e)}")
            return False, {}

    def test_root_endpoint(self):
        """Test root API endpoint"""
        return self.run_test("Root API", "GET", "", 200)

    def test_admin_login_valid(self):
        """Test admin login with valid credentials"""
        success, response = self.run_test(
            "Admin Login (Valid)",
            "POST",
            "admin/login",
            200,
            data={"username": "Bolt_2026", "password": "Bolt@krea2026"}
        )
        if success and response.get('success') and response.get('token'):
            self.admin_token = response['token']
            print(f"   Admin token obtained: {self.admin_token[:20]}...")
            return True
        return False

    def test_admin_login_invalid(self):
        """Test admin login with invalid credentials"""
        success, response = self.run_test(
            "Admin Login (Invalid)",
            "POST",
            "admin/login",
            200,
            data={"username": "wrong", "password": "wrong"}
        )
        if success and not response.get('success'):
            print(f"   Correctly rejected invalid credentials")
            return True
        return False

    def test_create_registration(self):
        """Test creating a new registration"""
        registration_data = {
            "collegeName": "Test University",
            "sports": ["Cricket", "Basketball"],
            "teams": [
                {
                    "sport": "Cricket",
                    "members": [
                        {"name": "John Doe", "email": "john@test.com", "phone": "9876543210"},
                        {"name": "Jane Smith", "email": "jane@test.com", "phone": "9876543211"},
                        {"name": "Bob Wilson", "phone": "9876543212"}
                    ]
                },
                {
                    "sport": "Basketball",
                    "members": [
                        {"name": "Alice Brown", "email": "alice@test.com", "phone": "9876543213"},
                        {"name": "Charlie Davis", "email": "charlie@test.com", "phone": "9876543214"}
                    ]
                }
            ],
            "accommodation": {
                "required": True,
                "numberOfPeople": 5,
                "numberOfNights": 3,
                "preferences": "Non-smoking rooms"
            },
            "totalAmount": 26500,
            "registrationFee": 4000,
            "accommodationFee": 22500,
            "paymentId": "pay_test_123",
            "paymentStatus": "completed"
        }

        success, response = self.run_test(
            "Create Registration",
            "POST",
            "registrations",
            200,
            data=registration_data
        )
        
        if success and response.get('id'):
            self.test_registration_id = response['id']
            print(f"   Registration created with ID: {self.test_registration_id}")
            return True
        return False

    def test_get_all_registrations(self):
        """Test getting all registrations"""
        success, response = self.run_test(
            "Get All Registrations",
            "GET",
            "registrations",
            200
        )
        
        if success and isinstance(response, list):
            print(f"   Found {len(response)} registrations")
            return True
        return False

    def test_get_single_registration(self):
        """Test getting a single registration by ID"""
        if not self.test_registration_id:
            print("❌ Skipping - No test registration ID available")
            return False
            
        success, response = self.run_test(
            "Get Single Registration",
            "GET",
            f"registrations/{self.test_registration_id}",
            200
        )
        
        if success and response.get('id') == self.test_registration_id:
            print(f"   Successfully retrieved registration: {response.get('collegeName')}")
            return True
        return False

    def test_payment_create_order(self):
        """Test creating Razorpay order (mocked)"""
        success, response = self.run_test(
            "Create Payment Order",
            "POST",
            "payment/create-order",
            200,
            data={"amount": 26500}
        )
        
        if success and response.get('id') and response.get('status') == 'created':
            print(f"   Order created: {response.get('id')}")
            return True
        return False

    def test_payment_verify(self):
        """Test payment verification (mocked)"""
        payment_data = {
            "razorpay_order_id": "order_mock_123",
            "razorpay_payment_id": "pay_mock_456",
            "razorpay_signature": "mock_signature"
        }
        
        success, response = self.run_test(
            "Verify Payment",
            "POST",
            "payment/verify",
            200,
            data=payment_data
        )
        
        if success and response.get('success'):
            print(f"   Payment verified: {response.get('paymentId')}")
            return True
        return False

    def test_invalid_registration_id(self):
        """Test getting registration with invalid ID"""
        success, response = self.run_test(
            "Get Invalid Registration",
            "GET",
            "registrations/invalid-id-123",
            404
        )
        return success

def main():
    print("🚀 Starting BOLT API Testing...")
    print("=" * 60)
    
    tester = BoltAPITester()
    
    # Test sequence
    tests = [
        ("Root API Endpoint", tester.test_root_endpoint),
        ("Admin Login (Valid)", tester.test_admin_login_valid),
        ("Admin Login (Invalid)", tester.test_admin_login_invalid),
        ("Create Registration", tester.test_create_registration),
        ("Get All Registrations", tester.test_get_all_registrations),
        ("Get Single Registration", tester.test_get_single_registration),
        ("Create Payment Order", tester.test_payment_create_order),
        ("Verify Payment", tester.test_payment_verify),
        ("Invalid Registration ID", tester.test_invalid_registration_id),
    ]
    
    failed_tests = []
    
    for test_name, test_func in tests:
        try:
            result = test_func()
            if not result:
                failed_tests.append(test_name)
        except Exception as e:
            print(f"❌ {test_name} - Exception: {str(e)}")
            failed_tests.append(test_name)
    
    # Print results
    print("\n" + "=" * 60)
    print("📊 TEST RESULTS")
    print("=" * 60)
    print(f"Tests Run: {tester.tests_run}")
    print(f"Tests Passed: {tester.tests_passed}")
    print(f"Tests Failed: {len(failed_tests)}")
    print(f"Success Rate: {(tester.tests_passed/tester.tests_run*100):.1f}%")
    
    if failed_tests:
        print(f"\n❌ Failed Tests:")
        for test in failed_tests:
            print(f"   - {test}")
    else:
        print(f"\n✅ All tests passed!")
    
    return 0 if len(failed_tests) == 0 else 1

if __name__ == "__main__":
    sys.exit(main())