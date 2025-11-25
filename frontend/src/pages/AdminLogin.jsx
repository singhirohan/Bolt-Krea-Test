import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { Lock, User, ArrowLeft } from 'lucide-react';
import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const AdminLogin = () => {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    username: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    
    if (!credentials.username || !credentials.password) {
      toast.error('Please enter username and password');
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post(`${API}/admin/login`, credentials);
      
      if (response.data.success) {
        localStorage.setItem('adminToken', response.data.token);
        toast.success('Login successful!');
        navigate('/admin/dashboard');
      } else {
        toast.error(response.data.message || 'Invalid credentials');
      }
    } catch (error) {
      console.error('Login error:', error);
      toast.error('Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#122C4F] flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <Button
          variant="ghost"
          onClick={() => navigate('/')}
          className="text-[#FBF9E3] hover:text-[#21A7A0] mb-6"
          data-testid="back-to-home-btn"
        >
          <ArrowLeft className="mr-2 w-4 h-4" />
          Back to Home
        </Button>

        <Card className="bg-gradient-to-br from-[#1a1a1a] to-black border-[#21A7A0]/40 p-8">
          <div className="text-center mb-8">
            <img 
              src="https://customer-assets.emergentagent.com/job_collegefest-bolt/artifacts/4d9fmjxt_1.png" 
              alt="BOLT Logo" 
              className="h-24 w-auto mx-auto mb-4"
            />
            <h1 className="text-3xl font-bold text-white mb-2">Admin Portal</h1>
            <p className="text-[#FBF9E3]/70">Sign in to access the dashboard</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <Label htmlFor="username" className="text-[#FBF9E3] mb-2 flex items-center">
                <User className="w-4 h-4 mr-2" />
                Username
              </Label>
              <Input
                id="username"
                type="text"
                placeholder="Enter username"
                value={credentials.username}
                onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
                className="bg-white/10 border-[#21A7A0]/30 text-white placeholder:text-white/40"
                data-testid="admin-username-input"
              />
            </div>

            <div>
              <Label htmlFor="password" className="text-[#FBF9E3] mb-2 flex items-center">
                <Lock className="w-4 h-4 mr-2" />
                Password
              </Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter password"
                value={credentials.password}
                onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                className="bg-white/10 border-[#21A7A0]/30 text-white placeholder:text-white/40"
                data-testid="admin-password-input"
              />
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-[#21A7A0] to-[#6F9BC2] text-[#122C4F] font-bold text-lg py-6 hover:shadow-xl hover:shadow-[#21A7A0]/30 transition-all"
              data-testid="admin-login-btn"
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </Button>
          </form>

          <p className="text-center text-[#FBF9E3]/50 text-sm mt-6">
            Only authorized administrators can access this area
          </p>
        </Card>
      </div>
    </div>
  );
};

export default AdminLogin;