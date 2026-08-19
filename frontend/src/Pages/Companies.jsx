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
  FiGlobe,
  FiTrendingUp,
  FiHome,
} from "react-icons/fi";
import { HiOutlineBuildingOffice2, HiOutlineSparkles } from "react-icons/hi2";

const DUMMY_COMPANIES = [
  {
    id: 1,
    name: "Nova Analytics",
    logo: "NA",
    industry: "Data & Analytics",
    hq: "Bengaluru, India",
    type: "MNC",
    size: "5000+ Employees",
    rating: 4.8,
    openPositions: 34,
    description:
      "A global leader in enterprise analytics, helping Fortune 500 companies turn raw data into decisions at scale.",
    tags: ["React", "Python", "Cloud", "AI"],
  },
  {
    id: 2,
    name: "Orbit Health",
    logo: "OH",
    industry: "HealthTech",
    hq: "Remote-first",
    type: "Startup",
    size: "50-200 Employees",
    rating: 4.6,
    openPositions: 12,
    description:
      "Building patient-first digital health tools that connect clinicians and care teams in real time.",
    tags: ["Figma", "React Native", "HealthTech"],
  },
  {
    id: 3,
    name: "Fluxcore Labs",
    logo: "FL",
    industry: "Cloud Infrastructure",
    hq: "Pune, India",
    type: "Startup",
    size: "200-500 Employees",
    rating: 4.7,
    openPositions: 21,
    description:
      "Engineering distributed systems that power real-time event processing for high-growth SaaS companies.",
    tags: ["Node.js", "Kubernetes", "Cloud"],
  },
  {
    id: 4,
    name: "Skyline Ventures",
    logo: "SV",
    industry: "FinTech",
    hq: "Mumbai, India",
    type: "MNC",
    size: "10000+ Employees",
    rating: 4.5,
    openPositions: 48,
    description:
      "A trusted financial services group driving digital-first banking and investment products across Asia.",
    tags: ["FinTech", "Java", "Security"],
  },
  {
    id: 5,
    name: "Pixel Forge Studio",
    logo: "PF",
    industry: "Design & Creative Tech",
    hq: "Remote-first",
    type: "Startup",
    size: "10-50 Employees",
    rating: 4.9,
    openPositions: 6,
    description:
      "A boutique product studio crafting delightful interfaces and design systems for ambitious startups.",
    tags: ["Figma", "Framer", "Design Systems"],
  },
  {
    id: 6,
    name: "Quantum Edge AI",
    logo: "QE",
    industry: "Artificial Intelligence",
    hq: "Hyderabad, India",
    type: "Startup",
    size: "200-500 Employees",
    rating: 4.8,
    openPositions: 27,
    description:
      "Deploying production-grade machine learning systems that personalize experiences for millions of users.",
    tags: ["Python", "PyTorch", "AI"],
  },
  {
    id: 7,
    name: "Cedarline Finance",
    logo: "CF",
    industry: "Financial Services",
    hq: "Gurugram, India",
    type: "MNC",
    size: "5000+ Employees",
    rating: 4.3,
    openPositions: 19,
    description:
      "A century-old financial institution modernizing its stack to serve a new generation of digital customers.",
    tags: ["SQL", "Power BI", "FinTech"],
  },
  {
    id: 8,
    name: "Vertex Robotics",
    logo: "VR",
    industry: "Robotics & Automation",
    hq: "Chennai, India",
    type: "Startup",
    size: "50-200 Employees",
    rating: 4.6,
    openPositions: 15,
    description:
      "Designing autonomous robotics systems for warehousing and logistics automation across Southeast Asia.",
    tags: ["C++", "ROS", "Cloud"],
  },
  {
    id: 9,
    name: "Northwind Systems",
    logo: "NS",
    industry: "Cybersecurity",
    hq: "Berlin, Germany",
    type: "MNC",
    size: "10000+ Employees",
    rating: 4.4,
    openPositions: 41,
    description:
      "Protecting critical infrastructure for enterprises worldwide with next-generation threat detection tools.",
    tags: ["Cybersecurity", "Go", "Cloud"],
  },
  {
    id: 10,
    name: "Lumen Retail Co.",
    logo: "LR",
    industry: "E-Commerce",
    hq: "Singapore",
    type: "MNC",
    size: "5000+ Employees",
    rating: 4.2,
    openPositions: 30,
    description:
      "Powering seamless omnichannel shopping experiences for millions of customers across Southeast Asia.",
    tags: ["React", "Node.js", "E-Commerce"],
  },
  {
    id: 11,
    name: "Driftwood Labs",
    logo: "DL",
    industry: "Developer Tools",
    hq: "Remote-first",
    type: "Startup",
    size: "10-50 Employees",
    rating: 4.9,
    openPositions: 8,
    description:
      "Building the next generation of developer productivity tools trusted by fast-moving engineering teams.",
    tags: ["TypeScript", "GraphQL", "Cloud"],
  },
  {
    id: 12,
    name: "Meridian Energy",
    logo: "ME",
    industry: "Clean Energy",
    hq: "Amsterdam, Netherlands",
    type: "MNC",
    size: "5000+ Employees",
    rating: 4.5,
    openPositions: 23,
    description:
      "Accelerating the transition to renewable energy through smart grid software and data-driven insights.",
    tags: ["Python", "IoT", "Cloud"],
  },
];

