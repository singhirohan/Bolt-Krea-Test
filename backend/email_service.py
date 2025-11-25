import os
from sendgrid import SendGridAPIClient
from sendgrid.helpers.mail import Mail
import logging
from typing import Dict, List, Optional

logger = logging.getLogger(__name__)

def format_registration_email_html(registration_data: Dict) -> str:
    """
    Format registration data into a beautiful HTML email
    """
    # Extract data
    college_name = registration_data.get('collegeName', 'N/A')
    user_email = registration_data.get('userEmail', 'N/A')
    sports = registration_data.get('sports', [])
    teams = registration_data.get('teams', [])
    accommodation = registration_data.get('accommodation', {})
    total_amount = registration_data.get('totalAmount', 0)
    registration_fee = registration_data.get('registrationFee', 0)
    accommodation_fee = registration_data.get('accommodationFee', 0)
    payment_id = registration_data.get('paymentId', 'N/A')
    registration_id = registration_data.get('id', 'N/A')
    
    # Build teams HTML
    teams_html = ""
    for team in teams:
        sport = team.get('sport', 'Unknown')
        members = team.get('members', [])
        
        members_html = ""
        for idx, member in enumerate(members, 1):
            name = member.get('name', 'N/A')
            email = member.get('email', 'N/A')
            phone = member.get('phone', 'N/A')
            members_html += f"""
                <tr>
                    <td style="padding: 8px; border-bottom: 1px solid #e5e7eb;">{idx}</td>
                    <td style="padding: 8px; border-bottom: 1px solid #e5e7eb;">{name}</td>
                    <td style="padding: 8px; border-bottom: 1px solid #e5e7eb;">{email if email else '-'}</td>
                    <td style="padding: 8px; border-bottom: 1px solid #e5e7eb;">{phone}</td>
                </tr>
            """
        
        teams_html += f"""
            <div style="margin-bottom: 20px; background-color: #f9fafb; padding: 15px; border-radius: 8px; border-left: 4px solid #5B88B2;">
                <h3 style="color: #5B88B2; margin-top: 0; margin-bottom: 10px; font-size: 18px;">🏆 {sport}</h3>
                <p style="color: #6b7280; margin: 5px 0; font-size: 14px;">Team Size: {len(members)} members</p>
                <table style="width: 100%; border-collapse: collapse; margin-top: 10px; background-color: white; border-radius: 4px;">
                    <thead>
                        <tr style="background-color: #122C4F; color: white;">
                            <th style="padding: 10px; text-align: left;">#</th>
                            <th style="padding: 10px; text-align: left;">Name</th>
                            <th style="padding: 10px; text-align: left;">Email</th>
                            <th style="padding: 10px; text-align: left;">Phone</th>
                        </tr>
                    </thead>
                    <tbody>
                        {members_html}
                    </tbody>
                </table>
            </div>
        """
    
    # Accommodation HTML
    accommodation_html = ""
    if accommodation.get('required', False):
        package_names = {
            'package1': '2 Nights Package (with breakfast)',
            'package2': '3 Nights Package (with breakfast)'
        }
        package = accommodation.get('package', 'N/A')
        num_people = accommodation.get('numberOfPeople', 0)
        accommodation_html = f"""
            <div style="background-color: #fef3c7; padding: 15px; border-radius: 8px; margin-bottom: 20px; border-left: 4px solid #FFC20A;">
                <h3 style="color: #92400e; margin-top: 0; margin-bottom: 10px;">🏨 Accommodation Details</h3>
                <p style="margin: 5px 0; color: #78350f;"><strong>Package:</strong> {package_names.get(package, 'N/A')}</p>
                <p style="margin: 5px 0; color: #78350f;"><strong>Number of People:</strong> {num_people}</p>
                <p style="margin: 5px 0; color: #78350f;"><strong>Fee:</strong> ₹{accommodation_fee:,}</p>
            </div>
        """
    else:
        accommodation_html = """
            <div style="background-color: #f3f4f6; padding: 15px; border-radius: 8px; margin-bottom: 20px;">
                <p style="color: #6b7280; margin: 0;">No accommodation requested</p>
            </div>
        """
    
    # Build complete HTML email
    html_content = f"""
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
    </head>
    <body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f3f4f6;">
        <div style="max-width: 600px; margin: 0 auto; background-color: white;">
            <!-- Header -->
            <div style="background: linear-gradient(135deg, #122C4F 0%, #5B88B2 100%); padding: 30px; text-align: center;">
                <h1 style="color: #FFC20A; margin: 0; font-size: 32px; font-weight: bold;">BOLT 2026</h1>
                <p style="color: #FBF9E3; margin: 10px 0 0 0; font-size: 16px;">Bigger. Better. Bolder.</p>
            </div>
            
            <!-- Success Message -->
            <div style="background-color: #d1fae5; padding: 20px; text-align: center; border-bottom: 4px solid #10b981;">
                <h2 style="color: #065f46; margin: 0 0 10px 0; font-size: 24px;">✅ Registration Successful!</h2>
                <p style="color: #047857; margin: 0; font-size: 14px;">Your payment has been confirmed and your team is registered for BOLT 2026.</p>
            </div>
            
            <!-- Content -->
            <div style="padding: 30px;">
                <!-- Registration ID -->
                <div style="background-color: #f3f4f6; padding: 15px; border-radius: 8px; margin-bottom: 20px;">
                    <p style="margin: 0; color: #6b7280; font-size: 12px;">Registration ID</p>
                    <p style="margin: 5px 0 0 0; color: #111827; font-size: 16px; font-weight: bold; font-family: monospace;">{registration_id}</p>
                </div>
                
                <!-- College Info -->
                <div style="margin-bottom: 25px;">
                    <h3 style="color: #122C4F; margin: 0 0 10px 0; font-size: 18px; border-bottom: 2px solid #5B88B2; padding-bottom: 8px;">📚 College Information</h3>
                    <p style="margin: 5px 0; color: #374151;"><strong>College Name:</strong> {college_name}</p>
                    <p style="margin: 5px 0; color: #374151;"><strong>Contact Email:</strong> {user_email}</p>
                </div>
                
                <!-- Sports & Teams -->
                <div style="margin-bottom: 25px;">
                    <h3 style="color: #122C4F; margin: 0 0 15px 0; font-size: 18px; border-bottom: 2px solid #5B88B2; padding-bottom: 8px;">🏅 Registered Sports & Teams</h3>
                    {teams_html}
                </div>
                
                <!-- Accommodation -->
                <div style="margin-bottom: 25px;">
                    <h3 style="color: #122C4F; margin: 0 0 15px 0; font-size: 18px; border-bottom: 2px solid #5B88B2; padding-bottom: 8px;">🏨 Accommodation</h3>
                    {accommodation_html}
                </div>
                
                <!-- Payment Summary -->
                <div style="background: linear-gradient(135deg, #122C4F 0%, #1e3a5f 100%); padding: 20px; border-radius: 8px; margin-bottom: 20px;">
                    <h3 style="color: #FFC20A; margin: 0 0 15px 0; font-size: 18px;">💰 Payment Summary</h3>
                    <table style="width: 100%; color: white;">
                        <tr>
                            <td style="padding: 8px 0; border-bottom: 1px solid rgba(255,255,255,0.2);">Registration Fee</td>
                            <td style="padding: 8px 0; text-align: right; border-bottom: 1px solid rgba(255,255,255,0.2);">₹{registration_fee:,}</td>
                        </tr>
                        {f'''<tr>
                            <td style="padding: 8px 0; border-bottom: 1px solid rgba(255,255,255,0.2);">Accommodation Fee</td>
                            <td style="padding: 8px 0; text-align: right; border-bottom: 1px solid rgba(255,255,255,0.2);">₹{accommodation_fee:,}</td>
                        </tr>''' if accommodation_fee > 0 else ''}
                        <tr>
                            <td style="padding: 12px 0; font-size: 18px; font-weight: bold; color: #FFC20A;">Total Paid</td>
                            <td style="padding: 12px 0; text-align: right; font-size: 18px; font-weight: bold; color: #FFC20A;">₹{total_amount:,}</td>
                        </tr>
                    </table>
                    <p style="margin: 15px 0 0 0; color: #d1d5db; font-size: 12px;">Payment ID: {payment_id}</p>
                </div>
                
                <!-- Important Info -->
                <div style="background-color: #fef3c7; padding: 15px; border-radius: 8px; border-left: 4px solid #FFC20A; margin-bottom: 20px;">
                    <h4 style="color: #92400e; margin: 0 0 10px 0; font-size: 16px;">📌 Important Information</h4>
                    <ul style="margin: 0; padding-left: 20px; color: #78350f; font-size: 14px;">
                        <li style="margin: 5px 0;">Please save this email for your records</li>
                        <li style="margin: 5px 0;">Bring a printed or digital copy of this confirmation on the event day</li>
                        <li style="margin: 5px 0;">Check your spam folder for any future communications</li>
                        <li style="margin: 5px 0;">Event dates and venue details will be shared closer to the event</li>
                    </ul>
                </div>
                
                <!-- Contact Info -->
                <div style="background-color: #f3f4f6; padding: 15px; border-radius: 8px; text-align: center;">
                    <h4 style="color: #374151; margin: 0 0 10px 0; font-size: 14px;">Need Help?</h4>
                    <p style="margin: 5px 0; color: #6b7280; font-size: 13px;">📧 Email: <a href="mailto:bolt.sports@krea.edu.in" style="color: #5B88B2;">bolt.sports@krea.edu.in</a></p>
                    <p style="margin: 5px 0; color: #6b7280; font-size: 13px;">📧 Krea Sports: <a href="mailto:sias.sports@krea.ac.in" style="color: #5B88B2;">sias.sports@krea.ac.in</a></p>
                </div>
            </div>
            
            <!-- Footer -->
            <div style="background-color: #122C4F; padding: 20px; text-align: center;">
                <p style="color: #5B88B2; margin: 0 0 5px 0; font-size: 14px; font-weight: bold;">BOLT 2026</p>
                <p style="color: #9ca3af; margin: 0; font-size: 12px;">Krea University's Flagship Sports Festival</p>
                <p style="color: #6b7280; margin: 10px 0 0 0; font-size: 11px;">© 2026 BOLT - All Rights Reserved</p>
            </div>
        </div>
    </body>
    </html>
    """
    
    return html_content


