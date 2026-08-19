import React, { useMemo, useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "../Components/Sidebar";

import {
  FiSearch,
  FiChevronDown,
  FiMapPin,
  FiDollarSign,
  FiCalendar,
  FiClock,
  FiCheckCircle,
  FiEye,
  FiActivity,
  FiAward,
  FiPercent,
  FiMessageSquare,
  FiSlash,
  FiZap,
  FiAlertCircle,
  FiCompass,
} from "react-icons/fi";

export default function Applications() {
  const [search, setSearch] = useState("");
  const [activeFilter, setActiveFilter] = useState("All Applications");
  const [sortBy, setSortBy] = useState("Recently Applied");
  const [sortOpen, setSortOpen] = useState(false);

  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  const [selectedApplication, setSelectedApplication] = useState(null);
  const [showDetails, setShowDetails] = useState(false);

  // =========================================================
  // FETCH APPLICATIONS
  // =========================================================

  const fetchApplications = async () => {
    try {
      setLoading(true);

      const token = localStorage.getItem("token");

if (!token) {
  console.error("No authentication token found.");
  setApplications([]);
  return;
}

const res = await axios.get(
  "http://localhost:8000/applications/my",
  {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
);

      console.log("API DATA:", res.data);

      const mappedApplications = res.data.map((app) => ({
        id: app.id,

        company: app.company_name || "Company",

        initials: (app.company_name || "C")
          .substring(0, 2)
          .toUpperCase(),

        jobTitle: app.job_title || "Job",

        type: "Full-Time Jobs",

        workMode: app.work_mode || "Remote",

        location: app.location || "India",

        pay: app.salary || "Not disclosed",

        appliedDate: app.applied_at,

        deadline: app.deadline || null,

        status: (() => {
          const status = (app.status || "Applied").toLowerCase();

          if (status.includes("reject")) return "Rejected";
          if (status.includes("select")) return "Selected";
          if (status.includes("shortlist")) return "Shortlisted";
          if (status.includes("interview")) return "Interview Scheduled";
          if (status.includes("assessment")) return "Assessment Pending";
          if (status.includes("offer")) return "Offer Received";
          if (status.includes("review")) return "Under Review";

          return "Applied";
        })(),

        stageIndex:
          app.status === "Applied"
            ? 0
            : app.status === "Under Review"
            ? 1
            : app.status === "Assessment Pending"
            ? 2
            : app.status === "Interview Scheduled"
            ? 3
            : app.status === "Offer Received"
            ? 4
            : app.status === "Accepted" || app.status === "Selected"
            ? 5
            : 0,

        skills: Array.isArray(app.skills) ? app.skills : [],

        description:
          app.description ||
          app.job_description ||
          "No job description available.",

        source: app.source || "SwipeX",

        match: app.match_score || 80,

        recruiterName: app.recruiter_name || null,

        recruiterEmail: app.recruiter_email || null,

        recruiterLinkedIn: app.recruiter_linkedin || null,
      }));

      setApplications(mappedApplications);
    } catch (err) {
      console.error("Error fetching applications:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  // =========================================================
  // WITHDRAW APPLICATION
  // =========================================================

  const handleWithdraw = (app) => {
    const confirmWithdraw = window.confirm(
      `Withdraw your application for ${app.jobTitle} at ${app.company}?`
    );

    if (!confirmWithdraw) return;

    setApplications((prev) =>
      prev.map((item) =>
        item.id === app.id
          ? {
              ...item,
              status: "Withdrawn",
              stageIndex: 0,
            }
          : item
      )
    );

    setSelectedApplication((prev) =>
      prev && prev.id === app.id
        ? {
            ...prev,
            status: "Withdrawn",
            stageIndex: 0,
          }
        : prev
    );
  };

  // =========================================================
  // FILTERS
  // =========================================================

  const filterChips = [
    "All Applications",
    "Applied",
    "Shortlisted",
    "Selected",
    "Under Review",
    "Assessment Pending",
    "Interview Scheduled",
    "Offer Received",
    "Accepted",
    "Rejected",
    "Withdrawn",
    "Internships",
    "Full-Time Jobs",
    "Part-Time Jobs",
    "Remote Roles",
    "Hackathons",
    "Fellowships",
    "Competitions",
    "Scholarships",
  ];

  const sortOptions = [
    "Recently Applied",
    "Deadline Soon",
    "Company Name",
    "Status",
  ];

  const stages = [
    "Applied",
    "Under Review",
    "Assessment",
    "Interview",
    "Offer",
    "Accepted",
  ];

  // =========================================================
  // STATS
  // =========================================================

  const interviewCount = applications.filter(
    (app) => app.status === "Interview Scheduled"
  ).length;

  const offerCount = applications.filter(
    (app) => app.status === "Offer Received"
  ).length;

  const acceptedCount = applications.filter(
    (app) =>
      app.status === "Accepted" ||
      app.status === "Selected"
  ).length;

  const rejectedCount = applications.filter(
    (app) => app.status === "Rejected"
  ).length;

  const successRate =
    applications.length > 0
      ? Math.round(
          ((acceptedCount + offerCount) /
            applications.length) *
            100
        )
      : 0;

  const statsCards = [
    {
      label: "Total Applications",
      value: applications.length,
      icon: (
        <FiActivity
          size={20}
          className="text-[#5EA2FF]"
        />
      ),
    },
    {
      label: "Interviews Scheduled",
      value: interviewCount,
      icon: (
        <FiCalendar
          size={20}
          className="text-[#2FE6FF]"
        />
      ),
    },
    {
      label: "Offers Received",
      value: offerCount,
      icon: (
        <FiAward
          size={20}
          className="text-[#7B61FF]"
        />
      ),
    },
    {
      label: "Success Rate",
      value: `${successRate}%`,
      icon: (
        <FiPercent
          size={20}
          className="text-[#4ADE80]"
        />
      ),
    },
  ];

  // =========================================================
  // STATIC ACTIVITY
  // =========================================================

  const activity = [
    {
      text: "Interview scheduled at Microsoft",
      time: "2 hours ago",
      icon: (
        <FiCalendar
          size={15}
          className="text-[#2FE6FF]"
        />
      ),
    },
    {
      text: "Application viewed by Google",
      time: "6 hours ago",
      icon: (
        <FiEye
          size={15}
          className="text-[#5EA2FF]"
        />
      ),
    },
    {
      text: "Assessment completed for Amazon",
      time: "Yesterday",
      icon: (
        <FiCheckCircle
          size={15}
          className="text-[#4ADE80]"
        />
      ),
    },
    {
      text: "Offer received from Adobe",
      time: "2 days ago",
      icon: (
        <FiAward
          size={15}
          className="text-[#7B61FF]"
        />
      ),
    },
    {
      text: "Application submitted to Flipkart",
      time: "3 days ago",
      icon: (
        <FiActivity
          size={15}
          className="text-[#B7C0D8]"
        />
      ),
    },
  ];

  // =========================================================
  // UPCOMING
  // =========================================================

  const upcoming = [
    {
      title: "Technical Interview — Microsoft",
      date: "24 July, 11:00 AM",
      type: "Interview",
      icon: (
        <FiCalendar
          size={16}
          className="text-[#2FE6FF]"
        />
      ),
    },
    {
      title: "Coding Assessment — Amazon SDE",
      date: "25 July, 6:00 PM",
      type: "Assessment",
      icon: (
        <FiZap
          size={16}
          className="text-[#7B61FF]"
        />
      ),
    },
    {
      title: "Application Deadline — Google STEP",
      date: "28 July, 11:59 PM",
      type: "Deadline",
      icon: (
        <FiAlertCircle
          size={16}
          className="text-[#FFB020]"
        />
      ),
    },
    {
      title: "HR Round — Adobe",
      date: "30 July, 3:30 PM",
      type: "Interview",
      icon: (
        <FiCalendar
          size={16}
          className="text-[#2FE6FF]"
        />
      ),
    },
  ];

  // =========================================================
  // STATUS STYLES
  // =========================================================

  const statusStyles = {
    Applied:
      "bg-[#5EA2FF]/15 text-[#5EA2FF] border-[#5EA2FF]/30",

    "Under Review":
      "bg-[#7B61FF]/15 text-[#A996FF] border-[#7B61FF]/30",

    "Assessment Pending":
      "bg-[#FFB020]/15 text-[#FFB020] border-[#FFB020]/30",

    "Interview Scheduled":
      "bg-[#2FE6FF]/15 text-[#2FE6FF] border-[#2FE6FF]/30",

    "Offer Received":
      "bg-[#4ADE80]/15 text-[#4ADE80] border-[#4ADE80]/30",

    Accepted:
      "bg-[#22C55E]/20 text-[#4ADE80] border-[#22C55E]/40",

    Rejected:
      "bg-[#FF5C5C]/15 text-[#FF8080] border-[#FF5C5C]/30",

    Withdrawn:
      "bg-white/10 text-[#B7C0D8] border-white/15",

    Shortlisted:
      "bg-[#38BDF8]/15 text-[#38BDF8] border-[#38BDF8]/30",

    Selected:
      "bg-[#22C55E]/20 text-[#4ADE80] border-[#22C55E]/40",
  };

  // =========================================================
  // FILTERED APPLICATIONS
  // =========================================================

  const filtered = useMemo(() => {
    let list = applications.filter((app) => {
      const searchValue = search.toLowerCase();

      const matchesSearch =
        search.trim() === "" ||
        app.company.toLowerCase().includes(searchValue) ||
        app.jobTitle.toLowerCase().includes(searchValue) ||
        app.type.toLowerCase().includes(searchValue);

      const matchesFilter =
        activeFilter === "All Applications" ||
        app.status === activeFilter ||
        app.type === activeFilter ||
        (activeFilter === "Remote Roles" &&
          app.workMode === "Remote");

      return matchesSearch && matchesFilter;
    });

    if (sortBy === "Recently Applied") {
      list = [...list].sort(
        (a, b) =>
          new Date(b.appliedDate) -
          new Date(a.appliedDate)
      );
    } else if (sortBy === "Deadline Soon") {
      list = [...list].sort(
        (a, b) =>
          new Date(a.deadline) -
          new Date(b.deadline)
      );
    } else if (sortBy === "Company Name") {
      list = [...list].sort((a, b) =>
        a.company.localeCompare(b.company)
      );
    } else if (sortBy === "Status") {
      list = [...list].sort((a, b) =>
        a.status.localeCompare(b.status)
      );
    }

    return list;
  }, [
    applications,
    search,
    activeFilter,
    sortBy,
  ]);

  // =========================================================
  // FORMAT DATE
  // =========================================================

  const formatDate = (d) => {
    if (!d) return "Not specified";

    const date = new Date(d);

    if (Number.isNaN(date.getTime())) {
      return "Not specified";
    }

    return date.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  // =========================================================
  // RENDER
  // =========================================================

  return (
    <div className="flex bg-[#050816]">
      <Sidebar />

      <main className="flex-1 min-h-screen overflow-y-auto">
        <div className="px-4 sm:px-6 lg:px-10 py-8 lg:py-12 text-white">

          {/* Header */}
          <div className="max-w-7xl mx-auto mb-8">
            <div className="flex items-center gap-2 mb-3">
              <span className="w-2 h-2 rounded-full bg-gradient-to-r from-[#7B61FF] to-[#2FE6FF] shadow-[0_0_12px_2px_rgba(47,230,255,0.6)]" />

              <span className="text-xs tracking-wide uppercase text-[#B7C0D8]">
                SwipeX
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-[#7B61FF] via-[#5EA2FF] to-[#2FE6FF] bg-clip-text text-transparent">
              My Applications
            </h1>

            <p className="mt-3 text-[#B7C0D8] max-w-2xl text-sm sm:text-base leading-relaxed">
              Track and manage all your job and opportunity
              applications from one place.
            </p>
          </div>

          {/* Stats */}
          <div className="max-w-7xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {statsCards.map((s) => (
              <div
                key={s.label}
                className="rounded-[20px] bg-white/5 border border-white/10 backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.3)] p-5 flex flex-col gap-3 hover:-translate-y-1 hover:border-[#5EA2FF]/40 transition-all duration-300"
              >
                <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center">
                  {s.icon}
                </div>

                <div>
                  <p className="text-xl sm:text-2xl font-semibold text-white">
                    {s.value}
                  </p>

                  <p className="text-xs text-[#B7C0D8]">
                    {s.label}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Search + Sort */}
          <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-4 mb-5">
            <div className="flex-1 flex items-center gap-3 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl px-4 py-3 focus-within:border-[#5EA2FF]/50 transition-all duration-300">
              <FiSearch
                size={18}
                className="text-[#B7C0D8]"
              />

              <input
                type="text"
                value={search}
                onChange={(e) =>
                  setSearch(e.target.value)
                }
                placeholder="Search by job title, company, or opportunity type..."
                className="w-full bg-transparent outline-none text-sm text-white placeholder:text-[#B7C0D8]/70"
              />
            </div>

            <div className="relative">
              <button
                onClick={() =>
                  setSortOpen((o) => !o)
                }
                className="w-full lg:w-56 flex items-center justify-between gap-3 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl px-4 py-3 text-sm hover:border-[#5EA2FF]/40 transition-all duration-300"
              >
                <span className="text-[#B7C0D8]">
                  Sort:{" "}
                  <span className="text-white">
                    {sortBy}
                  </span>
                </span>

                <FiChevronDown
                  size={16}
                  className={`text-[#B7C0D8] transition-transform duration-300 ${
                    sortOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {sortOpen && (
                <div className="absolute right-0 mt-2 w-full lg:w-56 rounded-2xl bg-[#0B1020] border border-white/10 backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.5)] overflow-hidden z-20">
                  {sortOptions.map((opt) => (
                    <button
                      key={opt}
                      onClick={() => {
                        setSortBy(opt);
                        setSortOpen(false);
                      }}
                      className={`w-full text-left px-4 py-3 text-sm hover:bg-white/5 transition-all duration-200 ${
                        sortBy === opt
                          ? "text-[#2FE6FF]"
                          : "text-[#B7C0D8]"
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Filter Chips */}
          <div className="max-w-7xl mx-auto flex flex-wrap gap-2 mb-8">
            {filterChips.map((chip) => (
              <button
                key={chip}
                onClick={() =>
                  setActiveFilter(chip)
                }
                className={`text-xs sm:text-sm px-4 py-2 rounded-full border transition-all duration-300 ${
                  activeFilter === chip
                    ? "bg-gradient-to-r from-[#7B61FF] via-[#5EA2FF] to-[#2FE6FF] text-white border-transparent shadow-[0_0_15px_rgba(94,162,255,0.35)]"
                    : "bg-white/5 text-[#B7C0D8] border-white/10 hover:bg-white/10 hover:text-white"
                }`}
              >
                {chip}
              </button>
            ))}
          </div>

          {/* =========================================================
              APPLICATION MANAGEMENT
          ========================================================= */}

          <div className="max-w-7xl mx-auto mb-10">
            <div className="rounded-[24px] bg-white/5 border border-white/10 backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.3)] overflow-hidden">

              {/* Header */}
              <div className="p-6 border-b border-white/10">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">

                  <div>
                    <h3 className="text-lg font-semibold text-white">
                      Application Management
                    </h3>

                    <p className="text-sm text-[#B7C0D8] mt-1">
                      View your complete application history and current status.
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-xs px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-[#B7C0D8]">
                      {applications.length} Total Applications
                    </span>
                  </div>

                </div>
              </div>

              {/* Table */}
              {loading ? (
                <div className="p-10 text-center text-[#B7C0D8]">
                  Loading applications...
                </div>
              ) : applications.length === 0 ? (
                <div className="p-10 text-center">

                  <div className="w-14 h-14 mx-auto rounded-2xl bg-gradient-to-br from-[#7B61FF] via-[#5EA2FF] to-[#2FE6FF] flex items-center justify-center mb-4">
                    <FiCompass
                      size={24}
                      className="text-white"
                    />
                  </div>

                  <p className="text-white font-semibold">
                    No applications yet
                  </p>

                  <p className="text-sm text-[#B7C0D8] mt-1">
                    Your applications will appear here once you start applying.
                  </p>

                </div>
              ) : (
                <div className="overflow-x-auto">

                  <table className="w-full min-w-[850px]">

                    <thead>
                      <tr className="border-b border-white/10 bg-white/[0.02]">

                        <th className="text-left px-6 py-4 text-[11px] uppercase tracking-wider text-[#B7C0D8] font-medium">
                          #
                        </th>

                        <th className="text-left px-4 py-4 text-[11px] uppercase tracking-wider text-[#B7C0D8] font-medium">
                          Company
                        </th>

                        <th className="text-left px-4 py-4 text-[11px] uppercase tracking-wider text-[#B7C0D8] font-medium">
                          Opportunity
                        </th>

                        <th className="text-left px-4 py-4 text-[11px] uppercase tracking-wider text-[#B7C0D8] font-medium">
                          Applied On
                        </th>

                        <th className="text-left px-4 py-4 text-[11px] uppercase tracking-wider text-[#B7C0D8] font-medium">
                          Type
                        </th>

                        <th className="text-left px-4 py-4 text-[11px] uppercase tracking-wider text-[#B7C0D8] font-medium">
                          Status
                        </th>

                        <th className="text-right px-6 py-4 text-[11px] uppercase tracking-wider text-[#B7C0D8] font-medium">
                          Action
                        </th>

                      </tr>
                    </thead>

                    <tbody>
                      {applications.map(
                        (app, index) => (
                          <tr
                            key={app.id}
                            className="border-b border-white/5 hover:bg-white/[0.03] transition-all duration-200"
                          >

                            {/* Number */}
                            <td className="px-6 py-4 text-sm text-[#B7C0D8]">
                              {index + 1}
                            </td>

                            {/* Company */}
                            <td className="px-4 py-4">
                              <div className="flex items-center gap-3">

                                <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-[#7B61FF]/30 via-[#5EA2FF]/30 to-[#2FE6FF]/30 border border-white/10 flex items-center justify-center text-xs font-semibold text-white">
                                  {app.initials}
                                </div>

                                <div>
                                  <p className="text-sm text-white font-medium">
                                    {app.company}
                                  </p>

                                  <p className="text-[11px] text-[#B7C0D8]">
                                    {app.source}
                                  </p>
                                </div>

                              </div>
                            </td>

                            {/* Opportunity */}
                            <td className="px-4 py-4">
                              <p className="text-sm text-white">
                                {app.jobTitle}
                              </p>

                              <p className="text-[11px] text-[#B7C0D8] mt-1">
                                {app.location} ·{" "}
                                {app.workMode}
                              </p>
                            </td>

                            {/* Applied Date */}
                            <td className="px-4 py-4">
                              <p className="text-sm text-white">
                                {formatDate(
                                  app.appliedDate
                                )}
                              </p>

                              <p className="text-[11px] text-[#B7C0D8] mt-1">
                                Application submitted
                              </p>
                            </td>

                            {/* Type */}
                            <td className="px-4 py-4">
                              <span className="text-xs px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[#B7C0D8]">
                                {app.type}
                              </span>
                            </td>

                            {/* Status */}
                            <td className="px-4 py-4">
                              <span
                                className={`text-[11px] px-3 py-1.5 rounded-full border whitespace-nowrap ${
                                  statusStyles[
                                    app.status
                                  ] ||
                                  "bg-white/10 text-[#B7C0D8] border-white/10"
                                }`}
                              >
                                {app.status}
                              </span>
                            </td>

                            {/* Action */}
                            <td className="px-6 py-4 text-right">
                              <button
                                onClick={() => {
                                  setSelectedApplication(
                                    app
                                  );
                                  setShowDetails(true);
                                }}
                                className="text-xs px-3 py-2 rounded-xl border border-white/10 text-[#B7C0D8] hover:text-white hover:bg-white/10 hover:border-[#5EA2FF]/40 transition-all duration-200"
                              >
                                <span className="inline-flex items-center gap-1.5">
                                  <FiEye size={13} />
                                  View
                                </span>
                              </button>
                            </td>

                          </tr>
                        )
                      )}
                    </tbody>

                  </table>
                </div>
              )}

            </div>
          </div>

          {/* Activity + Upcoming */}
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10">

            {/* Recent Activity */}
            <div className="rounded-[24px] bg-white/5 border border-white/10 backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.3)] p-6">

              <h3 className="text-sm font-semibold text-[#B7C0D8] uppercase tracking-wide mb-5">
                Recent Application Activity
              </h3>

              <div className="flex flex-col gap-4">

                {activity.map((a, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-3"
                  >

                    <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center shrink-0 mt-0.5">
                      {a.icon}
                    </div>

                    <div className="flex-1">
                      <p className="text-sm text-white">
                        {a.text}
                      </p>

                      <p className="text-xs text-[#B7C0D8] mt-0.5">
                        {a.time}
                      </p>
                    </div>

                  </div>
                ))}

              </div>
            </div>

            {/* Upcoming */}
            <div className="rounded-[24px] bg-white/5 border border-white/10 backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.3)] p-6">

              <h3 className="text-sm font-semibold text-[#B7C0D8] uppercase tracking-wide mb-5">
                Upcoming Deadlines &amp; Interviews
              </h3>

              <div className="flex flex-col gap-3">

                {upcoming.map((u, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between gap-3 p-3 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-[#5EA2FF]/40 hover:bg-white/[0.06] transition-all duration-300"
                  >

                    <div className="flex items-center gap-3">

                      <div className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                        {u.icon}
                      </div>

                      <div>
                        <p className="text-sm text-white">
                          {u.title}
                        </p>

                        <p className="text-xs text-[#B7C0D8] mt-0.5">
                          {u.date}
                        </p>
                      </div>

                    </div>

                    <span className="text-[10px] px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-[#B7C0D8] whitespace-nowrap">
                      {u.type}
                    </span>

                  </div>
                ))}

              </div>
            </div>

          </div>

          {/* Applications List */}
          <div className="max-w-7xl mx-auto">

            <div className="flex items-center justify-between mb-5">
              <h3 className="text-sm font-semibold text-[#B7C0D8] uppercase tracking-wide">
                {filtered.length} Application
                {filtered.length !== 1 ? "s" : ""}
              </h3>
            </div>

            {filtered.length === 0 ? (

              <div className="rounded-[24px] bg-white/5 border border-white/10 backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.3)] p-10 sm:p-16 flex flex-col items-center text-center">

                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#7B61FF] via-[#5EA2FF] to-[#2FE6FF] flex items-center justify-center mb-5 shadow-[0_0_25px_rgba(94,162,255,0.35)]">

                  <FiCompass
                    size={26}
                    className="text-white"
                  />

                </div>

                <h4 className="text-lg font-semibold text-white mb-2">
                  No applications found
                </h4>

                <p className="text-[#B7C0D8] text-sm max-w-md mb-6">
                  We couldn't find any applications matching
                  your search or filters. Explore new
                  opportunities on SwipeX and start applying
                  today.
                </p>

                <button className="px-6 py-3 rounded-2xl font-semibold text-white bg-gradient-to-r from-[#7B61FF] via-[#5EA2FF] to-[#2FE6FF] hover:brightness-110 hover:shadow-[0_0_25px_rgba(94,162,255,0.45)] transition-all duration-300 flex items-center gap-2">

                  <FiCompass size={18} />

                  Explore Opportunities

                </button>

              </div>

            ) : (

              <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">

                {filtered.map((app) => (

                  <div
                    key={app.id}
                    className="rounded-[24px] bg-white/5 border border-white/10 backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.3)] p-6 hover:border-[#5EA2FF]/40 hover:-translate-y-1 transition-all duration-300 flex flex-col gap-5"
                  >

                    {/* Top Row */}
                    <div className="flex items-start justify-between gap-4">

                      <div className="flex items-center gap-3">

                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#7B61FF]/30 via-[#5EA2FF]/30 to-[#2FE6FF]/30 border border-white/10 flex items-center justify-center font-semibold text-white shrink-0">
                          {app.initials}
                        </div>

                        <div>

                          <p className="text-base font-semibold text-white">
                            {app.jobTitle}
                          </p>

                          <p className="text-sm text-[#B7C0D8]">
                            {app.company}
                          </p>

                        </div>

                      </div>

                      <span
                        className={`text-[11px] sm:text-xs font-medium px-3 py-1.5 rounded-full border whitespace-nowrap ${
                          statusStyles[app.status] ||
                          "bg-white/10 text-[#B7C0D8] border-white/10"
                        }`}
                      >
                        {app.status}
                      </span>

                    </div>

                    {/* Meta */}
                    <div className="flex flex-wrap gap-x-5 gap-y-2 text-xs text-[#B7C0D8]">

                      <span className="flex items-center gap-1.5">
                        <FiMapPin size={13} />
                        {app.location} ·{" "}
                        {app.workMode}
                      </span>

                      <span className="flex items-center gap-1.5">
                        <FiDollarSign size={13} />
                        {app.pay}
                      </span>

                      <span className="flex items-center gap-1.5">
                        <FiCalendar size={13} />
                        Applied{" "}
                        {formatDate(
                          app.appliedDate
                        )}
                      </span>

                      <span className="flex items-center gap-1.5">
                        <FiClock size={13} />
                        Deadline{" "}
                        {formatDate(app.deadline)}
                      </span>

                    </div>

                    {/* Relevant Skills */}
                    <div>

                      <p className="text-xs font-semibold text-[#B7C0D8] uppercase tracking-wide mb-3">
                        Relevant Skills
                      </p>

                      <div className="flex flex-wrap gap-2">

                        {app.skills &&
                        app.skills.length > 0 ? (

                          app.skills.map(
                            (skill) => (
                              <span
                                key={skill}
                                className="text-[11px] px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-[#B7C0D8]"
                              >
                                {skill}
                              </span>
                            )
                          )

                        ) : (

                          <span className="text-xs text-[#B7C0D8]/60">
                            No relevant skills specified
                          </span>

                        )}

                      </div>

                    </div>

                    {/* Contact Recruiter */}
                    <div className="border-t border-white/10 mt-1 pt-4 flex justify-end">

                      <button
                        onClick={() => {
                          if (app.recruiterEmail) {
                            window.location.href =
                              `mailto:${app.recruiterEmail}?subject=Application for ${app.jobTitle}`;
                          } else {
                            alert(
                              "Recruiter contact information is not available."
                            );
                          }
                        }}
                        className="text-xs px-4 py-2 rounded-xl border border-white/15 text-white hover:bg-white/10 hover:border-[#2FE6FF]/40 transition-all duration-300 flex items-center gap-1.5"
                      >

                        <FiMessageSquare size={13} />

                        Contact Recruiter

                      </button>

                    </div>

                  </div>

                ))}

              </div>

            )}

          </div>

        </div>
      </main>

      {/* =========================================================
          APPLICATION DETAILS MODAL
      ========================================================= */}

      {showDetails && selectedApplication && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">

          <div className="w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-[24px] bg-[#0B1020] border border-white/10 shadow-[0_20px_80px_rgba(0,0,0,0.7)]">

            {/* Modal Header */}
            <div className="p-6 border-b border-white/10">

              <div className="flex items-start justify-between gap-4">

                <div className="flex items-center gap-4">

                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#7B61FF]/30 via-[#5EA2FF]/30 to-[#2FE6FF]/30 border border-white/10 flex items-center justify-center font-semibold text-white">
                    {selectedApplication.initials}
                  </div>

                  <div>

                    <h2 className="text-xl font-semibold text-white">
                      Application Progress
                    </h2>

                    <p className="text-sm text-[#B7C0D8] mt-1">
                      {selectedApplication.jobTitle} ·{" "}
                      {selectedApplication.company}
                    </p>

                  </div>

                </div>

                <button
                  onClick={() =>
                    setShowDetails(false)
                  }
                  className="text-[#B7C0D8] hover:text-white text-xl"
                >
                  ×
                </button>

              </div>

            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-7">

              {/* Current Status + Match */}
              <div className="flex items-center justify-between">

                <div>

                  <p className="text-xs uppercase tracking-wide text-[#B7C0D8]">
                    Current Status
                  </p>

                  <span
                    className={`inline-block mt-2 text-xs px-3 py-1.5 rounded-full border ${
                      statusStyles[
                        selectedApplication.status
                      ] ||
                      "bg-white/10 text-white border-white/10"
                    }`}
                  >
                    {selectedApplication.status}
                  </span>

                </div>

                <div className="text-right">

                  <p className="text-xs uppercase tracking-wide text-[#B7C0D8]">
                    Match Score
                  </p>

                  <p className="text-2xl font-bold text-[#2FE6FF] mt-1">
                    {selectedApplication.match}%
                  </p>

                </div>

              </div>

              {/* Application Info */}
              <div className="grid grid-cols-2 gap-4">

                <div className="p-4 rounded-2xl bg-white/5 border border-white/10">

                  <p className="text-xs text-[#B7C0D8]">
                    Applied On
                  </p>

                  <p className="text-sm text-white mt-1">
                    {formatDate(
                      selectedApplication.appliedDate
                    )}
                  </p>

                </div>

                <div className="p-4 rounded-2xl bg-white/5 border border-white/10">

                  <p className="text-xs text-[#B7C0D8]">
                    Deadline
                  </p>

                  <p className="text-sm text-white mt-1">
                    {formatDate(
                      selectedApplication.deadline
                    )}
                  </p>

                </div>

                <div className="p-4 rounded-2xl bg-white/5 border border-white/10">

                  <p className="text-xs text-[#B7C0D8]">
                    Location
                  </p>

                  <p className="text-sm text-white mt-1">
                    {selectedApplication.location}
                  </p>

                </div>

                <div className="p-4 rounded-2xl bg-white/5 border border-white/10">

                  <p className="text-xs text-[#B7C0D8]">
                    Work Mode
                  </p>

                  <p className="text-sm text-white mt-1">
                    {selectedApplication.workMode}
                  </p>

                </div>

              </div>

              {/* Application Progress */}
              <div>

                <h3 className="text-sm font-semibold text-white mb-5">
                  Application Progress
                </h3>

                <div className="flex items-center">

                  {stages.map(
                    (stage, index) => {

                      const done =
                        index <=
                        selectedApplication.stageIndex;

                      const failed =
                        selectedApplication.status ===
                          "Rejected" &&
                        index ===
                          selectedApplication.stageIndex;

                      return (
                        <React.Fragment
                          key={stage}
                        >

                          <div className="flex flex-col items-center">

                            <div
                              className={`w-4 h-4 rounded-full border-2 ${
                                failed
                                  ? "bg-[#FF5C5C] border-[#FF5C5C]"
                                  : done
                                  ? "bg-gradient-to-r from-[#7B61FF] to-[#2FE6FF] border-transparent"
                                  : "bg-[#0B1020] border-white/20"
                              }`}
                            />

                            <span
                              className={`text-[10px] mt-2 text-center ${
                                done
                                  ? "text-white"
                                  : "text-[#B7C0D8]/60"
                              }`}
                            >
                              {stage}
                            </span>

                          </div>

                          {index <
                            stages.length - 1 && (
                            <div
                              className={`flex-1 h-[2px] mx-2 ${
                                index <
                                selectedApplication.stageIndex
                                  ? "bg-gradient-to-r from-[#7B61FF] to-[#2FE6FF]"
                                  : "bg-white/10"
                              }`}
                            />
                          )}

                        </React.Fragment>
                      );
                    }
                  )}

                </div>

              </div>

              {/* Current Stage */}
              <div className="p-4 rounded-2xl bg-gradient-to-r from-[#7B61FF]/10 via-[#5EA2FF]/10 to-[#2FE6FF]/10 border border-[#5EA2FF]/20">

                <div className="flex items-center gap-3">

                  <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center">

                    <FiActivity
                      size={18}
                      className="text-[#2FE6FF]"
                    />

                  </div>

                  <div>

                    <p className="text-xs text-[#B7C0D8]">
                      Current Stage
                    </p>

                    <p className="text-sm font-semibold text-white mt-0.5">
                      {selectedApplication.status}
                    </p>

                  </div>

                </div>

              </div>

            </div>

            {/* Modal Footer */}
            <div className="p-6 border-t border-white/10 flex justify-between gap-3">

              <button
                onClick={() =>
                  setShowDetails(false)
                }
                className="px-4 py-2 rounded-xl border border-white/10 text-[#B7C0D8] text-sm hover:bg-white/5 hover:text-white transition-all"
              >
                Close
              </button>

              <button
                onClick={() =>
                  handleWithdraw(
                    selectedApplication
                  )
                }
                disabled={
                  selectedApplication.status ===
                    "Withdrawn" ||
                  selectedApplication.status ===
                    "Rejected" ||
                  selectedApplication.status ===
                    "Accepted"
                }
                className="px-4 py-2 rounded-xl border border-[#FF5C5C]/30 text-[#FF8080] text-sm flex items-center gap-2 hover:bg-[#FF5C5C]/10 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
              >

                <FiSlash size={14} />

                {selectedApplication.status ===
                "Withdrawn"
                  ? "Withdrawn"
                  : "Withdraw Application"}

              </button>

            </div>

          </div>
        </div>
      )}

    </div>
  );
}