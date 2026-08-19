import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Zap,
  LayoutDashboard,
  Search,
  Bookmark,
  FileText,
  ScanSearch,
  User,
  Settings,
  LogOut,
  Menu,
  X,
} from "lucide-react";

/**
 * Single source of truth for every nav item in the SwipeX sidebar.
 * Add/remove/reorder items here only — never hardcode buttons in JSX.
 *
 * `key`   -> matched against the `activePage` prop to determine active state
 * `label` -> visible text
 * `icon`  -> lucide-react component
 * `path`  -> react-router destination
 */
const NAV_ITEMS = {
  seeker: [
    { key: "dashboard", label: "Dashboard", icon: LayoutDashboard, path: "/dashboard" },
    { key: "jobs", label: "Discover Jobs", icon: Search, path: "/jobs" },
    { key: "saved-jobs", label: "Saved Jobs", icon: Bookmark, path: "/saved-jobs" },
    { key: "applications", label: "Applications", icon: FileText, path: "/applications" },
    { key: "resume-analysis", label: "Resume Analysis", icon: ScanSearch, path: "/resume-analysis" },
    { key: "profile", label: "Profile", icon: User, path: "/profile" },
    { key: "settings", label: "Settings", icon: Settings, path: "/settings" },
  ],

  recruiter: [
    { key: "dashboard", label: "Dashboard", icon: LayoutDashboard, path: "/dashboard" },
    { key: "posted-jobs", label: "Posted Jobs", icon: FileText, path: "/posted-jobs" },
    { key: "applicants", label: "Applicants", icon: User, path: "/applicants" },
    { key: "analytics", label: "Analytics", icon: ScanSearch, path: "/analytics" },
    { key: "company-profile", label: "Company Profile", icon: User, path: "/company-profile" },
    { key: "settings", label: "Settings", icon: Settings, path: "/settings" },
  ],

  admin: [
    { key: "dashboard", label: "Dashboard", icon: LayoutDashboard, path: "/dashboard" },
    { key: "users", label: "User Management", icon: User, path: "/users" },
    { key: "recruiters", label: "Recruiter Management", icon: User, path: "/recruiters" },
    { key: "jobs-management", label: "Job Management", icon: FileText, path: "/jobs-management" },
    { key: "reports", label: "Reports", icon: ScanSearch, path: "/reports" },
    { key: "settings", label: "Settings", icon: Settings, path: "/settings" },
  ],
};

const LOGOUT_ITEM = { key: "logout", label: "Logout", icon: LogOut, path: "/login" };
const ROLE_LABELS = {
  seeker: "Job Seeker",
  recruiter: "Recruiter",
  admin: "Administrator",
};

/**
 * SwipeX Sidebar
 * ------------------------------------------------------------------
 * Fully reusable, config-driven navigation sidebar.
 *
 * Usage:
 *   <Sidebar activePage="jobs" />
 *
 * Behavior:
 *  - Desktop (lg and up): fixed, always-visible left rail.
 *  - Mobile/tablet: collapsed by default, opened via a hamburger
 *    trigger, slides in as a drawer with a blurred backdrop.
 */
