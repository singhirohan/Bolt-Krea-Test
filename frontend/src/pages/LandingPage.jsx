import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Trophy, Target, Users, Calendar, MapPin, Award, ChevronRight, Sparkles, ExternalLink, X, Download } from 'lucide-react';

const LandingPage = () => {
  const navigate = useNavigate();
  const [scrollY, setScrollY] = useState(0);
  const [selectedPopup, setSelectedPopup] = useState(null);
  const [selectedSport, setSelectedSport] = useState(null);

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
  const sportRules = {
    Basketball: {
      title: "Basketball Tournament Rules",
      content: `**TOURNAMENT FORMAT**

**Teams & Structure**
• Total Teams: 6 teams divided into 2 pools (Pool A & Pool B)
• Each pool: 3 teams
• League Phase: Each team plays 2 games within their pool
• Top 2 teams from each pool advance to semifinals

**MATCH FORMAT**

**League Phase**
• Duration: 4 quarters × 8 minutes each
• Half-time: 10 minutes
• Breaks: 2 minutes between Q1-Q2 and Q3-Q4

**Knockout Phase** (Semifinals & Final)
• Duration: 4 quarters × 10 minutes each
• Half-time: 15 minutes
• Overtime: 5-minute periods if tied (continues until winner)

**TEAM COMPOSITION**

• Players on Court: 5 players
• Maximum Roster: 12 players per team
• Minimum to Start: 5 players (or forfeit with 0-20 score)
• Shot Clock: 24 seconds (resets to 14s on offensive rebound)

**Equipment**
• Ball: Size 7 (men's), Size 6 (women's) - FIBA approved
• Jerseys must have visible numbers

**SCORING & STANDINGS**

**League Phase Points**
• Win: 2 points
• Loss: 1 point
• Forfeit: 0 points (opponent gets 20-0 win)

**Tiebreakers**
1. Head-to-head record
2. Point differential
3. Total points scored
4. Random draw

**TIMEOUTS & REGULATIONS**

• Timeouts: 2 per half (60 seconds each) + 1 timeout per half (30 seconds)
• Overtime: 1 timeout per team per OT period
• Maximum game time: 75 minutes (including all breaks)

**KEY RULES**

• All games follow current FIBA Official Basketball Rules
• 3 referees + 1 scorekeeper per game
• Teams must report 10 minutes before scheduled start
• Late arrival (>10 mins): Automatic forfeit
• Rolling substitutions allowed

**TOURNAMENT SCHEDULE**

• Duration: 2 days
• At least 1-hour gap between team's matches
• Day 1: League phase (6 games)
• Day 2: Semifinals + Championship (3 games total)

**Total Matches: 9 games**`
    },
    Cricket: {
      title: "Cricket Tournament Rules",
      content: `**TOURNAMENT FORMAT**

**Structure**
• Format: 2 groups with 3 teams each
• Group Stage: 12 overs per side
• Finals: 20 overs per side
• Venue: Sri City Cricket Ground

**Match Schedule**
• Each team plays 2 league matches within their group
• Top team from each group qualifies for finals

**MATCH SPECIFICATIONS**

**Group Stage**
• Overs: 12 per side
• Time Limit: Must complete in 45 minutes
• Penalties:
  - Time > 45 mins: One fielder inside 30-yard circle
  - Time > 50 mins: 10-run penalty to opposition

**Finals**
• Overs: 20 per side
• White ball used for all matches

**TEAM COMPOSITION**

• Playing XI: 11 players on field
• Squad Size: 15 players maximum
• Age Limit: 27 years or below
• Impact Player: Allowed (as per IPL regulations)
• Substitutes: Only for injuries (umpire verified)

**BOWLING & FIELDING**

**Bowling Restrictions**
• Group Stage: Max 3 overs per bowler
• Finals: Max 4 overs per bowler

**Powerplay**
• Group Stage: First 4 overs - max 2 fielders outside circle
• Finals: First 6 overs - max 2 fielders outside circle

**Special Rules**
• Every No Ball = Free Hit
• Tied Matches = Super Over (repeat if necessary)

**PLAYER REGULATIONS**

**Attire & Equipment**
• Colored jerseys mandatory for all teams
• Only rubber studs allowed
• Metal spikes strictly prohibited
• MCC Laws of Cricket apply

**TIMING & ATTENDANCE**

• Toss: 15 minutes before match start
• Teams must report 30 minutes prior to match
• Late arrival (>15 mins): Walkover to opposition

**CONDUCT & DISCIPLINE**

• Umpire's decision is FINAL
• Misbehavior with umpire = Disqualification
• All BOLT committee decisions are final
• Respect officials and follow code of conduct

**CONTACT**
Hrishikesh Rao
📱 73977 68077
✉️ adigehrishikesh_rao.sias24@krea.ac.in`
    },
    Football: {
      title: "Football Tournament Rules",
      content: `**TOURNAMENT FORMAT**

**Men's Tournament**
• Teams: 7 teams
• Team Size: 9-a-side (8 outfield + 1 goalkeeper)
• Maximum Roster: 14 players
• Duration: 50 minutes (25 mins per half, 5-min halftime)

**Groups**
• Group A: 4 teams
• Group B: 3 teams
• Top 2 from each group → Semifinals → Final

**Women's Tournament**
• Teams: 6 teams
• Team Size: 9-a-side (8 outfield + 1 goalkeeper)
• Maximum Roster: 14 players
• Duration: 40 minutes (20 mins per half, 8-min halftime)

**Groups**
• Group A: 3 teams
• Group B: 3 teams
• Semifinals + 3rd Place Match + Final

**SCORING SYSTEM**

**Group Stage Points**
• Win: 3 points
• Draw: 1 point
• Loss: 0 points

**Tiebreakers (in order)**
1. Goal Difference
2. Goals Scored
3. Head-to-Head result
4. Penalty shootout

**EXTRA TIME & PENALTIES**

**Group Stage**
• No extra time
• Match ends at full time

**Knockout Stage** (Semifinals & Final)
• If tied: 5 minutes extra time
• Still tied: Penalty shootout (best of 5)

**SUBSTITUTIONS**

• Type: Rolling substitutions
• Maximum: 5 per team per match
• Players can be substituted multiple times

**DISCIPLINE**

**Yellow Card**
• Warning for misconduct
• 2 Yellows in one match = Red card + Next match suspension

**Red Card**
• Immediate ejection
• Minimum 1 match suspension
• Additional sanctions possible for serious misconduct

**TIMING & ATTENDANCE**

• Report: 15 minutes before kick-off
• Grace Period: 5 minutes
• Late arrival: Automatic forfeit

**GAMEPLAY RULES**

**Men's**
• Follows official FIFA Laws
• Standard offside rules apply
• 50-minute matches

**Women's**
• Follows FIFA Laws with modifications
• NO OFFSIDE RULE
• 40-minute matches
• Small-sided game adaptations

**TOURNAMENT STRUCTURE**

**Men's - Total: 12 matches**
• Group Stage: 9 matches
• Knockouts: 2 semifinals + 1 final

**Women's - Total: 10 matches**
• Group Stage: 6 matches
• Knockouts: 2 semifinals + 3rd place + final

**General Rules**
• 2-day tournament
• Schedule released in advance
• All changes only by Organizing Committee
• Disciplinary matters handled by committee`
    },
    Tennis: {
      title: "Tennis Tournament Rules",
      content: `**TOURNAMENT FORMAT**

**Match Structure**
• Each tie consists of 5 matches
• Best-of-five format: Win 3 matches to win the tie

**Match Types per Tie**
1. Men's Singles
2. Men's Doubles
3. Women's Singles
4. Women's Doubles
5. Mixed Doubles

**MATCH FORMAT**

**Set Rules**
• Full set format
• Tiebreaker at 6-6 to decide set
• All matches follow official ITF rules

**Deuce System**
• Singles: Standard 2-point deuce
• Doubles: 1-point deuce (ITF "No-Ad" format)

**TEAM COMPOSITION**

**Minimum Requirements**
• 6 players minimum: 3 men + 3 women
• Maximum squad: 9 players (5 men + 4 women)

**Player Participation Limits**
• Each player: Maximum 2 matches per tie
• Exception: Only 1 man and 1 woman can play 2 matches
  - Example: Men's Doubles + Mixed Doubles
  - Example: Women's Doubles + Mixed Doubles
• All other players: Only 1 match per tie

**Forfeit**
• Unable to field player = Forfeit that match

**EQUIPMENT & ATTIRE**

**Required**
• Non-marking shoes mandatory
• Appropriate tennis attire
• Designated team colors
• Teams bring own rackets

**Provided**
• Official match balls by organizers

**TIMING & ATTENDANCE**

• Report to match desk: 15 minutes before scheduled time
• Warm-up: 5 minutes per match
• Late arrival (>10 mins): Automatic forfeit

**SCORING & ADVANCEMENT**

**Points System**
• Match win: 1 point toward team tally
• Need 3 points to win the tie

**Tiebreakers** (if teams tied on points)
1. Sets won-loss differential
2. Games won-loss differential

**CONDUCT & OFFICIATING**

**Officials**
• Qualified umpire/referee for all matches
• Referee's decision is FINAL

**Penalties for Misconduct**
• Verbal abuse
• Racquet abuse
• Dissent
→ Can result in warnings, point penalties, or disqualification

**COACHING & SUBSTITUTIONS**

**Coaching Rules**
• No coaching during points
• Limited coaching during changeovers (umpire's discretion)

**Substitutions**
• Only before match starts
• Only for legitimate medical/logistical reasons
• Must report to umpire and tournament desk

**SAFETY & FAIR PLAY**

• Players participate at own risk
• Responsible for own hydration and fitness
• Respect opponents, referees, and equipment
• Committee reserves right to amend/postpone matches for weather/unforeseen circumstances

**TOURNAMENT PROGRESSION**

• Group stage matches
• Top teams advance to knockout rounds
• Matches scheduled with adequate rest between ties`
    },
    Volleyball: {
      title: "Volleyball Tournament Rules",
      content: `**TOURNAMENT FORMAT**

**Structure**
• Teams: 6 teams (5 External + Krea University)
• Format: League Stage → Knockout Stage
• Venue: Volleyball Court, Krea University
• Categories: Men's & Women's

**Advancement**
• League: All teams play each other once
• Top 4 teams qualify for semifinals
• Semifinals → Final

**MATCH FORMAT**

**Set Structure**
• Best of 3 sets
• Set 1: 25 points
• Set 2: 25 points
• Set 3 (if needed): 15 points
• Must win by 2-point margin

**Duration**
• Approximate: 60 minutes per match

**TEAM COMPOSITION**

• On Court: 6 players at all times
• Roster: Minimum 8, Maximum 12 players
• Substitutes: Up to 6 players
• Captain: Must be designated before match

**Uniforms**
• Visible numbers (1-12) mandatory
• No jewelry or unsafe accessories
• Team jerseys required

**SCORING SYSTEM**

**League Stage**
• Win: 2 points
• Loss: 0 points

**Tiebreakers** (in order)
1. Set difference
2. Point difference
3. Head-to-head result

**Knockout Stage**
• SF1: Rank 1 vs Rank 4
• SF2: Rank 2 vs Rank 3
• Winners → Final

**GAME REGULATIONS**

**Substitutions**
• 6 substitutions allowed per set

**Timeouts**
• 2 timeouts per set
• Duration: 30 seconds each

**Key Rules**
• Maintain proper rotation and service order
• Net touch = Fault
• Standard volleyball rules apply

**DISCIPLINE & CONDUCT**

**Penalties**
1. Verbal warning (first offense)
2. Yellow card → Point to opponent
3. Red card → Expulsion from set/match

**Officiating**
• Qualified referees for all matches
• Line judges for semifinals and finals

**PROTESTS & DISPUTES**

• Must file within 10 minutes after match
• Must be in writing
• Signed by team captain
• Tournament Committee decision is FINAL

**EQUIPMENT**

**Provided by Organizers**
• Volleyballs
• Nets
• Court setup

**Teams Must Bring**
• Jerseys with numbers
• Kneepads
• Appropriate shoes (non-marking)
• Personal equipment

**SAFETY**

• Uphold sportsmanship and fair play
• Warm up before matches mandatory
• Medical assistance available
• Organizers not responsible for injuries or lost items

**TENTATIVE SCHEDULE**

**Day 1 - League Stage**
• 8:00 AM - 2:00 PM: 9 League matches
• 2:00 PM - 3:00 PM: Lunch break
• 3:00 PM - 5:00 PM: Reserve/Practice

**Day 2 - Knockout**
• 8:00 AM - 10:00 AM: Remaining league matches
• 10:15 AM: Semifinal 1 (Rank 1 vs 4)
• 11:45 AM: Semifinal 2 (Rank 2 vs 3)
• 1:00 PM - 2:00 PM: Lunch break
• 2:15 PM: Final Match
• 3:45 PM: Closing & Prize Distribution

**CONTACT**
Maya & Ram
📱 70228 93499
✉️ maya_achaia.sias24@krea.ac.in`
    },
    Badminton: {
      title: "Badminton Tournament Rules",
      content: `**TOURNAMENT FORMAT**

**Competition Structure**
• Format: Knockout format
• Duration: 2 days tournament
• Day 1: First rounds and semi-finals
• Day 2: Finals
• Venue: Indoor Badminton Court, Krea University

**Tie Structure**
• Each tie consists of 5 matches between two teams
• Team winning 3 out of 5 matches wins the tie
• If a team wins 3-0, remaining matches are not played

**Match Categories (in any order)**
1. Men's Singles
2. Women's Singles
3. Men's Doubles
4. Women's Doubles
5. Mixed Doubles

**TEAM COMPOSITION**

**Squad Size**
• Minimum: 8 players
• Maximum: 12 players (8 main + 4 substitutes)
• Recommended subs: 2 girls and 2 boys

**Main Team Requirements**
• 1 Men's Singles player
• 1 Women's Singles player
• 2 Men's Doubles players (1 pair)
• 2 Women's Doubles players (1 pair)
• 2 Mixed Doubles players (1 pair)

**Player Restrictions**
• Each player can play maximum 1 match per tie
• No player substitution once match begins
• Line-ups must be submitted before each tie

**MATCH FORMAT**

**Scoring System**
• Each match: Best of 3 games
• Points per game: 15 points (rally scoring)
• Shuttlecock: Yonex Mavis 350 (plastic shuttle)

**Deuce Rules**
• At 14-14: Deuce system until 21
• At 20-20: Golden point (next point wins)

**Match Points**
• Win: +1 point for team
• Loss: 0 points
• Walkover: 15-0, 15-0 for opponent

**BREAKS & TIMING**

**In-Match Breaks**
• 1-minute break when player reaches 8 points (each set)
• 1-minute break between sets
• 5-minute interval between matches

**Warm-up**
• Short breaks allowed between matches
• Players must arrive 10 minutes before match time

**KNOCKOUT STAGE**

**Draw System**
• Random draws before tournament
• Elimination: Lose the tie = knocked out
• No second chances

**Walkover & Forfeiture**
• Missing player: Opponent wins by walkover (15-0, 15-0)
• Incomplete tie: Remaining matches forfeit

**REGISTRATION & CAPTAINCY**

**Team Captain**
• 1 captain per team required
• Submits line-ups before each tie
• Represents team in all decisions

**Team Finalization**
• Teams must be finalized before tournament starts
• Roster changes allowed only for injuries/emergencies
• Requires approval from organizing committee

**CODE OF CONDUCT**

**Arrival & Punctuality**
• Arrive at least 10 minutes before match
• Late arrival (>5 minutes): Automatic walkover
• Must warm up before match time

**Footwear Requirements**
• Non-marking shoes mandatory
• Alternative: Play barefoot if non-marking unavailable
• Outdoor shoes STRICTLY PROHIBITED

**Penalties**
• Yellow Card: Warning for misconduct
• Red Card: Disqualification from current + next match
• Time-wasting: Penalties at referee's discretion

**Fair Play**
• Uphold sportsmanship at all times
• No arguing with referees
• Referee's decision is FINAL
• Violation leads to removal and suspension

**Rescheduling Policy**
• Not accommodated for player unavailability
• Captains must utilize entire squad
• Case-by-case basis only for emergencies

**EQUIPMENT**

**Provided by Organizers**
• Shuttlecocks (Yonex Mavis 350)
• Nets and court setup
• Scoresheets

**Teams Must Bring**
• Jerseys with visible numbers
• Personal racquets
• Non-marking shoes
• Towels and personal items

**CONTACT INFORMATION**

Sidharth Sarma P
Phone: 9747705001
Email: sidharth_sarma.sias23@krea.ac.in

Deshika Lokesh
Phone: 7676632163
Email: deshika_mlokesh.sias24@krea.ac.in`
    }
  };

  const sports = [
    { name: 'Cricket', icon: '🏏' },
    { name: 'Basketball', icon: '🏀' },
    { name: 'Football', icon: '⚽' },
    { name: 'Badminton', icon: '🏸' },
    { name: 'Tennis', icon: '🎾' },
    { name: 'Volleyball', icon: '🏐' }
  ];

  const handleSportClick = (sport) => {
    setSelectedSport(sport.name);
  };

  const handleDownloadBrochure = () => {
    // Create a temporary link element to trigger download
    const link = document.createElement('a');
    link.href = 'https://customer-assets.emergentagent.com/job_2abd8f8e-7c46-461a-adbb-3d9bafd57d8a/artifacts/0yrlx0bk_Sponsorship%20Deck%20Final.pdf';
    link.download = 'BOLT_2026_Brochure.pdf';
    link.target = '_blank';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
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
    <div className="min-h-screen bg-[#122C4F]">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-gradient-to-r from-[#122C4F] via-[#122C4F]/95 to-[#122C4F] backdrop-blur-lg border-b border-[#21A7A0]/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center">
              <img 
                src="https://customer-assets.emergentagent.com/job_collegefest-bolt/artifacts/4d9fmjxt_1.png" 
                alt="BOLT Logo" 
                className="h-[200px] md:h-[200px] sm:h-32 h-20 w-auto"
              />
            </div>
            <div className="flex items-center space-x-4 md:space-x-8">
              <a href="#about" className="text-[#FAF7DB] hover:text-[#21A7A0] transition-colors font-medium text-xs md:text-base">About</a>
              <a href="#sports" className="text-[#FAF7DB] hover:text-[#21A7A0] transition-colors font-medium text-xs md:text-base">Sports</a>
              <Button 
                onClick={() => navigate('/register')}
                className="bg-gradient-to-r from-[#21A7A0] to-[#6F9BC2] text-white font-bold hover:shadow-lg hover:shadow-[#21A7A0]/50 transition-all text-xs md:text-base px-3 py-2 md:px-4 md:py-2"
                data-testid="nav-register-btn"
              >
                Register
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4 overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0">
          <img 
            src="https://customer-assets.emergentagent.com/job_collegefest-bolt/artifacts/wpwggyzw_DSC09591.JPG" 
            alt="BOLT Background" 
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black via-black/80 to-black"></div>
        </div>
        
        {/* Glow Effects */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-[#21A7A0] rounded-full blur-3xl opacity-25"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#6F9BC2] rounded-full blur-3xl opacity-30"></div>
          <div className="absolute top-1/2 left-1/2 w-80 h-80 bg-[#FAD713] rounded-full blur-3xl opacity-20"></div>
        </div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center animate-fadeIn">
            <div className="inline-flex items-center space-x-2 bg-[#21A7A0]/20 border border-[#21A7A0]/50 rounded-full px-6 py-2 mb-8">
              <Sparkles className="w-5 h-5 text-[#21A7A0]" />
              <span className="text-[#FAF7DB] font-medium">Krea University's Premier Sports Festival</span>
            </div>
            
            <h1 className="text-4xl sm:text-6xl lg:text-8xl font-bold text-white mb-4 sm:mb-6" style={{ transform: `translateY(${scrollY * 0.3}px)` }}>
              BOLT <span className="text-[#21A7A0]">2026</span>
            </h1>
            
            <p className="text-xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-[#21A7A0] via-[#FAD713] to-[#6F9BC2] bg-clip-text text-transparent mb-3 sm:mb-4">
              Bigger. Better. Bolder.
            </p>
            
            <p className="text-sm sm:text-lg lg:text-xl text-[#FAF7DB]/90 max-w-3xl mx-auto mb-8 sm:mb-12 leading-relaxed px-4">
              Join us for the first-ever intercollegiate sports festival at Krea University. 
              Two days of intense competition, sportsmanship, and unforgettable memories.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 w-full px-4">
              <Button 
                onClick={() => navigate('/register')}
                size="lg"
                className="bg-gradient-to-r from-[#21A7A0] to-[#6F9BC2] text-white font-bold text-sm sm:text-lg px-6 py-5 sm:px-8 sm:py-6 hover:shadow-2xl hover:shadow-[#21A7A0]/50 transition-all hover:scale-105 w-full sm:w-auto"
                data-testid="hero-register-btn"
              >
                Register Your Team
                <ChevronRight className="ml-2 w-4 h-4 sm:w-5 sm:h-5" />
              </Button>
              
              <Button 
                onClick={handleDownloadBrochure}
                size="lg"
                variant="outline"
                className="border-2 border-[#FAD713] text-[#FAD713] bg-transparent hover:bg-[#FAD713] hover:text-[#122C4F] font-bold text-sm sm:text-lg px-6 py-5 sm:px-8 sm:py-6 transition-all hover:scale-105 w-full sm:w-auto"
                data-testid="hero-download-btn"
              >
                <Download className="mr-2 w-4 h-4 sm:w-5 sm:h-5" />
                Download Brochure
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
              className="bg-gradient-to-br from-[#1a1a1a] via-[#122C4F]/10 to-[#0a0a0a] border-[#FFC20A]/40 p-8 hover-lift hover:border-[#FFC20A] transition-all cursor-pointer group" 
              data-testid="location-card"
              onClick={() => setSelectedPopup('location')}
            >
              <MapPin className="w-12 h-12 text-[#FFC20A] mb-4 group-hover:scale-110 transition-transform" />
              <h3 className="text-2xl font-bold text-white mb-4 flex items-center justify-between">
                Location
                <ChevronRight className="w-5 h-5 text-[#FFC20A] opacity-0 group-hover:opacity-100 transition-opacity" />
              </h3>
              <p className="text-gray-300 leading-relaxed">
                Krea University, Sri City - A 7,500-acre integrated business hub housing 185+ global companies. 
                State-of-the-art sports facilities and world-class infrastructure.
              </p>
              <p className="text-[#FFC20A] text-sm mt-4 opacity-0 group-hover:opacity-100 transition-opacity">
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

      {/* Gallery Section */}
      <section className="py-20 px-4 bg-black">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 animate-fadeIn">
            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">Relive BOLT Moments</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-[#FFC20A] to-[#FF8C00] mx-auto mb-6"></div>
            <p className="text-gray-400 text-lg">Glimpses of intense competition and unforgettable memories</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            <div className="relative overflow-hidden rounded-2xl group">
              <img 
                src="https://customer-assets.emergentagent.com/job_collegefest-bolt/artifacts/c1ewro74_Copy%20of%20DSC09593.JPG" 
                alt="BOLT Sports Action" 
                className="w-full h-[250px] sm:h-[300px] lg:h-[350px] object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                <h3 className="text-xl font-bold mb-2">Peak Performance</h3>
                <p className="text-gray-300 text-sm">Athletes giving their best</p>
              </div>
              <div className="absolute inset-0 border-2 border-[#FFC20A]/0 group-hover:border-[#FFC20A]/60 rounded-2xl transition-all duration-300"></div>
            </div>

            <div className="relative overflow-hidden rounded-2xl group">
              <img 
                src="https://customer-assets.emergentagent.com/job_collegefest-bolt/artifacts/wpwggyzw_DSC09591.JPG" 
                alt="BOLT Team Spirit" 
                className="w-full h-[250px] sm:h-[300px] lg:h-[350px] object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                <h3 className="text-xl font-bold mb-2">Team Spirit</h3>
                <p className="text-gray-300 text-sm">Unity and camaraderie</p>
              </div>
              <div className="absolute inset-0 border-2 border-[#FFC20A]/0 group-hover:border-[#FFC20A]/60 rounded-2xl transition-all duration-300"></div>
            </div>

            <div className="relative overflow-hidden rounded-2xl group">
              <img 
                src="https://customer-assets.emergentagent.com/job_collegefest-bolt/artifacts/d3z3ota2_DSC09604.JPG" 
                alt="BOLT Competition" 
                className="w-full h-[250px] sm:h-[300px] lg:h-[350px] object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                <h3 className="text-xl font-bold mb-2">Fierce Competition</h3>
                <p className="text-gray-300 text-sm">Where champions emerge</p>
              </div>
              <div className="absolute inset-0 border-2 border-[#FFC20A]/0 group-hover:border-[#FFC20A]/60 rounded-2xl transition-all duration-300"></div>
            </div>

            <div className="relative overflow-hidden rounded-2xl group">
              <img 
                src="https://customer-assets.emergentagent.com/job_collegefest-bolt/artifacts/0t4oz4tt_DSC09654.JPG" 
                alt="BOLT Victory" 
                className="w-full h-[250px] sm:h-[300px] lg:h-[350px] object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                <h3 className="text-xl font-bold mb-2">Celebration</h3>
                <p className="text-gray-300 text-sm">Moments of triumph and joy</p>
              </div>
              <div className="absolute inset-0 border-2 border-[#FFC20A]/0 group-hover:border-[#FFC20A]/60 rounded-2xl transition-all duration-300"></div>
            </div>

            <div className="relative overflow-hidden rounded-2xl group">
              <img 
                src="https://customer-assets.emergentagent.com/job_collegefest-bolt/artifacts/1xwsojdc_WhatsApp%20Image%202025-11-25%20at%2015.21.54.jpeg" 
                alt="BOLT Badminton Arena" 
                className="w-full h-[250px] sm:h-[300px] lg:h-[350px] object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                <h3 className="text-xl font-bold mb-2">World-Class Facilities</h3>
                <p className="text-gray-300 text-sm">Indoor badminton courts</p>
              </div>
              <div className="absolute inset-0 border-2 border-[#FFC20A]/0 group-hover:border-[#FFC20A]/60 rounded-2xl transition-all duration-300"></div>
            </div>

            <div className="relative overflow-hidden rounded-2xl group">
              <img 
                src="https://customer-assets.emergentagent.com/job_collegefest-bolt/artifacts/4uxuglo1_WhatsApp%20Image%202025-11-25%20at%2015.21.54%20%281%29.jpeg" 
                alt="BOLT Sports Complex" 
                className="w-full h-[250px] sm:h-[300px] lg:h-[350px] object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                <h3 className="text-xl font-bold mb-2">Premium Venue</h3>
                <p className="text-gray-300 text-sm">State-of-the-art infrastructure</p>
              </div>
              <div className="absolute inset-0 border-2 border-[#FFC20A]/0 group-hover:border-[#FFC20A]/60 rounded-2xl transition-all duration-300"></div>
            </div>

            <div className="relative overflow-hidden rounded-2xl group">
              <img 
                src="https://customer-assets.emergentagent.com/job_collegefest-bolt/artifacts/ywgxrieh_WhatsApp%20Image%202025-11-25%20at%2015.25.02.jpeg" 
                alt="BOLT Campus View" 
                className="w-full h-[250px] sm:h-[300px] lg:h-[350px] object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                <h3 className="text-xl font-bold mb-2">Beautiful Campus</h3>
                <p className="text-gray-300 text-sm">Scenic sports grounds</p>
              </div>
              <div className="absolute inset-0 border-2 border-[#FFC20A]/0 group-hover:border-[#FFC20A]/60 rounded-2xl transition-all duration-300"></div>
            </div>

            <div className="relative overflow-hidden rounded-2xl group">
              <img 
                src="https://customer-assets.emergentagent.com/job_collegefest-bolt/artifacts/0230xrpg_WhatsApp%20Image%202025-11-25%20at%2015.25.03.jpeg" 
                alt="BOLT Training Grounds" 
                className="w-full h-[250px] sm:h-[300px] lg:h-[350px] object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                <h3 className="text-xl font-bold mb-2">Open Air Arena</h3>
                <p className="text-gray-300 text-sm">Perfect for outdoor sports</p>
              </div>
              <div className="absolute inset-0 border-2 border-[#FFC20A]/0 group-hover:border-[#FFC20A]/60 rounded-2xl transition-all duration-300"></div>
            </div>

            <div className="relative overflow-hidden rounded-2xl group">
              <img 
                src="https://customer-assets.emergentagent.com/job_collegefest-bolt/artifacts/d9rgwqxa_WhatsApp%20Image%202025-11-25%20at%2015.28.36.jpeg" 
                alt="BOLT Cricket Ground" 
                className="w-full h-[250px] sm:h-[300px] lg:h-[350px] object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                <h3 className="text-xl font-bold mb-2">Cricket Stadium</h3>
                <p className="text-gray-300 text-sm">Professional cricket grounds</p>
              </div>
              <div className="absolute inset-0 border-2 border-[#FFC20A]/0 group-hover:border-[#FFC20A]/60 rounded-2xl transition-all duration-300"></div>
            </div>
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
                className="sport-card bg-gradient-to-br from-[#1a1a1a] via-[#122C4F]/10 to-black border-[#FFC20A]/40 p-8 text-center cursor-pointer hover:border-[#FFC20A] hover:shadow-lg hover:shadow-[#FFC20A]/20 transition-all group"
                data-testid={`sport-card-${sport.name.toLowerCase()}`}
                onClick={() => handleSportClick(sport)}
              >
                <div className="text-6xl mb-4 group-hover:scale-110 transition-transform">{sport.icon}</div>
                <h3 className="text-2xl font-bold text-white mb-2">{sport.name}</h3>
                <div className="flex items-center justify-center text-[#FFC20A] text-sm opacity-0 group-hover:opacity-100 transition-opacity">
                  <ExternalLink className="w-4 h-4 mr-1" />
                  View Rules
                </div>
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

      {/* Popup Dialog */}
      <Dialog open={selectedPopup !== null} onOpenChange={() => setSelectedPopup(null)}>
        <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto bg-gradient-to-br from-[#1a1a1a] via-[#122C4F]/20 to-black border-[#FFC20A]">
          <DialogHeader>
            <DialogTitle className="text-3xl font-bold text-white flex items-center justify-between">
              {selectedPopup && popupContent[selectedPopup]?.title}
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setSelectedPopup(null)}
                className="text-gray-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </Button>
            </DialogTitle>
          </DialogHeader>
          <DialogDescription className="text-gray-300 text-base leading-relaxed whitespace-pre-line mt-4">
            {selectedPopup && popupContent[selectedPopup]?.content}
          </DialogDescription>
        </DialogContent>
      </Dialog>

      {/* Sports Rules Dialog */}
      <Dialog open={selectedSport !== null} onOpenChange={() => setSelectedSport(null)}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto bg-gradient-to-br from-[#1a1a1a] via-[#122C4F]/20 to-black border-[#FFC20A]">
          <DialogHeader>
            <DialogTitle className="text-3xl font-bold text-white flex items-center justify-between">
              {selectedSport && sportRules[selectedSport]?.title}
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setSelectedSport(null)}
                className="text-gray-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </Button>
            </DialogTitle>
          </DialogHeader>
          <div className="text-gray-300 text-base leading-relaxed mt-4 sport-rules-content">
            {selectedSport && sportRules[selectedSport]?.content.split('\n').map((line, index) => {
              // Convert **text** to bold
              const boldRegex = /\*\*(.*?)\*\*/g;
              const parts = [];
              let lastIndex = 0;
              let match;
              
              while ((match = boldRegex.exec(line)) !== null) {
                // Add text before the match
                if (match.index > lastIndex) {
                  parts.push(line.substring(lastIndex, match.index));
                }
                // Add bold text
                parts.push(<strong key={`bold-${index}-${match.index}`}>{match[1]}</strong>);
                lastIndex = match.index + match[0].length;
              }
              
              // Add remaining text
              if (lastIndex < line.length) {
                parts.push(line.substring(lastIndex));
              }
              
              return (
                <div key={index}>
                  {parts.length > 0 ? parts : line}
                </div>
              );
            })}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default LandingPage;