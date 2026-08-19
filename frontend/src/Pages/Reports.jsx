import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Users,
  Briefcase,
  UserCheck,
  FileText,
  TrendingUp,
  CheckCircle,
  Clock,
  XCircle,
  BarChart3,
} from "lucide-react";

import Sidebar from "../Components/Sidebar";

export default function Reports() {
  const navigate = useNavigate();

  // ---------------------------------------------------------
  // Temporary frontend data
  // We will connect this to the backend later.
  // ---------------------------------------------------------

  const platformStats = {
    totalUsers: 1248,
    totalJobs: 186,
    activeRecruiters: 74,
    totalApplications: 3842,
  };

  const applicationStats = {
    received: 3842,
    underReview: 1264,
    shortlisted: 742,
    interviews: 386,
    hired: 128,
    rejected: 1322,
  };

  const jobReports = [
    {
      id: 1,
      title: "Senior Frontend Engineer",
      company: "TechNova Solutions",
      applications: 246,
      shortlisted: 58,
      interviews: 24,
      status: "Active",
    },
    {
      id: 2,
      title: "Product Manager",
      company: "Innovate Labs",
      applications: 184,
      shortlisted: 42,
      interviews: 18,
      status: "Active",
    },
    {
      id: 3,
      title: "Data Analyst",
      company: "DataSphere",
      applications: 156,
      shortlisted: 35,
      interviews: 16,
      status: "Closed",
    },
    {
      id: 4,
      title: "UI/UX Designer",
      company: "CreativeCore",
      applications: 128,
      shortlisted: 31,
      interviews: 14,
      status: "Active",
    },
    {
      id: 5,
      title: "DevOps Engineer",
      company: "CloudStack",
      applications: 112,
      shortlisted: 27,
      interviews: 12,
      status: "Paused",
    },
  ];

  const recruiterReports = [
    {
      id: 1,
      recruiter: "TechNova Solutions",
      jobsPosted: 18,
      applications: 624,
      activeJobs: 8,
    },
    {
      id: 2,
      recruiter: "Innovate Labs",
      jobsPosted: 14,
      applications: 482,
      activeJobs: 6,
    },
    {
      id: 3,
      recruiter: "DataSphere",
      jobsPosted: 11,
      applications: 391,
      activeJobs: 5,
    },
    {
      id: 4,
      recruiter: "CreativeCore",
      jobsPosted: 9,
      applications: 276,
      activeJobs: 4,
    },
  ];

  // ---------------------------------------------------------
  // Status percentage
  // ---------------------------------------------------------

  const getPercentage = (value) => {
    return Math.round(
      (value / applicationStats.received) * 100
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
  // Job status style
  // ---------------------------------------------------------

  const jobStatusStyle = (status) => {
    if (status === "Active") {
      return "bg-[#2FE6FF]/10 text-[#2FE6FF] border-[#2FE6FF]/30";
    }

    if (status === "Paused") {
      return "bg-[#7B61FF]/10 text-[#B7C0D8] border-[#7B61FF]/30";
    }

    return "bg-white/[0.06] text-[#7D8597] border-white/10";
  };

  return (
    <div className="min-h-screen bg-[#050816] text-white relative overflow-x-hidden">

      {/* -----------------------------------------------------
          BACKGROUND GLOW
      ----------------------------------------------------- */}

      <div className="pointer-events-none fixed -top-32 -left-32 w-[28rem] h-[28rem] bg-[#7B61FF] opacity-20 blur-[120px] rounded-full" />

      <div className="pointer-events-none fixed top-1/3 -right-32 w-[26rem] h-[26rem] bg-[#2FE6FF] opacity-20 blur-[120px] rounded-full" />

      <div className="pointer-events-none fixed bottom-0 left-1/4 w-[22rem] h-[22rem] bg-[#5EA2FF] opacity-10 blur-[120px] rounded-full" />

      {/* -----------------------------------------------------
          SIDEBAR
      ----------------------------------------------------- */}

      <Sidebar activePage="reports" />

      {/* -----------------------------------------------------
          MAIN CONTENT
      ----------------------------------------------------- */}

      <div className="relative z-10 lg:ml-[264px]">

        {/* ---------------------------------------------------
            TOP NAVBAR
        --------------------------------------------------- */}

        <header className="sticky top-0 z-20 bg-[#050816]/70 backdrop-blur-xl border-b border-white/10 px-4 sm:px-8 py-4">

          <div className="flex items-center justify-between gap-4">

            <div>
              <p className="font-semibold">
                Reports
              </p>

              <p className="text-xs text-[#B7C0D8] hidden sm:block">
                Platform insights and administrative reports
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
                onClick={handleLogout}
                className="px-4 py-2 rounded-[14px] bg-gradient-to-r from-[#7B61FF] via-[#5EA2FF] to-[#2FE6FF] text-sm font-medium hover:opacity-90 transition-all"
              >
                Logout
              </button>

            </div>

          </div>

        </header>

        {/* ---------------------------------------------------
            PAGE CONTENT
        --------------------------------------------------- */}

        <main className="p-4 sm:p-8">

          {/* Heading */}

          <div className="mb-8">

            <h1 className="text-3xl font-bold tracking-tight">
              Reports
            </h1>

            <p className="text-[#B7C0D8] text-sm mt-1">
              Monitor platform activity, hiring performance and
              application trends.
            </p>

          </div>

          {/* -------------------------------------------------
              PLATFORM OVERVIEW
          ------------------------------------------------- */}

          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 mb-8">

            {/* Total Users */}

            <div className="rounded-[22px] bg-white/[0.04] border border-white/10 backdrop-blur-xl p-5">

              <div className="flex items-center justify-between">

                <Users
                  size={22}
                  className="text-[#5EA2FF]"
                />

                <span className="text-xs text-[#B7C0D8]">
                  Platform
                </span>

              </div>

              <p className="text-3xl font-bold mt-4">
                {platformStats.totalUsers.toLocaleString()}
              </p>

              <p className="text-sm text-[#B7C0D8]">
                Total Users
              </p>

            </div>

            {/* Total Jobs */}

            <div className="rounded-[22px] bg-white/[0.04] border border-white/10 backdrop-blur-xl p-5">

              <div className="flex items-center justify-between">

                <Briefcase
                  size={22}
                  className="text-[#7B61FF]"
                />

                <span className="text-xs text-[#B7C0D8]">
                  Listings
                </span>

              </div>

              <p className="text-3xl font-bold mt-4">
                {platformStats.totalJobs}
              </p>

              <p className="text-sm text-[#B7C0D8]">
                Total Jobs
              </p>

            </div>

            {/* Recruiters */}

            <div className="rounded-[22px] bg-white/[0.04] border border-white/10 backdrop-blur-xl p-5">

              <div className="flex items-center justify-between">

                <UserCheck
                  size={22}
                  className="text-[#2FE6FF]"
                />

                <span className="text-xs text-[#B7C0D8]">
                  Hiring
                </span>

              </div>

              <p className="text-3xl font-bold mt-4">
                {platformStats.activeRecruiters}
              </p>

              <p className="text-sm text-[#B7C0D8]">
                Active Recruiters
              </p>

            </div>

            {/* Applications */}

            <div className="rounded-[22px] bg-white/[0.04] border border-white/10 backdrop-blur-xl p-5">

              <div className="flex items-center justify-between">

                <FileText
                  size={22}
                  className="text-[#5EA2FF]"
                />

                <span className="text-xs text-[#B7C0D8]">
                  Applications
                </span>

              </div>

              <p className="text-3xl font-bold mt-4">
                {platformStats.totalApplications.toLocaleString()}
              </p>

              <p className="text-sm text-[#B7C0D8]">
                Total Applications
              </p>

            </div>

          </div>

          {/* -------------------------------------------------
              APPLICATION OVERVIEW
          ------------------------------------------------- */}

          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mb-8">

            {/* Application Status */}

            <div className="rounded-[22px] bg-white/[0.04] border border-white/10 backdrop-blur-xl p-6">

              <div className="flex items-center justify-between mb-6">

                <div>

                  <h2 className="text-lg font-semibold">
                    Application Overview
                  </h2>

                  <p className="text-xs text-[#7D8597] mt-1">
                    Current application pipeline
                  </p>

                </div>

                <BarChart3
                  size={22}
                  className="text-[#5EA2FF]"
                />

              </div>

              <div className="space-y-5">

                {/* Under Review */}

                <div>

                  <div className="flex justify-between text-sm mb-2">

                    <span className="flex items-center gap-2 text-[#B7C0D8]">
                      <Clock size={15} />
                      Under Review
                    </span>

                    <span className="font-medium">
                      {applicationStats.underReview}
                    </span>

                  </div>

                  <div className="h-2 rounded-full bg-white/10 overflow-hidden">

                    <div
                      className="h-full rounded-full bg-gradient-to-r from-[#7B61FF] to-[#5EA2FF]"
                      style={{
                        width: `${getPercentage(
                          applicationStats.underReview
                        )}%`,
                      }}
                    />

                  </div>

                </div>

                {/* Shortlisted */}

                <div>

                  <div className="flex justify-between text-sm mb-2">

                    <span className="flex items-center gap-2 text-[#B7C0D8]">
                      <UserCheck size={15} />
                      Shortlisted
                    </span>

                    <span className="font-medium">
                      {applicationStats.shortlisted}
                    </span>

                  </div>

                  <div className="h-2 rounded-full bg-white/10 overflow-hidden">

                    <div
                      className="h-full rounded-full bg-gradient-to-r from-[#5EA2FF] to-[#2FE6FF]"
                      style={{
                        width: `${getPercentage(
                          applicationStats.shortlisted
                        )}%`,
                      }}
                    />

                  </div>

                </div>

                {/* Interviews */}

                <div>

                  <div className="flex justify-between text-sm mb-2">

                    <span className="flex items-center gap-2 text-[#B7C0D8]">
                      <CheckCircle size={15} />
                      Interviews
                    </span>

                    <span className="font-medium">
                      {applicationStats.interviews}
                    </span>

                  </div>

                  <div className="h-2 rounded-full bg-white/10 overflow-hidden">

                    <div
                      className="h-full rounded-full bg-gradient-to-r from-[#7B61FF] to-[#2FE6FF]"
                      style={{
                        width: `${getPercentage(
                          applicationStats.interviews
                        )}%`,
                      }}
                    />

                  </div>

                </div>

                {/* Hired */}

                <div>

                  <div className="flex justify-between text-sm mb-2">

                    <span className="flex items-center gap-2 text-[#B7C0D8]">
                      <CheckCircle size={15} />
                      Hired
                    </span>

                    <span className="font-medium">
                      {applicationStats.hired}
                    </span>

                  </div>

                  <div className="h-2 rounded-full bg-white/10 overflow-hidden">

                    <div
                      className="h-full rounded-full bg-gradient-to-r from-[#5EA2FF] to-[#2FE6FF]"
                      style={{
                        width: `${getPercentage(
                          applicationStats.hired
                        )}%`,
                      }}
                    />

                  </div>

                </div>

                {/* Rejected */}

                <div>

                  <div className="flex justify-between text-sm mb-2">

                    <span className="flex items-center gap-2 text-[#B7C0D8]">
                      <XCircle size={15} />
                      Rejected
                    </span>

                    <span className="font-medium">
                      {applicationStats.rejected}
                    </span>

                  </div>

                  <div className="h-2 rounded-full bg-white/10 overflow-hidden">

                    <div
                      className="h-full rounded-full bg-gradient-to-r from-[#7B61FF] to-[#5EA2FF]"
                      style={{
                        width: `${getPercentage(
                          applicationStats.rejected
                        )}%`,
                      }}
                    />

                  </div>

                </div>

              </div>

            </div>

            {/* Hiring Funnel */}

            <div className="rounded-[22px] bg-white/[0.04] border border-white/10 backdrop-blur-xl p-6">

              <div className="flex items-center justify-between mb-6">

                <div>

                  <h2 className="text-lg font-semibold">
                    Hiring Funnel
                  </h2>

                  <p className="text-xs text-[#7D8597] mt-1">
                    Candidate progression across the platform
                  </p>

                </div>

                <TrendingUp
                  size={22}
                  className="text-[#2FE6FF]"
                />

              </div>

              <div className="space-y-4">

                <div className="flex items-center justify-between p-4 rounded-xl bg-white/[0.04] border border-white/10">

                  <div>

                    <p className="text-sm text-[#B7C0D8]">
                      Applications Received
                    </p>

                    <p className="text-2xl font-bold mt-1">
                      {applicationStats.received}
                    </p>

                  </div>

                  <FileText
                    size={22}
                    className="text-[#5EA2FF]"
                  />

                </div>

                <div className="flex items-center justify-between p-4 rounded-xl bg-white/[0.04] border border-white/10">

                  <div>

                    <p className="text-sm text-[#B7C0D8]">
                      Shortlisted
                    </p>

                    <p className="text-2xl font-bold mt-1">
                      {applicationStats.shortlisted}
                    </p>

                  </div>

                  <UserCheck
                    size={22}
                    className="text-[#2FE6FF]"
                  />

                </div>

                <div className="flex items-center justify-between p-4 rounded-xl bg-white/[0.04] border border-white/10">

                  <div>

                    <p className="text-sm text-[#B7C0D8]">
                      Interviews
                    </p>

                    <p className="text-2xl font-bold mt-1">
                      {applicationStats.interviews}
                    </p>

                  </div>

                  <CheckCircle
                    size={22}
                    className="text-[#7B61FF]"
                  />

                </div>

                <div className="flex items-center justify-between p-4 rounded-xl bg-white/[0.04] border border-white/10">

                  <div>

                    <p className="text-sm text-[#B7C0D8]">
                      Successful Hires
                    </p>

                    <p className="text-2xl font-bold mt-1">
                      {applicationStats.hired}
                    </p>

                  </div>

                  <CheckCircle
                    size={22}
                    className="text-[#2FE6FF]"
                  />

                </div>

              </div>

            </div>

          </div>

          {/* -------------------------------------------------
              JOB PERFORMANCE
          ------------------------------------------------- */}

          <div className="rounded-[22px] bg-white/[0.04] border border-white/10 backdrop-blur-xl p-5 sm:p-6 mb-8">

            <div className="flex items-center justify-between mb-6">

              <div>

                <h2 className="text-lg font-semibold">
                  Job Performance
                </h2>

                <p className="text-xs text-[#7D8597] mt-1">
                  Performance of individual job listings
                </p>

              </div>

              <Briefcase
                size={22}
                className="text-[#5EA2FF]"
              />

            </div>

            <div className="overflow-x-auto">

              <table className="w-full text-sm">

                <thead>

                  <tr className="border-b border-white/10 text-left text-[#7D8597]">

                    <th className="pb-3 pr-4 font-medium">
                      Job
                    </th>

                    <th className="pb-3 px-4 font-medium">
                      Applications
                    </th>

                    <th className="pb-3 px-4 font-medium">
                      Shortlisted
                    </th>

                    <th className="pb-3 px-4 font-medium">
                      Interviews
                    </th>

                    <th className="pb-3 pl-4 font-medium">
                      Status
                    </th>

                  </tr>

                </thead>

                <tbody>

                  {jobReports.map((job) => (

                    <tr
                      key={job.id}
                      className="border-b border-white/[0.06] last:border-0"
                    >

                      <td className="py-4 pr-4">

                        <p className="font-medium text-white">
                          {job.title}
                        </p>

                        <p className="text-xs text-[#7D8597] mt-1">
                          {job.company}
                        </p>

                      </td>

                      <td className="py-4 px-4 text-[#B7C0D8]">
                        {job.applications}
                      </td>

                      <td className="py-4 px-4 text-[#B7C0D8]">
                        {job.shortlisted}
                      </td>

                      <td className="py-4 px-4 text-[#B7C0D8]">
                        {job.interviews}
                      </td>

                      <td className="py-4 pl-4">

                        <span
                          className={`inline-flex px-3 py-1 rounded-full text-xs border ${jobStatusStyle(
                            job.status
                          )}`}
                        >
                          {job.status}
                        </span>

                      </td>

                    </tr>

                  ))}

                </tbody>

              </table>

            </div>

          </div>

          {/* -------------------------------------------------
              RECRUITER ACTIVITY
          ------------------------------------------------- */}

          <div className="rounded-[22px] bg-white/[0.04] border border-white/10 backdrop-blur-xl p-5 sm:p-6">

            <div className="flex items-center justify-between mb-6">

              <div>

                <h2 className="text-lg font-semibold">
                  Recruiter Activity
                </h2>

                <p className="text-xs text-[#7D8597] mt-1">
                  Hiring activity across recruiters
                </p>

              </div>

              <Users
                size={22}
                className="text-[#2FE6FF]"
              />

            </div>

            <div className="overflow-x-auto">

              <table className="w-full text-sm">

                <thead>

                  <tr className="border-b border-white/10 text-left text-[#7D8597]">

                    <th className="pb-3 pr-4 font-medium">
                      Recruiter / Company
                    </th>

                    <th className="pb-3 px-4 font-medium">
                      Jobs Posted
                    </th>

                    <th className="pb-3 px-4 font-medium">
                      Applications
                    </th>

                    <th className="pb-3 pl-4 font-medium">
                      Active Jobs
                    </th>

                  </tr>

                </thead>

                <tbody>

                  {recruiterReports.map((recruiter) => (

                    <tr
                      key={recruiter.id}
                      className="border-b border-white/[0.06] last:border-0"
                    >

                      <td className="py-4 pr-4 font-medium">
                        {recruiter.recruiter}
                      </td>

                      <td className="py-4 px-4 text-[#B7C0D8]">
                        {recruiter.jobsPosted}
                      </td>

                      <td className="py-4 px-4 text-[#B7C0D8]">
                        {recruiter.applications}
                      </td>

                      <td className="py-4 pl-4">

                        <span className="inline-flex items-center gap-1.5 text-[#2FE6FF]">

                          <span className="w-1.5 h-1.5 rounded-full bg-[#2FE6FF]" />

                          {recruiter.activeJobs}

                        </span>

                      </td>

                    </tr>

                  ))}

                </tbody>

              </table>

            </div>

          </div>

        </main>

      </div>

    </div>
  );
}