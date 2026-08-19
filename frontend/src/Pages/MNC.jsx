import React, { useState, useMemo, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Compass,
  Bookmark,
  FileText,
  ScanLine,
  Building2,
  Rocket,
  Globe2,
  User,
  Settings,
  Bell,
  Search,
  MapPin,
  Star,
  X,
  Heart,
  Zap,
  Users,
  BadgeCheck,
  Trophy,
  Flame,
  ShieldCheck,
  SlidersHorizontal,
  ChevronDown,
  Briefcase,
  Wifi,
  Building,
  Home,
} from "lucide-react";

/* -------------------------------------------------------------------------- */
/*  SwipeX design tokens                                                      */
/* -------------------------------------------------------------------------- */

const BG = "#050816";
const PANEL = "rgba(255,255,255,0.05)";
const PANEL_BORDER = "rgba(255,255,255,0.08)";
const TEXT_SECONDARY = "#B0B7C3";
const TEXT_MUTED = "#7D8597";
const GRADIENT = "linear-gradient(135deg, #7B61FF 0%, #5EA2FF 50%, #2FE6FF 100%)";
const GRADIENT_SOFT = "linear-gradient(135deg, rgba(123,97,255,0.18) 0%, rgba(94,162,255,0.18) 50%, rgba(47,230,255,0.18) 100%)";
const GLOW = "0 0 24px rgba(94,162,255,0.35)";

const glassStyle = {
  background: PANEL,
  border: `1px solid ${PANEL_BORDER}`,
  backdropFilter: "blur(20px)",
  WebkitBackdropFilter: "blur(20px)",
};

/* -------------------------------------------------------------------------- */
/*  Placeholder data                                                          */
/* -------------------------------------------------------------------------- */

const NAV_ITEMS = [
  { label: "Dashboard", icon: LayoutDashboard },
  { label: "Job Discovery", icon: Compass },
  { label: "Saved Jobs", icon: Bookmark },
  { label: "Applications", icon: FileText },
  { label: "Resume Analysis & ATS Score", icon: ScanLine },
  { label: "Profile", icon: User },
  { label: "Settings", icon: Settings },
];

const INDUSTRIES = [
  "Technology", "FinTech", "Consulting", "Healthcare", "AI/ML", "Cloud Computing",
  "Cybersecurity", "Data Science", "Product", "E-Commerce", "Banking",
  "Telecommunications", "Manufacturing",
];
const WORK_MODES = ["Remote", "Hybrid", "On-site"];
const EXPERIENCE_BANDS = ["0-1 Years", "1-3 Years", "3-5 Years", "5+ Years"];
const LOCATIONS = ["Bangalore", "Delhi NCR", "Hyderabad", "Pune", "Mumbai", "Chennai", "Noida", "Gurugram"];
const SORT_OPTIONS = ["Most Relevant", "Highest Salary", "Recently Posted", "Best Match"];

