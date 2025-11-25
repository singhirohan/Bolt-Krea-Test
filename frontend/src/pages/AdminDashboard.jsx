import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { ArrowLeft, Search, Download, Users, Trophy, IndianRupee, Calendar, Trash2, Clock } from 'lucide-react';
import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [registrations, setRegistrations] = useState([]);
  const [filteredRegistrations, setFilteredRegistrations] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [selectedSport, setSelectedSport] = useState('all');

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      toast.error('Please login first');
      navigate('/admin');
      return;
    }
    fetchRegistrations();
  }, []);

  useEffect(() => {
    filterRegistrations();
  }, [searchTerm, selectedSport, registrations]);

  const fetchRegistrations = async () => {
    try {
      const response = await axios.get(`${API}/registrations`);
      setRegistrations(response.data);
      setFilteredRegistrations(response.data);
    } catch (error) {
      console.error('Error fetching registrations:', error);
      toast.error('Failed to load registrations');
    } finally {
      setLoading(false);
    }
  };

  const filterRegistrations = () => {
    let filtered = registrations;

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(reg => 
        reg.collegeName.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by sport
    if (selectedSport !== 'all') {
      filtered = filtered.filter(reg => 
        reg.sports.includes(selectedSport)
      );
    }

    setFilteredRegistrations(filtered);
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    toast.success('Logged out successfully');
    navigate('/admin');
  };

  const handleDelete = async (registrationId, collegeName) => {
    if (!window.confirm(`Are you sure you want to delete the registration for ${collegeName}?`)) {
      return;
    }

    try {
      await axios.delete(`${API}/registrations/${registrationId}`);
      toast.success('Registration deleted successfully');
      fetchRegistrations(); // Refresh the list
    } catch (error) {
      console.error('Error deleting registration:', error);
      toast.error('Failed to delete registration');
    }
  };

  const formatDateTime = (timestamp) => {
    const date = new Date(timestamp);
    const dateStr = date.toLocaleDateString('en-IN', { 
      day: '2-digit', 
      month: 'short', 
      year: 'numeric' 
    });
    const timeStr = date.toLocaleTimeString('en-IN', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: true 
    });
    return { dateStr, timeStr };
  };

  const exportToCSV = () => {
    if (filteredRegistrations.length === 0) {
      toast.error('No data to export');
      return;
    }

    const headers = ['College', 'Sports', 'Total Members', 'Registration Fee', 'Accommodation Fee', 'Total Amount', 'Payment Status', 'Date'];
    const rows = filteredRegistrations.map(reg => [
      reg.collegeName,
      reg.sports.join(', '),
      reg.teams.reduce((sum, team) => sum + team.members.length, 0),
      reg.registrationFee,
      reg.accommodationFee,
      reg.totalAmount,
      reg.paymentStatus,
      new Date(reg.timestamp).toLocaleDateString()
    ]);

    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `bolt-registrations-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    toast.success('Data exported successfully');
  };

  const getTotalStats = () => {
    const totalParticipants = filteredRegistrations.reduce((sum, reg) => 
      sum + reg.teams.reduce((teamSum, team) => teamSum + team.members.length, 0), 0
    );
    const totalRevenue = filteredRegistrations.reduce((sum, reg) => sum + reg.totalAmount, 0);
    const totalColleges = new Set(filteredRegistrations.map(reg => reg.collegeName)).size;
    
    return { totalParticipants, totalRevenue, totalColleges };
  };

  const stats = getTotalStats();
  const allSports = ['all', ...new Set(registrations.flatMap(reg => reg.sports))];

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#122C4F] via-[#1a3a5f] to-[#122C4F] flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#122C4F] py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-white mb-2">Admin Dashboard</h1>
            <p className="text-[#FBF9E3]/70">BOLT 2026 Registration Management</p>
          </div>
          <div className="flex items-center space-x-4">
            <Button
              onClick={() => navigate('/')}
              variant="outline"
              className="border-[#FBF9E3] text-[#FBF9E3]"
              data-testid="dashboard-home-btn"
            >
              <ArrowLeft className="mr-2 w-4 h-4" />
              Home
            </Button>
            <Button
              onClick={handleLogout}
              variant="outline"
              className="border-red-400 text-red-400 hover:bg-red-400 hover:text-white"
              data-testid="logout-btn"
            >
              Logout
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gradient-to-br from-[#1a1a1a] to-black border-[#5B88B2]/40 p-6 hover:border-[#5B88B2] transition-all" data-testid="stat-total-registrations">
            <Users className="w-10 h-10 text-[#5B88B2] mb-3" />
            <h3 className="text-3xl font-bold text-white mb-1">{filteredRegistrations.length}</h3>
            <p className="text-gray-300 text-sm">Total Registrations</p>
          </Card>

          <Card className="bg-gradient-to-br from-[#1a1a1a] to-black border-[#5B88B2]/40 p-6 hover:border-[#5B88B2] transition-all" data-testid="stat-total-colleges">
            <Trophy className="w-10 h-10 text-[#5B88B2] mb-3" />
            <h3 className="text-3xl font-bold text-white mb-1">{stats.totalColleges}</h3>
            <p className="text-gray-300 text-sm">Colleges Registered</p>
          </Card>

          <Card className="bg-gradient-to-br from-[#1a1a1a] to-black border-[#5B88B2]/40 p-6 hover:border-[#5B88B2] transition-all" data-testid="stat-total-participants">
            <Users className="w-10 h-10 text-[#5B88B2] mb-3" />
            <h3 className="text-3xl font-bold text-white mb-1">{stats.totalParticipants}</h3>
            <p className="text-gray-300 text-sm">Total Participants</p>
          </Card>

          <Card className="bg-gradient-to-br from-[#1a1a1a] to-black border-[#5B88B2]/40 p-6 hover:border-[#5B88B2] transition-all" data-testid="stat-total-revenue">
            <IndianRupee className="w-10 h-10 text-[#5B88B2] mb-3" />
            <h3 className="text-3xl font-bold text-white mb-1">₹{stats.totalRevenue.toLocaleString()}</h3>
            <p className="text-gray-300 text-sm">Total Revenue</p>
          </Card>
        </div>

        {/* Filters and Actions */}
        <Card className="bg-gradient-to-br from-[#1a1a1a] to-black border-[#5B88B2]/40 p-6 mb-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#FBF9E3]/50" />
              <Input
                placeholder="Search by college name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-white/10 border-[#5B88B2]/30 text-white placeholder:text-white/40"
                data-testid="search-input"
              />
            </div>

            <div className="flex items-center space-x-4">
              <select
                value={selectedSport}
                onChange={(e) => setSelectedSport(e.target.value)}
                className="bg-white/10 border border-[#5B88B2]/30 text-white rounded-md px-4 py-2"
                data-testid="sport-filter"
              >
                {allSports.map(sport => (
                  <option key={sport} value={sport} className="bg-[#122C4F]">
                    {sport === 'all' ? 'All Sports' : sport}
                  </option>
                ))}
              </select>

              <Button
                onClick={exportToCSV}
                className="bg-gradient-to-r from-[#5B88B2] to-[#6F9BC2] text-[#122C4F] font-bold"
                data-testid="export-btn"
              >
                <Download className="mr-2 w-4 h-4" />
                Export CSV
              </Button>
            </div>
          </div>
        </Card>

        {/* Registrations List */}
        <div className="space-y-4">
          {filteredRegistrations.length === 0 ? (
            <Card className="bg-gradient-to-br from-[#1a1a1a] to-black border-[#5B88B2]/40 p-12 text-center">
              <p className="text-gray-400 text-lg">No registrations found</p>
            </Card>
          ) : (
            filteredRegistrations.map((reg, idx) => {
              const { dateStr, timeStr } = formatDateTime(reg.timestamp);
              return (
                <Card key={reg.id} className="bg-gradient-to-br from-[#1a1a1a] to-black border-[#5B88B2]/40 p-6 hover:border-[#5B88B2] hover:shadow-lg hover:shadow-[#5B88B2]/20 transition-all" data-testid={`registration-card-${idx}`}>
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-3">
                        <h3 className="text-xl font-bold text-white">{reg.collegeName}</h3>
                        <Badge className="bg-[#5B88B2]/20 text-[#5B88B2] border-[#5B88B2]/40">
                          {reg.paymentStatus}
                        </Badge>
                      </div>
                      
                      <div className="grid md:grid-cols-2 gap-3 text-[#FBF9E3]/80 text-sm">
                        <div>
                          <span className="font-medium">Sports:</span> {reg.sports.join(', ')}
                        </div>
                        <div>
                          <span className="font-medium">Total Members:</span> {reg.teams.reduce((sum, team) => sum + team.members.length, 0)}
                        </div>
                        <div>
                          <span className="font-medium">Registration Fee:</span> ₹{reg.registrationFee.toLocaleString()}
                        </div>
                        {reg.accommodationFee > 0 && (
                          <div>
                            <span className="font-medium">Accommodation Fee:</span> ₹{reg.accommodationFee.toLocaleString()}
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="text-right">
                      <div className="flex items-center justify-end text-2xl font-bold text-[#5B88B2] mb-2">
                        <IndianRupee className="w-5 h-5" />
                        {reg.totalAmount.toLocaleString()}
                      </div>
                      <div className="space-y-1">
                        <div className="flex items-center justify-end text-[#FBF9E3]/60 text-sm">
                          <Calendar className="w-4 h-4 mr-1" />
                          {dateStr}
                        </div>
                        <div className="flex items-center justify-end text-[#FBF9E3]/50 text-xs">
                          <Clock className="w-3 h-3 mr-1" />
                          {timeStr}
                        </div>
                      </div>
                      <Button
                        onClick={() => handleDelete(reg.id, reg.collegeName)}
                        variant="ghost"
                        size="sm"
                        className="mt-2 text-red-400 hover:text-red-300 hover:bg-red-400/10"
                        data-testid={`delete-registration-btn-${idx}`}
                      >
                        <Trash2 className="w-4 h-4 mr-1" />
                        Delete
                      </Button>
                    </div>
                  </div>

                {/* Teams Details */}
                <div className="mt-4 pt-4 border-t border-white/10">
                  <details className="cursor-pointer">
                    <summary className="text-[#5B88B2] font-medium hover:text-[#6F9BC2] transition-colors">
                      View Team Details
                    </summary>
                    <div className="mt-3 space-y-3">
                      {reg.teams.map((team, teamIdx) => (
                        <div key={teamIdx} className="bg-white/5 rounded-lg p-4">
                          <h4 className="text-white font-medium mb-2">{team.sport} Team ({team.members.length} members)</h4>
                          <div className="grid md:grid-cols-2 gap-2 text-sm text-[#FBF9E3]/70">
                            {team.members.map((member, memberIdx) => (
                              <div key={memberIdx}>
                                <span className="text-[#5B88B2]">#{memberIdx + 1}</span> {member.name}
                                {member.email && ` - ${member.email}`}
                                {member.phone && ` - ${member.phone}`}
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </details>
                </div>
              </Card>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;