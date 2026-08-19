import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  User,
  Lock,
  Bell,
  Shield,
  Eye,
  Mail,
  Smartphone,
  Save,
  LogOut,
  Trash2,
  ChevronRight,
} from "lucide-react";

import Sidebar from "../Components/Sidebar";

export default function Settings() {
  const navigate = useNavigate();

  // ---------------------------------------------------------
  // Current user
  // ---------------------------------------------------------
  const user = JSON.parse(localStorage.getItem("user")) || {};

  const role = user?.role || "jobSeeker";

  const roleLabel =
    role === "recruiter"
      ? "Recruiter"
      : role === "admin"
      ? "Administrator"
      : "Job Seeker";

  // ---------------------------------------------------------
  // Settings state
  // ---------------------------------------------------------
  const [fullName, setFullName] = useState(
    user?.name || user?.full_name || ""
  );

  const [email, setEmail] = useState(user?.email || "");

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [emailNotifications, setEmailNotifications] = useState(true);
  const [applicationNotifications, setApplicationNotifications] =
    useState(true);
  const [interviewNotifications, setInterviewNotifications] =
    useState(true);
  const [platformNotifications, setPlatformNotifications] =
    useState(false);

  const [profileVisibility, setProfileVisibility] = useState(true);
  const [showContact, setShowContact] = useState(false);

  const [message, setMessage] = useState("");

  // ---------------------------------------------------------
  // Save settings
  // ---------------------------------------------------------
  const handleSave = () => {
    const updatedUser = {
      ...user,
      name: fullName,
      full_name: fullName,
      email: email,
    };

    localStorage.setItem("user", JSON.stringify(updatedUser));

    setMessage("Settings saved successfully.");

    setTimeout(() => {
      setMessage("");
    }, 3000);
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
  // Delete account
  // ---------------------------------------------------------
  const handleDeleteAccount = () => {
    const confirmed = window.confirm(
      "Are you sure you want to delete your account? This action cannot be undone."
    );

    if (!confirmed) return;

    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/");
  };

  // ---------------------------------------------------------
  // Toggle component
  // ---------------------------------------------------------
  const Toggle = ({ enabled, onChange }) => {
    return (
      <button
        type="button"
        onClick={() => onChange(!enabled)}
        className={`relative w-11 h-6 rounded-full transition-all duration-300 ${
          enabled
            ? "bg-gradient-to-r from-[#7B61FF] via-[#5EA2FF] to-[#2FE6FF]"
            : "bg-white/10 border border-white/10"
        }`}
      >
        <span
          className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all duration-300 ${
            enabled ? "left-6" : "left-1"
          }`}
        />
      </button>
    );
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

      <Sidebar activePage="settings" />

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
                Settings
              </p>

              <p className="text-xs text-[#B7C0D8] hidden sm:block">
                Manage your account and preferences
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
            Page Content
        --------------------------------------------------- */}

        <main className="p-4 sm:p-8 max-w-6xl">

          {/* Heading */}

          <div className="mb-8">

            <h1 className="text-3xl font-bold tracking-tight">
              Settings
            </h1>

            <p className="text-[#B7C0D8] text-sm mt-1">
              Manage your account, notifications and privacy preferences.
            </p>

          </div>

          {/* Success message */}

          {message && (
            <div className="mb-6 px-4 py-3 rounded-xl bg-[#2FE6FF]/10 border border-[#2FE6FF]/20 text-[#2FE6FF] text-sm">
              {message}
            </div>
          )}

          {/* -------------------------------------------------
              ACCOUNT
          ------------------------------------------------- */}

          <section className="mb-8">

            <div className="flex items-center gap-3 mb-4">

              <div className="w-10 h-10 rounded-xl bg-[#7B61FF]/10 border border-[#7B61FF]/20 flex items-center justify-center">
                <User
                  size={19}
                  className="text-[#7B61FF]"
                />
              </div>

              <div>
                <h2 className="font-semibold">
                  Account
                </h2>

                <p className="text-xs text-[#7D8597]">
                  Manage your basic account information
                </p>
              </div>

            </div>

            <div className="rounded-[22px] bg-white/[0.04] border border-white/10 backdrop-blur-xl p-5 sm:p-6">

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                {/* Name */}

                <div>

                  <label className="block text-sm text-[#B7C0D8] mb-2">
                    Full Name
                  </label>

                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Enter your name"
                    className="w-full bg-white/[0.04] border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-[#7D8597] outline-none focus:border-[#5EA2FF]/50 transition-all"
                  />

                </div>

                {/* Email */}

                <div>

                  <label className="block text-sm text-[#B7C0D8] mb-2">
                    Email Address
                  </label>

                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="w-full bg-white/[0.04] border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-[#7D8597] outline-none focus:border-[#5EA2FF]/50 transition-all"
                  />

                </div>

                {/* Role */}

                <div>

                  <label className="block text-sm text-[#B7C0D8] mb-2">
                    Account Type
                  </label>

                  <div className="w-full bg-white/[0.025] border border-white/10 rounded-xl px-4 py-3 text-sm text-[#B7C0D8]">
                    {roleLabel}
                  </div>

                </div>

              </div>

            </div>

          </section>

          {/* -------------------------------------------------
              PASSWORD & SECURITY
          ------------------------------------------------- */}

          <section className="mb-8">

            <div className="flex items-center gap-3 mb-4">

              <div className="w-10 h-10 rounded-xl bg-[#5EA2FF]/10 border border-[#5EA2FF]/20 flex items-center justify-center">
                <Lock
                  size={19}
                  className="text-[#5EA2FF]"
                />
              </div>

              <div>
                <h2 className="font-semibold">
                  Password & Security
                </h2>

                <p className="text-xs text-[#7D8597]">
                  Keep your account secure
                </p>
              </div>

            </div>

            <div className="rounded-[22px] bg-white/[0.04] border border-white/10 backdrop-blur-xl p-5 sm:p-6">

              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">

                <div>

                  <label className="block text-sm text-[#B7C0D8] mb-2">
                    Current Password
                  </label>

                  <input
                    type="password"
                    value={currentPassword}
                    onChange={(e) =>
                      setCurrentPassword(e.target.value)
                    }
                    placeholder="Current password"
                    className="w-full bg-white/[0.04] border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-[#7D8597] outline-none focus:border-[#5EA2FF]/50"
                  />

                </div>

                <div>

                  <label className="block text-sm text-[#B7C0D8] mb-2">
                    New Password
                  </label>

                  <input
                    type="password"
                    value={newPassword}
                    onChange={(e) =>
                      setNewPassword(e.target.value)
                    }
                    placeholder="New password"
                    className="w-full bg-white/[0.04] border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-[#7D8597] outline-none focus:border-[#5EA2FF]/50"
                  />

                </div>

                <div>

                  <label className="block text-sm text-[#B7C0D8] mb-2">
                    Confirm Password
                  </label>

                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) =>
                      setConfirmPassword(e.target.value)
                    }
                    placeholder="Confirm password"
                    className="w-full bg-white/[0.04] border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-[#7D8597] outline-none focus:border-[#5EA2FF]/50"
                  />

                </div>

              </div>

              <p className="text-xs text-[#7D8597] mt-4">
                Password changes will be connected to your backend authentication system later.
              </p>

            </div>

          </section>

          {/* -------------------------------------------------
              NOTIFICATIONS
          ------------------------------------------------- */}

          <section className="mb-8">

            <div className="flex items-center gap-3 mb-4">

              <div className="w-10 h-10 rounded-xl bg-[#2FE6FF]/10 border border-[#2FE6FF]/20 flex items-center justify-center">
                <Bell
                  size={19}
                  className="text-[#2FE6FF]"
                />
              </div>

              <div>
                <h2 className="font-semibold">
                  Notifications
                </h2>

                <p className="text-xs text-[#7D8597]">
                  Choose which updates you want to receive
                </p>
              </div>

            </div>

            <div className="rounded-[22px] bg-white/[0.04] border border-white/10 backdrop-blur-xl divide-y divide-white/10">

              {/* Email */}

              <div className="flex items-center justify-between gap-4 p-5">

                <div className="flex items-center gap-4">

                  <Mail
                    size={18}
                    className="text-[#7D8597]"
                  />

                  <div>
                    <p className="text-sm font-medium">
                      Email Notifications
                    </p>

                    <p className="text-xs text-[#7D8597] mt-1">
                      Receive important updates through email
                    </p>
                  </div>

                </div>

                <Toggle
                  enabled={emailNotifications}
                  onChange={setEmailNotifications}
                />

              </div>

              {/* Applications */}

              <div className="flex items-center justify-between gap-4 p-5">

                <div className="flex items-center gap-4">

                  <Bell
                    size={18}
                    className="text-[#7D8597]"
                  />

                  <div>
                    <p className="text-sm font-medium">
                      Application Updates
                    </p>

                    <p className="text-xs text-[#7D8597] mt-1">
                      Get notified about application activity
                    </p>
                  </div>

                </div>

                <Toggle
                  enabled={applicationNotifications}
                  onChange={setApplicationNotifications}
                />

              </div>

              {/* Interviews */}

              <div className="flex items-center justify-between gap-4 p-5">

                <div className="flex items-center gap-4">

                  <Smartphone
                    size={18}
                    className="text-[#7D8597]"
                  />

                  <div>
                    <p className="text-sm font-medium">
                      Interview Notifications
                    </p>

                    <p className="text-xs text-[#7D8597] mt-1">
                      Receive reminders for interviews and meetings
                    </p>
                  </div>

                </div>

                <Toggle
                  enabled={interviewNotifications}
                  onChange={setInterviewNotifications}
                />

              </div>

              {/* Platform */}

              <div className="flex items-center justify-between gap-4 p-5">

                <div className="flex items-center gap-4">

                  <Mail
                    size={18}
                    className="text-[#7D8597]"
                  />

                  <div>
                    <p className="text-sm font-medium">
                      Platform Announcements
                    </p>

                    <p className="text-xs text-[#7D8597] mt-1">
                      Product updates, news and announcements
                    </p>
                  </div>

                </div>

                <Toggle
                  enabled={platformNotifications}
                  onChange={setPlatformNotifications}
                />

              </div>

            </div>

          </section>

          {/* -------------------------------------------------
              PRIVACY
          ------------------------------------------------- */}

          <section className="mb-8">

            <div className="flex items-center gap-3 mb-4">

              <div className="w-10 h-10 rounded-xl bg-[#7B61FF]/10 border border-[#7B61FF]/20 flex items-center justify-center">
                <Shield
                  size={19}
                  className="text-[#7B61FF]"
                />
              </div>

              <div>
                <h2 className="font-semibold">
                  Privacy
                </h2>

                <p className="text-xs text-[#7D8597]">
                  Control how your information is displayed
                </p>
              </div>

            </div>

            <div className="rounded-[22px] bg-white/[0.04] border border-white/10 backdrop-blur-xl divide-y divide-white/10">

              {/* Profile visibility */}

              <div className="flex items-center justify-between gap-4 p-5">

                <div className="flex items-center gap-4">

                  <Eye
                    size={18}
                    className="text-[#7D8597]"
                  />

                  <div>
                    <p className="text-sm font-medium">
                      Profile Visibility
                    </p>

                    <p className="text-xs text-[#7D8597] mt-1">
                      Allow other users to view your profile
                    </p>
                  </div>

                </div>

                <Toggle
                  enabled={profileVisibility}
                  onChange={setProfileVisibility}
                />

              </div>

              {/* Contact information */}

              <div className="flex items-center justify-between gap-4 p-5">

                <div className="flex items-center gap-4">

                  <User
                    size={18}
                    className="text-[#7D8597]"
                  />

                  <div>
                    <p className="text-sm font-medium">
                      Show Contact Information
                    </p>

                    <p className="text-xs text-[#7D8597] mt-1">
                      Allow your contact details to be visible
                    </p>
                  </div>

                </div>

                <Toggle
                  enabled={showContact}
                  onChange={setShowContact}
                />

              </div>

            </div>

          </section>

          {/* -------------------------------------------------
              SAVE
          ------------------------------------------------- */}

          <div className="flex justify-end mb-10">

            <button
              onClick={handleSave}
              className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-[#7B61FF] via-[#5EA2FF] to-[#2FE6FF] font-medium hover:opacity-90 active:scale-[0.98] transition-all"
            >
              <Save size={17} />
              Save Changes
            </button>

          </div>

          {/* -------------------------------------------------
              DANGER ZONE
          ------------------------------------------------- */}

          <section className="mb-10">

            <div className="flex items-center gap-3 mb-4">

              <div className="w-10 h-10 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center justify-center">
                <Trash2
                  size={19}
                  className="text-red-400"
                />
              </div>

              <div>
                <h2 className="font-semibold">
                  Danger Zone
                </h2>

                <p className="text-xs text-[#7D8597]">
                  Actions that permanently affect your account
                </p>
              </div>

            </div>

            <div className="rounded-[22px] bg-red-500/[0.03] border border-red-500/20 p-5 sm:p-6">

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">

                <div>
                  <p className="font-medium">
                    Delete Account
                  </p>

                  <p className="text-xs text-[#7D8597] mt-1">
                    Permanently remove your SwipeX account and associated data.
                  </p>
                </div>

                <button
                  onClick={handleDeleteAccount}
                  className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-red-500/10 border border-red-500/20 text-red-300 text-sm hover:bg-red-500/20 transition-all"
                >
                  <Trash2 size={16} />
                  Delete Account
                </button>

              </div>

            </div>

          </section>

        </main>

      </div>
    </div>
  );
}