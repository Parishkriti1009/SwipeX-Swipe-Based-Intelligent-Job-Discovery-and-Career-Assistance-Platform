import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Search,
  Plus,
  MapPin,
  Users,
  Calendar,
  Edit3,
  Pause,
  Play,
  Eye,
  Briefcase,
} from "lucide-react";

import Sidebar from "../Components/Sidebar";

export default function PostedJobs() {
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [sidebarOpen, setSidebarOpen] = useState(false);

    // ---------------------------------------------------------
  // Post Job Modal + Backend Data
  // ---------------------------------------------------------
  const [showPostModal, setShowPostModal] = useState(false);
  const [companies, setCompanies] = useState([]);
  const [loadingCompanies, setLoadingCompanies] = useState(false);
  const [postingJob, setPostingJob] = useState(false);
  const [postError, setPostError] = useState("");
  const [postSuccess, setPostSuccess] = useState("");

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    location: "",
    salary: "",
    experience: "",
    job_type: "Full Time",
    skills: "",
    company_id: "",
    work_mode: "On-site",
  });

  // ---------------------------------------------------------
  // Temporary frontend data
  // We will connect this to your backend later.
  // ---------------------------------------------------------
 const [jobs, setJobs] = useState([]);
const [loadingJobs, setLoadingJobs] = useState(true);
const [jobsError, setJobsError] = useState("");

    // ---------------------------------------------------------
  // Load companies for Post Job dropdown
  // ---------------------------------------------------------
  const loadCompanies = async () => {
    try {
      setLoadingCompanies(true);

      const token = localStorage.getItem("token");

      const response = await fetch("https://swipex-backend-pwin.onrender.com/jobs/companies", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to load companies");
      }

      const data = await response.json();
      setCompanies(data);
    } catch (error) {
      console.error("Error loading companies:", error);
      setPostError("Unable to load companies.");
    } finally {
      setLoadingCompanies(false);
    }
  };

    // ---------------------------------------------------------
  // Handle Post Job
  // ---------------------------------------------------------
  const handlePostJob = async (e) => {
    e.preventDefault();

    setPostingJob(true);
    setPostError("");
    setPostSuccess("");

    try {
      const token = localStorage.getItem("token");

      if (!token) {
        throw new Error("You are not logged in.");
      }

      if (!formData.company_id) {
        throw new Error("Please select a company.");
      }

      const response = await fetch("https://swipex-backend-pwin.onrender.com/jobs/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          title: formData.title,
          description: formData.description,
          location: formData.location,
          salary: formData.salary,
          experience: formData.experience,
          job_type: formData.job_type,
          skills: formData.skills,
          company_id: Number(formData.company_id),
          work_mode: formData.work_mode,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.detail || "Failed to post job.");
      }

      // Convert backend job into the format used by your existing UI
      const newJob = {
        id: data.id,
        title: data.title,
        department: data.company?.industry || "General",
        location: data.location,
        type: data.job_type,
        applicants: 0,
        posted: data.posted_date
          ? new Date(data.posted_date).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
            })
          : new Date().toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
            }),
        deadline: "Not specified",
        status: "Active",
        skills: data.skills
          ? data.skills.split(",").map((skill) => skill.trim())
          : [],
      };

      await loadJobs();

      setPostSuccess("Job posted successfully!");

      // Reset form
      setFormData({
        title: "",
        description: "",
        location: "",
        salary: "",
        experience: "",
        job_type: "Full Time",
        skills: "",
        company_id: "",
        work_mode: "On-site",
      });

      // Close modal after successful submission
      setTimeout(() => {
        setShowPostModal(false);
        setPostSuccess("");
      }, 1000);
    } catch (error) {
      console.error("Error posting job:", error);
      setPostError(error.message || "Something went wrong.");
    } finally {
      setPostingJob(false);
    }
  };

    // ---------------------------------------------------------
  // Handle Post Job Form Changes
  // ---------------------------------------------------------
  const handleFormChange = (e) => {
    const { name, value } = e.target;

    setFormData((current) => ({
      ...current,
      [name]: value,
    }));
  };

    // ---------------------------------------------------------
  // Load companies when page opens
  // ---------------------------------------------------------
  useEffect(() => {
  loadCompanies();
  loadJobs();
}, []);

  // ---------------------------------------------------------