const JOBS = [
  {
    id: 1, company: "Google", logo: "G", matchScore: 94, rating: 4.6,
    salaryLabel: "₹28 - 42 LPA", salaryValue: 42, location: "Bangalore",
    experience: "3-5 Years", jobType: "Full-time", workMode: "Hybrid",
    industry: "AI/ML", skills: ["Python", "TensorFlow", "System Design", "GCP"],
    description: "Design and ship large-scale ML systems powering Search ranking, working alongside world-class research teams.",
    openings: 12, companySize: "150,000+", postedDaysAgo: 1,
    badges: ["Fortune 500", "Verified Employer", "Actively Hiring"],
    title: "Senior Machine Learning Engineer",
  },
  {
    id: 2, company: "Microsoft", logo: "M", matchScore: 91, rating: 4.5,
    salaryLabel: "₹24 - 36 LPA", salaryValue: 36, location: "Hyderabad",
    experience: "1-3 Years", jobType: "Full-time", workMode: "Remote",
    industry: "Cloud Computing", skills: ["Azure", "C#", ".NET", "Kubernetes"],
    description: "Build and scale Azure cloud services used by millions of enterprise customers worldwide.",
    openings: 8, companySize: "220,000+", postedDaysAgo: 2,
    badges: ["Fortune 500", "Top Employer"],
    title: "Cloud Software Engineer",
  },
  {
    id: 3, company: "Amazon", logo: "A", matchScore: 88, rating: 4.2,
    salaryLabel: "₹20 - 32 LPA", salaryValue: 32, location: "Delhi NCR",
    experience: "3-5 Years", jobType: "Full-time", workMode: "On-site",
    industry: "E-Commerce", skills: ["AWS", "Java", "Microservices", "DSA"],
    description: "Own backend services for the fulfillment platform that powers Amazon's global logistics network.",
    openings: 20, companySize: "1,500,000+", postedDaysAgo: 3,
    badges: ["Fortune 500", "Verified Employer", "Actively Hiring"],
    title: "SDE II - Backend Systems",
  },
  {
    id: 4, company: "JPMorgan Chase", logo: "J", matchScore: 85, rating: 4.1,
    salaryLabel: "₹18 - 27 LPA", salaryValue: 27, location: "Mumbai",
    experience: "1-3 Years", jobType: "Full-time", workMode: "Hybrid",
    industry: "Banking", skills: ["Java", "Spring Boot", "SQL", "Kafka"],
    description: "Develop trading and risk platforms used across global markets with strict reliability standards.",
    openings: 6, companySize: "290,000+", postedDaysAgo: 5,
    badges: ["Fortune 500", "Top Employer"],
    title: "Technology Analyst - Markets",
  },
  {
    id: 5, company: "Deloitte", logo: "D", matchScore: 82, rating: 4.0,
    salaryLabel: "₹12 - 18 LPA", salaryValue: 18, location: "Gurugram",
    experience: "0-1 Years", jobType: "Full-time", workMode: "On-site",
    industry: "Consulting", skills: ["Excel", "Power BI", "Communication", "SQL"],
    description: "Advise Fortune 500 clients on digital transformation strategy and technology modernization.",
    openings: 15, companySize: "410,000+", postedDaysAgo: 1,
    badges: ["Verified Employer", "Actively Hiring"],
    title: "Business Technology Analyst",
  },
  {
    id: 6, company: "SAP", logo: "S", matchScore: 90, rating: 4.4,
    salaryLabel: "₹22 - 34 LPA", salaryValue: 34, location: "Pune",
    experience: "3-5 Years", jobType: "Full-time", workMode: "Remote",
    industry: "Product", skills: ["ABAP", "Cloud Platform", "Product Design", "APIs"],
    description: "Own product modules within SAP's enterprise cloud suite used by thousands of global businesses.",
    openings: 9, companySize: "110,000+", postedDaysAgo: 4,
    badges: ["Fortune 500", "Top Employer"],
    title: "Product Engineer - Cloud ERP",
  },
  {
    id: 7, company: "Cisco", logo: "C", matchScore: 87, rating: 4.3,
    salaryLabel: "₹19 - 29 LPA", salaryValue: 29, location: "Bangalore",
    experience: "1-3 Years", jobType: "Full-time", workMode: "Hybrid",
    industry: "Cybersecurity", skills: ["Network Security", "Python", "SIEM", "Threat Intel"],
    description: "Protect enterprise networks at scale, building next-gen detection tools for global customers.",
    openings: 7, companySize: "84,000+", postedDaysAgo: 6,
    badges: ["Verified Employer"],
    title: "Security Engineer II",
  },
  {
    id: 8, company: "Samsung", logo: "SS", matchScore: 79, rating: 4.0,
    salaryLabel: "₹15 - 22 LPA", salaryValue: 22, location: "Noida",
    experience: "0-1 Years", jobType: "Full-time", workMode: "On-site",
    industry: "Manufacturing", skills: ["Embedded C", "RTOS", "IoT", "Testing"],
    description: "Engineer firmware for next-generation consumer electronics shipped to over 190 countries.",
    openings: 11, companySize: "270,000+", postedDaysAgo: 2,
    badges: ["Fortune 500", "Actively Hiring"],
    title: "Firmware Engineer",
  },
];