export default function Sidebar({ activePage }) {

  const user = JSON.parse(localStorage.getItem("user"));
  const role = user?.role || "jobSeeker";
  const navItems = NAV_ITEMS[role] || NAV_ITEMS.jobSeeker;
  const navigate = useNavigate();
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  // Close the mobile drawer automatically whenever the route changes
  useEffect(() => {
    setIsMobileOpen(false);
  }, [activePage]);

  // Prevent background scroll while the mobile drawer is open
  useEffect(() => {
    document.body.style.overflow = isMobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileOpen]);

  const handleNavigate = (path) => {

    if (path === "/login") {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
    }

    navigate(path);
    setIsMobileOpen(false);
};

  const renderNavButton = ({ key, label, icon: Icon, path }) => {
    const isActive = activePage === key;

    return (
      <button
        key={key}
        type="button"
        onClick={() => handleNavigate(path)}
        aria-current={isActive ? "page" : undefined}
        className={`
          group relative flex w-full items-center gap-3 rounded-xl px-4 py-3
          text-sm font-medium transition-all duration-300 ease-out
          ${
            isActive
              ? "text-white"
              : "text-[#B0B7C3] hover:text-white hover:bg-white/[0.06]"
          }
        `}
        style={
          isActive
            ? {
                background:
                  "linear-gradient(90deg, rgba(123,97,255,0.22) 0%, rgba(94,162,255,0.20) 55%, rgba(47,230,255,0.16) 100%)",
                boxShadow:
                  "inset 0 0 0 1px rgba(255,255,255,0.08), 0 0 24px rgba(94,162,255,0.18)",
              }
            : undefined
        }
      >
        {/* glowing left indicator for the active item */}
        {isActive && (
          <span
            className="absolute left-0 top-1/2 h-6 w-[3px] -translate-y-1/2 rounded-full"
            style={{
              background: "linear-gradient(180deg, #7B61FF, #5EA2FF, #2FE6FF)",
              boxShadow: "0 0 10px 2px rgba(94,162,255,0.65)",
            }}
          />
        )}

        <Icon
          size={19}
          strokeWidth={2}
          className={`shrink-0 transition-colors duration-300 ${
            isActive
              ? "text-[#5EA2FF] drop-shadow-[0_0_6px_rgba(94,162,255,0.55)]"
              : "text-[#7D8597] group-hover:text-[#B0B7C3]"
          }`}
        />
        <span className="truncate">{label}</span>
      </button>
    );
  };

  const SidebarContent = (
    <div
      className="flex h-full w-[264px] flex-col border-r"
      style={{
        background: "#0B1020",
        borderColor: "rgba(255,255,255,0.08)",
      }}
    >
      {/* Logo */}
      <div className="flex items-center gap-3 px-6 py-6">
        <div className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-xl">
          <div
            className="absolute inset-0 rounded-xl blur-md"
            style={{ background: "rgba(94,162,255,0.35)" }}
          />
          <div
            className="relative flex h-10 w-10 items-center justify-center rounded-xl"
            style={{
              background:
                "linear-gradient(135deg, #7B61FF 0%, #5EA2FF 55%, #2FE6FF 100%)",
            }}
          >
            <Zap size={20} className="text-white" fill="white" strokeWidth={0} />
          </div>
        </div>
        <div>
  <span className="text-lg font-semibold tracking-tight text-white">
    SwipeX
  </span>

  <p className="text-xs text-[#7D8597]">
    {(ROLE_LABELS[role] || "Job Seeker")} Portal
  </p>
</div>
      </div>

      {/* Nav items */}
      <nav className="flex-1 space-y-1.5 overflow-y-auto px-4 py-2">
        {navItems.map(renderNavButton)}
      </nav>

      {/* Logout, fixed at the bottom */}
      <div
        className="px-4 py-5"
        style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}
      >
        {renderNavButton(LOGOUT_ITEM)}
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile top bar with hamburger trigger */}
      <div
        className="flex items-center justify-between border-b px-4 py-3 lg:hidden"
        style={{
          background: "#0B1020",
          borderColor: "rgba(255,255,255,0.08)",
        }}
      >
        <div className="flex items-center gap-2">
          <div
            className="flex h-8 w-8 items-center justify-center rounded-lg"
            style={{
              background:
                "linear-gradient(135deg, #7B61FF 0%, #5EA2FF 55%, #2FE6FF 100%)",
            }}
          >
            <Zap size={16} className="text-white" fill="white" strokeWidth={0} />
          </div>
          <span className="text-base font-semibold text-white">SwipeX</span>
        </div>

        <button
          type="button"
          onClick={() => setIsMobileOpen(true)}
          aria-label="Open menu"
          className="rounded-lg p-2 text-[#B0B7C3] transition-colors hover:bg-white/[0.06] hover:text-white"
        >
          <Menu size={22} />
        </button>
      </div>

      {/* Desktop: fixed sidebar */}
      <aside className="fixed left-0 top-0 hidden h-screen lg:block">
        {SidebarContent}
      </aside>

      {/* Mobile: slide-out drawer + blurred backdrop */}
      <div
        className={`fixed inset-0 z-50 lg:hidden ${
          isMobileOpen ? "pointer-events-auto" : "pointer-events-none"
        }`}
        aria-hidden={!isMobileOpen}
      >
        {/* Backdrop */}
        <div
          onClick={() => setIsMobileOpen(false)}
          className={`absolute inset-0 backdrop-blur-sm transition-opacity duration-300 ${
            isMobileOpen ? "opacity-100" : "opacity-0"
          }`}
          style={{ background: "rgba(5,8,22,0.7)" }}
        />

        {/* Drawer */}
        <div
          className={`absolute left-0 top-0 h-full transition-transform duration-300 ease-out ${
            isMobileOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="relative h-full">
            <button
              type="button"
              onClick={() => setIsMobileOpen(false)}
              aria-label="Close menu"
              className="absolute right-3 top-3 z-10 rounded-lg p-2 text-[#B0B7C3] transition-colors hover:bg-white/[0.06] hover:text-white"
            >
              <X size={20} />
            </button>
            {SidebarContent}
          </div>
        </div>
      </div>

      {/* Spacer so page content isn't tucked under the fixed desktop sidebar */}
      <div className="hidden w-[264px] shrink-0 lg:block" aria-hidden="true" />
    </>
  );
}