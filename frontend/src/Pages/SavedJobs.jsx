import React, { useState, useMemo, useEffect } from "react";
import axios from "axios";
import Sidebar from "../Components/Sidebar";

import {
  FiSearch,
  FiMapPin,
  FiDollarSign,
  FiBriefcase,
  FiClock,
  FiCalendar,
  FiTrash2,
  FiExternalLink,
  FiStar,
  FiCheckCircle,
  FiBookmark,
  FiInbox,
} from "react-icons/fi";
import { HiOutlineSparkles } from "react-icons/hi2";



const FILTERS = ["All", "Saved", "Applied", "Favourites", "Recently Saved"];

const STATUS_STYLES = {
  Saved: "bg-slate-500/10 text-slate-300 border border-slate-500/20",
  Applied: "bg-emerald-500/10 text-emerald-300 border border-emerald-500/20",
  Favourite: "bg-fuchsia-500/10 text-fuchsia-300 border border-fuchsia-500/20",
};

const StatusBadge = ({ status }) => {
  const Icon =
    status === "Applied" ? FiCheckCircle : status === "Favourite" ? FiStar : FiBookmark;
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium ${STATUS_STYLES[status]}`}
    >
      <Icon className="w-3.5 h-3.5" />
      {status}
    </span>
  );
};

const SkeletonCard = () => (
  <div className="rounded-2xl bg-[#161B2E]/60 border border-slate-700/30 p-6 animate-pulse">
    <div className="flex items-start justify-between mb-5">
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-xl bg-slate-700/40" />
        <div className="space-y-2">
          <div className="h-3 w-28 bg-slate-700/40 rounded" />
          <div className="h-3 w-20 bg-slate-700/30 rounded" />
        </div>
      </div>
      <div className="h-6 w-16 bg-slate-700/30 rounded-full" />
    </div>
    <div className="h-4 w-3/4 bg-slate-700/40 rounded mb-3" />
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
        <FiInbox className="w-9 h-9 text-cyan-300" />
      </div>
    </div>
    <h3 className="text-white text-lg font-semibold mb-2">No saved jobs yet</h3>
    <p className="text-gray-400 max-w-sm text-sm leading-relaxed">
      You haven't saved any jobs yet. Start exploring opportunities and save jobs
      that interest you.
    </p>
  </div>
);

const JobCard = ({ job, onApply, onViewDetails, onRemove }) => (
  <div className="group rounded-2xl bg-[#161B2E]/70 backdrop-blur-xl border border-slate-700/30 p-6 shadow-[0_4px_30px_rgba(0,0,0,0.25)] transition-all duration-300 hover:scale-[1.02] hover:border-cyan-400/20 hover:shadow-[0_8px_40px_rgba(94,162,255,0.12)]">
    <div className="flex items-start justify-between mb-5">
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#7B61FF] via-[#5EA2FF] to-[#2FE6FF] flex items-center justify-center text-sm font-semibold text-white shadow-lg shadow-cyan-500/10">
          {job.logo}
        </div>
        <div>
          <p className="text-white font-medium leading-tight">{job.company}</p>
          <p className="text-gray-400 text-xs mt-1 flex items-center gap-1">
            <FiCalendar className="w-3 h-3" />
            {job.savedDate}
          </p>
        </div>
      </div>
      <StatusBadge status={job.status} />
    </div>

    <h3 className="text-white text-lg font-semibold mb-3 leading-snug">
      {job.title}
    </h3>

    <div className="grid grid-cols-2 gap-y-2 gap-x-3 mb-4 text-xs text-gray-400">
      <span className="flex items-center gap-1.5">
        <FiMapPin className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
        {job.location}
      </span>
      <span className="flex items-center gap-1.5">
        <FiDollarSign className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
        {job.salary}
      </span>
      <span className="flex items-center gap-1.5">
        <FiBriefcase className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
        {job.experience}
      </span>
      <span className="flex items-center gap-1.5">
        <FiClock className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
        {job.type}
      </span>
    </div>

    <p className="text-gray-300 text-sm leading-relaxed mb-4 line-clamp-2">
      {job.description}
    </p>

    <div className="flex flex-wrap gap-2 mb-6">
      {job.skills.map((skill) => (
        <span
          key={skill}
          className="px-3 py-1 rounded-full text-xs font-medium bg-slate-500/10 text-gray-300 border border-slate-500/20"
        >
          {skill}
        </span>
      ))}
    </div>

    <div className="flex items-center gap-3">
      <button
        onClick={() => onApply(job)}
        className="flex-1 py-2.5 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-[#7B61FF] via-[#5EA2FF] to-[#2FE6FF] transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:shadow-cyan-500/20"
      >
        Apply Now
      </button>
      <button
        onClick={() => onViewDetails(job)}
        className="flex-1 py-2.5 rounded-xl text-sm font-medium text-gray-200 bg-white/5 border border-slate-500/20 backdrop-blur-md flex items-center justify-center gap-1.5 transition-all duration-300 hover:scale-[1.02] hover:bg-white/10"
      >
        <FiExternalLink className="w-4 h-4" />
        View Details
      </button>
      <button
        onClick={() => onRemove(job)}
        aria-label="Remove saved job"
        className="p-2.5 rounded-xl text-red-400 border border-red-500/25 bg-red-500/5 transition-all duration-300 hover:scale-[1.05] hover:bg-red-500 hover:text-white hover:border-red-500"
      >
        <FiTrash2 className="w-4 h-4" />
      </button>
    </div>
  </div>
);

export default function SavedJobs() {
 const [jobs, setJobs] = useState([]);
const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");
  
const fetchSavedJobs = async () => {
  try {
    setIsLoading(true);

    const token = localStorage.getItem("token");

if (!token) {
  alert("Please login first.");
  return;
}

const res = await axios.get(
  "http://localhost:8000/saved-jobs/",
  {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
);

    const mappedJobs = res.data.map((job) => ({
      id: job.id,
      job_id: job.job_id,

      company: job.company_name,

      logo: job.company_name.substring(0, 2).toUpperCase(),

      title: job.title,

      location: job.location,

      salary: job.salary,

      experience: job.experience,

      type: job.job_type,

      description: job.description,

      skills: job.skills
        ? job.skills.split(",")
        : [],

      savedDate: "Recently Saved",

      status: "Saved",
    }));

    setJobs(mappedJobs);
  } catch (err) {
    console.log(err);
  } finally {
    setIsLoading(false);
  }
};
useEffect(() => {
    fetchSavedJobs();
}, []);


  const filteredJobs = useMemo(() => {
    let result = jobs;

    if (activeFilter === "Saved") {
      result = result.filter((job) => job.status === "Saved");
    } else if (activeFilter === "Applied") {
      result = result.filter((job) => job.status === "Applied");
    } else if (activeFilter === "Favourites") {
      result = result.filter((job) => job.status === "Favourite");
    } else if (activeFilter === "Recently Saved") {
      result = result.slice(0, 3);
    }

    if (searchTerm.trim()) {
      const q = searchTerm.toLowerCase();
      result = result.filter(
        (job) =>
          job.title.toLowerCase().includes(q) ||
          job.company.toLowerCase().includes(q) ||
          job.skills.some((skill) => skill.toLowerCase().includes(q))
      );
    }
   

    return result;
  }, [jobs, searchTerm, activeFilter]);

  
  const handleApply = async (job) => {
  try {
    const token = localStorage.getItem("token");

    if (!token) {
      alert("Please login first.");
      return;
    }

    await axios.post(
      "http://localhost:8000/applications/apply",
      {
        job_id: job.job_id
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    alert("Application submitted!");

  } catch (err) {
    console.log("Apply error:", err.response?.data || err);

    alert(
      err.response?.data?.detail ||
      "Application failed"
    );
  }
};
  const handleViewDetails = (job) => {
    console.log("View Details clicked for:", job.title);
  };

  const handleRemove = async (job) => {
  try {
    const token = localStorage.getItem("token");

await axios.delete(
  `http://localhost:8000/saved-jobs/${job.id}`,
  {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
);

    fetchSavedJobs();

  } catch (err) {
    console.log(err);
  }
};

