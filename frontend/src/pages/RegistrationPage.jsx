import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { toast } from 'sonner';
import { ArrowLeft, ArrowRight, Check, Plus, Trash2, IndianRupee, Upload, FileCheck } from 'lucide-react';
import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const SPORTS = ['Cricket', 'Basketball', 'Football', 'Badminton', 'Tennis', 'Volleyball'];
const REGISTRATION_FEE = 800; // per person

// Accommodation packages
const ACCOMMODATION_PACKAGES = {
  package1: {
    name: '2 Nights Package',
    nights: 2,
    pricePerPerson: 3000,
    description: '2 nights accommodation with breakfast'
  },
  package2: {
    name: '3 Nights Package',
    nights: 3,
    pricePerPerson: 4500,
    description: '3 nights accommodation with breakfast'
  }
};

const RegistrationPage = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [registrationId, setRegistrationId] = useState(null);
  const [paymentScreenshot, setPaymentScreenshot] = useState(null);
  const [uploadStatus, setUploadStatus] = useState('idle'); // 'idle', 'uploading', 'success', 'error'
  const fileInputRef = useRef(null);
  
  const [formData, setFormData] = useState({
    userEmail: '', // Email for sending registration details
    collegeName: '',
    selectedSports: [],
    teams: {},
    accommodation: {
      required: false,
      package: null, // 'package1' or 'package2'
      numberOfPeople: 0
    }
  });

  const handleCollegeSubmit = () => {
    if (!formData.userEmail.trim()) {
      toast.error('Please enter your email address');
      return;
    }
    if (!formData.collegeName.trim()) {
      toast.error('Please enter your college name');
      return;
    }
    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.userEmail)) {
      toast.error('Please enter a valid email address');
      return;
    }
    setStep(2);
  };

  const handleSportToggle = (sport) => {
    const newSelectedSports = formData.selectedSports.includes(sport)
      ? formData.selectedSports.filter(s => s !== sport)
      : [...formData.selectedSports, sport];
    
    setFormData({
      ...formData,
      selectedSports: newSelectedSports
    });
  };

  const handleSportsSubmit = () => {
    if (formData.selectedSports.length === 0) {
      toast.error('Please select at least one sport');
      return;
    }
    
    // Initialize team data for each sport
    const teams = {};
    formData.selectedSports.forEach(sport => {
      teams[sport] = [
        { name: '', email: '', phone: '', isPrimary: true },
        { name: '', email: '', phone: '', isPrimary: true }
      ];
    });
    
    setFormData({ ...formData, teams });
    setStep(3);
  };

  const addTeamMember = (sport) => {
    const newTeams = { ...formData.teams };
    newTeams[sport].push({ name: '', email: '', phone: '', isPrimary: false });
    setFormData({ ...formData, teams: newTeams });
  };

  const removeTeamMember = (sport, index) => {
    if (formData.teams[sport].length <= 2) {
      toast.error('Minimum 2 members required per team');
      return;
    }
    const newTeams = { ...formData.teams };
    newTeams[sport].splice(index, 1);
    setFormData({ ...formData, teams: newTeams });
  };

  const updateTeamMember = (sport, index, field, value) => {
    const newTeams = { ...formData.teams };
    newTeams[sport][index][field] = value;
    setFormData({ ...formData, teams: newTeams });
  };

  const handleTeamsSubmit = () => {
    // Validate all teams
    for (const sport of formData.selectedSports) {
      const team = formData.teams[sport];
      
      // Check first 2 members have all fields
      for (let i = 0; i < Math.min(2, team.length); i++) {
        if (!team[i].name || !team[i].email || !team[i].phone) {
          toast.error(`Please fill complete details for first 2 members of ${sport} team`);
          return;
        }
      }
      
      // Check remaining members have name and phone
      for (let i = 2; i < team.length; i++) {
        if (!team[i].name || !team[i].phone) {
          toast.error(`Please fill name and phone for all members of ${sport} team`);
          return;
        }
      }
    }
    setStep(4);
  };

  const handleAccommodationSubmit = () => {
    if (formData.accommodation.required) {
      if (!formData.accommodation.package || !formData.accommodation.numberOfPeople) {
        toast.error('Please select accommodation package and number of people');
        return;
      }
    }
    setStep(5);
  };

  const calculateTotal = () => {
    let total = 0;
    
    // Registration fees
    Object.values(formData.teams).forEach(team => {
      total += team.length * REGISTRATION_FEE;
    });
    
    // Accommodation fees
    total += getAccommodationFee();
    
    return total;
  };

  const getRegistrationFee = () => {
    let total = 0;
    Object.values(formData.teams).forEach(team => {
      total += team.length * REGISTRATION_FEE;
    });
    return total;
  };

  const getAccommodationFee = () => {
    if (formData.accommodation.required && formData.accommodation.package) {
      const selectedPackage = ACCOMMODATION_PACKAGES[formData.accommodation.package];
      return formData.accommodation.numberOfPeople * selectedPackage.pricePerPerson;
    }
    return 0;
  };

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    if (file) {
      // Validate file type
      const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp', 'application/pdf'];
      if (!allowedTypes.includes(file.type)) {
        toast.error('Please upload a valid image file (JPG, PNG, GIF, WEBP) or PDF');
        return;
      }
      
      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        toast.error('File size must be less than 5MB');
        return;
      }
      
      setPaymentScreenshot(file);
      toast.success('File selected: ' + file.name);
    }
  };

  const handleUploadScreenshot = async () => {
    if (!paymentScreenshot) {
      toast.error('Please select a file first');
      return;
    }

    if (!registrationId) {
      toast.error('Registration ID not found');
      return;
    }

    setUploadStatus('uploading');
    
    try {
      const formData = new FormData();
      formData.append('file', paymentScreenshot);

      const response = await axios.post(
        `${API}/registrations/${registrationId}/upload-payment-screenshot`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      if (response.data.success) {
        setUploadStatus('success');
        toast.success('Payment screenshot uploaded successfully!');
      }
    } catch (error) {
      console.error('Upload error:', error);
      setUploadStatus('error');
      toast.error(error.response?.data?.detail || 'Failed to upload screenshot. Please try again.');
    }
  };

  const handlePayment = async () => {
    try {
      const totalAmount = calculateTotal();
      
      // Create Razorpay order (mocked)
      const orderResponse = await axios.post(`${API}/payment/create-order`, {
        amount: totalAmount * 100 // Razorpay expects amount in paise
      });

      // Mock Razorpay payment
      const options = {
        key: 'rzp_test_mock', // Mock test key
        amount: totalAmount * 100,
        currency: 'INR',
        name: 'BOLT 2026',
        description: 'Sports Festival Registration',
        order_id: orderResponse.data.id,
        handler: async function (response) {
          // Verify payment (mocked)
          const verifyResponse = await axios.post(`${API}/payment/verify`, {
            razorpay_order_id: orderResponse.data.id,
            razorpay_payment_id: response.razorpay_payment_id || `pay_mock_${Date.now()}`,
            razorpay_signature: 'mock_signature'
          });

          if (verifyResponse.data.success) {
            // Create registration
            const teamsArray = formData.selectedSports.map(sport => ({
              sport,
              members: formData.teams[sport].map(member => ({
                name: member.name,
                email: member.email || null,
                phone: member.phone
              }))
            }));

            const registrationData = {
              userEmail: formData.userEmail,
              collegeName: formData.collegeName,
              sports: formData.selectedSports,
              teams: teamsArray,
              accommodation: {
                required: formData.accommodation.required,
                package: formData.accommodation.package,
                numberOfPeople: formData.accommodation.numberOfPeople
              },
              totalAmount: totalAmount,
              registrationFee: getRegistrationFee(),
              accommodationFee: getAccommodationFee(),
              paymentId: verifyResponse.data.paymentId,
              paymentStatus: 'completed'
            };

            const regResponse = await axios.post(`${API}/registrations`, registrationData);
            
            // Store registration ID for file upload
            setRegistrationId(regResponse.data.id);
            
            // Show success step with registration details
            setStep(6);
            
            toast.success('Registration successful! Confirmation will be sent to ' + formData.userEmail);
          }
        },
        modal: {
          ondismiss: function() {
            toast.error('Payment cancelled');
          }
        },
        theme: {
          color: '#5B88B2'
        }
      };

      // For demo purposes, simulate successful payment
      toast.info('Demo Mode: Payment simulated successfully');
      options.handler({ razorpay_payment_id: `pay_mock_${Date.now()}` });

    } catch (error) {
      console.error('Payment error:', error);
      toast.error('Payment failed. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-[#122C4F] py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <Button
            variant="ghost"
            onClick={() => navigate('/')}
            className="text-[#FBF9E3] hover:text-[#5B88B2] mb-4"
            data-testid="back-to-home-btn"
          >
            <ArrowLeft className="mr-2 w-4 h-4" />
            Back to Home
          </Button>
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-2">Team Registration</h1>
          {step <= 5 && <p className="text-[#FBF9E3]/70">Step {step} of 5</p>}
          {step === 6 && <p className="text-green-500 font-semibold">✓ Registration Complete</p>}
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between mb-2">
            {[1, 2, 3, 4, 5].map(num => (
              <div key={num} className="flex flex-col items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                  num <= step ? 'bg-[#5B88B2] text-[#122C4F]' : 'bg-white/20 text-white/50'
                }`}>
                  {num < step ? <Check className="w-5 h-5" /> : num}
                </div>
                <span className="text-xs text-[#FBF9E3]/60 mt-2">
                  {num === 1 && 'College'}
                  {num === 2 && 'Sports'}
                  {num === 3 && 'Teams'}
                  {num === 4 && 'Accommodation'}
                  {num === 5 && 'Payment'}
                </span>
              </div>
            ))}
          </div>
          <div className="h-2 bg-white/20 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-[#5B88B2] to-[#6F9BC2] transition-all duration-500"
              style={{ width: `${(step / 5) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Step 1: Email & College Name */}
        {step === 1 && (
          <Card className="bg-gradient-to-br from-[#1a1a1a] to-black border-[#5B88B2]/40 p-8 animate-fadeIn" data-testid="step-college">
            <h2 className="text-2xl font-bold text-white mb-6">Registration Details</h2>
            <div className="space-y-4">
              <div>
                <Label htmlFor="userEmail" className="text-[#FBF9E3] mb-2">Your Email Address *</Label>
                <Input
                  id="userEmail"
                  type="email"
                  data-testid="user-email-input"
                  placeholder="Enter your email for registration confirmation"
                  value={formData.userEmail}
                  onChange={(e) => setFormData({ ...formData, userEmail: e.target.value })}
                  className="bg-white/10 border-[#5B88B2]/30 text-white placeholder:text-white/40"
                />
                <p className="text-[#FBF9E3]/60 text-sm mt-1">All registration details will be sent to this email</p>
              </div>
              <div>
                <Label htmlFor="collegeName" className="text-[#FBF9E3] mb-2">College/University Name *</Label>
                <Input
                  id="collegeName"
                  data-testid="college-name-input"
                  placeholder="Enter your college name"
                  value={formData.collegeName}
                  onChange={(e) => setFormData({ ...formData, collegeName: e.target.value })}
                  className="bg-white/10 border-[#5B88B2]/30 text-white placeholder:text-white/40"
                />
              </div>
              <Button
                onClick={handleCollegeSubmit}
                className="w-full bg-gradient-to-r from-[#5B88B2] to-[#6F9BC2] text-[#122C4F] font-bold"
                data-testid="college-next-btn"
              >
                Continue
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </div>
          </Card>
        )}

        {/* Step 2: Sports Selection */}
        {step === 2 && (
          <Card className="bg-gradient-to-br from-[#1a1a1a] to-black border-[#5B88B2]/40 p-8 animate-fadeIn" data-testid="step-sports">
            <h2 className="text-2xl font-bold text-white mb-6">Select Sports (Multiple Allowed)</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
              {SPORTS.map(sport => (
                <div
                  key={sport}
                  onClick={() => handleSportToggle(sport)}
                  className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                    formData.selectedSports.includes(sport)
                      ? 'bg-[#5B88B2]/20 border-[#5B88B2]'
                      : 'bg-white/5 border-white/20 hover:border-[#5B88B2]/50'
                  }`}
                  data-testid={`sport-select-${sport.toLowerCase()}`}
                >
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      checked={formData.selectedSports.includes(sport)}
                      className="border-white"
                    />
                    <span className="text-white font-medium">{sport}</span>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex space-x-4">
              <Button
                onClick={() => setStep(1)}
                variant="outline"
                className="flex-1 border-[#FBF9E3] text-[#FBF9E3]"
                data-testid="sports-back-btn"
              >
                <ArrowLeft className="mr-2 w-4 h-4" />
                Back
              </Button>
              <Button
                onClick={handleSportsSubmit}
                className="flex-1 bg-gradient-to-r from-[#5B88B2] to-[#6F9BC2] text-[#122C4F] font-bold"
                data-testid="sports-next-btn"
              >
                Continue
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </div>
          </Card>
        )}

        {/* Step 3: Team Members */}
        {step === 3 && (
          <div className="space-y-6 animate-fadeIn">
            {formData.selectedSports.map((sport, sportIdx) => (
              <Card key={sport} className="bg-gradient-to-br from-[#1a1a1a] to-black border-[#5B88B2]/40 p-6" data-testid={`team-card-${sport.toLowerCase()}`}>
                <h3 className="text-xl font-bold text-white mb-4">{sport} Team</h3>
                <div className="space-y-4">
                  {formData.teams[sport]?.map((member, idx) => (
                    <div key={idx} className="bg-white/5 rounded-lg p-4 border border-white/10">
                      <div className="flex justify-between items-center mb-3">
                        <span className="text-[#5B88B2] font-medium">
                          Member {idx + 1} {idx < 2 && '(Contact Person)'}
                        </span>
                        {idx >= 2 && (
                          <Button
                            onClick={() => removeTeamMember(sport, idx)}
                            variant="ghost"
                            size="sm"
                            className="text-red-400 hover:text-red-300"
                            data-testid={`remove-member-${sport.toLowerCase()}-${idx}`}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        )}
                      </div>
                      <div className="grid md:grid-cols-3 gap-3">
                        <div>
                          <Label className="text-[#FBF9E3]/70 text-xs mb-1">Name *</Label>
                          <Input
                            placeholder="Full name"
                            value={member.name}
                            onChange={(e) => updateTeamMember(sport, idx, 'name', e.target.value)}
                            className="bg-white/10 border-[#5B88B2]/30 text-white text-sm"
                            data-testid={`member-name-${sport.toLowerCase()}-${idx}`}
                          />
                        </div>
                        {idx < 2 && (
                          <div>
                            <Label className="text-[#FBF9E3]/70 text-xs mb-1">Email *</Label>
                            <Input
                              type="email"
                              placeholder="Email address"
                              value={member.email}
                              onChange={(e) => updateTeamMember(sport, idx, 'email', e.target.value)}
                              className="bg-white/10 border-[#5B88B2]/30 text-white text-sm"
                              data-testid={`member-email-${sport.toLowerCase()}-${idx}`}
                            />
                          </div>
                        )}
                        <div>
                          <Label className="text-[#FBF9E3]/70 text-xs mb-1">Phone *</Label>
                          <Input
                            placeholder="Phone number"
                            value={member.phone}
                            onChange={(e) => updateTeamMember(sport, idx, 'phone', e.target.value)}
                            className="bg-white/10 border-[#5B88B2]/30 text-white text-sm"
                            data-testid={`member-phone-${sport.toLowerCase()}-${idx}`}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                  <Button
                    onClick={() => addTeamMember(sport)}
                    variant="outline"
                    className="w-full border-[#5B88B2] text-[#5B88B2] hover:bg-[#5B88B2]/10"
                    data-testid={`add-member-btn-${sport.toLowerCase()}`}
                  >
                    <Plus className="mr-2 w-4 h-4" />
                    Add Team Member
                  </Button>
                </div>
              </Card>
            ))}
            <div className="flex space-x-4">
              <Button
                onClick={() => setStep(2)}
                variant="outline"
                className="flex-1 border-[#FBF9E3] text-[#FBF9E3]"
                data-testid="teams-back-btn"
              >
                <ArrowLeft className="mr-2 w-4 h-4" />
                Back
              </Button>
              <Button
                onClick={handleTeamsSubmit}
                className="flex-1 bg-gradient-to-r from-[#5B88B2] to-[#6F9BC2] text-[#122C4F] font-bold"
                data-testid="teams-next-btn"
              >
                Continue
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </div>
          </div>
        )}

        {/* Step 4: Accommodation */}
        {step === 4 && (
          <Card className="bg-gradient-to-br from-[#1a1a1a] to-black border-[#5B88B2]/40 p-8 animate-fadeIn" data-testid="step-accommodation">
            <h2 className="text-2xl font-bold text-white mb-6">Accommodation</h2>
            <div className="space-y-6">
              <div className="flex items-start space-x-3">
                <Checkbox
                  id="accommodation"
                  checked={formData.accommodation.required}
                  onCheckedChange={(checked) => setFormData({
                    ...formData,
                    accommodation: { ...formData.accommodation, required: checked }
                  })}
                  className="mt-1"
                  data-testid="accommodation-checkbox"
                />
                <div>
                  <Label htmlFor="accommodation" className="text-white font-medium cursor-pointer">
                    I need accommodation
                  </Label>
                  <p className="text-gray-400 text-sm mt-1">
                    Choose from our accommodation packages with breakfast included
                  </p>
                </div>
              </div>

              {formData.accommodation.required && (
                <div className="space-y-6 bg-white/5 rounded-lg p-6 border border-[#5B88B2]/20">
                  <div>
                    <Label className="text-white font-medium mb-4 block">Select Accommodation Package *</Label>
                    <div className="grid md:grid-cols-2 gap-4">
                      {/* Package 1 */}
                      <div
                        onClick={() => setFormData({
                          ...formData,
                          accommodation: { ...formData.accommodation, package: 'package1' }
                        })}
                        className={`cursor-pointer p-6 rounded-lg border-2 transition-all ${
                          formData.accommodation.package === 'package1'
                            ? 'bg-[#5B88B2]/20 border-[#5B88B2]'
                            : 'bg-white/5 border-white/20 hover:border-[#5B88B2]/50'
                        }`}
                        data-testid="accommodation-package1"
                      >
                        <div className="flex items-start justify-between mb-3">
                          <h4 className="text-xl font-bold text-white">{ACCOMMODATION_PACKAGES.package1.name}</h4>
                          <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                            formData.accommodation.package === 'package1'
                              ? 'border-[#5B88B2] bg-[#5B88B2]'
                              : 'border-white/40'
                          }`}>
                            {formData.accommodation.package === 'package1' && (
                              <Check className="w-3 h-3 text-black" />
                            )}
                          </div>
                        </div>
                        <p className="text-gray-300 text-sm mb-3">{ACCOMMODATION_PACKAGES.package1.description}</p>
                        <div className="flex items-center text-[#5B88B2] text-2xl font-bold">
                          <IndianRupee className="w-5 h-5" />
                          {ACCOMMODATION_PACKAGES.package1.pricePerPerson}
                          <span className="text-sm text-gray-400 ml-2">per person</span>
                        </div>
                      </div>

                      {/* Package 2 */}
                      <div
                        onClick={() => setFormData({
                          ...formData,
                          accommodation: { ...formData.accommodation, package: 'package2' }
                        })}
                        className={`cursor-pointer p-6 rounded-lg border-2 transition-all ${
                          formData.accommodation.package === 'package2'
                            ? 'bg-[#5B88B2]/20 border-[#5B88B2]'
                            : 'bg-white/5 border-white/20 hover:border-[#5B88B2]/50'
                        }`}
                        data-testid="accommodation-package2"
                      >
                        <div className="flex items-start justify-between mb-3">
                          <h4 className="text-xl font-bold text-white">{ACCOMMODATION_PACKAGES.package2.name}</h4>
                          <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                            formData.accommodation.package === 'package2'
                              ? 'border-[#5B88B2] bg-[#5B88B2]'
                              : 'border-white/40'
                          }`}>
                            {formData.accommodation.package === 'package2' && (
                              <Check className="w-3 h-3 text-black" />
                            )}
                          </div>
                        </div>
                        <p className="text-gray-300 text-sm mb-3">{ACCOMMODATION_PACKAGES.package2.description}</p>
                        <div className="flex items-center text-[#5B88B2] text-2xl font-bold">
                          <IndianRupee className="w-5 h-5" />
                          {ACCOMMODATION_PACKAGES.package2.pricePerPerson}
                          <span className="text-sm text-gray-400 ml-2">per person</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <Label className="text-white mb-2">Number of People Requiring Accommodation *</Label>
                    <Input
                      type="number"
                      min="1"
                      placeholder="Enter number of people"
                      value={formData.accommodation.numberOfPeople || ''}
                      onChange={(e) => setFormData({
                        ...formData,
                        accommodation: { ...formData.accommodation, numberOfPeople: parseInt(e.target.value) || 0 }
                      })}
                      className="bg-white/10 border-[#5B88B2]/30 text-white"
                      data-testid="accommodation-people-input"
                    />
                  </div>
                </div>
              )}
            </div>
            <div className="flex space-x-4 mt-6">
              <Button
                onClick={() => setStep(3)}
                variant="outline"
                className="flex-1 border-[#FBF9E3] text-[#FBF9E3]"
                data-testid="accommodation-back-btn"
              >
                <ArrowLeft className="mr-2 w-4 h-4" />
                Back
              </Button>
              <Button
                onClick={handleAccommodationSubmit}
                className="flex-1 bg-gradient-to-r from-[#5B88B2] to-[#6F9BC2] text-[#122C4F] font-bold"
                data-testid="accommodation-next-btn"
              >
                Continue
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </div>
          </Card>
        )}

        {/* Step 5: Payment Summary */}
        {step === 5 && (
          <Card className="bg-gradient-to-br from-[#1a1a1a] to-black border-[#5B88B2]/40 p-8 animate-fadeIn" data-testid="step-payment">
            <h2 className="text-2xl font-bold text-white mb-6">Payment Summary</h2>
            <div className="space-y-4 mb-6">
              <div className="bg-white/5 rounded-lg p-6 border border-white/10">
                <h3 className="text-lg font-bold text-white mb-4">Registration Details</h3>
                <div className="space-y-2 text-[#FBF9E3]/80">
                  <p><span className="font-medium">College:</span> {formData.collegeName}</p>
                  <p><span className="font-medium">Sports:</span> {formData.selectedSports.join(', ')}</p>
                  {Object.entries(formData.teams).map(([sport, members]) => (
                    <p key={sport}>
                      <span className="font-medium">{sport}:</span> {members.length} members
                    </p>
                  ))}
                  {formData.accommodation.required && formData.accommodation.package && (
                    <div className="mt-3 pt-3 border-t border-white/10">
                      <p className="font-medium text-[#5B88B2]">Accommodation:</p>
                      <p className="text-sm">{ACCOMMODATION_PACKAGES[formData.accommodation.package].name}</p>
                      <p className="text-sm">{formData.accommodation.numberOfPeople} people × ₹{ACCOMMODATION_PACKAGES[formData.accommodation.package].pricePerPerson}</p>
                    </div>
                  )}
                </div>
              </div>

              <div className="bg-white/5 rounded-lg p-6 border border-white/10">
                <h3 className="text-lg font-bold text-white mb-4">Fee Breakdown</h3>
                <div className="space-y-3">
                  {/* Registration Fee Breakdown */}
                  <div>
                    <div className="flex justify-between text-white font-medium mb-2">
                      <span>Registration Fee</span>
                      <span className="flex items-center">
                        <IndianRupee className="w-4 h-4" />
                        {getRegistrationFee().toLocaleString()}
                      </span>
                    </div>
                    <div className="ml-4 space-y-1">
                      {Object.entries(formData.teams).map(([sport, members]) => (
                        <div key={sport} className="flex justify-between text-sm text-gray-400">
                          <span>{sport}</span>
                          <span>{members.length} × ₹{REGISTRATION_FEE} = ₹{(members.length * REGISTRATION_FEE).toLocaleString()}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Accommodation Fee */}
                  {formData.accommodation.required && formData.accommodation.package && (
                    <div className="pt-3 border-t border-white/10">
                      <div className="flex justify-between text-white font-medium mb-2">
                        <span>Accommodation Fee</span>
                        <span className="flex items-center">
                          <IndianRupee className="w-4 h-4" />
                          {getAccommodationFee().toLocaleString()}
                        </span>
                      </div>
                      <div className="ml-4 space-y-1">
                        <div className="flex justify-between text-sm text-gray-400">
                          <span>{ACCOMMODATION_PACKAGES[formData.accommodation.package].name}</span>
                          <span>{formData.accommodation.numberOfPeople} × ₹{ACCOMMODATION_PACKAGES[formData.accommodation.package].pricePerPerson.toLocaleString()} = ₹{getAccommodationFee().toLocaleString()}</span>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Total */}
                  <div className="border-t border-white/20 pt-3 mt-3">
                    <div className="flex justify-between items-center">
                      <span className="text-xl font-bold text-white">Total Amount</span>
                      <span className="text-2xl font-bold text-[#5B88B2] flex items-center">
                        <IndianRupee className="w-6 h-6" />
                        {calculateTotal().toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex space-x-4">
              <Button
                onClick={() => setStep(4)}
                variant="outline"
                className="flex-1 border-[#FBF9E3] text-[#FBF9E3]"
                data-testid="payment-back-btn"
              >
                <ArrowLeft className="mr-2 w-4 h-4" />
                Back
              </Button>
              <Button
                onClick={handlePayment}
                className="flex-1 bg-gradient-to-r from-[#5B88B2] to-[#6F9BC2] text-[#122C4F] font-bold text-lg py-6"
                data-testid="payment-submit-btn"
              >
                Pay Now
                <IndianRupee className="ml-2 w-5 h-5" />
              </Button>
            </div>
            <p className="text-center text-[#FBF9E3]/60 text-sm mt-4">
              Payment is secured by Razorpay (Demo Mode)
            </p>
          </Card>
        )}

        {/* Step 6: Registration Confirmation */}
        {step === 6 && (
          <Card className="bg-gradient-to-br from-[#1a1a1a] to-black border-[#5B88B2]/40 p-8 animate-fadeIn" data-testid="step-confirmation">
            <div className="text-center mb-8">
              <div className="w-20 h-20 bg-green-500/20 border-4 border-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Check className="w-10 h-10 text-green-500" />
              </div>
              <h2 className="text-3xl font-bold text-white mb-2">Registration Successful!</h2>
              <p className="text-[#FBF9E3]/80">Your payment has been confirmed and registration details have been sent to:</p>
              <p className="text-[#5B88B2] font-semibold text-lg mt-2">{formData.userEmail}</p>
            </div>

            {/* Registration Summary */}
            <div className="bg-white/5 rounded-lg p-6 mb-6 border border-[#5B88B2]/30">
              <h3 className="text-xl font-bold text-white mb-4 border-b border-white/20 pb-2">Registration Summary</h3>
              
              {/* College Info */}
              <div className="mb-4">
                <p className="text-[#FBF9E3]/60 text-sm">College Name</p>
                <p className="text-white font-semibold">{formData.collegeName}</p>
              </div>

              {/* Sports & Teams */}
              <div className="mb-4">
                <p className="text-[#FBF9E3]/60 text-sm mb-2">Registered Sports</p>
                {formData.selectedSports.map(sport => (
                  <div key={sport} className="mb-3 bg-white/5 rounded p-3">
                    <p className="text-[#5B88B2] font-bold mb-2">{sport}</p>
                    <div className="space-y-2">
                      {formData.teams[sport].map((member, idx) => (
                        <div key={idx} className="text-sm">
                          <p className="text-white">
                            {idx + 1}. {member.name}
                            {member.email && ` • ${member.email}`}
                            {member.phone && ` • ${member.phone}`}
                          </p>
                        </div>
                      ))}
                    </div>
                    <p className="text-[#FBF9E3]/60 text-xs mt-2">
                      Team Size: {formData.teams[sport].length} members
                    </p>
                  </div>
                ))}
              </div>

              {/* Accommodation */}
              {formData.accommodation.required && formData.accommodation.package && (
                <div className="mb-4">
                  <p className="text-[#FBF9E3]/60 text-sm">Accommodation</p>
                  <p className="text-white font-semibold">
                    {ACCOMMODATION_PACKAGES[formData.accommodation.package].name} for {formData.accommodation.numberOfPeople} people
                  </p>
                </div>
              )}

              {/* Payment Details */}
              <div className="border-t border-white/20 pt-4 mt-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-white">
                    <span>Registration Fee</span>
                    <span className="flex items-center">
                      <IndianRupee className="w-4 h-4" />
                      {getRegistrationFee().toLocaleString()}
                    </span>
                  </div>
                  {formData.accommodation.required && (
                    <div className="flex justify-between text-white">
                      <span>Accommodation Fee</span>
                      <span className="flex items-center">
                        <IndianRupee className="w-4 h-4" />
                        {getAccommodationFee().toLocaleString()}
                      </span>
                    </div>
                  )}
                  <div className="flex justify-between items-center font-bold text-lg pt-2 border-t border-white/20">
                    <span className="text-white">Total Paid</span>
                    <span className="text-[#5B88B2] flex items-center">
                      <IndianRupee className="w-5 h-5" />
                      {calculateTotal().toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Email Confirmation Note */}
            <div className="bg-[#5B88B2]/10 border border-[#5B88B2]/30 rounded-lg p-4 mb-6">
              <p className="text-[#FBF9E3] text-sm">
                📧 <strong>Email Confirmation:</strong> A detailed confirmation email with all the above information 
                has been sent to <strong className="text-[#5B88B2]">{formData.userEmail}</strong>. 
                Please check your inbox and spam folder.
              </p>
            </div>

            <Button
              onClick={() => navigate('/')}
              className="w-full bg-gradient-to-r from-[#5B88B2] to-[#6F9BC2] text-[#122C4F] font-bold text-lg py-6"
            >
              Back to Home
            </Button>
          </Card>
        )}
      </div>
    </div>
  );
};

export default RegistrationPage;