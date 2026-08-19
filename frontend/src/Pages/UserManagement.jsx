import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Search,
  Users,
  UserCheck,
  UserX,
  Shield,
  Eye,
  Ban,
  CheckCircle,
  Trash2,
  Briefcase,
} from "lucide-react";

import Sidebar from "../Components/Sidebar";

export default function UserManagement() {
  const navigate = useNavigate();

  // ---------------------------------------------------------
  // Temporary frontend data
  // Backend will be connected later.
  // ---------------------------------------------------------
  const [users, setUsers] = useState([
    {
      id: 1,
      name: "Ananya Sharma",
      email: "ananya.sharma@email.com",
      role: "Job Seeker",
      location: "Bengaluru, India",
      joined: "Aug 10, 2026",
      status: "Active",
      applications: 8,
    },
    {
      id: 2,
      name: "Rohan Mehta",
      email: "rohan.mehta@email.com",
      role: "Job Seeker",
      location: "Pune, India",
      joined: "Aug 8, 2026",
      status: "Active",
      applications: 5,
    },
    {
      id: 3,
      name: "Priya Nair",
      email: "priya.nair@email.com",
      role: "Job Seeker",
      location: "Mumbai, India",
      joined: "Aug 5, 2026",
      status: "Inactive",
      applications: 2,
    },
    {
      id: 4,
      name: "TechNova Solutions",
      email: "hr@technova.com",
      role: "Recruiter",
      location: "Delhi, India",
      joined: "Jul 28, 2026",
      status: "Active",
      applications: 0,
    },
    {
      id: 5,
      name: "Aarav Kapoor",
      email: "aarav.kapoor@email.com",
      role: "Job Seeker",
      location: "Hyderabad, India",
      joined: "Jul 25, 2026",
      status: "Active",
      applications: 12,
    },
    {
      id: 6,
      name: "Innovate Labs",
      email: "careers@innovatelabs.com",
      role: "Recruiter",
      location: "Bengaluru, India",
      joined: "Jul 20, 2026",
      status: "Active",
      applications: 0,
    },
    {
      id: 7,
      name: "Karan Verma",
      email: "karan.verma@email.com",
      role: "Job Seeker",
      location: "Noida, India",
      joined: "Jul 15, 2026",
      status: "Suspended",
      applications: 3,
    },
    {
      id: 8,
      name: "Meera Iyer",
      email: "meera.iyer@email.com",
      role: "Job Seeker",
      location: "Chennai, India",
      joined: "Jul 12, 2026",
      status: "Active",
      applications: 6,
    },
  ]);

  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");

  // ---------------------------------------------------------
  // Filtering
  // ---------------------------------------------------------
  const filteredUsers = users.filter((user) => {
    const searchValue = search.toLowerCase();

    const matchesSearch =
      user.name.toLowerCase().includes(searchValue) ||
      user.email.toLowerCase().includes(searchValue) ||
      user.location.toLowerCase().includes(searchValue);

    const matchesRole =
      roleFilter === "All" || user.role === roleFilter;

    const matchesStatus =
      statusFilter === "All" || user.status === statusFilter;

    return matchesSearch && matchesRole && matchesStatus;
  });

  // ---------------------------------------------------------
  // Statistics
  // ---------------------------------------------------------
  const totalUsers = users.length;

  const activeUsers = users.filter(
    (user) => user.status === "Active"
  ).length;

  const jobSeekers = users.filter(
    (user) => user.role === "Job Seeker"
  ).length;

  const recruiters = users.filter(
    (user) => user.role === "Recruiter"
  ).length;

  // ---------------------------------------------------------
  // Toggle active/inactive
  // ---------------------------------------------------------
  const toggleStatus = (id) => {
    setUsers((currentUsers) =>
      currentUsers.map((user) => {
        if (user.id !== id) return user;

        return {
          ...user,
          status:
            user.status === "Active"
              ? "Inactive"
              : "Active",
        };
      })
    );
  };

  // ---------------------------------------------------------
  // Suspend user
  // ---------------------------------------------------------
  const suspendUser = (id) => {
    setUsers((currentUsers) =>
      currentUsers.map((user) =>
        user.id === id
          ? { ...user, status: "Suspended" }
          : user
      )
    );
  };

  // ---------------------------------------------------------
  // Delete user
  // ---------------------------------------------------------
  const deleteUser = (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this user?"
    );

    if (!confirmed) return;

    setUsers((currentUsers) =>
      currentUsers.filter((user) => user.id !== id)
    );
  };

  // ---------------------------------------------------------
  // Status badge
  // ---------------------------------------------------------
  const statusStyle = (status) => {
    if (status === "Active") {
      return "bg-[#2FE6FF]/10 text-[#2FE6FF] border-[#2FE6FF]/30";
    }

    if (status === "Suspended") {
      return "bg-red-500/10 text-red-300 border-red-500/20";
    }

    return "bg-white/[0.06] text-[#B7C0D8] border-white/10";
  };

  // ---------------------------------------------------------
  // Role badge
  // ---------------------------------------------------------
  const roleStyle = (role) => {
    if (role === "Recruiter") {
      return "bg-[#7B61FF]/10 text-[#B7C0D8] border-[#7B61FF]/30";
    }

    return "bg-[#5EA2FF]/10 text-[#5EA2FF] border-[#5EA2FF]/20";
  };

  // ---------------------------------------------------------
  // Initials
  // ---------------------------------------------------------
  const getInitials = (name) => {
    return name
      .split(" ")
      .map((word) => word[0])
      .join("")
      .slice(0, 2)
      .toUpperCase();
  };

  return (
    <div className="min-h-screen bg-[#050816] text-white relative overflow-x-hidden">

      {/* -----------------------------------------------------
          Background glows
      ----------------------------------------------------- */}

      <div className="pointer-events-none fixed -top-32 -left-32 w-[28rem] h-[28rem] bg-[#7B61FF] opacity-20 blur-[120px] rounded-full" />

      <div className="pointer-events-none fixed top-1/3 -right-32 w-[26rem] h-[26rem] bg-[#2FE6FF] opacity-20 blur-[120px] rounded-full" />

      <div className="pointer-events-none fixed bottom-0 left-1/4 w-[22rem] h-[22rem] bg-[#5EA2FF] opacity-10 blur-[120px] rounded-full" />

      {/* -----------------------------------------------------
          Sidebar
      ----------------------------------------------------- */}

      <Sidebar activePage="users" />

      {/* -----------------------------------------------------
          Main
      ----------------------------------------------------- */}

      <div className="relative z-10 lg:ml-[264px]">

        {/* ---------------------------------------------------
            Upper Navbar
        --------------------------------------------------- */}

        <header className="sticky top-0 z-20 bg-[#050816]/70 backdrop-blur-xl border-b border-white/10 px-4 sm:px-8 py-4">

          <div className="flex items-center justify-between gap-4">

            <div>
              <p className="font-semibold">
                User Management
              </p>

              <p className="text-xs text-[#B7C0D8] hidden sm:block">
                Manage users and platform accounts
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

        {/* ---------------------------------------------------
            Page Content
        --------------------------------------------------- */}

        <main className="p-4 sm:p-8">

          {/* Heading */}

          <div className="mb-8">

            <h1 className="text-3xl font-bold tracking-tight">
              User Management
            </h1>

            <p className="text-[#B7C0D8] text-sm mt-1">
              Monitor and manage all users registered on SwipeX.
            </p>

          </div>

          {/* -------------------------------------------------
              Statistics
          ------------------------------------------------- */}

          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 mb-8">

            {/* Total */}

            <div className="rounded-[22px] bg-white/[0.04] border border-white/10 backdrop-blur-xl p-5">

              <div className="flex items-center justify-between">

                <Users
                  size={22}
                  className="text-[#5EA2FF]"
                />

                <span className="text-xs text-[#B7C0D8]">
                  Registered accounts
                </span>

              </div>

              <p className="text-3xl font-bold mt-4">
                {totalUsers}
              </p>

              <p className="text-sm text-[#B7C0D8]">
                Total Users
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
                {activeUsers}
              </p>

              <p className="text-sm text-[#B7C0D8]">
                Active Users
              </p>

            </div>

            {/* Job seekers */}

            <div className="rounded-[22px] bg-white/[0.04] border border-white/10 backdrop-blur-xl p-5">

              <div className="flex items-center justify-between">

                <Users
                  size={22}
                  className="text-[#7B61FF]"
                />

                <span className="text-xs text-[#B7C0D8]">
                  Candidate accounts
                </span>

              </div>

              <p className="text-3xl font-bold mt-4">
                {jobSeekers}
              </p>

              <p className="text-sm text-[#B7C0D8]">
                Job Seekers
              </p>

            </div>

            {/* Recruiters */}

            <div className="rounded-[22px] bg-white/[0.04] border border-white/10 backdrop-blur-xl p-5">

              <div className="flex items-center justify-between">

                <Briefcase
                  size={22}
                  className="text-[#5EA2FF]"
                />

                <span className="text-xs text-[#B7C0D8]">
                  Hiring accounts
                </span>

              </div>

              <p className="text-3xl font-bold mt-4">
                {recruiters}
              </p>

              <p className="text-sm text-[#B7C0D8]">
                Recruiters
              </p>

            </div>

          </div>

          {/* -------------------------------------------------
              Search + Filters
          ------------------------------------------------- */}

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
                  placeholder="Search users by name, email or location..."
                  className="w-full bg-white/[0.04] border border-white/10 rounded-xl pl-11 pr-4 py-3 text-sm text-white placeholder:text-[#7D8597] outline-none focus:border-[#5EA2FF]/50 transition-all"
                />

              </div>

              {/* Role */}

              <select
                value={roleFilter}
                onChange={(e) => setRoleFilter(e.target.value)}
                className="bg-[#11172A] border border-white/10 rounded-xl px-4 py-3 text-sm text-white outline-none"
              >
                <option value="All">
                  All Roles
                </option>

                <option value="Job Seeker">
                  Job Seekers
                </option>

                <option value="Recruiter">
                  Recruiters
                </option>
              </select>

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

                <option value="Inactive">
                  Inactive
                </option>

                <option value="Suspended">
                  Suspended
                </option>
              </select>

            </div>

          </div>

          {/* -------------------------------------------------
              User List
          ------------------------------------------------- */}

          <div className="space-y-4">

            {filteredUsers.length === 0 ? (

              <div className="rounded-[22px] bg-white/[0.04] border border-white/10 p-12 text-center">

                <Users
                  size={40}
                  className="mx-auto text-[#7D8597] mb-4"
                />

                <h3 className="text-lg font-semibold">
                  No users found
                </h3>

                <p className="text-sm text-[#B7C0D8] mt-1">
                  Try changing your search or filters.
                </p>

              </div>

            ) : (

              filteredUsers.map((user) => (

                <div
                  key={user.id}
                  className="rounded-[22px] bg-white/[0.04] border border-white/10 backdrop-blur-xl p-5 sm:p-6 hover:border-white/20 transition-all"
                >

                  <div className="flex flex-col xl:flex-row xl:items-center gap-5">

                    {/* User information */}

                    <div className="flex items-start gap-4 flex-1 min-w-0">

                      <div className="w-12 h-12 shrink-0 rounded-full bg-gradient-to-br from-[#7B61FF] to-[#2FE6FF] flex items-center justify-center text-white font-semibold">
                        {getInitials(user.name)}
                      </div>

                      <div className="min-w-0">

                        <div className="flex flex-wrap items-center gap-2">

                          <h2 className="text-base font-semibold">
                            {user.name}
                          </h2>

                          <span
                            className={`text-xs px-2.5 py-1 rounded-full border ${statusStyle(
                              user.status
                            )}`}
                          >
                            {user.status}
                          </span>

                          <span
                            className={`text-xs px-2.5 py-1 rounded-full border ${roleStyle(
                              user.role
                            )}`}
                          >
                            {user.role}
                          </span>

                        </div>

                        <p className="text-sm text-[#B7C0D8] mt-1 break-all">
                          {user.email}
                        </p>

                        <div className="flex flex-wrap gap-4 mt-3 text-xs text-[#B7C0D8]">

                          <span>
                            {user.location}
                          </span>

                          <span>
                            Joined {user.joined}
                          </span>

                          {user.role === "Job Seeker" && (
                            <span>
                              {user.applications} applications
                            </span>
                          )}

                        </div>

                      </div>

                    </div>

                    {/* Actions */}

                    <div className="flex flex-wrap xl:flex-col gap-2 xl:min-w-[155px]">

                      <button
                        className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-white/[0.06] border border-white/10 text-sm hover:bg-white/[0.1] transition-all"
                      >
                        <Eye size={16} />
                        View User
                      </button>

                      <button
                        onClick={() => toggleStatus(user.id)}
                        className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-white/[0.06] border border-white/10 text-sm hover:bg-white/[0.1] transition-all"
                      >

                        {user.status === "Active" ? (
                          <>
                            <UserX size={16} />
                            Deactivate
                          </>
                        ) : (
                          <>
                            <CheckCircle size={16} />
                            Activate
                          </>
                        )}

                      </button>

                      {user.status !== "Suspended" && (
                        <button
                          onClick={() => suspendUser(user.id)}
                          className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#7B61FF]/10 border border-[#7B61FF]/20 text-[#B7C0D8] text-sm hover:bg-[#7B61FF]/20 transition-all"
                        >
                          <Ban size={16} />
                          Suspend
                        </button>
                      )}

                      <button
                        onClick={() => deleteUser(user.id)}
                        className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-red-500/10 border border-red-500/20 text-red-300 text-sm hover:bg-red-500/20 transition-all"
                      >
                        <Trash2 size={16} />
                        Delete
                      </button>

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