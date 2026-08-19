import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import {
  FiSearch,
  FiMapPin,
  FiUsers,
  FiStar,
  FiBriefcase,
  FiBookmark,
  FiExternalLink,
  FiTrendingUp,
  FiDollarSign,
  FiCalendar,
  FiZap,
} from "react-icons/fi";
import { HiOutlineRocketLaunch, HiOutlineSparkles } from "react-icons/hi2";

const DUMMY_STARTUPS = [
  {
    id: 1,
    name: "Orbit Health",
    logo: "OH",
    industry: "HealthTech",
    hq: "Remote-first",
    stage: "Series A",
    size: "50-200 Employees",
    founded: 2021,
    rating: 4.6,
    openPositions: 12,
    description:
      "Building patient-first digital health tools that connect clinicians and care teams in real time.",
    tags: ["React Native", "HealthTech", "Cloud"],
    highlights: ["Hiring Now", "Remote"],
  },
  {
    id: 2,
    name: "Fluxcore Labs",
    logo: "FL",
    industry: "Cloud Infrastructure",
    hq: "Pune, India",
    stage: "Series B",
    size: "200-500 Employees",
    founded: 2019,
    rating: 4.7,
    openPositions: 21,
    description:
      "Engineering distributed systems that power real-time event processing for high-growth SaaS companies.",
    tags: ["Node.js", "Kubernetes", "Cloud"],
    highlights: ["Top Startup", "Hiring Now"],
  },
  {
    id: 3,
    name: "Pixel Forge Studio",
    logo: "PF",
    industry: "Design & Creative Tech",
    hq: "Remote-first",
    stage: "Seed",
    size: "10-50 Employees",
    founded: 2023,
    rating: 4.9,
    openPositions: 6,
    description:
      "A boutique product studio crafting delightful interfaces and design systems for ambitious startups.",
    tags: ["Figma", "Framer", "Design Systems"],
    highlights: ["Featured", "Remote"],
  },
  {
    id: 4,
    name: "Quantum Edge AI",
    logo: "QE",
    industry: "AI & ML",
    hq: "Hyderabad, India",
    stage: "Series A",
    size: "200-500 Employees",
    founded: 2020,
    rating: 4.8,
    openPositions: 27,
    description:
      "Deploying production-grade machine learning systems that personalize experiences for millions of users.",
    tags: ["Python", "PyTorch", "AI"],
    highlights: ["High Growth", "Hiring Now"],
  },
  {
    id: 5,
    name: "Vertex Robotics",
    logo: "VR",
    industry: "Robotics & Automation",
    hq: "Chennai, India",
    stage: "Series A",
    size: "50-200 Employees",
    founded: 2020,
    rating: 4.6,
    openPositions: 15,
    description:
      "Designing autonomous robotics systems for warehousing and logistics automation across Southeast Asia.",
    tags: ["C++", "ROS", "Cloud"],
    highlights: ["High Growth"],
  },
  {
    id: 6,
    name: "Driftwood Labs",
    logo: "DL",
    industry: "SaaS",
    hq: "Remote-first",
    stage: "Seed",
    size: "10-50 Employees",
    founded: 2023,
    rating: 4.9,
    openPositions: 8,
    description:
      "Building the next generation of developer productivity tools trusted by fast-moving engineering teams.",
    tags: ["TypeScript", "GraphQL", "Cloud"],
    highlights: ["Featured", "Remote"],
  },
  {
    id: 7,
    name: "Ledgerly",
    logo: "LG",
    industry: "FinTech",
    hq: "Bengaluru, India",
    stage: "Series B",
    size: "200-500 Employees",
    founded: 2018,
    rating: 4.5,
    openPositions: 19,
    description:
      "A modern accounting and compliance platform helping startups manage finances without the spreadsheets.",
    tags: ["FinTech", "Java", "Security"],
    highlights: ["Top Startup", "Hiring Now"],
  },
  {
    id: 8,
    name: "Learnloop",
    logo: "LL",
    industry: "EdTech",
    hq: "Delhi, India",
    stage: "Series A",
    size: "50-200 Employees",
    founded: 2021,
    rating: 4.4,
    openPositions: 11,
    description:
      "An adaptive learning platform that personalizes K-12 curriculum using real-time performance data.",
    tags: ["React", "Node.js", "EdTech"],
    highlights: ["High Growth"],
  },
  {
    id: 9,
    name: "Cipherwave",
    logo: "CW",
    industry: "Cybersecurity",
    hq: "Remote-first",
    stage: "Seed",
    size: "10-50 Employees",
    founded: 2024,
    rating: 4.7,
    openPositions: 5,
    description:
      "Zero-trust security tooling built for lean engineering teams shipping fast without cutting corners.",
    tags: ["Go", "Cybersecurity", "Cloud"],
    highlights: ["Featured", "Remote"],
  },
  {
    id: 10,
    name: "Farmstack",
    logo: "FS",
    industry: "AgriTech",
    hq: "Ahmedabad, India",
    stage: "Series A",
    size: "50-200 Employees",
    founded: 2020,
    rating: 4.3,
    openPositions: 9,
    description:
      "Connecting smallholder farmers directly to markets through a mobile-first supply chain platform.",
    tags: ["Flutter", "Python", "Cloud"],
    highlights: ["High Growth"],
  },
  {
    id: 11,
    name: "Nimbus Finance",
    logo: "NF",
    industry: "FinTech",
    hq: "Singapore",
    stage: "Series B",
    size: "200-500 Employees",
    founded: 2017,
    rating: 4.6,
    openPositions: 24,
    description:
      "A neobank infrastructure provider powering digital wallets and payments for emerging markets.",
    tags: ["FinTech", "AI", "Cloud"],
    highlights: ["Top Startup", "Hiring Now"],
  },
  {
    id: 12,
    name: "Wellbound",
    logo: "WB",
    industry: "HealthTech",
    hq: "Remote-first",
    stage: "Seed",
    size: "10-50 Employees",
    founded: 2023,
    rating: 4.8,
    openPositions: 7,
    description:
      "A mental wellness platform pairing users with licensed therapists through async and live sessions.",
    tags: ["React", "Node.js", "HealthTech"],
    highlights: ["Featured", "Remote"],
  },
  {
    id: 13,
    name: "Skillbridge AI",
    logo: "SA",
    industry: "AI & ML",
    hq: "Bengaluru, India",
    stage: "Series A",
    size: "50-200 Employees",
    founded: 2021,
    rating: 4.7,
    openPositions: 16,
    description:
      "An AI-driven upskilling platform that builds personalized learning paths for enterprise teams.",
    tags: ["Python", "AI", "SaaS"],
    highlights: ["High Growth", "Hiring Now"],
  },
];

