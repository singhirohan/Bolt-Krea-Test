import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Trophy, Target, Users, Calendar, MapPin, Award, ChevronRight, Sparkles, ExternalLink, X } from 'lucide-react';

const LandingPage = () => {
  const navigate = useNavigate();
  const [scrollY, setScrollY] = useState(0);
  const [selectedPopup, setSelectedPopup] = useState(null);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const popupContent = {
    vision: {
      title: "Our Vision",
      content: `At BOLT 2026, we envision creating more than just a sports festival – we aim to build a legacy of excellence, sportsmanship, and community spirit that resonates throughout South India.

Our vision is to establish BOLT as the premier intercollegiate sports platform that:

• Fosters Holistic Development: We believe sports transcend physical competition. Through BOLT, we nurture critical thinking, creativity, communication, and real-world problem-solving skills in our participants.

• Champions Diversity & Inclusion: We welcome athletes from diverse backgrounds, creating a melting pot of talent, culture, and perspectives that enriches the sporting experience for everyone.

• Drives Social Impact: Beyond trophies and medals, we aspire to use sports as a catalyst for positive social change, building bridges between institutions and inspiring the next generation of leaders.

• Sets New Standards: By combining world-class facilities at Krea University with innovative event management, we're redefining what an intercollegiate sports festival can achieve.

• Creates Lasting Memories: Every participant leaves with not just experiences, but lifelong friendships, networks, and stories that shape their personal and professional journeys.

BOLT isn't just about winning – it's about participating, learning, growing, and becoming part of something bigger than yourself.`
    },
    experience: {
      title: "The BOLT Experience",
      content: `BOLT 2026 offers an unparalleled two-day journey that combines intense competition with unforgettable experiences:

🏆 COMPETITIVE EXCELLENCE
Six premier sports leagues featuring the best collegiate athletes across Cricket, Basketball, Football, Badminton, Tennis, and Volleyball. Every match is a showcase of skill, strategy, and sportsmanship.

🌟 WORLD-CLASS INFRASTRUCTURE
Krea University's state-of-the-art sports facilities provide the perfect stage for athletic excellence. Located in Sri City – a 7,500-acre integrated business hub – our venue offers professional-grade equipment and amenities.

🤝 NETWORKING OPPORTUNITIES
Connect with 1,500+ participants from premier universities across India. Build lasting friendships, create professional networks, and exchange ideas with like-minded sports enthusiasts.

🎭 CULTURAL CELEBRATIONS
Beyond sports, immerse yourself in cultural events, entertainment nights, and social gatherings that celebrate the diversity and talent of our participants.

📸 SOCIAL MEDIA AMPLIFICATION
With an expected reach of 50,000+ across social platforms, your achievements and experiences will be captured and shared, building your personal brand and athletic profile.

🏅 RECOGNITION & REWARDS
Winners receive prestigious trophies, certificates, and recognition that add value to your academic and athletic portfolios.

💼 PROFESSIONAL GROWTH
Interact with distinguished guests, alumni, and industry leaders who share insights on balancing sports with academic and professional success.

🎯 HOLISTIC DEVELOPMENT
Through workshops, leadership sessions, and team-building activities, develop skills that extend far beyond the playing field.

Join us for two days that will challenge you, inspire you, and transform you. BOLT 2026 – where champions are made and legends begin.`
    },
    location: {
      title: "Location - Krea University, Sri City",
      content: `🏛️ ABOUT KREA UNIVERSITY
Krea University stands as one of India's most innovative private universities, pioneering a unique educational model that seamlessly integrates liberal arts, sciences, and professional studies.

📍 SRI CITY - A GLOBAL HUB
Located in the heart of Sri City, a thriving 7,500-acre integrated business hub that houses over 185 global companies from 27 countries. This strategic location provides:

• Easy Connectivity: Well-connected by road and rail, approximately 55 km from Chennai and 35 km from Tirupati
• International Exposure: Surrounded by multinational corporations, offering unique networking opportunities
• Modern Infrastructure: World-class facilities and amenities in a planned township

🏟️ SPORTS FACILITIES
Our campus boasts cutting-edge sports infrastructure designed to international standards:

• Professional Cricket Ground with modern pavilion
• Regulation-size Basketball and Volleyball Courts
• Full-size Football Field with natural turf
• Indoor Badminton Courts with professional lighting
• Tennis Courts meeting ITF specifications
• Modern Gymnasium and Training Facilities
• Sports Medicine and Physiotherapy Center

🏘️ ACCOMMODATION & AMENITIES
• Comfortable on-campus accommodation options
• Multiple dining facilities offering diverse cuisines
• 24/7 security and medical support
• High-speed internet connectivity
• Recreation and relaxation zones
• Spectator areas with excellent viewing angles

🌳 CAMPUS ENVIRONMENT
Set in a serene, eco-friendly environment, our campus combines academic excellence with natural beauty, providing the perfect backdrop for a memorable sporting experience.

The unique location of Krea University in Sri City offers participants not just a venue, but an experience of being part of a global community dedicated to excellence.`
    }
  };

  const sports = [
    { name: 'Cricket', icon: '🏏', pdf: '/cricket-rules.pdf' },
    { name: 'Basketball', icon: '🏀', pdf: '/basketball-rules.pdf' },
    { name: 'Football', icon: '⚽', pdf: '/football-rules.pdf' },
    { name: 'Badminton', icon: '🏸', pdf: '/badminton-rules.pdf' },
    { name: 'Tennis', icon: '🎾', pdf: '/tennis-rules.pdf' },
    { name: 'Volleyball', icon: '🏐', pdf: '/volleyball-rules.pdf' }
  ];

  const handleSportClick = (sport) => {
    // For now, show alert. You can replace with actual PDF links
    alert(`${sport.name} rules PDF will be available soon. PDF path: ${sport.pdf}`);
  };

  const timeline = [
    { year: '2022', title: 'Inception', desc: '750+ participants across 20+ sports' },
    { year: '2023', title: 'Growth', desc: '270+ athletes, first sponsorships secured' },
    { year: '2024-25', title: 'Unity', desc: 'IFMR & SIAS schools united under BOLT' },
    { year: '2026', title: 'Intercollegiate', desc: 'First inter-collegiate sports festival' }
  ];

  const stats = [
    { value: '1500+', label: 'Expected Participants', icon: Users },
    { value: '50,000+', label: 'Social Media Reach', icon: Target },
    { value: '6', label: 'Sports Leagues', icon: Trophy },
    { value: '2', label: 'Days of Action', icon: Calendar }
  ];

  return (
    <div className="min-h-screen bg-black">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-black/90 backdrop-blur-lg border-b border-[#FFC20A]/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center">
              <img 
                src="https://customer-assets.emergentagent.com/job_collegefest-bolt/artifacts/4d9fmjxt_1.png" 
                alt="BOLT Logo" 
                className="h-[200px] w-auto"
              />
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <a href="#about" className="text-[#FBF9E3] hover:text-[#FFC20A] transition-colors font-medium">About</a>
              <a href="#sports" className="text-[#FBF9E3] hover:text-[#FFC20A] transition-colors font-medium">Sports</a>
              <a href="#history" className="text-[#FBF9E3] hover:text-[#FFC20A] transition-colors font-medium">History</a>
              <Button 
                onClick={() => navigate('/register')}
                className="bg-gradient-to-r from-[#FFC20A] to-[#FF8C00] text-[#122C4F] font-bold hover:shadow-lg hover:shadow-[#FFC20A]/50 transition-all"
                data-testid="nav-register-btn"
              >
                Register Now
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-[#FFC20A] rounded-full blur-3xl opacity-20"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#122C4F] rounded-full blur-3xl opacity-30"></div>
          <div className="absolute top-1/2 left-1/2 w-80 h-80 bg-[#FF6B35] rounded-full blur-3xl opacity-15"></div>
        </div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center animate-fadeIn">
            <div className="inline-flex items-center space-x-2 bg-[#FFC20A]/20 border border-[#FFC20A]/40 rounded-full px-6 py-2 mb-8">
              <Sparkles className="w-5 h-5 text-[#FFC20A]" />
              <span className="text-[#FBF9E3] font-medium">Krea University's Premier Sports Festival</span>
            </div>
            
            <h1 className="text-6xl sm:text-7xl lg:text-8xl font-bold text-white mb-6" style={{ transform: `translateY(${scrollY * 0.3}px)` }}>
              BOLT <span className="text-[#FFC20A]">2026</span>
            </h1>
            
            <p className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-[#FFC20A] via-[#FF8C00] to-[#FF6B35] bg-clip-text text-transparent mb-4">
              Bigger. Better. Bolder.
            </p>
            
            <p className="text-lg sm:text-xl text-[#FBF9E3]/80 max-w-3xl mx-auto mb-12 leading-relaxed">
              Join us for the first-ever intercollegiate sports festival at Krea University. 
              Two days of intense competition, sportsmanship, and unforgettable memories.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button 
                onClick={() => navigate('/register')}
                size="lg"
                className="bg-gradient-to-r from-[#FFC20A] to-[#FF8C00] text-[#122C4F] font-bold text-lg px-8 py-6 hover:shadow-2xl hover:shadow-[#FFC20A]/50 transition-all hover:scale-105"
                data-testid="hero-register-btn"
              >
                Register Your Team
                <ChevronRight className="ml-2 w-5 h-5" />
              </Button>
              
              <Button 
                onClick={() => navigate('/admin')}
                size="lg"
                variant="outline"
                className="border-2 border-[#FBF9E3] text-[#FBF9E3] bg-transparent hover:bg-[#FBF9E3] hover:text-[#122C4F] font-bold text-lg px-8 py-6 transition-all"
                data-testid="hero-admin-btn"
              >
                Admin Portal
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, idx) => {
              const Icon = stat.icon;
              return (
                <Card key={idx} className="bg-gradient-to-br from-[#1a1a1a] to-[#0a0a0a] border-[#FFC20A]/40 p-6 text-center hover-lift hover:border-[#FFC20A] transition-all" data-testid={`stat-card-${idx}`}>
                  <Icon className="w-10 h-10 text-[#FFC20A] mx-auto mb-4" />
                  <h3 className="text-4xl font-bold text-white mb-2">{stat.value}</h3>
                  <p className="text-gray-300 text-sm">{stat.label}</p>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 animate-fadeIn">
            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">Why BOLT?</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-[#FFC20A] to-[#FF8C00] mx-auto"></div>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Card 
              className="bg-gradient-to-br from-[#1a1a1a] via-[#122C4F]/10 to-[#0a0a0a] border-[#FFC20A]/40 p-8 hover-lift hover:border-[#FFC20A] transition-all cursor-pointer group" 
              data-testid="vision-card"
              onClick={() => setSelectedPopup('vision')}
            >
              <Target className="w-12 h-12 text-[#FFC20A] mb-4 group-hover:scale-110 transition-transform" />
              <h3 className="text-2xl font-bold text-white mb-4 flex items-center justify-between">
                Our Vision
                <ChevronRight className="w-5 h-5 text-[#FFC20A] opacity-0 group-hover:opacity-100 transition-opacity" />
              </h3>
              <p className="text-gray-300 leading-relaxed">
                To be a flagship sports festival that reflects impactful performance, ambition, and community spirit. 
                Fostering creativity, critical thinking, and real-world implementation through sports.
              </p>
              <p className="text-[#FFC20A] text-sm mt-4 opacity-0 group-hover:opacity-100 transition-opacity">
                Click to read more →
              </p>
            </Card>
            
            <Card 
              className="bg-gradient-to-br from-[#1a1a1a] via-[#122C4F]/10 to-[#0a0a0a] border-[#122C4F]/60 p-8 hover-lift hover:border-[#122C4F] transition-all cursor-pointer group" 
              data-testid="location-card"
              onClick={() => setSelectedPopup('location')}
            >
              <MapPin className="w-12 h-12 text-[#122C4F] mb-4 group-hover:scale-110 transition-transform" />
              <h3 className="text-2xl font-bold text-white mb-4 flex items-center justify-between">
                Location
                <ChevronRight className="w-5 h-5 text-[#122C4F] opacity-0 group-hover:opacity-100 transition-opacity" />
              </h3>
              <p className="text-gray-300 leading-relaxed">
                Krea University, Sri City - A 7,500-acre integrated business hub housing 185+ global companies. 
                State-of-the-art sports facilities and world-class infrastructure.
              </p>
              <p className="text-[#122C4F] text-sm mt-4 opacity-0 group-hover:opacity-100 transition-opacity">
                Click to read more →
              </p>
            </Card>
            
            <Card 
              className="bg-gradient-to-br from-[#1a1a1a] via-[#122C4F]/10 to-[#0a0a0a] border-[#FFC20A]/40 p-8 hover-lift hover:border-[#FFC20A] transition-all cursor-pointer group" 
              data-testid="experience-card"
              onClick={() => setSelectedPopup('experience')}
            >
              <Award className="w-12 h-12 text-[#FFC20A] mb-4 group-hover:scale-110 transition-transform" />
              <h3 className="text-2xl font-bold text-white mb-4 flex items-center justify-between">
                The Experience
                <ChevronRight className="w-5 h-5 text-[#FFC20A] opacity-0 group-hover:opacity-100 transition-opacity" />
              </h3>
              <p className="text-gray-300 leading-relaxed">
                Two days of intense competition, networking opportunities, cultural events, and memories that last a lifetime. 
                Be part of history as we debut our first intercollegiate fest.
              </p>
              <p className="text-[#FFC20A] text-sm mt-4 opacity-0 group-hover:opacity-100 transition-opacity">
                Click to read more →
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Sports Section */}
      <section id="sports" className="py-20 px-4 bg-[#0a0a0a]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 animate-fadeIn">
            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">Six Sports Leagues</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-[#FFC20A] to-[#FF8C00] mx-auto mb-6"></div>
            <p className="text-gray-400 text-lg">Compete in your favorite sport and showcase your talent</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {sports.map((sport, idx) => (
              <Card 
                key={idx} 
                className="sport-card bg-gradient-to-br from-[#1a1a1a] to-black border-[#FFC20A]/40 p-8 text-center cursor-pointer hover:border-[#FFC20A] hover:shadow-lg hover:shadow-[#FFC20A]/20 transition-all"
                data-testid={`sport-card-${sport.name.toLowerCase()}`}
              >
                <div className="text-6xl mb-4">{sport.icon}</div>
                <h3 className="text-2xl font-bold text-white">{sport.name}</h3>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* History Timeline */}
      <section id="history" className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 animate-fadeIn">
            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">Our Journey</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-[#FFC20A] to-[#FF8C00] mx-auto mb-6"></div>
            <p className="text-gray-400 text-lg">From inception to intercollegiate excellence</p>
          </div>
          
          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-[#FFC20A] to-[#5B88B2]"></div>
            
            <div className="space-y-12">
              {timeline.map((item, idx) => (
                <div key={idx} className={`flex items-center ${idx % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`} data-testid={`timeline-${item.year}`}>
                  <div className={`w-1/2 ${idx % 2 === 0 ? 'pr-12 text-right' : 'pl-12 text-left'}`}>
                    <Card className="bg-gradient-to-br from-[#1a1a1a] to-black border-[#FFC20A]/40 p-6 hover-lift hover:border-[#FFC20A] transition-all inline-block">
                      <span className="text-[#FFC20A] font-bold text-2xl">{item.year}</span>
                      <h3 className="text-2xl font-bold text-white mt-2 mb-3">{item.title}</h3>
                      <p className="text-gray-300">{item.desc}</p>
                    </Card>
                  </div>
                  <div className="w-6 h-6 bg-[#FFC20A] rounded-full border-4 border-[#122C4F] z-10"></div>
                  <div className="w-1/2"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <Card className="bg-gradient-to-br from-[#1a1a1a] to-black border-[#FFC20A] p-12 shadow-2xl shadow-[#FFC20A]/20">
            <Trophy className="w-20 h-20 text-[#FFC20A] mx-auto mb-6" />
            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">Ready to Compete?</h2>
            <p className="text-gray-300 text-lg mb-8 leading-relaxed">
              Register your college team now and be part of the biggest intercollegiate sports festival in South India. 
              Limited slots available!
            </p>
            <Button 
              onClick={() => navigate('/register')}
              size="lg"
              className="bg-gradient-to-r from-[#FFC20A] to-[#FF8C00] text-[#122C4F] font-bold text-xl px-12 py-7 hover:shadow-2xl hover:shadow-[#FFC20A]/50 transition-all hover:scale-105"
              data-testid="cta-register-btn"
            >
              Register Your Team Now
              <ChevronRight className="ml-2 w-6 h-6" />
            </Button>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black py-12 px-4 border-t border-[#FFC20A]/40">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex items-center justify-center space-x-3 mb-6">
            <img 
              src="https://customer-assets.emergentagent.com/job_collegefest-bolt/artifacts/4d9fmjxt_1.png" 
              alt="BOLT Logo" 
              className="h-14 w-auto"
            />
            <div>
              <h3 className="text-xl font-bold text-white">BOLT 2026</h3>
              <p className="text-xs text-[#FFC20A]">Bigger. Better. Bolder.</p>
            </div>
          </div>
          <p className="text-gray-400 mb-4">Krea University's Flagship Sports Festival</p>
          <p className="text-gray-600 text-sm">© 2026 BOLT - All Rights Reserved | Organized by SIAS Sports Club</p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;