import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import '@/App.css';
import LandingPage from '@/pages/LandingPage';
import RegistrationPage from '@/pages/RegistrationPage';
import AdminLogin from '@/pages/AdminLogin';
import AdminDashboard from '@/pages/AdminDashboard';
import { Toaster } from '@/components/ui/sonner';

// Component to handle page titles
function PageTitle() {
  const location = useLocation();
  
  useEffect(() => {
    const titles = {
      '/': 'BOLT Krea 2026 | Sports Festival',
      '/register': 'Register Your Team | BOLT Krea',
      '/admin': 'Admin Login | BOLT Krea',
      '/admin/dashboard': 'Admin Dashboard | BOLT Krea'
    };
    
    document.title = titles[location.pathname] || 'BOLT Krea 2026';
  }, [location]);
  
  return null;
}

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <PageTitle />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/register" element={<RegistrationPage />} />
          <Route path="/admin" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
        </Routes>
      </BrowserRouter>
      <Toaster position="top-center" richColors />
    </div>
  );
}

export default App;