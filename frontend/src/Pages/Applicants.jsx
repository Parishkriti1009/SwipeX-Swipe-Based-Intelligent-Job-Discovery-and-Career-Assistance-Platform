import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Search,
  Users,
  UserCheck,
  Clock,
  CheckCircle,
  MapPin,
  Briefcase,
  Star,
  Eye,
  Check,
  X,
} from "lucide-react";

import Sidebar from "../Components/Sidebar";

export default function Applicants() {
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [jobFilter, setJobFilter] = useState("All");

  const [applicants, setApplicants] = useState([]);
const [loadingApplicants, setLoadingApplicants] = useState(true);
const [applicantsError, setApplicantsError] = useState("");

// ---------------------------------------------------------
// Load real applications from backend
// ---------------------------------------------------------
const loadApplicants = async () => {
  try {
    setLoadingApplicants(true);
    setApplicantsError("");

    const token = localStorage.getItem("token");

    if (!token) {
      throw new Error("You are not logged in.");
    }

    const response = await fetch(
      "http://127.0.0.1:8000/applications/",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const data = await response.json();

    console.log("APPLICATIONS FROM BACKEND:", data);
    console.log(
  "FIRST APPLICATION FULL JSON:",
  JSON.stringify(data[0], null, 2)
);

    if (!response.ok) {
      throw new Error(
        data.detail || "Failed to load applications."
      );
    }

    const backendApplications = Array.isArray(data)
      ? data
      : data.applications || [];

    const formattedApplicants = backendApplications.map(
      (application) => ({
        id: application.id,
        userId: application.user_id,

       name: `Applicant #${application.user_id}`,

        email: `User ID: ${application.user_id}`,

       role: application.role || "Job Seeker",

        appliedFor:
          application.job?.title ||
          application.job_title ||
          "Unknown Job",

        jobId:
          application.job_id ||
          application.job?.id,

        location:
          application.job_seeker?.location ||
          application.location ||
          "Not specified",

        experience:
          application.job_seeker?.experience ||
          application.experience ||
          "Not specified",

        match:
          application.match_score ||
          application.match ||
          0,

        status:
          application.status ||
          "Under Review",

        applied:
          application.applied_at
            ? new Date(
                application.applied_at
              ).toLocaleDateString()
            : application.created_at
            ? new Date(
                application.created_at
              ).toLocaleDateString()
            : "Recently",

        skills:
  Array.isArray(application.job_seeker?.skills)
    ? application.job_seeker.skills
    : typeof application.job_seeker?.skills === "string"
    ? application.job_seeker.skills
        .split(",")
        .map((skill) => skill.trim())
    : Array.isArray(application.skills)
    ? application.skills
    : typeof application.skills === "string"
    ? application.skills
        .split(",")
        .map((skill) => skill.trim())
    : [],
      })
    );

    setApplicants(formattedApplicants);

  } catch (error) {
    console.error(
      "Error loading applicants:",
      error
    );

    setApplicantsError(
      error.message ||
        "Unable to load applicants."
    );
  } finally {
    setLoadingApplicants(false);
  }
};

useEffect(() => {
  loadApplicants();
}, []);

  // ---------------------------------------------------------
  // Filtering
  // ---------------------------------------------------------

  const filteredApplicants = applicants.filter((applicant) => {
  const searchValue = search.toLowerCase();

  const matchesSearch =
    (applicant.name || "")
      .toLowerCase()
      .includes(searchValue) ||
    (applicant.role || "")
      .toLowerCase()
      .includes(searchValue) ||
    (applicant.skills || []).some((skill) =>
      String(skill).toLowerCase().includes(searchValue)
    );

  const matchesStatus =
    statusFilter === "All" ||
    applicant.status === statusFilter;

  const matchesJob =
    jobFilter === "All" ||
    applicant.appliedFor === jobFilter;

  return matchesSearch && matchesStatus && matchesJob;
});

  // ---------------------------------------------------------
  // Applicant status
  // ---------------------------------------------------------

  const updateStatus = async (id, newStatus) => {
  try {
    const token = localStorage.getItem("token");

    if (!token) {
      throw new Error("You are not logged in.");
    }

    const response = await fetch(
      `http://127.0.0.1:8000/applications/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          status: newStatus,
        }),
      }
    );

    const data = await response.json();

    console.log("UPDATED APPLICATION:", data);

    if (!response.ok) {
      throw new Error(
        data.detail ||
          "Failed to update application status."
      );
    }

    setApplicants((current) =>
      current.map((applicant) =>
        applicant.id === id
          ? {
              ...applicant,
              status: newStatus,
            }
          : applicant
      )
    );

  } catch (error) {
    console.error(
      "Error updating application:",
      error
    );

    alert(
      error.message ||
        "Unable to update application status."
    );
  }
};
  // ---------------------------------------------------------
  // Statistics
  // ---------------------------------------------------------

  const totalApplicants = applicants.length;

  const shortlisted = applicants.filter(
    (a) => a.status === "Shortlisted"
  ).length;

  const interviews = applicants.filter(
    (a) => a.status === "Interview"
  ).length;

  const underReview = applicants.filter(
    (a) => a.status === "Under Review"
  ).length;

  // ---------------------------------------------------------
  // Status badge
  // ---------------------------------------------------------

  const statusStyle = (status) => {
    if (status === "Shortlisted") {
      return "bg-[#2FE6FF]/10 text-[#2FE6FF] border-[#2FE6FF]/30";
    }

    if (status === "Interview") {
      return "bg-[#7B61FF]/10 text-[#B7C0D8] border-[#7B61FF]/30";
    }

    if (status === "Rejected") {
      return "bg-red-500/10 text-red-300 border-red-500/20";
    }

    return "bg-white/[0.06] text-[#B7C0D8] border-white/10";
  };

  // ---------------------------------------------------------
  // Initials
  // ---------------------------------------------------------

  const getInitials = (name) => {
    return name
      .split(" ")
      .map((word) => word[0])
      .join("");
  };

  return (
    <div className="min-h-screen bg-[#050816] text-white relative overflow-x-hidden">

      {/* Background glow */}

      <div className="pointer-events-none fixed -top-32 -left-32 w-[28rem] h-[28rem] bg-[#7B61FF] opacity-20 blur-[120px] rounded-full" />

      <div className="pointer-events-none fixed top-1/3 -right-32 w-[26rem] h-[26rem] bg-[#2FE6FF] opacity-20 blur-[120px] rounded-full" />

      <div className="pointer-events-none fixed bottom-0 left-1/4 w-[22rem] h-[22rem] bg-[#5EA2FF] opacity-10 blur-[120px] rounded-full" />

      {/* Sidebar */}

      <Sidebar activePage="applicants" />

      {/* Main */}

      <div className="relative z-10 lg:ml-[264px]">

      {/* ---------------------------------------------------------
    TOP NAVBAR
--------------------------------------------------------- */}
<header className="sticky top-0 z-20 bg-[#050816]/70 backdrop-blur-xl border-b border-white/10 px-4 sm:px-8 py-4">

  <div className="flex items-center justify-between gap-4">

    {/* LEFT — Page title */}
    <div className="flex items-center gap-3 min-w-0">
      <div className="min-w-0">
        <p className="font-semibold truncate">
          Applicants
        </p>

        <p className="text-xs text-[#B7C0D8] hidden sm:block">
          Review and manage candidates
        </p>
      </div>
    </div>

    {/* CENTER — Search */}
    <div className="hidden md:flex items-center flex-1 max-w-md">
      <div className="w-full flex items-center gap-2 px-4 py-2 rounded-[16px] bg-white/[0.04] border border-white/10">

        <Search
          size={17}
          className="text-[#B7C0D8] shrink-0"
        />

        <input
          type="text"
          placeholder="Search applicants, jobs..."
          className="w-full bg-transparent outline-none text-sm text-white placeholder:text-[#B7C0D8]"
        />

      </div>
    </div>

    {/* RIGHT — Profile + Logout */}
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
        onClick={() => {
          localStorage.removeItem("token");
          localStorage.removeItem("user");
          navigate("/");
        }}
        className="flex items-center gap-2 px-4 py-2 rounded-[14px] bg-gradient-to-r from-[#7B61FF] via-[#5EA2FF] to-[#2FE6FF] text-sm font-medium hover:opacity-90 active:scale-[0.98] transition-all duration-200"
      >
        <span>🚪</span>
        <span className="hidden sm:inline">
          Logout
        </span>
      </button>

    </div>

  </div>

</header>

        {/* Page content */}

        <main className="p-4 sm:p-8">

          {/* Heading */}

          <div className="mb-8">

            <h1 className="text-3xl font-bold tracking-tight">
              Applicants
            </h1>

            <p className="text-[#B7C0D8] text-sm mt-1">
              Find, evaluate and manage candidates across your job postings.
            </p>

          </div>

          {/* Stats */}

          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 mb-8">

            {/* Total */}

            <div className="rounded-[22px] bg-white/[0.04] border border-white/10 backdrop-blur-xl p-5">

              <div className="flex items-center justify-between">

                <Users
                  size={22}
                  className="text-[#5EA2FF]"
                />

                <span className="text-xs text-[#B7C0D8]">
                  All applications
                </span>

              </div>

              <p className="text-3xl font-bold mt-4">
                {totalApplicants}
              </p>

              <p className="text-sm text-[#B7C0D8]">
                Total Applicants
              </p>

            </div>

            {/* Under Review */}

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
                {underReview}
              </p>

              <p className="text-sm text-[#B7C0D8]">
                Under Review
              </p>

            </div>

            {/* Shortlisted */}

            <div className="rounded-[22px] bg-white/[0.04] border border-white/10 backdrop-blur-xl p-5">

              <div className="flex items-center justify-between">

                <UserCheck
                  size={22}
                  className="text-[#2FE6FF]"
                />

                <span className="text-xs text-[#B7C0D8]">
                  Selected
                </span>

              </div>

              <p className="text-3xl font-bold mt-4">
                {shortlisted}
              </p>

              <p className="text-sm text-[#B7C0D8]">
                Shortlisted
              </p>

            </div>

            {/* Interviews */}

            <div className="rounded-[22px] bg-white/[0.04] border border-white/10 backdrop-blur-xl p-5">

              <div className="flex items-center justify-between">

                <CheckCircle
                  size={22}
                  className="text-[#5EA2FF]"
                />

                <span className="text-xs text-[#B7C0D8]">
                  Scheduled
                </span>

              </div>

              <p className="text-3xl font-bold mt-4">
                {interviews}
              </p>

              <p className="text-sm text-[#B7C0D8]">
                Interviews
              </p>

            </div>

          </div>

          {/* Search + Filters */}

          <div className="rounded-[22px] bg-white/[0.04] border border-white/10 backdrop-blur-xl p-4 mb-6">

            <div className="flex flex-col lg:flex-row gap-3">

              {/* Search */}

              <div className="relative flex-1">

                <Search
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-[#7D8597]"
                />

                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search applicants by name, role or skill..."
                  className="w-full bg-white/[0.04] border border-white/10 rounded-xl pl-11 pr-4 py-3 text-sm text-white placeholder:text-[#7D8597] outline-none focus:border-[#5EA2FF]/50"
                />

              </div>

              {/* Job filter */}

              {/* Job filter */}

<select
  value={jobFilter}
  onChange={(e) => setJobFilter(e.target.value)}
  className="bg-[#11172A] border border-white/10 rounded-xl px-4 py-3 text-sm text-white outline-none"
>
  <option value="All">
    All Jobs
  </option>

  {[...new Set(applicants.map((applicant) => applicant.appliedFor))]
    .filter(Boolean)
    .map((jobTitle) => (
      <option key={jobTitle} value={jobTitle}>
        {jobTitle}
      </option>
    ))}
</select>

              {/* Status filter */}

              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="bg-[#11172A] border border-white/10 rounded-xl px-4 py-3 text-sm text-white outline-none"
              >

                <option value="All">
                  All Status
                </option>

                <option value="Under Review">
                  Under Review
                </option>

                <option value="Shortlisted">
                  Shortlisted
                </option>

                <option value="Interview">
                  Interview
                </option>

                <option value="Rejected">
                  Rejected
                </option>

              </select>

            </div>

          </div>

          {/* Applicant list */}

          <div className="space-y-4">

            {filteredApplicants.length === 0 ? (

              <div className="rounded-[22px] bg-white/[0.04] border border-white/10 p-12 text-center">

                <Users
                  size={40}
                  className="mx-auto text-[#7D8597] mb-4"
                />

                <h3 className="text-lg font-semibold">
                  No applicants found
                </h3>

                <p className="text-sm text-[#B7C0D8] mt-1">
                  Try changing your search or filters.
                </p>

              </div>

            ) : (

              filteredApplicants.map((applicant) => (

                <div
                  key={applicant.id}
                  className="rounded-[22px] bg-white/[0.04] border border-white/10 backdrop-blur-xl p-5 sm:p-6 hover:border-white/20 transition-all"
                >

                  <div className="flex flex-col xl:flex-row xl:items-center gap-5">

                    {/* Applicant */}

                    <div className="flex items-start gap-4 flex-1">

                      <div className="w-12 h-12 shrink-0 rounded-full bg-gradient-to-br from-[#7B61FF] to-[#2FE6FF] flex items-center justify-center text-white font-semibold">

                        {getInitials(applicant.name)}

                      </div>

                      <div className="min-w-0">

                        <div className="flex flex-wrap items-center gap-2">

                          <h2 className="text-base font-semibold">
                            {applicant.name}
                          </h2>

                          <span
                            className={`text-xs px-2.5 py-1 rounded-full border ${statusStyle(
                              applicant.status
                            )}`}
                          >
                            {applicant.status}
                          </span>

                        </div>

                        <p className="text-sm text-[#B7C0D8] mt-1">
                          {applicant.role} • User ID: {applicant.userId}
                        </p>

                        <div className="flex flex-wrap gap-4 mt-3 text-xs text-[#B7C0D8]">

                          <span className="flex items-center gap-1.5">
                            <Briefcase size={13} />
                            {applicant.experience}
                          </span>

                          <span className="flex items-center gap-1.5">
                            <MapPin size={13} />
                            {applicant.location}
                          </span>

                          <span>
                            Applied {applicant.applied}
                          </span>

                        </div>

                        <p className="text-xs text-[#7D8597] mt-2">
                          Applied for{" "}
                          <span className="text-[#B7C0D8]">
                            {applicant.appliedFor}
                          </span>
                        </p>

                        {/* Skills */}

                        <div className="flex flex-wrap gap-2 mt-3">

                          {applicant.skills.map((skill) => (

                            <span
                              key={skill}
                              className="px-2.5 py-1 rounded-full text-xs bg-white/[0.05] border border-white/10 text-[#B7C0D8]"
                            >
                              {skill}
                            </span>

                          ))}

                        </div>

                      </div>

                    </div>

                    {/* Match score */}

                    <div className="xl:w-[150px]">

                      <div className="flex items-center justify-between mb-2">

                        <span className="text-xs text-[#B7C0D8]">
                          AI Match
                        </span>

                        <span className="flex items-center gap-1 text-sm font-semibold">
                          <Star
                            size={14}
                            className="text-[#2FE6FF]"
                            fill="currentColor"
                          />
                          {applicant.match}%
                        </span>

                      </div>

                      <div className="w-full h-2 rounded-full bg-white/10 overflow-hidden">

                        <div
                          className="h-full rounded-full bg-gradient-to-r from-[#7B61FF] via-[#5EA2FF] to-[#2FE6FF]"
                          style={{
                            width: `${applicant.match}%`,
                          }}
                        />

                      </div>

                      <p className="text-[11px] text-[#7D8597] mt-1">
                        Resume-job compatibility
                      </p>

                    </div>

                    {/* Actions */}

                    <div className="flex flex-wrap xl:flex-col gap-2 xl:min-w-[140px]">

                      <button
                        className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-white/[0.06] border border-white/10 text-sm hover:bg-white/[0.1] transition-all"
                      >
                        <Eye size={16} />
                        View Profile
                      </button>

                      {applicant.status !== "Shortlisted" &&
                        applicant.status !== "Rejected" && (

                          <button
                            onClick={() =>
                              updateStatus(
                                applicant.id,
                                "Shortlisted"
                              )
                            }
                            className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#2FE6FF]/10 border border-[#2FE6FF]/20 text-[#2FE6FF] text-sm hover:bg-[#2FE6FF]/20 transition-all"
                          >
                            <Check size={16} />
                            Shortlist
                          </button>

                        )}

                      {applicant.status !== "Rejected" && (

                        <button
                          onClick={() =>
                            updateStatus(
                              applicant.id,
                              "Rejected"
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