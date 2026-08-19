import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../Components/Sidebar";

export default function CompanyProfile() {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const userName = user?.name || "Recruiter";

  const [company, setCompany] = useState({
    name: "Orbit Technologies",
    tagline: "Building the future with intelligent technology",
    industry: "Information Technology",
    size: "201-500 employees",
    location: "Bengaluru, India",
    website: "https://orbittechnologies.com",
    email: "careers@orbittechnologies.com",
    phone: "+91 98765 43210",
    description:
      "Orbit Technologies is a technology-driven company focused on building innovative digital products and intelligent solutions. We are committed to creating a collaborative environment where talented people can grow and build meaningful technology.",
  });

  const [saved, setSaved] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };

  const handleChange = (field, value) => {
    setCompany((prev) => ({
      ...prev,
      [field]: value,
    }));

    setSaved(false);
  };

  const handleSave = () => {
    setSaved(true);

    setTimeout(() => {
      setSaved(false);
    }, 3000);
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

      <Sidebar activePage="company-profile" />

      {/* =====================================================
          MAIN COLUMN
      ===================================================== */}

      <div className="relative z-10 lg:ml-[264px]">

        {/* ===================================================
            TOP NAVBAR
        =================================================== */}

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

          {/* Right */}
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

        {/* ===================================================
            MAIN CONTENT
        =================================================== */}

        <main className="p-4 sm:p-8">

          {/* Page Heading */}

          <div className="mb-7">

            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
              Company Profile
            </h1>

            <p className="text-[#B7C0D8] text-sm mt-1">
              Manage your company information and recruiter profile.
            </p>

          </div>

          {/* =================================================
              COMPANY HEADER
          ================================================= */}

          <div className="rounded-[22px] bg-white/[0.04] border border-white/10 backdrop-blur-xl p-6 sm:p-8 mb-6 shadow-[0_8px_30px_rgba(0,0,0,0.3)]">

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">

              {/* Company Logo */}

              <div className="relative">

                <div className="w-24 h-24 rounded-[22px] bg-gradient-to-br from-[#7B61FF] via-[#5EA2FF] to-[#2FE6FF] flex items-center justify-center text-4xl font-bold shadow-[0_0_30px_rgba(94,162,255,0.25)]">
                  {company.name.charAt(0)}
                </div>

                <button
                  type="button"
                  className="absolute -bottom-2 -right-2 w-9 h-9 rounded-full bg-[#151B31] border border-white/20 flex items-center justify-center text-sm hover:bg-white/10 transition"
                >
                  📷
                </button>

              </div>

              {/* Company Info */}

              <div className="flex-1">

                <div className="flex flex-wrap items-center gap-3">

                  <h2 className="text-2xl font-bold">
                    {company.name}
                  </h2>

                  <span className="px-3 py-1 rounded-full text-xs bg-[#2FE6FF]/10 border border-[#2FE6FF]/30 text-[#2FE6FF]">
                    ✓ Verified Company
                  </span>

                </div>

                <p className="text-[#B7C0D8] mt-2">
                  {company.tagline}
                </p>

                <div className="flex flex-wrap gap-4 mt-4 text-xs text-[#7D8597]">

                  <span>
                    🏢 {company.industry}
                  </span>

                  <span>
                    👥 {company.size}
                  </span>

                  <span>
                    📍 {company.location}
                  </span>

                </div>

              </div>

            </div>

          </div>

          {/* =================================================
              PROFILE FORM
          ================================================= */}

          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">

            {/* ===============================================
                BASIC INFORMATION
            =============================================== */}

            <div className="xl:col-span-2 rounded-[22px] bg-white/[0.04] border border-white/10 backdrop-blur-xl p-5 sm:p-6 shadow-[0_8px_30px_rgba(0,0,0,0.3)]">

              <div className="mb-6">

                <h2 className="text-lg font-semibold">
                  Company Information
                </h2>

                <p className="text-sm text-[#B7C0D8] mt-1">
                  Keep your company details up to date.
                </p>

              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">

                {/* Company Name */}

                <div>

                  <label className="block text-sm text-[#B7C0D8] mb-2">
                    Company Name
                  </label>

                  <input
                    value={company.name}
                    onChange={(e) =>
                      handleChange("name", e.target.value)
                    }
                    className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/10 outline-none text-sm text-white focus:border-[#5EA2FF]/60 transition"
                  />

                </div>

                {/* Industry */}

                <div>

                  <label className="block text-sm text-[#B7C0D8] mb-2">
                    Industry
                  </label>

                  <input
                    value={company.industry}
                    onChange={(e) =>
                      handleChange("industry", e.target.value)
                    }
                    className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/10 outline-none text-sm text-white focus:border-[#5EA2FF]/60 transition"
                  />

                </div>

                {/* Company Size */}

                <div>

                  <label className="block text-sm text-[#B7C0D8] mb-2">
                    Company Size
                  </label>

                  <select
                    value={company.size}
                    onChange={(e) =>
                      handleChange("size", e.target.value)
                    }
                    className="w-full px-4 py-3 rounded-xl bg-[#0B1020] border border-white/10 outline-none text-sm text-white focus:border-[#5EA2FF]/60 transition"
                  >
                    <option>1-10 employees</option>
                    <option>11-50 employees</option>
                    <option>51-200 employees</option>
                    <option>201-500 employees</option>
                    <option>501-1000 employees</option>
                    <option>1000+ employees</option>
                  </select>

                </div>

                {/* Location */}

                <div>

                  <label className="block text-sm text-[#B7C0D8] mb-2">
                    Location
                  </label>

                  <input
                    value={company.location}
                    onChange={(e) =>
                      handleChange("location", e.target.value)
                    }
                    className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/10 outline-none text-sm text-white focus:border-[#5EA2FF]/60 transition"
                  />

                </div>

                {/* Website */}

                <div>

                  <label className="block text-sm text-[#B7C0D8] mb-2">
                    Website
                  </label>

                  <input
                    value={company.website}
                    onChange={(e) =>
                      handleChange("website", e.target.value)
                    }
                    className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/10 outline-none text-sm text-white focus:border-[#5EA2FF]/60 transition"
                  />

                </div>

                {/* Email */}

                <div>

                  <label className="block text-sm text-[#B7C0D8] mb-2">
                    Careers Email
                  </label>

                  <input
                    type="email"
                    value={company.email}
                    onChange={(e) =>
                      handleChange("email", e.target.value)
                    }
                    className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/10 outline-none text-sm text-white focus:border-[#5EA2FF]/60 transition"
                  />

                </div>

                {/* Phone */}

                <div className="sm:col-span-2">

                  <label className="block text-sm text-[#B7C0D8] mb-2">
                    Contact Number
                  </label>

                  <input
                    value={company.phone}
                    onChange={(e) =>
                      handleChange("phone", e.target.value)
                    }
                    className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/10 outline-none text-sm text-white focus:border-[#5EA2FF]/60 transition"
                  />

                </div>

                {/* Tagline */}

                <div className="sm:col-span-2">

                  <label className="block text-sm text-[#B7C0D8] mb-2">
                    Company Tagline
                  </label>

                  <input
                    value={company.tagline}
                    onChange={(e) =>
                      handleChange("tagline", e.target.value)
                    }
                    className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/10 outline-none text-sm text-white focus:border-[#5EA2FF]/60 transition"
                  />

                </div>

                {/* Description */}

                <div className="sm:col-span-2">

                  <label className="block text-sm text-[#B7C0D8] mb-2">
                    About Company
                  </label>

                  <textarea
                    rows={6}
                    value={company.description}
                    onChange={(e) =>
                      handleChange("description", e.target.value)
                    }
                    className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/10 outline-none text-sm text-white placeholder:text-[#7D8597] focus:border-[#5EA2FF]/60 transition resize-none"
                  />

                  <p className="text-xs text-[#7D8597] mt-2">
                    A clear company description helps candidates understand your organization.
                  </p>

                </div>

              </div>

              {/* Save */}

              <div className="mt-7 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">

                <div>

                  {saved && (
                    <p className="text-sm text-[#2FE6FF]">
                      ✓ Company profile updated successfully
                    </p>
                  )}

                </div>

                <button
                  onClick={handleSave}
                  className="w-full sm:w-auto px-6 py-3 rounded-xl bg-gradient-to-r from-[#7B61FF] via-[#5EA2FF] to-[#2FE6FF] text-sm font-semibold hover:opacity-90 active:scale-[0.98] transition"
                >
                  Save Changes
                </button>

              </div>

            </div>

            {/* ===============================================
                PROFILE COMPLETION
            =============================================== */}

            <div className="space-y-6">

              {/* Completion */}

              <div className="rounded-[22px] bg-white/[0.04] border border-white/10 backdrop-blur-xl p-5 sm:p-6 shadow-[0_8px_30px_rgba(0,0,0,0.3)]">

                <h2 className="text-lg font-semibold">
                  Profile Strength
                </h2>

                <p className="text-sm text-[#B7C0D8] mt-1">
                  Complete your company profile to attract better candidates.
                </p>

                <div className="flex items-center justify-center my-7">

                  <div className="relative w-36 h-36">

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
                        86%
                      </span>

                      <span className="text-xs text-[#7D8597]">
                        Complete
                      </span>

                    </div>

                  </div>

                </div>

                <div className="space-y-3">

                  <div className="flex items-center justify-between text-sm">

                    <span className="text-[#B7C0D8]">
                      Basic information
                    </span>

                    <span className="text-[#2FE6FF]">
                      ✓
                    </span>

                  </div>

                  <div className="flex items-center justify-between text-sm">

                    <span className="text-[#B7C0D8]">
                      Company description
                    </span>

                    <span className="text-[#2FE6FF]">
                      ✓
                    </span>

                  </div>

                  <div className="flex items-center justify-between text-sm">

                    <span className="text-[#B7C0D8]">
                      Company logo
                    </span>

                    <span className="text-[#2FE6FF]">
                      ✓
                    </span>

                  </div>

                  <div className="flex items-center justify-between text-sm">

                    <span className="text-[#B7C0D8]">
                      Social links
                    </span>

                    <span className="text-[#7D8597]">
                      —
                    </span>

                  </div>

                </div>

              </div>

              {/* Verification */}

              <div className="rounded-[22px] bg-white/[0.04] border border-white/10 backdrop-blur-xl p-5 sm:p-6 shadow-[0_8px_30px_rgba(0,0,0,0.3)]">

                <div className="flex items-center gap-3">

                  <div className="w-10 h-10 rounded-xl bg-[#2FE6FF]/10 border border-[#2FE6FF]/20 flex items-center justify-center">
                    🛡️
                  </div>

                  <div>

                    <h3 className="text-sm font-semibold">
                      Verified Company
                    </h3>

                    <p className="text-xs text-[#7D8597] mt-1">
                      Your company is verified.
                    </p>

                  </div>

                </div>

                <div className="mt-5 rounded-xl bg-[#2FE6FF]/5 border border-[#2FE6FF]/20 p-3">

                  <p className="text-xs text-[#B7C0D8] leading-relaxed">
                    Verified companies receive higher visibility and increased candidate trust on SwipeX.
                  </p>

                </div>

              </div>

            </div>

          </div>

        </main>

      </div>

    </div>
  );
}