const FILTERS = [
  "All Companies",
  "MNCs",
  "Startups",
  "Remote Friendly",
  "Actively Hiring",
  "Top Rated",
];

const STATS = [
  {
    label: "Companies Registered",
    value: "1,240+",
    icon: HiOutlineBuildingOffice2,
  },
  {
    label: "Open Positions",
    value: "8,530+",
    icon: FiBriefcase,
  },
  {
    label: "Hiring Startups",
    value: "410+",
    icon: FiTrendingUp,
  },
  {
    label: "Global Offices",
    value: "96",
    icon: FiGlobe,
  },
];

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

const TypeBadge = ({ type }) => (
  <span
    className={`px-3 py-1 rounded-full text-[11px] font-medium border ${
      type === "MNC"
        ? "bg-indigo-500/10 text-indigo-300 border-indigo-500/20"
        : "bg-cyan-500/10 text-cyan-300 border-cyan-500/20"
    }`}
  >
    {type}
  </span>
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
      <div className="h-6 w-14 bg-slate-700/30 rounded-full" />
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
        <HiOutlineBuildingOffice2 className="w-9 h-9 text-cyan-300" />
      </div>
    </div>
    <h3 className="text-white text-lg font-semibold mb-2">No companies found</h3>
    <p className="text-gray-400 max-w-sm text-sm leading-relaxed">
      No companies found. Try adjusting your search or filters.
    </p>
  </div>
);