/* -------------------------------------------------------------------------- */
/*  Small building blocks                                                     */
/* -------------------------------------------------------------------------- */

function Chip({ label, active, onClick }) {
  return (
    <button
      onClick={onClick}
      className="px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 whitespace-nowrap border"
      style={
        active
          ? { background: GRADIENT, borderColor: "transparent", color: "#050816", boxShadow: GLOW }
          : { background: "rgba(255,255,255,0.03)", borderColor: PANEL_BORDER, color: TEXT_SECONDARY }
      }
    >
      {label}
    </button>
  );
}

function PremiumBadge({ label }) {
  const icons = {
    "Fortune 500": Trophy,
    "Verified Employer": ShieldCheck,
    "Actively Hiring": Flame,
    "Top Employer": BadgeCheck,
  };
  const Icon = icons[label] || BadgeCheck;
  return (
    <span
      className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold"
      style={{ background: "rgba(255,255,255,0.06)", border: `1px solid ${PANEL_BORDER}`, color: "#DCE6FF" }}
    >
      <Icon size={12} style={{ color: "#5EA2FF" }} />
      {label}
    </span>
  );
}

function SkillChip({ label }) {
  return (
    <span
      className="px-3 py-1 rounded-full text-xs font-medium"
      style={{ background: "rgba(255,255,255,0.05)", border: `1px solid ${PANEL_BORDER}`, color: TEXT_SECONDARY }}
    >
      {label}
    </span>
  );
}

/* -------------------------------------------------------------------------- */
/*  Sidebar                                                                   */
/* -------------------------------------------------------------------------- */

