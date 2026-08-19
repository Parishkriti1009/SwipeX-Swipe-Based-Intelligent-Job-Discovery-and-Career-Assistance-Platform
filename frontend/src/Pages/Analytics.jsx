import React from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../Components/Sidebar";

export default function Analytics() {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const userName = user?.name || "Recruiter";

  // ------------------------------------------------------------
  // Logout
  // ------------------------------------------------------------
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };

  // ------------------------------------------------------------
  // Analytics Data
  // ------------------------------------------------------------

  const overviewStats = [
    {
      title: "Total Applications",
      value: "142",
      change: "+18%",
      subtitle: "vs last month",
      icon: "📄",
    },
    {
      title: "Shortlisted",
      value: "62",
      change: "+12%",
      subtitle: "vs last month",
      icon: "⭐",
    },
    {
      title: "Interviews",
      value: "38",
      change: "+8%",
      subtitle: "vs last month",
      icon: "🗓️",
    },
    {
      title: "Hired",
      value: "14",
      change: "+4%",
      subtitle: "vs last month",
      icon: "🎉",
    },
  ];

  const funnelData = [
    {
      label: "Applications",
      value: 142,
      percentage: 100,
    },
    {
      label: "Screened",
      value: 98,
      percentage: 69,
    },
    {
      label: "Shortlisted",
      value: 62,
      percentage: 44,
    },
    {
      label: "Interviewed",
      value: 38,
      percentage: 27,
    },
    {
      label: "Hired",
      value: 14,
      percentage: 10,
    },
  ];

  const jobPerformance = [
    {
      title: "Senior Frontend Engineer",
      applications: 46,
      shortlisted: 21,
      interviews: 13,
      hired: 5,
      match: 92,
    },
    {
      title: "Product Manager",
      applications: 31,
      shortlisted: 14,
      interviews: 9,
      hired: 3,
      match: 87,
    },
    {
      title: "DevOps Engineer",
      applications: 22,
      shortlisted: 10,
      interviews: 6,
      hired: 2,
      match: 84,
    },
    {
      title: "UI/UX Designer",
      applications: 18,
      shortlisted: 8,
      interviews: 5,
      hired: 2,
      match: 89,
    },
  ];

  const candidateSources = [
    {
      source: "SwipeX Recommendations",
      value: 42,
      applications: 60,
    },
    {
      source: "Direct Applications",
      value: 27,
      applications: 38,
    },
    {
      source: "LinkedIn",
      value: 18,
      applications: 26,
    },
    {
      source: "Referral",
      value: 9,
      applications: 13,
    },
  ];

  const hiringActivity = [
    {
      title: "Candidate shortlisted",
      description: "Ananya Sharma was shortlisted for Frontend Engineer",
      time: "25 min ago",
      icon: "⭐",
    },
    {
      title: "Interview scheduled",
      description: "Interview scheduled with Rohan Mehta",
      time: "1 hr ago",
      icon: "🗓️",
    },
    {
      title: "New application",
      description: "Priya Nair applied for Product Designer",
      time: "2 hrs ago",
      icon: "📄",
    },
    {
      title: "Candidate hired",
      description: "Karan Verma was hired as Data Analyst",
      time: "5 hrs ago",
      icon: "🎉",
    },
  ];

  const weeklyApplications = [
    { day: "Mon", value: 42 },
    { day: "Tue", value: 58 },
    { day: "Wed", value: 49 },
    { day: "Thu", value: 71 },
    { day: "Fri", value: 64 },
    { day: "Sat", value: 36 },
    { day: "Sun", value: 28 },
  ];

  // ------------------------------------------------------------
  // Small reusable components
  // ------------------------------------------------------------

  const StatCard = ({ title, value, change, subtitle, icon }) => (
    <div className="rounded-[22px] bg-white/[0.04] border border-white/10 backdrop-blur-xl p-5 sm:p-6 hover:-translate-y-1 hover:border-white/20 transition-all duration-300 shadow-[0_8px_30px_rgba(0,0,0,0.3)]">

      <div className="flex items-start justify-between">
        <div>
          <p className="text-[#B7C0D8] text-sm">
            {title}
          </p>

          <p className="mt-3 text-3xl font-bold text-white">
            {value}
          </p>
        </div>

        <div className="w-11 h-11 rounded-xl bg-white/[0.06] border border-white/10 flex items-center justify-center text-xl">
          {icon}
        </div>
      </div>

      <div className="mt-4 flex items-center gap-2">
        <span className="text-xs font-semibold text-[#2FE6FF]">
          {change}
        </span>

        <span className="text-xs text-[#7D8597]">
          {subtitle}
        </span>
      </div>

    </div>
  );

  const SectionCard = ({ title, subtitle, children, className = "" }) => (
    <div
      className={`rounded-[22px] bg-white/[0.04] border border-white/10 backdrop-blur-xl p-5 sm:p-6 shadow-[0_8px_30px_rgba(0,0,0,0.3)] ${className}`}
    >
      <div className="mb-6">
        <h2 className="text-white font-semibold text-lg">
          {title}
        </h2>

        {subtitle && (
          <p className="text-[#B7C0D8] text-sm mt-1">
            {subtitle}
          </p>
        )}
      </div>

      {children}
    </div>
  );

  // ------------------------------------------------------------
  // Page
  // ------------------------------------------------------------

  return (
    <div className="min-h-screen bg-[#050816] text-white relative overflow-x-hidden">

      {/* ========================================================
          BACKGROUND GLOW
      ======================================================== */}

      <div className="pointer-events-none fixed -top-32 -left-32 w-[28rem] h-[28rem] bg-[#7B61FF] opacity-20 blur-[120px] rounded-full" />

      <div className="pointer-events-none fixed top-1/3 -right-32 w-[26rem] h-[26rem] bg-[#2FE6FF] opacity-20 blur-[120px] rounded-full" />

      <div className="pointer-events-none fixed bottom-0 left-1/4 w-[22rem] h-[22rem] bg-[#5EA2FF] opacity-10 blur-[120px] rounded-full" />

      {/* ========================================================
          SIDEBAR
      ======================================================== */}

      <Sidebar activePage="analytics" />

      {/* ========================================================
          MAIN COLUMN
      ======================================================== */}

      <div className="relative z-10 lg:ml-[264px]">

        {/* ======================================================
            TOP NAVBAR
        ====================================================== */}

        <header className="sticky top-0 z-20 bg-[#050816]/70 backdrop-blur-xl border-b border-white/10 px-4 sm:px-8 py-4 flex items-center justify-between gap-4">

          {/* Welcome */}
          <div className="flex items-center gap-3 min-w-0">

            <div className="min-w-0">

              <p className="font-semibold truncate">
                Welcome back, {userName} 👋
              </p>

              <p className="text-xs text-[#B7C0D8] hidden sm:block">
                Here's what's happening today
              </p>

            </div>

          </div>

          {/* Search */}
          <div className="hidden md:flex items-center flex-1 max-w-md">

            <div className="w-full flex items-center gap-2 px-4 py-2 rounded-[16px] bg-white/[0.04] border border-white/10">

              <span className="text-[#B7C0D8] text-sm">
                🔍
              </span>

              <input
                type="text"
                placeholder="Search jobs, applicants, reports..."
                className="w-full bg-transparent outline-none text-sm text-white placeholder:text-[#B7C0D8]"
              />

            </div>

          </div>

          {/* Right buttons */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">

            <button
              onClick={() => navigate("/company-profile")}
              className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-[14px] bg-white/[0.06] border border-white/10 text-sm font-medium hover:bg-white/[0.1] transition-all duration-300"
            >
              <span>👤</span>
              <span>Profile</span>
            </button>

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

        {/* ======================================================
            MAIN CONTENT
        ====================================================== */}

        <main className="p-4 sm:p-8">

          {/* Page heading */}

          <div className="mb-7">

            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
              Analytics
            </h1>

            <p className="text-[#B7C0D8] text-sm mt-1">
              Track your hiring performance and candidate pipeline.
            </p>

          </div>

          {/* ====================================================
              OVERVIEW CARDS
          ==================================================== */}

          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 mb-6">

            {overviewStats.map((stat) => (
              <StatCard
                key={stat.title}
                {...stat}
              />
            ))}

          </div>

          {/* ====================================================
              FUNNEL + WEEKLY APPLICATIONS
          ==================================================== */}

          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mb-6">

            {/* Hiring Funnel */}

            <SectionCard
              title="Hiring Funnel"
              subtitle="Candidate progression across your hiring pipeline"
            >

              <div className="space-y-5">

                {funnelData.map((item, index) => (

                  <div key={item.label}>

                    <div className="flex items-center justify-between mb-2">

                      <div className="flex items-center gap-3">

                        <div className="w-7 h-7 rounded-lg bg-white/[0.06] border border-white/10 flex items-center justify-center text-xs text-[#B7C0D8]">
                          {index + 1}
                        </div>

                        <span className="text-sm text-white">
                          {item.label}
                        </span>

                      </div>

                      <div className="flex items-center gap-3">

                        <span className="text-sm font-semibold text-white">
                          {item.value}
                        </span>

                        <span className="text-xs text-[#7D8597]">
                          {item.percentage}%
                        </span>

                      </div>

                    </div>

                    <div className="w-full h-2 rounded-full bg-white/10 overflow-hidden">

                      <div
                        className="h-full rounded-full bg-gradient-to-r from-[#7B61FF] via-[#5EA2FF] to-[#2FE6FF]"
                        style={{
                          width: `${item.percentage}%`,
                        }}
                      />

                    </div>

                  </div>

                ))}

              </div>

            </SectionCard>

            {/* Weekly Applications */}

            <SectionCard
              title="Weekly Applications"
              subtitle="Applications received over the last 7 days"
            >

              <div className="h-[260px] flex items-end justify-between gap-3">

                {weeklyApplications.map((item) => (

                  <div
                    key={item.day}
                    className="flex-1 h-full flex flex-col items-center justify-end gap-2"
                  >

                    <span className="text-xs text-[#B7C0D8]">
                      {item.value}
                    </span>

                    <div className="w-full flex-1 flex items-end">

                      <div
                        className="w-full rounded-t-xl bg-gradient-to-t from-[#7B61FF] via-[#5EA2FF] to-[#2FE6FF] hover:opacity-80 transition-opacity"
                        style={{
                          height: `${(item.value / 80) * 100}%`,
                        }}
                      />

                    </div>

                    <span className="text-xs text-[#7D8597]">
                      {item.day}
                    </span>

                  </div>

                ))}

              </div>

            </SectionCard>

          </div>

          {/* ====================================================
              JOB PERFORMANCE
          ==================================================== */}

          <SectionCard
            title="Job Performance"
            subtitle="Performance breakdown across your job postings"
            className="mb-6"
          >

            <div className="overflow-x-auto">

              <table className="w-full min-w-[760px]">

                <thead>

                  <tr className="border-b border-white/10">

                    <th className="text-left pb-4 text-xs font-medium text-[#7D8597]">
                      Job
                    </th>

                    <th className="text-center pb-4 text-xs font-medium text-[#7D8597]">
                      Applications
                    </th>

                    <th className="text-center pb-4 text-xs font-medium text-[#7D8597]">
                      Shortlisted
                    </th>

                    <th className="text-center pb-4 text-xs font-medium text-[#7D8597]">
                      Interviews
                    </th>

                    <th className="text-center pb-4 text-xs font-medium text-[#7D8597]">
                      Hired
                    </th>

                    <th className="text-center pb-4 text-xs font-medium text-[#7D8597]">
                      AI Match
                    </th>

                  </tr>

                </thead>

                <tbody>

                  {jobPerformance.map((job) => (

                    <tr
                      key={job.title}
                      className="border-b border-white/[0.06] last:border-0 hover:bg-white/[0.02] transition-colors"
                    >

                      <td className="py-4">

                        <p className="text-sm font-medium text-white">
                          {job.title}
                        </p>

                      </td>

                      <td className="text-center text-sm text-[#B7C0D8]">
                        {job.applications}
                      </td>

                      <td className="text-center text-sm text-[#B7C0D8]">
                        {job.shortlisted}
                      </td>

                      <td className="text-center text-sm text-[#B7C0D8]">
                        {job.interviews}
                      </td>

                      <td className="text-center">

                        <span className="text-sm font-semibold text-[#2FE6FF]">
                          {job.hired}
                        </span>

                      </td>

                      <td>

                        <div className="flex items-center justify-center gap-2">

                          <div className="w-16 h-1.5 rounded-full bg-white/10 overflow-hidden">

                            <div
                              className="h-full rounded-full bg-gradient-to-r from-[#7B61FF] to-[#2FE6FF]"
                              style={{
                                width: `${job.match}%`,
                              }}
                            />

                          </div>

                          <span className="text-xs text-white">
                            {job.match}%
                          </span>

                        </div>

                      </td>

                    </tr>

                  ))}

                </tbody>

              </table>

            </div>

          </SectionCard>

          {/* ====================================================
              SOURCE + AI MATCH
          ==================================================== */}

          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mb-6">

            {/* Candidate Sources */}

            <SectionCard
              title="Candidate Sources"
              subtitle="Where your applicants are coming from"
            >

              <div className="space-y-5">

                {candidateSources.map((source) => (

                  <div key={source.source}>

                    <div className="flex items-center justify-between mb-2">

                      <span className="text-sm text-white">
                        {source.source}
                      </span>

                      <div className="text-right">

                        <span className="text-sm font-semibold text-white">
                          {source.value}%
                        </span>

                        <span className="text-xs text-[#7D8597] ml-2">
                          ({source.applications})
                        </span>

                      </div>

                    </div>

                    <div className="w-full h-2 rounded-full bg-white/10 overflow-hidden">

                      <div
                        className="h-full rounded-full bg-gradient-to-r from-[#7B61FF] via-[#5EA2FF] to-[#2FE6FF]"
                        style={{
                          width: `${source.value}%`,
                        }}
                      />

                    </div>

                  </div>

                ))}

              </div>

            </SectionCard>

            {/* AI Matching */}

            <SectionCard
              title="AI Candidate Matching"
              subtitle="How effectively SwipeX AI is matching candidates"
            >

              <div className="flex items-center gap-8">

                <div className="relative w-36 h-36 shrink-0">

                  <div className="absolute inset-0 rounded-full border-[12px] border-white/10" />

                  <div
                    className="absolute inset-0 rounded-full border-[12px] border-transparent"
                    style={{
                      borderTopColor: "#7B61FF",
                      borderRightColor: "#5EA2FF",
                      borderBottomColor: "#2FE6FF",
                      transform: "rotate(25deg)",
                    }}
                  />

                  <div className="absolute inset-0 flex flex-col items-center justify-center">

                    <span className="text-3xl font-bold">
                      91%
                    </span>

                    <span className="text-xs text-[#7D8597]">
                      Avg. Match
                    </span>

                  </div>

                </div>

                <div className="flex-1 space-y-4">

                  <div className="flex items-center justify-between">

                    <span className="text-sm text-[#B7C0D8]">
                      High Match
                    </span>

                    <span className="text-sm font-semibold text-white">
                      68%
                    </span>

                  </div>

                  <div className="flex items-center justify-between">

                    <span className="text-sm text-[#B7C0D8]">
                      Medium Match
                    </span>

                    <span className="text-sm font-semibold text-white">
                      23%
                    </span>

                  </div>

                  <div className="flex items-center justify-between">

                    <span className="text-sm text-[#B7C0D8]">
                      Low Match
                    </span>

                    <span className="text-sm font-semibold text-white">
                      9%
                    </span>

                  </div>

                  <div className="pt-2">

                    <p className="text-xs text-[#7D8597]">
                      Candidates with 80%+ match are{" "}
                      <span className="text-[#2FE6FF]">
                        2.4x more likely
                      </span>{" "}
                      to reach interview stage.
                    </p>

                  </div>

                </div>

              </div>

            </SectionCard>

          </div>

          {/* ====================================================
              RECENT ACTIVITY
          ==================================================== */}

          <SectionCard
            title="Recent Hiring Activity"
            subtitle="Latest recruitment actions across your postings"
          >

            <div className="space-y-3">

              {hiringActivity.map((activity) => (

                <div
                  key={activity.title + activity.time}
                  className="flex items-center justify-between gap-4 rounded-[16px] bg-white/[0.03] border border-white/10 p-4 hover:border-white/20 transition-all duration-300"
                >

                  <div className="flex items-center gap-4 min-w-0">

                    <div className="w-10 h-10 shrink-0 rounded-xl bg-white/[0.06] border border-white/10 flex items-center justify-center">
                      {activity.icon}
                    </div>

                    <div className="min-w-0">

                      <p className="text-sm font-medium text-white">
                        {activity.title}
                      </p>

                      <p className="text-xs text-[#B7C0D8] mt-1 truncate">
                        {activity.description}
                      </p>

                    </div>

                  </div>

                  <span className="text-xs text-[#7D8597] whitespace-nowrap">
                    {activity.time}
                  </span>

                </div>

              ))}

            </div>

          </SectionCard>

        </main>

      </div>

    </div>
  );
}