// Load jobs from backend
// ---------------------------------------------------------
const loadJobs = async () => {
  try {
    setLoadingJobs(true);
    setJobsError("");

    const token = localStorage.getItem("token");

    if (!token) {
      throw new Error("You are not logged in.");
    }

    const response = await fetch("https://swipex-backend-pwin.onrender.com/jobs/", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.detail || "Failed to load jobs.");
    }

    console.log("JOBS FROM BACKEND:", data);

    const backendJobs = Array.isArray(data) ? data : data.jobs || [];

    const formattedJobs = backendJobs.map((job) => ({
      id: job.id,
      title: job.title,
      department: job.company?.industry || job.company?.name || "General",
      location: job.location || "Not specified",
      type: job.job_type || "Full Time",
      applicants: job.applicants_count || job.applicants || 0,
      posted: job.posted_date
        ? new Date(job.posted_date).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
          })
        : "Not specified",
      deadline: job.deadline
        ? new Date(job.deadline).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
          })
        : "Not specified",
      status: job.status || "Active",
      skills: job.skills
        ? typeof job.skills === "string"
          ? job.skills.split(",").map((skill) => skill.trim())
          : job.skills
        : [],
    }));

    setJobs(formattedJobs);
  } catch (error) {
    console.error("Error loading jobs:", error);
    setJobsError(error.message || "Unable to load jobs.");
  } finally {
    setLoadingJobs(false);
  }
};

  // ---------------------------------------------------------
  // Search + status filtering
  // ---------------------------------------------------------
  const filteredJobs = jobs.filter((job) => {
    const matchesSearch =
      job.title.toLowerCase().includes(search.toLowerCase()) ||
      job.department.toLowerCase().includes(search.toLowerCase()) ||
      job.location.toLowerCase().includes(search.toLowerCase());

    const matchesStatus =
      statusFilter === "All" || job.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  // ---------------------------------------------------------
  // Temporary pause / activate functionality
  // ---------------------------------------------------------
  const toggleJobStatus = (id) => {
    setJobs((currentJobs) =>
      currentJobs.map((job) => {
        if (job.id !== id) return job;

        return {
          ...job,
          status: job.status === "Active" ? "Paused" : "Active",
        };
      })
    );
  };

  // ---------------------------------------------------------
  // Logout
  // ---------------------------------------------------------
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };

  // ---------------------------------------------------------
  // Stats
  // ---------------------------------------------------------
  const activeJobs = jobs.filter((job) => job.status === "Active").length;
  const pausedJobs = jobs.filter((job) => job.status === "Paused").length;
  const totalApplicants = jobs.reduce(
    (total, job) => total + job.applicants,
    0
  );

  return (
    <div className="min-h-screen bg-[#050816] text-white relative overflow-x-hidden">

      {/* Background glow */}
      <div className="pointer-events-none fixed -top-32 -left-32 w-[28rem] h-[28rem] bg-[#7B61FF] opacity-20 blur-[120px] rounded-full" />

      <div className="pointer-events-none fixed top-1/3 -right-32 w-[26rem] h-[26rem] bg-[#2FE6FF] opacity-20 blur-[120px] rounded-full" />

      <div className="pointer-events-none fixed bottom-0 left-1/4 w-[22rem] h-[22rem] bg-[#5EA2FF] opacity-10 blur-[120px] rounded-full" />

      {/* -----------------------------------------------------
          SIDEBAR
      ----------------------------------------------------- */}
      <Sidebar activePage="posted-jobs" />

      {/* -----------------------------------------------------
          MAIN CONTENT
      ----------------------------------------------------- */}
      <div className="relative z-10 lg:ml-[264px]">

        {/* =====================================================
            TOP NAVBAR
        ===================================================== */}
        <header className="sticky top-0 z-20 bg-[#050816]/70 backdrop-blur-xl border-b border-white/10 px-4 sm:px-8 py-4 flex items-center justify-between gap-4">

          {/* LEFT SECTION */}
          <div className="flex items-center gap-3 min-w-0">

            {/* Mobile menu button */}
            <button
              className="lg:hidden w-9 h-9 flex items-center justify-center rounded-xl bg-white/[0.06] border border-white/10 hover:bg-white/[0.1] transition-all"
              onClick={() => setSidebarOpen(true)}
            >
              ☰
            </button>

            <div className="min-w-0">
              <p className="font-semibold truncate">
                Posted Jobs
              </p>

              <p className="text-xs text-[#B7C0D8] hidden sm:block">
                Manage your job listings and hiring pipeline
              </p>
            </div>

          </div>

          {/* CENTER SEARCH */}
          <div className="hidden md:flex items-center flex-1 max-w-md">

            <div className="w-full flex items-center gap-2 px-4 py-2 rounded-[16px] bg-white/[0.04] border border-white/10">

              <Search
                size={16}
                className="text-[#B7C0D8] shrink-0"
              />

              <input
                type="text"
                placeholder="Search jobs, applicants, reports..."
                className="w-full bg-transparent outline-none text-sm text-white placeholder:text-[#B7C0D8]"
              />

            </div>

          </div>

          {/* RIGHT SECTION */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">

            {/* Profile */}
            <button
              onClick={() => navigate("/profile")}
              className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-[14px] bg-white/[0.06] border border-white/10 text-sm font-medium hover:bg-white/[0.1] transition-all duration-300"
            >
              <span>👤</span>
              <span>Profile</span>
            </button>

            {/* Logout */}
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 rounded-[14px] bg-gradient-to-r from-[#7B61FF] via-[#5EA2FF] to-[#2FE6FF] text-sm font-medium hover:opacity-90 active:scale-[0.98] transition-all duration-200"
            >
              <span>🚪</span>
              <span className="hidden sm:inline">
                Logout
              </span>
            </button>

          </div>

        </header>

        {/* =====================================================
            PAGE
        ===================================================== */}
        <main className="p-4 sm:p-8">

          {/* Heading */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">

            <div>
              <h1 className="text-3xl font-bold tracking-tight">
                Posted Jobs
              </h1>

              <p className="text-[#B7C0D8] text-sm mt-1">
                Create and manage your job opportunities.
              </p>
            </div>

            <button
  onClick={() => {
    setPostError("");
    setPostSuccess("");
    setShowPostModal(true);
  }}
  className="flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-[#7B61FF] via-[#5EA2FF] to-[#2FE6FF] text-white font-medium hover:opacity-90 active:scale-[0.98] transition-all"
>
              <Plus size={18} />
              Post New Job
            </button>

          </div>

          {/* -------------------------------------------------
              STATS
          ------------------------------------------------- */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-8">

            <div className="rounded-[22px] bg-white/[0.04] border border-white/10 backdrop-blur-xl p-5">
              <div className="flex justify-between items-center">
                <Briefcase
                  size={22}
                  className="text-[#5EA2FF]"
                />

                <span className="text-xs text-[#B7C0D8]">
                  Currently hiring
                </span>
              </div>

              <p className="text-3xl font-bold mt-4">
                {activeJobs}
              </p>

              <p className="text-sm text-[#B7C0D8]">
                Active Jobs
              </p>
            </div>

            <div className="rounded-[22px] bg-white/[0.04] border border-white/10 backdrop-blur-xl p-5">
              <div className="flex justify-between items-center">
                <Pause
                  size={22}
                  className="text-[#B7B0FF]"
                />

                <span className="text-xs text-[#B7C0D8]">
                  Temporarily inactive
                </span>
              </div>

              <p className="text-3xl font-bold mt-4">
                {pausedJobs}
              </p>

              <p className="text-sm text-[#B7C0D8]">
                Paused Jobs
              </p>
            </div>

            <div className="rounded-[22px] bg-white/[0.04] border border-white/10 backdrop-blur-xl p-5">
              <div className="flex justify-between items-center">
                <Users
                  size={22}
                  className="text-[#2FE6FF]"
                />

                <span className="text-xs text-[#B7C0D8]">
                  Across all listings
                </span>
              </div>

              <p className="text-3xl font-bold mt-4">
                {totalApplicants}
              </p>

              <p className="text-sm text-[#B7C0D8]">
                Total Applicants
              </p>
            </div>

          </div>

          {/* -------------------------------------------------
              SEARCH + FILTER
          ------------------------------------------------- */}
          <div className="rounded-[22px] bg-white/[0.04] border border-white/10 backdrop-blur-xl p-4 mb-6">

            <div className="flex flex-col md:flex-row gap-3">

              <div className="relative flex-1">

                <Search
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-[#7D8597]"
                />

                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search jobs, departments or locations..."
                  className="w-full bg-white/[0.04] border border-white/10 rounded-xl pl-11 pr-4 py-3 text-sm text-white placeholder:text-[#7D8597] outline-none focus:border-[#5EA2FF]/50"
                />

              </div>

              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="bg-[#11172A] border border-white/10 rounded-xl px-4 py-3 text-sm text-white outline-none"
              >
                <option value="All">All Status</option>
                <option value="Active">Active</option>
                <option value="Paused">Paused</option>
                <option value="Closed">Closed</option>
              </select>

            </div>

          </div>

          {/* -------------------------------------------------
    JOB LIST
------------------------------------------------- */}
<div className="space-y-4">

  {loadingJobs ? (
    <div className="rounded-[22px] bg-white/[0.04] border border-white/10 p-12 text-center">
      <p className="text-[#B7C0D8]">
        Loading jobs...
      </p>
    </div>
  ) : jobsError ? (
    <div className="rounded-[22px] bg-red-500/10 border border-red-500/20 p-12 text-center">
      <h3 className="text-lg font-semibold text-red-300">
        Unable to load jobs
      </h3>

      <p className="text-sm text-red-200/70 mt-2">
        {jobsError}
      </p>
    </div>
  ) : filteredJobs.length === 0 ? (
    <div className="rounded-[22px] bg-white/[0.04] border border-white/10 p-12 text-center">

      <Briefcase
        size={40}
        className="mx-auto text-[#7D8597] mb-4"
      />

      <h3 className="text-lg font-semibold">
        No jobs found
      </h3>

      <p className="text-sm text-[#B7C0D8] mt-1">
        Try changing your search or filter.
      </p>

    </div>
  ) : (
    filteredJobs.map((job) => (

      <div
        key={job.id}
        className="rounded-[22px] bg-white/[0.04] border border-white/10 backdrop-blur-xl p-5 sm:p-6 hover:border-white/20 transition-all"
      >

        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5">

          {/* Job information */}
          <div className="flex-1">

            <div className="flex flex-wrap items-center gap-3">

              <h2 className="text-lg font-semibold text-white">
                {job.title}
              </h2>

              <span
                className={`text-xs px-3 py-1 rounded-full border ${
                  job.status === "Active"
                    ? "bg-[#2FE6FF]/10 text-[#2FE6FF] border-[#2FE6FF]/30"
                    : job.status === "Paused"
                    ? "bg-[#7B61FF]/10 text-[#B7C0D8] border-[#7B61FF]/30"
                    : "bg-white/10 text-[#7D8597] border-white/10"
                }`}
              >
                {job.status}
              </span>

            </div>

            <p className="text-sm text-[#B7C0D8] mt-1">
              {job.department}
            </p>

            {/* Metadata */}
            <div className="flex flex-wrap gap-4 mt-4 text-xs text-[#B7C0D8]">

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
                Deadline {job.deadline}
              </span>

            </div>

            {/* Skills */}
            <div className="flex flex-wrap gap-2 mt-4">

              {job.skills.map((skill) => (

                <span
                  key={skill}
                  className="px-3 py-1 rounded-full text-xs bg-white/[0.05] border border-white/10 text-[#B7C0D8]"
                >
                  {skill}
                </span>

              ))}

            </div>

          </div>

          {/* Actions */}
          <div className="flex flex-wrap lg:flex-col gap-2 lg:min-w-[150px]">

            <button
              onClick={() => navigate("/applicants")}
              className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-white/[0.06] border border-white/10 text-sm hover:bg-white/[0.1] transition-all"
            >
              <Eye size={16} />
              Applicants
            </button>

            <button
              className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-white/[0.06] border border-white/10 text-sm hover:bg-white/[0.1] transition-all"
            >
              <Edit3 size={16} />
              Edit
            </button>

            {job.status !== "Closed" && (

              <button
                onClick={() => toggleJobStatus(job.id)}
                className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-white/[0.06] border border-white/10 text-sm hover:bg-white/[0.1] transition-all"
              >

                {job.status === "Active" ? (
                  <>
                    <Pause size={16} />
                    Pause
                  </>
                ) : (
                  <>
                    <Play size={16} />
                    Activate
                  </>
                )}

              </button>

            )}

          </div>

        </div>

      </div>

    ))
  )}

</div>

        </main>
                

        {/* =====================================================
            POST JOB MODAL
        ===================================================== */}
        {showPostModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">

            <div className="w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-[24px] bg-[#0B1120] border border-white/10 shadow-2xl">

              {/* Modal Header */}
              <div className="sticky top-0 z-10 flex items-center justify-between px-6 py-5 bg-[#0B1120]/95 backdrop-blur-xl border-b border-white/10">

                <div>
                  <h2 className="text-xl font-bold">
                    Post New Job
                  </h2>

                  <p className="text-sm text-[#B7C0D8] mt-1">
                    Create a new job opportunity for candidates.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => setShowPostModal(false)}
                  className="w-9 h-9 rounded-xl bg-white/[0.06] border border-white/10 hover:bg-white/[0.1] transition-all text-lg"
                >
                  ✕
                </button>

              </div>

              {/* Form */}
              <form
                onSubmit={handlePostJob}
                className="p-6 space-y-5"
              >

                {/* Error */}
                {postError && (
                  <div className="px-4 py-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-300 text-sm">
                    {postError}
                  </div>
                )}

                {/* Success */}
                {postSuccess && (
                  <div className="px-4 py-3 rounded-xl bg-green-500/10 border border-green-500/30 text-green-300 text-sm">
                    {postSuccess}
                  </div>
                )}

                {/* Job Title */}
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Job Title *
                  </label>

                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleFormChange}
                    placeholder="e.g. Frontend Developer"
                    required
                    className="w-full bg-white/[0.04] border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-[#7D8597] outline-none focus:border-[#5EA2FF]/50"
                  />
                </div>

                {/* Company */}
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Company *
                  </label>

                  <select
                    name="company_id"
                    value={formData.company_id}
                    onChange={handleFormChange}
                    required
                    disabled={loadingCompanies}
                    className="w-full bg-[#11172A] border border-white/10 rounded-xl px-4 py-3 text-sm text-white outline-none focus:border-[#5EA2FF]/50"
                  >
                    <option value="">
                      {loadingCompanies
                        ? "Loading companies..."
                        : "Select a company"}
                    </option>

                    {companies.map((company) => (
                      <option
                        key={company.id}
                        value={company.id}
                      >
                        {company.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Description */}
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Job Description *
                  </label>

                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleFormChange}
                    placeholder="Describe the role, responsibilities and requirements..."
                    required
                    rows={5}
                    className="w-full bg-white/[0.04] border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-[#7D8597] outline-none resize-none focus:border-[#5EA2FF]/50"
                  />
                </div>

                {/* Location + Work Mode */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Location *
                    </label>

                    <input
                      type="text"
                      name="location"
                      value={formData.location}
                      onChange={handleFormChange}
                      placeholder="e.g. Delhi, India"
                      required
                      className="w-full bg-white/[0.04] border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-[#7D8597] outline-none focus:border-[#5EA2FF]/50"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Work Mode *
                    </label>

                    <select
                      name="work_mode"
                      value={formData.work_mode}
                      onChange={handleFormChange}
                      required
                      className="w-full bg-[#11172A] border border-white/10 rounded-xl px-4 py-3 text-sm text-white outline-none focus:border-[#5EA2FF]/50"
                    >
                      <option value="On-site">On-site</option>
                      <option value="Remote">Remote</option>
                      <option value="Hybrid">Hybrid</option>
                    </select>
                  </div>

                </div>

                {/* Job Type + Experience */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Job Type *
                    </label>

                    <select
                      name="job_type"
                      value={formData.job_type}
                      onChange={handleFormChange}
                      required
                      className="w-full bg-[#11172A] border border-white/10 rounded-xl px-4 py-3 text-sm text-white outline-none focus:border-[#5EA2FF]/50"
                    >
                      <option value="Full Time">Full Time</option>
                      <option value="Part Time">Part Time</option>
                      <option value="Internship">Internship</option>
                      <option value="Contract">Contract</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Experience *
                    </label>

                    <input
                      type="text"
                      name="experience"
                      value={formData.experience}
                      onChange={handleFormChange}
                      placeholder="e.g. 2-4 years"
                      required
                      className="w-full bg-white/[0.04] border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-[#7D8597] outline-none focus:border-[#5EA2FF]/50"
                    />
                  </div>

                </div>

                {/* Salary */}
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Salary *
                  </label>

                  <input
                    type="text"
                    name="salary"
                    value={formData.salary}
                    onChange={handleFormChange}
                    placeholder="e.g. ₹8-12 LPA"
                    required
                    className="w-full bg-white/[0.04] border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-[#7D8597] outline-none focus:border-[#5EA2FF]/50"
                  />
                </div>

                {/* Skills */}
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Skills *
                  </label>

                  <input
                    type="text"
                    name="skills"
                    value={formData.skills}
                    onChange={handleFormChange}
                    placeholder="e.g. React, JavaScript, Node.js"
                    required
                    className="w-full bg-white/[0.04] border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-[#7D8597] outline-none focus:border-[#5EA2FF]/50"
                  />

                  <p className="text-xs text-[#7D8597] mt-2">
                    Separate multiple skills with commas.
                  </p>
                </div>

                {/* Buttons */}
                <div className="flex flex-col sm:flex-row gap-3 pt-3">

                  <button
                    type="button"
                    onClick={() => setShowPostModal(false)}
                    className="flex-1 px-5 py-3 rounded-xl bg-white/[0.06] border border-white/10 text-sm font-medium hover:bg-white/[0.1] transition-all"
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    disabled={postingJob}
                    className="flex-1 px-5 py-3 rounded-xl bg-gradient-to-r from-[#7B61FF] via-[#5EA2FF] to-[#2FE6FF] text-white text-sm font-medium hover:opacity-90 disabled:opacity-50 transition-all"
                  >
                    {postingJob ? "Posting Job..." : "Post Job"}
                  </button>

                </div>

              </form>

            </div>

          </div>
        )}

      </div>

      </div>
    
  );
}