function Sidebar({ mobileOpen, onClose }) {
  return (
    <>
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 lg:hidden"
          style={{ background: "rgba(0,0,0,0.6)" }}
          onClick={onClose}
        />
      )}
      <aside
        className={`fixed lg:sticky top-0 left-0 h-screen w-[260px] shrink-0 z-50 flex flex-col transition-transform duration-300 ${
          mobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
        style={{ background: "rgba(8,12,24,0.9)", borderRight: `1px solid ${PANEL_BORDER}`, backdropFilter: "blur(20px)" }}
      >
        <div className="flex items-center gap-2.5 px-6 py-6">
          <div
            className="w-9 h-9 rounded-xl flex items-center justify-center font-bold text-sm"
            style={{ background: GRADIENT, boxShadow: GLOW, color: "#050816" }}
          >
            SX
          </div>
          <span className="text-white font-semibold text-lg tracking-tight">SwipeX</span>
        </div>

        <nav className="flex-1 px-3 py-2 space-y-1 overflow-y-auto">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const active = item.label === "Job Discovery";
            return (
              <button
                key={item.label}
                className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 group relative"
                style={
                  active
                    ? { background: GRADIENT_SOFT, color: "#FFFFFF", boxShadow: "inset 0 0 0 1px rgba(94,162,255,0.4)" }
                    : { color: TEXT_SECONDARY }
                }
                onMouseEnter={(e) => {
                  if (!active) e.currentTarget.style.background = "rgba(255,255,255,0.05)";
                }}
                onMouseLeave={(e) => {
                  if (!active) e.currentTarget.style.background = "transparent";
                }}
              >
                {active && (
                  <span
                    className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-5 rounded-full"
                    style={{ background: GRADIENT }}
                  />
                )}
                <Icon size={18} style={{ color: active ? "#5EA2FF" : TEXT_MUTED }} />
                <span className="truncate">{item.label}</span>
              </button>
            );
          })}
        </nav>

        <div className="p-4">
          <div
            className="rounded-2xl p-4 text-center"
            style={{ ...glassStyle, boxShadow: GLOW }}
          >
            <p className="text-white text-xs font-semibold mb-1">Go Premium</p>
            <p style={{ color: TEXT_MUTED }} className="text-[11px] mb-3">Unlock unlimited AI match insights</p>
            <button
              className="w-full py-2 rounded-lg text-xs font-semibold"
              style={{ background: GRADIENT, color: "#050816" }}
            >
              Upgrade
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}

/* -------------------------------------------------------------------------- */
/*  Top navigation bar                                                        */
/* -------------------------------------------------------------------------- */

function TopBar({ onMenuClick }) {
  return (
    <header
      className="sticky top-0 z-30 flex items-center justify-between gap-4 px-4 sm:px-8 py-4"
      style={{ background: "rgba(5,8,22,0.75)", borderBottom: `1px solid ${PANEL_BORDER}`, backdropFilter: "blur(20px)" }}
    >
      <div className="flex items-center gap-3 flex-1">
        <button className="lg:hidden text-white" onClick={onMenuClick}>
          <SlidersHorizontal size={20} />
        </button>
        <div
          className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-full flex-1 max-w-md"
          style={{ background: "rgba(255,255,255,0.04)", border: `1px solid ${PANEL_BORDER}` }}
        >
          <Search size={16} style={{ color: TEXT_MUTED }} />
          <input
            placeholder="Quick search..."
            className="bg-transparent outline-none text-sm w-full text-white placeholder:text-[#7D8597]"
          />
        </div>
      </div>

      <div className="flex items-center gap-4">
        <button className="relative">
          <Bell size={20} style={{ color: TEXT_SECONDARY }} />
          <span
            className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full"
            style={{ background: GRADIENT, boxShadow: GLOW }}
          />
        </button>
        <div className="flex items-center gap-2 cursor-pointer">
          <div
            className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-semibold"
            style={{ background: GRADIENT, color: "#050816" }}
          >
            AR
          </div>
        </div>
      </div>
    </header>
  );
}

/* -------------------------------------------------------------------------- */
/*  Swipeable job card                                                        */
/* -------------------------------------------------------------------------- */

const SWIPE_THRESHOLD = 120;

function JobCard({ job, isTop, offset, onPointerDown, style, stackIndex }) {
  const rotate = isTop ? offset.x / 18 : 0;
  const likeOpacity = isTop ? Math.min(Math.max(offset.x / SWIPE_THRESHOLD, 0), 1) : 0;
  const nopeOpacity = isTop ? Math.min(Math.max(-offset.x / SWIPE_THRESHOLD, 0), 1) : 0;

  return (
    <div
      onPointerDown={isTop ? onPointerDown : undefined}
      className="absolute inset-0 rounded-[24px] p-6 sm:p-7 flex flex-col select-none"
      style={{
        ...glassStyle,
        boxShadow: isTop ? "0 20px 60px rgba(0,0,0,0.55), 0 0 40px rgba(94,162,255,0.12)" : "0 10px 30px rgba(0,0,0,0.4)",
        transform: `translate(${isTop ? offset.x : 0}px, ${isTop ? offset.y : stackIndex * 10}px) rotate(${rotate}deg) scale(${1 - stackIndex * 0.035})`,
        transition: offset.transitioning ? "transform 380ms cubic-bezier(0.22,1,0.36,1), opacity 380ms" : "none",
        cursor: isTop ? "grab" : "default",
        touchAction: "none",
        zIndex: 100 - stackIndex,
        opacity: stackIndex > 2 ? 0 : 1,
      }}
    >
      {/* LIKE / NOPE stamps */}
      <div
        className="absolute top-8 left-8 px-4 py-1.5 rounded-lg border-2 text-lg font-extrabold tracking-wider -rotate-12 pointer-events-none"
        style={{ borderColor: "#2FE6FF", color: "#2FE6FF", opacity: likeOpacity }}
      >
        INTERESTED
      </div>
      <div
        className="absolute top-8 right-8 px-4 py-1.5 rounded-lg border-2 text-lg font-extrabold tracking-wider rotate-12 pointer-events-none"
        style={{ borderColor: "#FF6B81", color: "#FF6B81", opacity: nopeOpacity }}
      >
        SKIP
      </div>

      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div
            className="w-14 h-14 rounded-2xl flex items-center justify-center text-lg font-bold text-white"
            style={{ background: GRADIENT_SOFT, border: `1px solid ${PANEL_BORDER}` }}
          >
            {job.logo}
          </div>
          <div>
            <h3 className="text-white font-semibold text-lg leading-tight">{job.title}</h3>
            <p style={{ color: TEXT_SECONDARY }} className="text-sm">
              {job.company}
              <span className="inline-flex items-center gap-1 ml-2" style={{ color: "#FFC94D" }}>
                <Star size={12} fill="#FFC94D" /> {job.rating}
              </span>
            </p>
          </div>
        </div>
        <div
          className="flex flex-col items-center px-3 py-1.5 rounded-xl text-xs font-bold"
          style={{ background: GRADIENT, color: "#050816", boxShadow: GLOW }}
        >
          <span className="text-sm leading-none">{job.matchScore}%</span>
          <span className="text-[10px] font-semibold leading-none mt-0.5">Match</span>
        </div>
      </div>

      {/* Badges */}
      <div className="flex flex-wrap gap-2 mb-4">
        {job.badges.map((b) => (
          <PremiumBadge key={b} label={b} />
        ))}
      </div>

      {/* Key facts */}
      <div className="grid grid-cols-2 gap-3 mb-4 text-sm">
        <div className="flex items-center gap-2" style={{ color: TEXT_SECONDARY }}>
          <Briefcase size={14} style={{ color: "#5EA2FF" }} /> {job.salaryLabel}
        </div>
        <div className="flex items-center gap-2" style={{ color: TEXT_SECONDARY }}>
          <MapPin size={14} style={{ color: "#5EA2FF" }} /> {job.location}
        </div>
        <div className="flex items-center gap-2" style={{ color: TEXT_SECONDARY }}>
          <Zap size={14} style={{ color: "#5EA2FF" }} /> {job.experience}
        </div>
        <div className="flex items-center gap-2" style={{ color: TEXT_SECONDARY }}>
          {job.workMode === "Remote" ? <Wifi size={14} style={{ color: "#5EA2FF" }} /> : job.workMode === "Hybrid" ? <Building size={14} style={{ color: "#5EA2FF" }} /> : <Home size={14} style={{ color: "#5EA2FF" }} />}
          {job.workMode} · {job.jobType}
        </div>
      </div>

      {/* Description */}
      <p style={{ color: TEXT_SECONDARY }} className="text-sm leading-relaxed mb-4 line-clamp-3">
        {job.description}
      </p>

      {/* Skills */}
      <div className="flex flex-wrap gap-2 mb-4">
        {job.skills.map((s) => (
          <SkillChip key={s} label={s} />
        ))}
      </div>

      <div className="mt-auto flex items-center justify-between pt-3 text-xs" style={{ color: TEXT_MUTED, borderTop: `1px solid ${PANEL_BORDER}` }}>
        <span className="flex items-center gap-1.5">
          <Users size={13} /> {job.companySize} employees
        </span>
        <span>{job.openings} openings · {job.postedDaysAgo}d ago</span>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Main page                                                                 */
/* -------------------------------------------------------------------------- */

export default function MNC() {
  const navigate = useNavigate();
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [industries, setIndustries] = useState(new Set());
  const [modes, setModes] = useState(new Set());
  const [experiences, setExperiences] = useState(new Set());
  const [locations, setLocations] = useState(new Set());
  const [maxSalary, setMaxSalary] = useState(50);
  const [sortBy, setSortBy] = useState("Most Relevant");
  const [sortOpen, setSortOpen] = useState(false);
  const [index, setIndex] = useState(0);
  const [lastAction, setLastAction] = useState(null);

  const toggleInSet = (setState) => (value) => {
    setState((prev) => {
      const next = new Set(prev);
      next.has(value) ? next.delete(value) : next.add(value);
      return next;
    });
  };

  const filteredJobs = useMemo(() => {
    let list = JOBS.filter((job) => {
      const matchesSearch =
        !searchTerm ||
        job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.skills.some((s) => s.toLowerCase().includes(searchTerm.toLowerCase()));
      const matchesIndustry = industries.size === 0 || industries.has(job.industry);
      const matchesMode = modes.size === 0 || modes.has(job.workMode);
      const matchesExp = experiences.size === 0 || experiences.has(job.experience);
      const matchesLoc = locations.size === 0 || locations.has(job.location);
      const matchesSalary = job.salaryValue <= maxSalary;
      return matchesSearch && matchesIndustry && matchesMode && matchesExp && matchesLoc && matchesSalary;
    });

    switch (sortBy) {
      case "Highest Salary":
        list = [...list].sort((a, b) => b.salaryValue - a.salaryValue);
        break;
      case "Recently Posted":
        list = [...list].sort((a, b) => a.postedDaysAgo - b.postedDaysAgo);
        break;
      case "Best Match":
      case "Most Relevant":
      default:
        list = [...list].sort((a, b) => b.matchScore - a.matchScore);
        break;
    }
    return list;
  }, [searchTerm, industries, modes, experiences, locations, maxSalary, sortBy]);

  // reset stack whenever filters change
  const filterKey = JSON.stringify([searchTerm, [...industries], [...modes], [...experiences], [...locations], maxSalary, sortBy]);
  const prevFilterKey = useRef(filterKey);
  if (prevFilterKey.current !== filterKey) {
    prevFilterKey.current = filterKey;
  }

  const [offset, setOffset] = useState({ x: 0, y: 0, transitioning: false });
  const dragState = useRef({ dragging: false, startX: 0, startY: 0 });

  const visibleJobs = filteredJobs.slice(index, index + 3);

  const advance = useCallback(() => {
    setTimeout(() => {
      setIndex((i) => i + 1);
      setOffset({ x: 0, y: 0, transitioning: false });
      setLastAction(null);
    }, 320);
  }, []);

  const swipe = useCallback(
    (direction) => {
      if (index >= filteredJobs.length) return;
      setLastAction(direction);
      const flyX = direction === "right" ? 900 : direction === "left" ? -900 : 0;
      const flyY = direction === "up" ? -900 : 40;
      setOffset({ x: flyX, y: flyY, transitioning: true });
      advance();
    },
    [advance, index, filteredJobs.length]
  );

  const onPointerDown = (e) => {
    dragState.current = { dragging: true, startX: e.clientX, startY: e.clientY };
    e.currentTarget.setPointerCapture?.(e.pointerId);
  };
  const onPointerMove = (e) => {
    if (!dragState.current.dragging) return;
    const dx = e.clientX - dragState.current.startX;
    const dy = e.clientY - dragState.current.startY;
    setOffset({ x: dx, y: dy, transitioning: false });
  };
  const onPointerUp = () => {
    if (!dragState.current.dragging) return;
    dragState.current.dragging = false;
    if (offset.x > SWIPE_THRESHOLD) swipe("right");
    else if (offset.x < -SWIPE_THRESHOLD) swipe("left");
    else setOffset({ x: 0, y: 0, transitioning: true });
  };

  // reset card index if filters shrink the list below current index
  if (index > 0 && index >= filteredJobs.length && filteredJobs.length > 0) {
    setIndex(0);
  }

  const current = filteredJobs[index];

  return (
    <div className="min-h-screen flex" style={{ background: BG }}>
      <Sidebar mobileOpen={mobileNavOpen} onClose={() => setMobileNavOpen(false)} />

      <div className="flex-1 flex flex-col min-w-0">
        <TopBar onMenuClick={() => setMobileNavOpen(true)} />

        <main
          className="flex-1 px-4 sm:px-8 py-8 max-w-[1400px] w-full mx-auto"
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerLeave={onPointerUp}
        >
          {/* Page heading */}
          <div className="flex items-center gap-3 mb-1">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center"
              style={{ background: GRADIENT_SOFT, border: `1px solid ${PANEL_BORDER}` }}
            >
              <Globe2 size={20} style={{ color: "#5EA2FF" }} />
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">MNC Jobs</h1>
          </div>
          <p style={{ color: TEXT_MUTED }} className="text-sm mb-6 ml-[52px]">
            Swipe through curated roles at the world's leading multinational companies
          </p>

          {/* Search bar */}
          <div
            className="flex items-center gap-3 rounded-full px-5 py-4 mb-5"
            style={{ ...glassStyle }}
          >
            <Search size={20} style={{ color: "#5EA2FF" }} />
            <input
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search MNC jobs, companies or skills..."
              className="bg-transparent outline-none text-white text-sm sm:text-base w-full placeholder:text-[#7D8597]"
            />
          </div>

          {/* Filters */}
          <div className="rounded-[20px] p-5 mb-8" style={glassStyle}>
            <p className="text-xs font-semibold uppercase tracking-wide mb-2.5" style={{ color: TEXT_MUTED }}>
              Industry
            </p>
            <div className="flex flex-wrap gap-2 mb-4">
              {INDUSTRIES.map((i) => (
                <Chip key={i} label={i} active={industries.has(i)} onClick={() => toggleInSet(setIndustries)(i)} />
              ))}
            </div>

            <p className="text-xs font-semibold uppercase tracking-wide mb-2.5" style={{ color: TEXT_MUTED }}>
              Work Mode
            </p>
            <div className="flex flex-wrap gap-2 mb-4">
              {WORK_MODES.map((m) => (
                <Chip key={m} label={m} active={modes.has(m)} onClick={() => toggleInSet(setModes)(m)} />
              ))}
            </div>

            <p className="text-xs font-semibold uppercase tracking-wide mb-2.5" style={{ color: TEXT_MUTED }}>
              Experience
            </p>
            <div className="flex flex-wrap gap-2 mb-4">
              {EXPERIENCE_BANDS.map((ex) => (
                <Chip key={ex} label={ex} active={experiences.has(ex)} onClick={() => toggleInSet(setExperiences)(ex)} />
              ))}
            </div>

            <p className="text-xs font-semibold uppercase tracking-wide mb-2.5" style={{ color: TEXT_MUTED }}>
              Location
            </p>
            <div className="flex flex-wrap gap-2 mb-5">
              {LOCATIONS.map((l) => (
                <Chip key={l} label={l} active={locations.has(l)} onClick={() => toggleInSet(setLocations)(l)} />
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-6 sm:items-center sm:justify-between pt-4" style={{ borderTop: `1px solid ${PANEL_BORDER}` }}>
              <div className="flex-1 max-w-md">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-semibold uppercase tracking-wide" style={{ color: TEXT_MUTED }}>
                    Salary up to
                  </span>
                  <span className="text-sm font-semibold" style={{ color: "#2FE6FF" }}>₹{maxSalary} LPA</span>
                </div>
                <input
                  type="range"
                  min={5}
                  max={50}
                  value={maxSalary}
                  onChange={(e) => setMaxSalary(Number(e.target.value))}
                  className="w-full accent-[#5EA2FF]"
                />
              </div>

              <div className="relative">
                <button
                  onClick={() => setSortOpen((o) => !o)}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium text-white"
                  style={{ background: "rgba(255,255,255,0.05)", border: `1px solid ${PANEL_BORDER}` }}
                >
                  <SlidersHorizontal size={15} style={{ color: "#5EA2FF" }} />
                  {sortBy}
                  <ChevronDown size={15} style={{ color: TEXT_MUTED }} />
                </button>
                {sortOpen && (
                  <div
                    className="absolute right-0 mt-2 w-48 rounded-xl overflow-hidden z-20"
                    style={{ ...glassStyle, background: "rgba(10,14,28,0.98)" }}
                  >
                    {SORT_OPTIONS.map((opt) => (
                      <button
                        key={opt}
                        onClick={() => {
                          setSortBy(opt);
                          setSortOpen(false);
                        }}
                        className="w-full text-left px-4 py-2.5 text-sm hover:bg-white/5"
                        style={{ color: opt === sortBy ? "#5EA2FF" : TEXT_SECONDARY }}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Card stack */}
          <div className="flex flex-col items-center">
            <div className="relative w-full max-w-[420px] h-[560px] mb-6">
              {visibleJobs.length > 0 ? (
                visibleJobs.map((job, i) => (
                  <JobCard
                    key={job.id}
                    job={job}
                    isTop={i === 0}
                    stackIndex={i}
                    offset={i === 0 ? offset : { x: 0, y: 0, transitioning: true }}
                    onPointerDown={onPointerDown}
                  />
                ))
              ) : (
                <div
                  className="absolute inset-0 rounded-[24px] flex flex-col items-center justify-center text-center px-8"
                  style={glassStyle}
                >
                  <div
                    className="w-16 h-16 rounded-2xl flex items-center justify-center mb-4"
                    style={{ background: GRADIENT_SOFT, border: `1px solid ${PANEL_BORDER}` }}
                  >
                    <Globe2 size={28} style={{ color: "#5EA2FF" }} />
                  </div>
                  <p className="text-white font-semibold mb-1">No more MNC jobs to show</p>
                  <p style={{ color: TEXT_MUTED }} className="text-sm">
                    Try adjusting your filters to discover more opportunities
                  </p>
                </div>
              )}
            </div>

            {/* Progress */}
            {filteredJobs.length > 0 && (
              <p style={{ color: TEXT_MUTED }} className="text-xs mb-5">
                {Math.min(index + 1, filteredJobs.length)} of {filteredJobs.length} matches
              </p>
            )}

            {/* Floating action buttons */}
            <div className="flex items-center gap-5 sm:gap-7">
              <button
                onClick={() => swipe("left")}
                disabled={!current}
                className="w-14 h-14 rounded-full flex items-center justify-center transition-transform duration-300 hover:scale-110 disabled:opacity-30"
                style={{ background: "rgba(255,107,129,0.12)", border: "1px solid rgba(255,107,129,0.4)", boxShadow: "0 0 20px rgba(255,107,129,0.15)" }}
              >
                <X size={22} style={{ color: "#FF6B81" }} />
              </button>
              <button
                onClick={() => swipe("up")}
                disabled={!current}
                className="w-16 h-16 rounded-full flex items-center justify-center transition-transform duration-300 hover:scale-110 disabled:opacity-30"
                style={{ background: GRADIENT, boxShadow: GLOW }}
              >
                <Zap size={26} style={{ color: "#050816" }} />
              </button>
              <button
                onClick={() => swipe("right")}
                disabled={!current}
                className="w-14 h-14 rounded-full flex items-center justify-center transition-transform duration-300 hover:scale-110 disabled:opacity-30"
                style={{ background: "rgba(47,230,255,0.12)", border: "1px solid rgba(47,230,255,0.4)", boxShadow: "0 0 20px rgba(47,230,255,0.15)" }}
              >
                <Heart size={22} style={{ color: "#2FE6FF" }} />
              </button>
            </div>
            <div className="flex items-center gap-9 sm:gap-11 mt-2 text-[11px]" style={{ color: TEXT_MUTED }}>
              <span>Skip</span>
              <span>Apply</span>
              <span>Interested</span>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}