return (
  <div className="min-h-screen flex bg-gradient-to-b from-[#0B1020] to-[#111827]">

    <Sidebar activePage="saved-jobs" />

<main className="flex-1 px-6 md:px-10 py-8">

  <div className="max-w-7xl mx-auto">
        <div className="flex items-center gap-2 mb-2">
          <HiOutlineSparkles className="w-5 h-5 text-cyan-400" />
          <h1 className="text-2xl md:text-3xl font-semibold text-white tracking-tight">
            Saved Jobs
          </h1>
        </div>
        <p className="text-gray-400 text-sm md:text-base mb-8">
          Manage and revisit the opportunities you've saved for later.
        </p>

        <div className="flex flex-col lg:flex-row lg:items-center gap-4 mb-8">
          <div className="relative flex-1 max-w-md">
            <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search saved jobs..."
              className="w-full pl-11 pr-4 py-3 rounded-2xl bg-[#161B2E]/70 backdrop-blur-xl border border-slate-700/30 text-sm text-white placeholder-gray-500 outline-none transition-all duration-300 focus:border-cyan-400/40 focus:ring-2 focus:ring-cyan-400/10"
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        ) : filteredJobs.length === 0 ? (
          <EmptyState />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredJobs.map((job) => (
              <JobCard
                key={job.id}
                job={job}
                onApply={handleApply}
                onViewDetails={handleViewDetails}
                onRemove={handleRemove}
              />
            ))}
          </div>
                )}
      </div>

    </main>

  </div>
);

}