def send_registration_confirmation_email(registration_data: Dict) -> bool:
    """
    Send registration confirmation email using SendGrid
    
    Args:
        registration_data: Dictionary containing registration details
        
    Returns:
        bool: True if email sent successfully, False otherwise
    """
    try:
        # Get SendGrid API key and sender email from environment
        sendgrid_api_key = os.environ.get('SENDGRID_API_KEY')
        sender_email = os.environ.get('SENDER_EMAIL')
        
        if not sendgrid_api_key or not sender_email:
            logger.error("SENDGRID_API_KEY or SENDER_EMAIL not found in environment variables")
            return False
        
        # Get recipient email
        recipient_email = registration_data.get('userEmail')
        if not recipient_email:
            logger.error("No recipient email found in registration data")
            return False
        
        # Format email content
        html_content = format_registration_email_html(registration_data)
        college_name = registration_data.get('collegeName', 'Your Team')
        
        # Create email message
        message = Mail(
            from_email=sender_email,
            to_emails=recipient_email,
            subject=f'BOLT 2026 Registration Confirmation - {college_name}',
            html_content=html_content
        )
        
        # Send email
        sg = SendGridAPIClient(sendgrid_api_key)
        response = sg.send(message)
        
        if response.status_code in [200, 201, 202]:
            logger.info(f"Registration confirmation email sent successfully to {recipient_email}")
            logger.info(f"SendGrid Response Status: {response.status_code}")
            return True
        else:
            logger.error(f"Failed to send email. Status code: {response.status_code}")
            logger.error(f"Response body: {response.body}")
            return False
            
    except Exception as e:
        logger.error(f"Error sending registration confirmation email: {str(e)}")
        return False
