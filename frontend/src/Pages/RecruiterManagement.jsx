import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Search,
  Users,
  UserCheck,
  Clock,
  Ban,
  Building2,
  Briefcase,
  Mail,
  Calendar,
  Eye,
  Check,
  X,
  UserPlus,
} from "lucide-react";

import Sidebar from "../Components/Sidebar";

export default function RecruiterManagement() {
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [verificationFilter, setVerificationFilter] = useState("All");

  // ---------------------------------------------------------
  // Temporary frontend data
  // Connect this to backend later.
  // ---------------------------------------------------------

  const [recruiters, setRecruiters] = useState([
    {
      id: 1,
      name: "Rahul Malhotra",
      email: "rahul.malhotra@techcorp.com",
      company: "TechCorp India",
      role: "HR Manager",
      jobsPosted: 12,
      applicants: 184,
      joined: "Jan 15, 2026",
      verification: "Verified",
      status: "Active",
    },
    {
      id: 2,
      name: "Sneha Kapoor",
      email: "sneha.kapoor@innovatelabs.com",
      company: "Innovate Labs",
      role: "Talent Acquisition Lead",
      jobsPosted: 8,
      applicants: 126,
      joined: "Feb 4, 2026",
      verification: "Verified",
      status: "Active",
    },
    {
      id: 3,
      name: "Arjun Mehta",
      email: "arjun.mehta@startuphub.com",
      company: "StartupHub",
      role: "Founder",
      jobsPosted: 5,
      applicants: 67,
      joined: "Mar 12, 2026",
      verification: "Pending",
      status: "Active",
    },
    {
      id: 4,
      name: "Priya Sharma",
      email: "priya.sharma@finserv.com",
      company: "FinServ Solutions",
      role: "Recruitment Manager",
      jobsPosted: 15,
      applicants: 243,
      joined: "Nov 20, 2025",
      verification: "Verified",
      status: "Active",
    },
    {
      id: 5,
      name: "Vikram Singh",
      email: "vikram.singh@digitalworks.com",
      company: "DigitalWorks",
      role: "HR Executive",
      jobsPosted: 3,
      applicants: 41,
      joined: "Apr 8, 2026",
      verification: "Pending",
      status: "Active",
    },
    {
      id: 6,
      name: "Neha Agarwal",
      email: "neha.agarwal@cloudnine.com",
      company: "CloudNine",
      role: "Talent Manager",
      jobsPosted: 9,
      applicants: 138,
      joined: "Dec 10, 2025",
      verification: "Verified",
      status: "Suspended",
    },
    {
      id: 7,
      name: "Karan Bhatia",
      email: "karan.bhatia@fintechpro.com",
      company: "FinTech Pro",
      role: "HR Manager",
      jobsPosted: 7,
      applicants: 95,
      joined: "May 2, 2026",
      verification: "Verified",
      status: "Active",
    },
  ]);

  // ---------------------------------------------------------
  // Filtering
  // ---------------------------------------------------------

  const filteredRecruiters = recruiters.filter((recruiter) => {
    const searchValue = search.toLowerCase();

    const matchesSearch =
      recruiter.name.toLowerCase().includes(searchValue) ||
      recruiter.email.toLowerCase().includes(searchValue) ||
      recruiter.company.toLowerCase().includes(searchValue) ||
      recruiter.role.toLowerCase().includes(searchValue);

    const matchesStatus =
      statusFilter === "All" ||
      recruiter.status === statusFilter;

    const matchesVerification =
      verificationFilter === "All" ||
      recruiter.verification === verificationFilter;

    return (
      matchesSearch &&
      matchesStatus &&
      matchesVerification
    );
  });

  // ---------------------------------------------------------
  // Update recruiter status
  // ---------------------------------------------------------

  const updateStatus = (id, newStatus) => {
    setRecruiters((current) =>
      current.map((recruiter) =>
        recruiter.id === id
          ? {
              ...recruiter,
              status: newStatus,
            }
          : recruiter
      )
    );
  };

  // ---------------------------------------------------------
  // Verify recruiter
  // ---------------------------------------------------------

  const verifyRecruiter = (id) => {
    setRecruiters((current) =>
      current.map((recruiter) =>
        recruiter.id === id
          ? {
              ...recruiter,
              verification: "Verified",
            }
          : recruiter
      )
    );
  };

  // ---------------------------------------------------------
  // Statistics
  // ---------------------------------------------------------

  const totalRecruiters = recruiters.length;

  const activeRecruiters = recruiters.filter(
    (recruiter) => recruiter.status === "Active"
  ).length;

  const pendingVerification = recruiters.filter(
    (recruiter) => recruiter.verification === "Pending"
  ).length;

  const suspendedRecruiters = recruiters.filter(
    (recruiter) => recruiter.status === "Suspended"
  ).length;

  // ---------------------------------------------------------
  // Initials
  // ---------------------------------------------------------

  const getInitials = (name) => {
    return name
      .split(" ")
      .map((word) => word[0])
      .join("");
  };

  // ---------------------------------------------------------
  // Status styling
  // ---------------------------------------------------------

  const statusStyle = (status) => {
    if (status === "Active") {
      return "bg-[#2FE6FF]/10 text-[#2FE6FF] border-[#2FE6FF]/30";
    }

    return "bg-red-500/10 text-red-300 border-red-500/20";
  };

  const verificationStyle = (verification) => {
    if (verification === "Verified") {
      return "bg-[#2FE6FF]/10 text-[#2FE6FF] border-[#2FE6FF]/30";
    }

    return "bg-[#7B61FF]/10 text-[#B7C0D8] border-[#7B61FF]/30";
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

      <Sidebar activePage="recruiters" />

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
                Recruiter Management
              </p>

              <p className="text-xs text-[#B7C0D8] hidden sm:block">
                Manage recruiter accounts and verification
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
                Recruiter Management
              </h1>

              <p className="text-[#B7C0D8] text-sm mt-1">
                Manage recruiter accounts, verification and access.
              </p>

            </div>

            <button
              className="flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-[#7B61FF] via-[#5EA2FF] to-[#2FE6FF] text-white font-medium hover:opacity-90 active:scale-[0.98] transition-all"
            >
              <UserPlus size={18} />
              Add Recruiter
            </button>

          </div>

          {/* =================================================
              STATISTICS
          ================================================= */}

          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 mb-8">

            {/* Total Recruiters */}

            <div className="rounded-[22px] bg-white/[0.04] border border-white/10 backdrop-blur-xl p-5">

              <div className="flex items-center justify-between">

                <Users
                  size={22}
                  className="text-[#5EA2FF]"
                />

                <span className="text-xs text-[#B7C0D8]">
                  All accounts
                </span>

              </div>

              <p className="text-3xl font-bold mt-4">
                {totalRecruiters}
              </p>

              <p className="text-sm text-[#B7C0D8]">
                Total Recruiters
              </p>

            </div>

            {/* Active */}

            <div className="rounded-[22px] bg-white/[0.04] border border-white/10 backdrop-blur-xl p-5">

              <div className="flex items-center justify-between">

                <UserCheck
                  size={22}
                  className="text-[#2FE6FF]"
                />

                <span className="text-xs text-[#B7C0D8]">
                  Currently active
                </span>

              </div>

              <p className="text-3xl font-bold mt-4">
                {activeRecruiters}
              </p>

              <p className="text-sm text-[#B7C0D8]">
                Active Recruiters
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
                  Awaiting approval
                </span>

              </div>

              <p className="text-3xl font-bold mt-4">
                {pendingVerification}
              </p>

              <p className="text-sm text-[#B7C0D8]">
                Pending Verification
              </p>

            </div>

            {/* Suspended */}

            <div className="rounded-[22px] bg-white/[0.04] border border-white/10 backdrop-blur-xl p-5">

              <div className="flex items-center justify-between">

                <Ban
                  size={22}
                  className="text-red-300"
                />

                <span className="text-xs text-[#B7C0D8]">
                  Restricted accounts
                </span>

              </div>

              <p className="text-3xl font-bold mt-4">
                {suspendedRecruiters}
              </p>

              <p className="text-sm text-[#B7C0D8]">
                Suspended Recruiters
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
                  placeholder="Search recruiters, companies or emails..."
                  className="w-full bg-white/[0.04] border border-white/10 rounded-xl pl-11 pr-4 py-3 text-sm text-white placeholder:text-[#7D8597] outline-none focus:border-[#5EA2FF]/50"
                />

              </div>

              {/* Status */}

              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="bg-[#11172A] border border-white/10 rounded-xl px-4 py-3 text-sm text-white outline-none"
              >

                <option value="All">
                  All Status
                </option>

                <option value="Active">
                  Active
                </option>

                <option value="Suspended">
                  Suspended
                </option>

              </select>

              {/* Verification */}

              <select
                value={verificationFilter}
                onChange={(e) =>
                  setVerificationFilter(e.target.value)
                }
                className="bg-[#11172A] border border-white/10 rounded-xl px-4 py-3 text-sm text-white outline-none"
              >

                <option value="All">
                  All Verification
                </option>

                <option value="Verified">
                  Verified
                </option>

                <option value="Pending">
                  Pending
                </option>

              </select>

            </div>

          </div>

          {/* =================================================
              RECRUITER LIST
          ================================================= */}

          <div className="space-y-4">

            {filteredRecruiters.length === 0 ? (

              <div className="rounded-[22px] bg-white/[0.04] border border-white/10 p-12 text-center">

                <Users
                  size={40}
                  className="mx-auto text-[#7D8597] mb-4"
                />

                <h3 className="text-lg font-semibold">
                  No recruiters found
                </h3>

                <p className="text-sm text-[#B7C0D8] mt-1">
                  Try changing your search or filters.
                </p>

              </div>

            ) : (

              filteredRecruiters.map((recruiter) => (

                <div
                  key={recruiter.id}
                  className="rounded-[22px] bg-white/[0.04] border border-white/10 backdrop-blur-xl p-5 sm:p-6 hover:border-white/20 transition-all"
                >

                  <div className="flex flex-col xl:flex-row xl:items-center gap-5">

                    {/* =================================================
                        RECRUITER INFORMATION
                    ================================================= */}

                    <div className="flex items-start gap-4 flex-1">

                      {/* Avatar */}

                      <div className="w-12 h-12 shrink-0 rounded-full bg-gradient-to-br from-[#7B61FF] to-[#2FE6FF] flex items-center justify-center text-white font-semibold">

                        {getInitials(recruiter.name)}

                      </div>

                      {/* Details */}

                      <div className="min-w-0">

                        <div className="flex flex-wrap items-center gap-2">

                          <h2 className="text-base font-semibold">
                            {recruiter.name}
                          </h2>

                          <span
                            className={`text-xs px-2.5 py-1 rounded-full border ${statusStyle(
                              recruiter.status
                            )}`}
                          >
                            {recruiter.status}
                          </span>

                          <span
                            className={`text-xs px-2.5 py-1 rounded-full border ${verificationStyle(
                              recruiter.verification
                            )}`}
                          >
                            {recruiter.verification}
                          </span>

                        </div>

                        <p className="text-sm text-[#B7C0D8] mt-1">
                          {recruiter.role}
                        </p>

                        {/* Metadata */}

                        <div className="flex flex-wrap gap-4 mt-3 text-xs text-[#B7C0D8]">

                          <span className="flex items-center gap-1.5">
                            <Building2 size={13} />
                            {recruiter.company}
                          </span>

                          <span className="flex items-center gap-1.5">
                            <Mail size={13} />
                            {recruiter.email}
                          </span>

                          <span className="flex items-center gap-1.5">
                            <Calendar size={13} />
                            Joined {recruiter.joined}
                          </span>

                        </div>

                      </div>

                    </div>

                    {/* =================================================
                        RECRUITER STATS
                    ================================================= */}

                    <div className="flex gap-8 xl:w-[250px]">

                      <div>

                        <div className="flex items-center gap-2 text-[#B7C0D8]">

                          <Briefcase size={14} />

                          <span className="text-xs">
                            Jobs
                          </span>

                        </div>

                        <p className="text-xl font-bold mt-1">
                          {recruiter.jobsPosted}
                        </p>

                      </div>

                      <div>

                        <div className="flex items-center gap-2 text-[#B7C0D8]">

                          <Users size={14} />

                          <span className="text-xs">
                            Applicants
                          </span>

                        </div>

                        <p className="text-xl font-bold mt-1">
                          {recruiter.applicants}
                        </p>

                      </div>

                    </div>

                    {/* =================================================
                        ACTIONS
                    ================================================= */}

                    <div className="flex flex-wrap xl:flex-col gap-2 xl:min-w-[145px]">

                      {/* View */}

                      <button
                        className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-white/[0.06] border border-white/10 text-sm hover:bg-white/[0.1] transition-all"
                      >

                        <Eye size={16} />

                        View Profile

                      </button>

                      {/* Verify */}

                      {recruiter.verification === "Pending" && (

                        <button
                          onClick={() =>
                            verifyRecruiter(recruiter.id)
                          }
                          className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#2FE6FF]/10 border border-[#2FE6FF]/20 text-[#2FE6FF] text-sm hover:bg-[#2FE6FF]/20 transition-all"
                        >

                          <Check size={16} />

                          Verify

                        </button>

                      )}

                      {/* Suspend / Activate */}

                      {recruiter.status === "Active" ? (

                        <button
                          onClick={() =>
                            updateStatus(
                              recruiter.id,
                              "Suspended"
                            )
                          }
                          className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-red-500/10 border border-red-500/20 text-red-300 text-sm hover:bg-red-500/20 transition-all"
                        >

                          <X size={16} />

                          Suspend

                        </button>

                      ) : (

                        <button
                          onClick={() =>
                            updateStatus(
                              recruiter.id,
                              "Active"
                            )
                          }
                          className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#2FE6FF]/10 border border-[#2FE6FF]/20 text-[#2FE6FF] text-sm hover:bg-[#2FE6FF]/20 transition-all"
                        >

                          <Check size={16} />

                          Activate

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