const FILTERS = [
  "All Startups",
  "FinTech",
  "EdTech",
  "HealthTech",
  "AI & ML",
  "SaaS",
  "Remote Friendly",
  "Actively Hiring",
  "Seed Stage",
  "Series A",
  "Series B+",
];

const STATS = [
  { label: "Active Startups", value: "620+", icon: HiOutlineRocketLaunch },
  { label: "Open Positions", value: "4,180+", icon: FiBriefcase },
  { label: "Remote Opportunities", value: "1,950+", icon: FiUsers },
  { label: "Funding Raised", value: "$2.4B+", icon: FiDollarSign },
];

const HIGHLIGHT_STYLES = {
  "High Growth": "bg-emerald-500/10 text-emerald-300 border-emerald-500/20",
  "Hiring Now": "bg-cyan-500/10 text-cyan-300 border-cyan-500/20",
  Remote: "bg-slate-500/10 text-gray-300 border-slate-500/20",
  "Top Startup": "bg-fuchsia-500/10 text-fuchsia-300 border-fuchsia-500/20",
  Featured: "bg-amber-500/10 text-amber-300 border-amber-500/20",
};

const HighlightBadge = ({ label }) => (
  <span
    className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-semibold border ${HIGHLIGHT_STYLES[label]}`}
  >
    <FiZap className="w-2.5 h-2.5" />
    {label}
  </span>
);

const StageBadge = ({ stage }) => (
  <span className="px-3 py-1 rounded-full text-[11px] font-medium bg-indigo-500/10 text-indigo-300 border border-indigo-500/20">
    {stage}
  </span>
);

const StatCard = ({ label, value, icon: Icon }) => (
  <div className="rounded-2xl bg-[#161B2E]/70 backdrop-blur-xl border border-slate-700/30 p-5 flex items-center gap-4 transition-all duration-300 hover:scale-[1.02] hover:border-cyan-400/20">
    <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#7B61FF]/20 via-[#5EA2FF]/20 to-[#2FE6FF]/20 border border-slate-600/30 flex items-center justify-center shrink-0">
      <Icon className="w-5 h-5 text-cyan-300" />
    </div>
    <div>
      <p className="text-white text-xl font-semibold leading-tight">{value}</p>
      <p className="text-gray-400 text-xs mt-0.5">{label}</p>
    </div>
  </div>
);

const SkeletonCard = () => (
  <div className="rounded-2xl bg-[#161B2E]/60 border border-slate-700/30 p-6 animate-pulse">
    <div className="flex items-start justify-between mb-5">
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-full bg-slate-700/40" />
        <div className="space-y-2">
          <div className="h-3 w-28 bg-slate-700/40 rounded" />
          <div className="h-3 w-20 bg-slate-700/30 rounded" />
        </div>
      </div>
      <div className="h-6 w-16 bg-slate-700/30 rounded-full" />
    </div>
    <div className="h-3 w-full bg-slate-700/30 rounded mb-2" />
    <div className="h-3 w-5/6 bg-slate-700/30 rounded mb-5" />
    <div className="flex gap-2 mb-6">
      <div className="h-6 w-16 bg-slate-700/30 rounded-full" />
      <div className="h-6 w-16 bg-slate-700/30 rounded-full" />
      <div className="h-6 w-16 bg-slate-700/30 rounded-full" />
    </div>
    <div className="flex gap-3">
      <div className="h-10 flex-1 bg-slate-700/40 rounded-xl" />
      <div className="h-10 flex-1 bg-slate-700/30 rounded-xl" />
      <div className="h-10 w-10 bg-slate-700/30 rounded-xl" />
    </div>
  </div>
);

const EmptyState = () => (
  <div className="flex flex-col items-center justify-center text-center py-24 px-6 rounded-3xl border border-slate-700/30 bg-[#161B2E]/40 backdrop-blur-xl">
    <div className="relative mb-6">
      <div className="absolute inset-0 rounded-full blur-2xl opacity-30 bg-gradient-to-br from-[#7B61FF] via-[#5EA2FF] to-[#2FE6FF]" />
      <div className="relative w-20 h-20 rounded-3xl bg-gradient-to-br from-[#7B61FF]/20 via-[#5EA2FF]/20 to-[#2FE6FF]/20 border border-slate-600/30 flex items-center justify-center">
        <HiOutlineRocketLaunch className="w-9 h-9 text-cyan-300" />
      </div>
    </div>
    <h3 className="text-white text-lg font-semibold mb-2">No startups found</h3>
    <p className="text-gray-400 max-w-sm text-sm leading-relaxed">
      No startups found. Try adjusting your search or filters.
    </p>
  </div>
);

const StartupCard = ({ startup, isFollowed, onExploreJobs, onViewStartup, onFollow }) => (
  <div className="group rounded-2xl bg-[#161B2E]/70 backdrop-blur-xl border border-slate-700/30 p-6 shadow-[0_4px_30px_rgba(0,0,0,0.25)] transition-all duration-300 hover:scale-[1.02] hover:border-cyan-400/30 hover:shadow-[0_8px_40px_rgba(94,162,255,0.15)]">
    <div className="flex items-start justify-between mb-4">
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#7B61FF] via-[#5EA2FF] to-[#2FE6FF] flex items-center justify-center text-sm font-semibold text-white shadow-lg shadow-cyan-500/10 shrink-0">
          {startup.logo}
        </div>
        <div>
          <p className="text-white font-medium leading-tight">{startup.name}</p>
          <p className="text-gray-400 text-xs mt-1">{startup.industry}</p>
        </div>
      </div>
      <StageBadge stage={startup.stage} />
    </div>

    <div className="flex flex-wrap gap-1.5 mb-4">
      {startup.highlights.map((h) => (
        <HighlightBadge key={h} label={h} />
      ))}
    </div>

    <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 mb-4 text-xs text-gray-400">
      <span className="flex items-center gap-1.5">
        <FiMapPin className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
        {startup.hq}
      </span>
      <span className="flex items-center gap-1.5">
        <FiUsers className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
        {startup.size}
      </span>
      <span className="flex items-center gap-1.5">
        <FiCalendar className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
        Founded {startup.founded}
      </span>
      <span className="flex items-center gap-1.5">
        <FiStar className="w-3.5 h-3.5 text-amber-400 shrink-0" />
        {startup.rating.toFixed(1)}
      </span>
      <span className="flex items-center gap-1.5">
        <FiBriefcase className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
        {startup.openPositions} open roles
      </span>
    </div>

    <p className="text-gray-300 text-sm leading-relaxed mb-4 line-clamp-2">
      {startup.description}
    </p>

    <div className="flex flex-wrap gap-2 mb-6">
      {startup.tags.map((tag) => (
        <span
          key={tag}
          className="px-3 py-1 rounded-full text-xs font-medium bg-slate-500/10 text-gray-300 border border-slate-500/20"
        >
          {tag}
        </span>
      ))}
    </div>

    <div className="flex items-center gap-3">
      <button
        onClick={() => onExploreJobs(startup)}
        className="flex-1 py-2.5 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-[#7B61FF] via-[#5EA2FF] to-[#2FE6FF] transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:shadow-cyan-500/20"
      >
        Explore Jobs
      </button>
      <button
        onClick={() => onViewStartup(startup)}
        className="flex-1 py-2.5 rounded-xl text-sm font-medium text-gray-200 bg-white/5 border border-slate-500/20 backdrop-blur-md flex items-center justify-center gap-1.5 transition-all duration-300 hover:scale-[1.02] hover:bg-white/10"
      >
        <FiExternalLink className="w-4 h-4" />
        View Startup
      </button>
      <button
        onClick={() => onFollow(startup)}
        aria-label={isFollowed ? "Following startup" : "Follow startup"}
        className={`p-2.5 rounded-xl border transition-all duration-300 hover:scale-[1.05] ${
          isFollowed
            ? "bg-gradient-to-r from-[#7B61FF] via-[#5EA2FF] to-[#2FE6FF] text-white border-transparent"
            : "bg-white/5 text-gray-300 border-slate-500/20 hover:bg-gradient-to-r hover:from-[#7B61FF] hover:via-[#5EA2FF] hover:to-[#2FE6FF] hover:text-white hover:border-transparent"
        }`}
      >
        <FiBookmark className={`w-4 h-4 ${isFollowed ? "fill-current" : ""}`} />
      </button>
    </div>
  </div>
);

export default function Startups() {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeFilter, setActiveFilter] = useState("All Startups");
  const [followedIds, setFollowedIds] = useState([]);
  const [isLoading] = useState(false);

  const filteredStartups = useMemo(() => {
    let result = DUMMY_STARTUPS;

    if (activeFilter === "FinTech") {
      result = result.filter((s) => s.industry === "FinTech");
    } else if (activeFilter === "EdTech") {
      result = result.filter((s) => s.industry === "EdTech");
    } else if (activeFilter === "HealthTech") {
      result = result.filter((s) => s.industry === "HealthTech");
    } else if (activeFilter === "AI & ML") {
      result = result.filter((s) => s.industry === "AI & ML");
    } else if (activeFilter === "SaaS") {
      result = result.filter((s) => s.industry === "SaaS");
    } else if (activeFilter === "Remote Friendly") {
      result = result.filter((s) => s.hq.toLowerCase().includes("remote"));
    } else if (activeFilter === "Actively Hiring") {
      result = result.filter((s) => s.highlights.includes("Hiring Now"));
    } else if (activeFilter === "Seed Stage") {
      result = result.filter((s) => s.stage === "Seed");
    } else if (activeFilter === "Series A") {
      result = result.filter((s) => s.stage === "Series A");
    } else if (activeFilter === "Series B+") {
      result = result.filter((s) => s.stage === "Series B" || s.stage === "Series C");
    }

    if (searchTerm.trim()) {
      const q = searchTerm.toLowerCase();
      result = result.filter(
        (s) =>
          s.name.toLowerCase().includes(q) ||
          s.industry.toLowerCase().includes(q) ||
          s.tags.some((tag) => tag.toLowerCase().includes(q))
      );
    }

    return result;
  }, [searchTerm, activeFilter]);

  const handleExploreJobs = (startup) => {
    console.log("Explore Jobs clicked for:", startup.name);
  };

  const handleViewStartup = (startup) => {
    console.log("View Startup clicked for:", startup.name);
  };

  const handleFollow = (startup) => {
    setFollowedIds((prev) =>
      prev.includes(startup.id)
        ? prev.filter((id) => id !== startup.id)
        : [...prev, startup.id]
    );
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-[#0B1020] to-[#111827] px-6 md:px-10 py-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center gap-2 mb-2">
          <HiOutlineSparkles className="w-5 h-5 text-cyan-400" />
          <h1 className="text-2xl md:text-3xl font-semibold text-white tracking-tight">
            Startups
          </h1>
        </div>
        <p className="text-gray-400 text-sm md:text-base mb-8">
          Discover fast-growing startups and exciting career opportunities in the
          startup ecosystem.
        </p>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {STATS.map((stat) => (
            <StatCard key={stat.label} {...stat} />
          ))}
        </div>

        <div className="flex flex-col lg:flex-row lg:items-center gap-4 mb-8">
          <div className="relative flex-1 max-w-xl">
            <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search startups by name, industry or technology..."
              className="w-full pl-11 pr-4 py-3.5 rounded-2xl bg-[#161B2E]/70 backdrop-blur-xl border border-slate-700/30 text-sm text-white placeholder-gray-500 outline-none transition-all duration-300 focus:border-cyan-400/40 focus:ring-2 focus:ring-cyan-400/10"
            />
          </div>

          <div className="flex flex-wrap gap-2">
            {FILTERS.map((filter) => {
              const isActive = activeFilter === filter;
              return (
                <button
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  className={`px-4 py-2 rounded-full text-xs md:text-sm font-medium border transition-all duration-300 hover:scale-[1.02] ${
                    isActive
                      ? "bg-gradient-to-r from-[#7B61FF] via-[#5EA2FF] to-[#2FE6FF] text-white border-transparent shadow-md shadow-cyan-500/10"
                      : "bg-white/5 text-gray-300 border-slate-600/30 hover:bg-white/10"
                  }`}
                >
                  {filter}
                </button>
              );
            })}
          </div>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 9 }).map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        ) : filteredStartups.length === 0 ? (
          <EmptyState />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredStartups.map((startup) => (
              <StartupCard
                key={startup.id}
                startup={startup}
                isFollowed={followedIds.includes(startup.id)}
                onExploreJobs={handleExploreJobs}
                onViewStartup={handleViewStartup}
                onFollow={handleFollow}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}