const CompanyCard = ({ company, isFollowed, onViewJobs, onViewCompany, onFollow }) => (
  <div className="group rounded-2xl bg-[#161B2E]/70 backdrop-blur-xl border border-slate-700/30 p-6 shadow-[0_4px_30px_rgba(0,0,0,0.25)] transition-all duration-300 hover:scale-[1.02] hover:border-cyan-400/30 hover:shadow-[0_8px_40px_rgba(94,162,255,0.15)]">
    <div className="flex items-start justify-between mb-4">
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#7B61FF] via-[#5EA2FF] to-[#2FE6FF] flex items-center justify-center text-sm font-semibold text-white shadow-lg shadow-cyan-500/10 shrink-0">
          {company.logo}
        </div>
        <div>
          <p className="text-white font-medium leading-tight">{company.name}</p>
          <p className="text-gray-400 text-xs mt-1">{company.industry}</p>
        </div>
      </div>
      <TypeBadge type={company.type} />
    </div>

    <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 mb-4 text-xs text-gray-400">
      <span className="flex items-center gap-1.5">
        <FiMapPin className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
        {company.hq}
      </span>
      <span className="flex items-center gap-1.5">
        <FiUsers className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
        {company.size}
      </span>
      <span className="flex items-center gap-1.5">
        <FiStar className="w-3.5 h-3.5 text-amber-400 shrink-0" />
        {company.rating.toFixed(1)}
      </span>
      <span className="flex items-center gap-1.5">
        <FiBriefcase className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
        {company.openPositions} open roles
      </span>
    </div>

    <p className="text-gray-300 text-sm leading-relaxed mb-4 line-clamp-2">
      {company.description}
    </p>

    <div className="flex flex-wrap gap-2 mb-6">
      {company.tags.map((tag) => (
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
        onClick={() => onViewJobs(company)}
        className="flex-1 py-2.5 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-[#7B61FF] via-[#5EA2FF] to-[#2FE6FF] transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:shadow-cyan-500/20"
      >
        View Jobs
      </button>
      <button
        onClick={() => onViewCompany(company)}
        className="flex-1 py-2.5 rounded-xl text-sm font-medium text-gray-200 bg-white/5 border border-slate-500/20 backdrop-blur-md flex items-center justify-center gap-1.5 transition-all duration-300 hover:scale-[1.02] hover:bg-white/10"
      >
        <FiExternalLink className="w-4 h-4" />
        View Company
      </button>
      <button
        onClick={() => onFollow(company)}
        aria-label={isFollowed ? "Following company" : "Follow company"}
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

export default function Companies() {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeFilter, setActiveFilter] = useState("All Companies");
  const [followedIds, setFollowedIds] = useState([]);
  const [isLoading] = useState(false);

  const filteredCompanies = useMemo(() => {
    let result = DUMMY_COMPANIES;

    if (activeFilter === "MNCs") {
      result = result.filter((c) => c.type === "MNC");
    } else if (activeFilter === "Startups") {
      result = result.filter((c) => c.type === "Startup");
    } else if (activeFilter === "Remote Friendly") {
      result = result.filter((c) => c.hq.toLowerCase().includes("remote"));
    } else if (activeFilter === "Actively Hiring") {
      result = result.filter((c) => c.openPositions >= 20);
    } else if (activeFilter === "Top Rated") {
      result = result.filter((c) => c.rating >= 4.7);
    }

    if (searchTerm.trim()) {
      const q = searchTerm.toLowerCase();
      result = result.filter(
        (c) =>
          c.name.toLowerCase().includes(q) ||
          c.industry.toLowerCase().includes(q) ||
          c.tags.some((tag) => tag.toLowerCase().includes(q))
      );
    }

    return result;
  }, [searchTerm, activeFilter]);

  const handleViewJobs = (company) => {
    console.log("View Jobs clicked for:", company.name);
  };

  const handleViewCompany = (company) => {
    console.log("View Company clicked for:", company.name);
  };

  const handleFollow = (company) => {
    setFollowedIds((prev) =>
      prev.includes(company.id)
        ? prev.filter((id) => id !== company.id)
        : [...prev, company.id]
    );
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-[#0B1020] to-[#111827] px-6 md:px-10 py-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center gap-2 mb-2">
          <HiOutlineSparkles className="w-5 h-5 text-cyan-400" />
          <h1 className="text-2xl md:text-3xl font-semibold text-white tracking-tight">
            Companies
          </h1>
        </div>
        <p className="text-gray-400 text-sm md:text-base mb-8">
          Discover leading companies and innovative startups hiring through SwipeX.
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
              placeholder="Search companies by name, industry or technology..."
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
        ) : filteredCompanies.length === 0 ? (
          <EmptyState />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCompanies.map((company) => (
              <CompanyCard
                key={company.id}
                company={company}
                isFollowed={followedIds.includes(company.id)}
                onViewJobs={handleViewJobs}
                onViewCompany={handleViewCompany}
                onFollow={handleFollow}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}