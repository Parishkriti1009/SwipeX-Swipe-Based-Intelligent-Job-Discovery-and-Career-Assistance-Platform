import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Search,
  Briefcase,
  CheckCircle,
  Clock,
  XCircle,
  MapPin,
  Users,
  Building2,
  Calendar,
  Eye,
  Check,
  X,
  Pause,
  Play,
  Plus,
} from "lucide-react";

import Sidebar from "../Components/Sidebar";

export default function JobManagement() {
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [typeFilter, setTypeFilter] = useState("All");

  // ---------------------------------------------------------
  // Temporary frontend data
  // Connect to backend later.
  // ---------------------------------------------------------

  const [jobs, setJobs] = useState([
    {
      id: 1,
      title: "Senior Frontend Engineer",
      company: "TechCorp India",
      recruiter: "Rahul Malhotra",
      location: "Bengaluru, India",
      type: "Full Time",
      category: "Engineering",
      applicants: 46,
      posted: "Aug 10, 2026",
      deadline: "Sep 15, 2026",
      status: "Active",
    },
    {
      id: 2,
      title: "Product Manager",
      company: "Innovate Labs",
      recruiter: "Sneha Kapoor",
      location: "Delhi, India",
      type: "Full Time",
      category: "Product",
      applicants: 31,
      posted: "Aug 8, 2026",
      deadline: "Sep 12, 2026",
      status: "Active",
    },
    {
      id: 3,
      title: "Backend Developer",
      company: "StartupHub",
      recruiter: "Arjun Mehta",
      location: "Remote",
      type: "Full Time",
      category: "Engineering",
      applicants: 19,
      posted: "Aug 6, 2026",
      deadline: "Sep 10, 2026",
      status: "Pending Approval",
    },
    {
      id: 4,
      title: "UI/UX Designer",
      company: "DigitalWorks",
      recruiter: "Vikram Singh",
      location: "Mumbai, India",
      type: "Full Time",
      category: "Design",
      applicants: 28,
      posted: "Aug 3, 2026",
      deadline: "Sep 5, 2026",
      status: "Active",
    },
    {
      id: 5,
      title: "Data Analyst",
      company: "FinServ Solutions",
      recruiter: "Priya Sharma",
      location: "Hyderabad, India",
      type: "Full Time",
      category: "Analytics",
      applicants: 54,
      posted: "Jul 28, 2026",
      deadline: "Aug 30, 2026",
      status: "Active",
    },
    {
      id: 6,
      title: "DevOps Engineer",
      company: "CloudNine",
      recruiter: "Neha Agarwal",
      location: "Remote",
      type: "Full Time",
      category: "Engineering",
      applicants: 22,
      posted: "Jul 20, 2026",
      deadline: "Aug 25, 2026",
      status: "Suspended",
    },
    {
      id: 7,
      title: "Marketing Executive",
      company: "FinTech Pro",
      recruiter: "Karan Bhatia",
      location: "Pune, India",
      type: "Full Time",
      category: "Marketing",
      applicants: 37,
      posted: "Jul 12, 2026",
      deadline: "Aug 15, 2026",
      status: "Closed",
    },
  ]);

  // ---------------------------------------------------------
  // Filtering
  // ---------------------------------------------------------

  const filteredJobs = jobs.filter((job) => {
    const searchValue = search.toLowerCase();

    const matchesSearch =
      job.title.toLowerCase().includes(searchValue) ||
      job.company.toLowerCase().includes(searchValue) ||
      job.recruiter.toLowerCase().includes(searchValue) ||
      job.location.toLowerCase().includes(searchValue) ||
      job.category.toLowerCase().includes(searchValue);

    const matchesStatus =
      statusFilter === "All" ||
      job.status === statusFilter;

    const matchesType =
      typeFilter === "All" ||
      job.type === typeFilter;

    return matchesSearch && matchesStatus && matchesType;
  });

  // ---------------------------------------------------------
  // Update job status
  // ---------------------------------------------------------

  const updateStatus = (id, newStatus) => {
    setJobs((currentJobs) =>
      currentJobs.map((job) =>
        job.id === id
          ? {
              ...job,
              status: newStatus,
            }
          : job
      )
    );
  };

  // ---------------------------------------------------------
  // Statistics
  // ---------------------------------------------------------

  const totalJobs = jobs.length;

  const activeJobs = jobs.filter(
    (job) => job.status === "Active"
  ).length;

  const pendingJobs = jobs.filter(
    (job) => job.status === "Pending Approval"
  ).length;

  const closedJobs = jobs.filter(
    (job) => job.status === "Closed"
  ).length;

  // ---------------------------------------------------------
  // Status styling
  // ---------------------------------------------------------

  const statusStyle = (status) => {
    if (status === "Active") {
      return "bg-[#2FE6FF]/10 text-[#2FE6FF] border-[#2FE6FF]/30";
    }

    if (status === "Pending Approval") {
      return "bg-[#7B61FF]/10 text-[#B7C0D8] border-[#7B61FF]/30";
    }

    if (status === "Suspended") {
      return "bg-red-500/10 text-red-300 border-red-500/20";
    }

    return "bg-white/[0.06] text-[#7D8597] border-white/10";
  };

  return (
    <div className="min-h-screen bg-[#050816] text-white relative overflow-x-hidden">

      {/* =====================================================
          BACKGROUND GLOW
      ===================================================== */}

      <div className="pointer-events-none fixed -top-32 -left-32 w-[28rem] h-[28rem] bg-[#7B61FF] opacity-20 blur-[120px] rounded-full" />

      <div className="pointer-events-none fixed top-1/3 -right-32 w-[26rem] h-[26rem] bg-[#2FE6FF] opacity-20 blur-[120px] rounded-full" />

      <div className="pointer-events-none fixed bottom-0 left-1/4 w-[22rem] h-[22rem] bg-[#5EA2FF] opacity-10 blur-[120px] rounded-full" />

      {/* =====================================================
          SIDEBAR
      ===================================================== */}

      <Sidebar activePage="jobs-management" />

      {/* =====================================================
          MAIN CONTENT
      ===================================================== */}

      <div className="relative z-10 lg:ml-[264px]">

        {/* ===================================================
            TOP NAVBAR
        =================================================== */}

        <header className="sticky top-0 z-20 bg-[#050816]/70 backdrop-blur-xl border-b border-white/10 px-4 sm:px-8 py-4">

          <div className="flex items-center justify-between gap-4">

            <div>
              <p className="font-semibold">
                Job Management
              </p>

              <p className="text-xs text-[#B7C0D8] hidden sm:block">
                Manage and moderate job listings
              </p>
            </div>

            <div className="flex items-center gap-3">

              <button
                onClick={() => navigate("/profile")}
                className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-[14px] bg-white/[0.06] border border-white/10 text-sm font-medium hover:bg-white/[0.1] transition-all"
              >
                Profile
              </button>

              <button
                onClick={() => {
                  localStorage.removeItem("token");
                  localStorage.removeItem("user");
                  navigate("/");
                }}
                className="px-4 py-2 rounded-[14px] bg-gradient-to-r from-[#7B61FF] via-[#5EA2FF] to-[#2FE6FF] text-sm font-medium hover:opacity-90 transition-all"
              >
                Logout
              </button>

            </div>

          </div>

        </header>

        {/* ===================================================
            PAGE CONTENT
        =================================================== */}

        <main className="p-4 sm:p-8">

          {/* =================================================
              HEADING
          ================================================= */}

          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">

            <div>

              <h1 className="text-3xl font-bold tracking-tight">
                Job Management
              </h1>

              <p className="text-[#B7C0D8] text-sm mt-1">
                Review, approve and manage all job listings.
              </p>

            </div>

            <button
              className="flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-[#7B61FF] via-[#5EA2FF] to-[#2FE6FF] text-white font-medium hover:opacity-90 active:scale-[0.98] transition-all"
            >
              <Plus size={18} />
              Post New Job
            </button>

          </div>

          {/* =================================================
              STATISTICS
          ================================================= */}

          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 mb-8">

            {/* Total Jobs */}

            <div className="rounded-[22px] bg-white/[0.04] border border-white/10 backdrop-blur-xl p-5">

              <div className="flex items-center justify-between">

                <Briefcase
                  size={22}
                  className="text-[#5EA2FF]"
                />

                <span className="text-xs text-[#B7C0D8]">
                  All listings
                </span>

              </div>

              <p className="text-3xl font-bold mt-4">
                {totalJobs}
              </p>

              <p className="text-sm text-[#B7C0D8]">
                Total Jobs
              </p>

            </div>

            {/* Active Jobs */}

            <div className="rounded-[22px] bg-white/[0.04] border border-white/10 backdrop-blur-xl p-5">

              <div className="flex items-center justify-between">

                <CheckCircle
                  size={22}
                  className="text-[#2FE6FF]"
                />

                <span className="text-xs text-[#B7C0D8]">
                  Currently live
                </span>

              </div>

              <p className="text-3xl font-bold mt-4">
                {activeJobs}
              </p>

              <p className="text-sm text-[#B7C0D8]">
                Active Jobs
              </p>

            </div>

            {/* Pending */}

            <div className="rounded-[22px] bg-white/[0.04] border border-white/10 backdrop-blur-xl p-5">

              <div className="flex items-center justify-between">

                <Clock
                  size={22}
                  className="text-[#7B61FF]"
                />

                <span className="text-xs text-[#B7C0D8]">
                  Need review
                </span>

              </div>

              <p className="text-3xl font-bold mt-4">
                {pendingJobs}
              </p>

              <p className="text-sm text-[#B7C0D8]">
                Pending Approval
              </p>

            </div>

            {/* Closed */}

            <div className="rounded-[22px] bg-white/[0.04] border border-white/10 backdrop-blur-xl p-5">

              <div className="flex items-center justify-between">

                <XCircle
                  size={22}
                  className="text-[#7D8597]"
                />

                <span className="text-xs text-[#B7C0D8]">
                  No longer active
                </span>

              </div>

              <p className="text-3xl font-bold mt-4">
                {closedJobs}
              </p>

              <p className="text-sm text-[#B7C0D8]">
                Closed Jobs
              </p>

            </div>

          </div>

          {/* =================================================
              SEARCH + FILTERS
          ================================================= */}

          <div className="rounded-[22px] bg-white/[0.04] border border-white/10 backdrop-blur-xl p-4 mb-6">

            <div className="flex flex-col lg:flex-row gap-3">

              {/* Search */}

              <div className="relative flex-1">

                <Search
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-[#7D8597]"
                />

                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search jobs, companies, recruiters or locations..."
                  className="w-full bg-white/[0.04] border border-white/10 rounded-xl pl-11 pr-4 py-3 text-sm text-white placeholder:text-[#7D8597] outline-none focus:border-[#5EA2FF]/50"
                />

              </div>

              {/* Status */}

              <select
                value={statusFilter}
                onChange={(e) =>
                  setStatusFilter(e.target.value)
                }
                className="bg-[#11172A] border border-white/10 rounded-xl px-4 py-3 text-sm text-white outline-none"
              >

                <option value="All">
                  All Status
                </option>

                <option value="Active">
                  Active
                </option>

                <option value="Pending Approval">
                  Pending Approval
                </option>

                <option value="Suspended">
                  Suspended
                </option>

                <option value="Closed">
                  Closed
                </option>

              </select>

              {/* Job Type */}

              <select
                value={typeFilter}
                onChange={(e) =>
                  setTypeFilter(e.target.value)
                }
                className="bg-[#11172A] border border-white/10 rounded-xl px-4 py-3 text-sm text-white outline-none"
              >

                <option value="All">
                  All Job Types
                </option>

                <option value="Full Time">
                  Full Time
                </option>

                <option value="Part Time">
                  Part Time
                </option>

                <option value="Internship">
                  Internship
                </option>

                <option value="Contract">
                  Contract
                </option>

              </select>

            </div>

          </div>

          {/* =================================================
              JOB LIST
          ================================================= */}

          <div className="space-y-4">

            {filteredJobs.length === 0 ? (

              <div className="rounded-[22px] bg-white/[0.04] border border-white/10 p-12 text-center">

                <Briefcase
                  size={40}
                  className="mx-auto text-[#7D8597] mb-4"
                />

                <h3 className="text-lg font-semibold">
                  No jobs found
                </h3>

                <p className="text-sm text-[#B7C0D8] mt-1">
                  Try changing your search or filters.
                </p>

              </div>

            ) : (

              filteredJobs.map((job) => (

                <div
                  key={job.id}
                  className="rounded-[22px] bg-white/[0.04] border border-white/10 backdrop-blur-xl p-5 sm:p-6 hover:border-white/20 transition-all"
                >

                  <div className="flex flex-col xl:flex-row xl:items-center gap-5">

                    {/* =================================================
                        JOB INFORMATION
                    ================================================= */}

                    <div className="flex-1">

                      <div className="flex flex-wrap items-center gap-3">

                        <h2 className="text-lg font-semibold">
                          {job.title}
                        </h2>

                        <span
                          className={`text-xs px-2.5 py-1 rounded-full border ${statusStyle(
                            job.status
                          )}`}
                        >
                          {job.status}
                        </span>

                      </div>

                      <div className="flex items-center gap-2 mt-1">

                        <Building2
                          size={14}
                          className="text-[#7D8597]"
                        />

                        <p className="text-sm text-[#B7C0D8]">
                          {job.company}
                        </p>

                      </div>

                      {/* Metadata */}

                      <div className="flex flex-wrap gap-4 mt-4 text-xs text-[#B7C0D8]">

                        <span className="flex items-center gap-1.5">
                          <Users size={14} />
                          {job.recruiter}
                        </span>

                        <span className="flex items-center gap-1.5">
                          <MapPin size={14} />
                          {job.location}
                        </span>

                        <span className="flex items-center gap-1.5">
                          <Briefcase size={14} />
                          {job.type}
                        </span>

                        <span className="flex items-center gap-1.5">
                          <Users size={14} />
                          {job.applicants} applicants
                        </span>

                        <span className="flex items-center gap-1.5">
                          <Calendar size={14} />
                          Posted {job.posted}
                        </span>

                      </div>

                      {/* Category */}

                      <div className="flex flex-wrap gap-2 mt-4">

                        <span className="px-3 py-1 rounded-full text-xs bg-white/[0.05] border border-white/10 text-[#B7C0D8]">
                          {job.category}
                        </span>

                        <span className="px-3 py-1 rounded-full text-xs bg-white/[0.05] border border-white/10 text-[#B7C0D8]">
                          Deadline {job.deadline}
                        </span>

                      </div>

                    </div>

                    {/* =================================================
                        ACTIONS
                    ================================================= */}

                    <div className="flex flex-wrap xl:flex-col gap-2 xl:min-w-[150px]">

                      {/* View */}

                      <button
                        className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-white/[0.06] border border-white/10 text-sm hover:bg-white/[0.1] transition-all"
                      >

                        <Eye size={16} />

                        View Job

                      </button>

                      {/* Pending → Approve */}

                      {job.status === "Pending Approval" && (

                        <button
                          onClick={() =>
                            updateStatus(
                              job.id,
                              "Active"
                            )
                          }
                          className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#2FE6FF]/10 border border-[#2FE6FF]/20 text-[#2FE6FF] text-sm hover:bg-[#2FE6FF]/20 transition-all"
                        >

                          <Check size={16} />

                          Approve

                        </button>

                      )}

                      {/* Active → Suspend */}

                      {job.status === "Active" && (

                        <button
                          onClick={() =>
                            updateStatus(
                              job.id,
                              "Suspended"
                            )
                          }
                          className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-red-500/10 border border-red-500/20 text-red-300 text-sm hover:bg-red-500/20 transition-all"
                        >

                          <Pause size={16} />

                          Suspend

                        </button>

                      )}

                      {/* Suspended → Activate */}

                      {job.status === "Suspended" && (

                        <button
                          onClick={() =>
                            updateStatus(
                              job.id,
                              "Active"
                            )
                          }
                          className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#2FE6FF]/10 border border-[#2FE6FF]/20 text-[#2FE6FF] text-sm hover:bg-[#2FE6FF]/20 transition-all"
                        >

                          <Play size={16} />

                          Activate

                        </button>

                      )}

                      {/* Reject pending */}

                      {job.status === "Pending Approval" && (

                        <button
                          onClick={() =>
                            updateStatus(
                              job.id,
                              "Closed"
                            )
                          }
                          className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-red-500/10 border border-red-500/20 text-red-300 text-sm hover:bg-red-500/20 transition-all"
                        >

                          <X size={16} />

                          Reject

                        </button>

                      )}

                    </div>

                  </div>

                </div>

              ))

            )}

          </div>

        </main>

      </div>

    </div>
  );
}