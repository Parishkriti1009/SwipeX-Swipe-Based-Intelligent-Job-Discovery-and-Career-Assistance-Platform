import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Added for routing
import axios from "axios";

/**
 * SwipeX — Login.jsx
 * Dark, futuristic, glassmorphism login page matching the SwipeX landing page
 * visual identity. Pure React + Tailwind CSS — no UI libraries, no router.
 */

/* ------------------------------ Icon set ------------------------------ */
/* Small inline SVGs so we avoid any icon/UI library dependency. */

const MailIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 7.5 12 13l9-5.5M4.5 5h15A1.5 1.5 0 0 1 21 6.5v11A1.5 1.5 0 0 1 19.5 19h-15A1.5 1.5 0 0 1 3 17.5v-11A1.5 1.5 0 0 1 4.5 5Z" />
  </svg>
);

const LockIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" {...props}>
    <rect x="5" y="10.5" width="14" height="9.5" rx="2.2" strokeLinecap="round" strokeLinejoin="round" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M8 10.5V7.8a4 4 0 1 1 8 0v2.7" />
  </svg>
);

const EyeIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12Z" />
    <circle cx="12" cy="12" r="3" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const EyeOffIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 3l18 18M10.6 5.7A10.9 10.9 0 0 1 12 5.5c6 0 9.5 6.5 9.5 6.5a15.6 15.6 0 0 1-3.1 3.9M6.6 6.6C4 8.3 2.5 12 2.5 12s3.5 6.5 9.5 6.5a9.9 9.9 0 0 0 3.9-.8M9.9 9.9a3 3 0 0 0 4.2 4.2" />
  </svg>
);

const AlertIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v4.2M12 16.7h.01M10.6 3.9 2.9 17.3a1.8 1.8 0 0 0 1.55 2.7h15.1a1.8 1.8 0 0 0 1.55-2.7L13.4 3.9a1.8 1.8 0 0 0-3.1 0Z" />
  </svg>
);

const CheckCircleIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" {...props}>
    <circle cx="12" cy="12" r="9" />
    <path strokeLinecap="round" strokeLinejoin="round" d="m8.2 12.3 2.5 2.5 5.1-5.6" />
  </svg>
);

const BriefcaseIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" {...props}>
    <rect x="3.2" y="7.5" width="17.6" height="11.5" rx="2" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M8.5 7.5V6a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v1.5M3.2 12.3h17.6" />
  </svg>
);

const UsersIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" {...props}>
    <circle cx="9" cy="8.5" r="3" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M2.8 19c.6-3 3-4.8 6.2-4.8s5.6 1.8 6.2 4.8M15.5 7.3a3 3 0 1 1 2.7 4.8M17.7 14.4c2.6.5 4.3 2 4.8 4.4" />
  </svg>
);

const ShieldIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 3.3 19.5 6v5.4c0 5-3.2 8.3-7.5 9.3-4.3-1-7.5-4.3-7.5-9.3V6L12 3.3Z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="m9 12.2 2.1 2.1L15.2 10" />
  </svg>
);

const SpinnerIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="none" className="animate-spin" {...props}>
    <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2.5" className="opacity-20" />
    <path d="M21 12a9 9 0 0 0-9-9" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
  </svg>
);

/* ------------------------------ Role config ---------------------------- */

const ROLES = [
  { id: "seeker", label: "Job Seeker", Icon: BriefcaseIcon },
  { id: "recruiter", label: "Recruiter", Icon: UsersIcon },
  { id: "admin", label: "Admin", Icon: ShieldIcon },
];

/* -------------------------------- Component ----------------------------- */

export default function Login() {
  const navigate = useNavigate(); // Hook definition
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("seeker");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({ email: "", password: "", general: "" });
  const [success, setSuccess] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 40);
    return () => clearTimeout(t);
  }, []);

  const roleIndex = ROLES.findIndex((r) => r.id === role);

  const validate = () => {
    const next = { email: "", password: "", general: "" };
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email.trim()) {
      next.email = "Email is required.";
    } else if (!emailRegex.test(email.trim())) {
      next.email = "Enter a valid email address.";
    }

    if (!password) {
      next.password = "Password is required.";
    } else if (password.length < 6) {
      next.password = "Password must be at least 6 characters.";
    }

    return next;
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  setSuccess(false);

  const nextErrors = validate();
  setErrors(nextErrors);

  if (nextErrors.email || nextErrors.password) return;

  setLoading(true);

  try {
    const response = await axios.post("http://127.0.0.1:8000/login", {
      email,
      password,
      role,
    });

    // Save JWT token
    localStorage.setItem("token", response.data.access_token);

    // Save user details
    localStorage.setItem(
      "user",
      JSON.stringify(response.data.user)
    );

    setSuccess(true);

    setTimeout(() => {
      navigate("/dashboard");
    }, 1000);

  } catch (error) {
    setErrors((prev) => ({
      ...prev,
      general:
        error.response?.data?.detail ||
        "Invalid email or password",
    }));
  } finally {
    setLoading(false);
  }
};

  const inputBaseClass =
    "w-full rounded-2xl bg-white/[0.04] border border-white/10 text-white placeholder-[#B7C0D8]/60 " +
    "px-4 py-3.5 text-sm outline-none transition-all duration-300 " +
    "focus:border-transparent focus:ring-2 focus:ring-[#5EA2FF]/60 focus:shadow-[0_0_24px_-4px_rgba(94,162,255,0.55)] " +
    "hover:border-white/20";

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-[#050816] flex items-center justify-center px-4 py-10 sm:py-16">
      {/* ---------------------------- Ambient glows ---------------------------- */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-32 -left-24 h-80 w-80 sm:h-96 sm:w-96 rounded-full bg-[#7B61FF]/30 blur-[110px]" />
        <div className="absolute -bottom-32 -right-24 h-80 w-80 sm:h-[26rem] sm:w-[26rem] rounded-full bg-[#2FE6FF]/20 blur-[120px]" />
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 h-72 w-72 rounded-full bg-[#5EA2FF]/10 blur-[130px]" />
      </div>

      {/* ------------------------------- Login card ----------------------------- */}
      <div
        className={
          "relative z-10 w-full max-w-md transition-all duration-700 ease-out " +
          (mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6")
        }
      >
        <div
          className="group relative rounded-[24px] border border-white/10 bg-white/[0.04] backdrop-blur-2xl
                     shadow-[0_0_60px_-15px_rgba(94,162,255,0.35)] px-6 py-9 sm:px-10 sm:py-11
                     transition-transform duration-500 hover:-translate-y-1"
        >
          {/* subtle top border glow accent */}
          <div className="absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-[#5EA2FF]/70 to-transparent" />

          {/* Logo / brand */}
          <div className="flex flex-col items-center mb-8">
            <div
              className="h-12 w-12 rounded-2xl bg-gradient-to-br from-[#7B61FF] via-[#5EA2FF] to-[#2FE6FF]
                         shadow-[0_0_30px_-6px_rgba(123,97,255,0.7)] flex items-center justify-center mb-4"
            >
              <span className="text-white font-bold text-lg tracking-tight">Sx</span>
            </div>
            <h1 className="text-2xl sm:text-[28px] font-semibold text-white tracking-tight">
              Welcome back to{" "}
              <span className="bg-gradient-to-r from-[#7B61FF] via-[#5EA2FF] to-[#2FE6FF] bg-clip-text text-transparent">
                SwipeX
              </span>
            </h1>
            <p className="mt-2 text-sm text-[#B7C0D8] text-center">
              Sign in to continue your intelligent job discovery journey.
            </p>
          </div>

          {/* General error banner */}
          {errors.general && (
            <div
              className="mb-5 flex items-start gap-3 rounded-2xl border border-red-400/30 bg-red-500/10
                         backdrop-blur-md px-4 py-3 animate-[fadeSlideIn_0.35s_ease-out]"
              role="alert"
            >
              <AlertIcon className="h-5 w-5 shrink-0 text-red-300 mt-0.5" />
              <p className="text-sm text-red-200 leading-snug">{errors.general}</p>
            </div>
          )}

          {/* Success banner */}
          {success && (
            <div
              className="mb-5 flex items-start gap-3 rounded-2xl border border-[#2FE6FF]/30 bg-[#2FE6FF]/10
                         backdrop-blur-md px-4 py-3 animate-[fadeSlideIn_0.35s_ease-out]"
              role="status"
            >
              <CheckCircleIcon className="h-5 w-5 shrink-0 text-[#7DEFFF] mt-0.5" />
              <p className="text-sm text-[#CFF9FF] leading-snug">
                Login successful! Redirecting you to your dashboard…
              </p>
            </div>
          )}

          <form onSubmit={handleSubmit} noValidate className="space-y-5">
            {/* Role selector — segmented control */}
            <div>
              <label className="block text-xs font-medium text-[#B7C0D8] mb-2 uppercase tracking-wide">
                I am signing in as
              </label>
              <div className="relative grid grid-cols-3 rounded-2xl border border-white/10 bg-white/[0.03] p-1">
                {/* Sliding gradient indicator */}
                <div
                  className="absolute top-1 bottom-1 left-1 w-[calc(33.333%-4px)] rounded-xl
                             bg-gradient-to-r from-[#7B61FF] via-[#5EA2FF] to-[#2FE6FF]
                             shadow-[0_0_18px_-2px_rgba(94,162,255,0.7)]
                             transition-transform duration-300 ease-out"
                  style={{ transform: `translateX(${roleIndex * 100}%)` }}
                />
                {ROLES.map((r) => {
                  const Icon = r.Icon;
                  const active = r.id === role;
                  return (
                    <button
                      key={r.id}
                      type="button"
                      onClick={() => setRole(r.id)}
                      className={
                        "relative z-10 flex flex-col items-center justify-center gap-1 rounded-xl py-2.5 px-1 " +
                        "text-[11px] sm:text-xs font-medium transition-colors duration-300 " +
                        (active ? "text-white" : "text-[#B7C0D8] hover:text-white/80")
                      }
                    >
                      <Icon className="h-4 w-4" />
                      <span className="whitespace-nowrap">{r.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Email field */}
            <div>
              <label htmlFor="email" className="block text-xs font-medium text-[#B7C0D8] mb-2 uppercase tracking-wide">
                Email
              </label>
              <div className="relative">
                <MailIcon className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 h-[18px] w-[18px] text-[#B7C0D8]" />
                <input
                  id="email"
                  type="email"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (errors.email) setErrors((prev) => ({ ...prev, email: "" }));
                  }}
                  placeholder="you@company.com"
                  className={inputBaseClass + " pl-11 " + (errors.email ? "border-red-400/60 focus:ring-red-400/50" : "")}
                />
              </div>
              {errors.email && (
                <p className="mt-1.5 text-xs text-red-300 animate-[fadeSlideIn_0.3s_ease-out]">{errors.email}</p>
              )}
            </div>

            {/* Password field */}
            <div>
              <label htmlFor="password" className="block text-xs font-medium text-[#B7C0D8] mb-2 uppercase tracking-wide">
                Password
              </label>
              <div className="relative">
                <LockIcon className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 h-[18px] w-[18px] text-[#B7C0D8]" />
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (errors.password) setErrors((prev) => ({ ...prev, password: "" }));
                  }}
                  placeholder="Enter your password"
                  className={inputBaseClass + " pl-11 pr-11 " + (errors.password ? "border-red-400/60 focus:ring-red-400/50" : "")}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#B7C0D8] hover:text-white
                             transition-colors duration-200 p-1"
                >
                  <span className="relative block h-[18px] w-[18px]">
                    <EyeIcon
                      className={
                        "absolute inset-0 h-[18px] w-[18px] transition-all duration-200 " +
                        (showPassword ? "opacity-0 scale-75 rotate-6" : "opacity-100 scale-100 rotate-0")
                      }
                    />
                    <EyeOffIcon
                      className={
                        "absolute inset-0 h-[18px] w-[18px] transition-all duration-200 " +
                        (showPassword ? "opacity-100 scale-100 rotate-0" : "opacity-0 scale-75 -rotate-6")
                      }
                    />
                  </span>
                </button>
              </div>
              {errors.password && (
                <p className="mt-1.5 text-xs text-red-300 animate-[fadeSlideIn_0.3s_ease-out]">{errors.password}</p>
              )}
            </div>

            {/* Submit button */}
            <button
              type="submit"
              disabled={loading}
              className="group/btn relative w-full mt-2 rounded-2xl px-4 py-3.5 font-semibold text-white text-sm
                         bg-gradient-to-r from-[#7B61FF] via-[#5EA2FF] to-[#2FE6FF] bg-[length:200%_100%]
                         shadow-[0_0_30px_-6px_rgba(94,162,255,0.6)]
                         transition-all duration-300 ease-out
                         hover:bg-[position:100%_0] hover:shadow-[0_0_40px_-4px_rgba(47,230,255,0.65)] hover:scale-[1.02]
                         active:scale-[0.98]
                         disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:scale-100"
            >
              <span className="flex items-center justify-center gap-2">
                {loading && <SpinnerIcon className="h-4 w-4" />}
                {loading ? "Signing in…" : "Log In"}
              </span>
            </button>
          </form>

          {/* Footer links with React Router navigation handling */}
          <div className="mt-8 flex flex-col items-center gap-3 text-sm">
            <p className="text-[#B7C0D8]">
              Don't have an account?{" "}
              <a
                href="#"
                onClick={(e) => { e.preventDefault(); navigate("/register"); }}
                className="font-medium text-transparent bg-clip-text bg-gradient-to-r from-[#7B61FF] via-[#5EA2FF] to-[#2FE6FF]
                           hover:opacity-80 transition-opacity duration-200"
              >
                Create Account
              </a>
            </p>
            <a
              href="#"
              onClick={(e) => { e.preventDefault(); navigate("/"); }}
              className="text-xs text-[#B7C0D8] hover:text-white transition-colors duration-200"
            >
              ← Back to Home
            </a>
          </div>
        </div>
      </div>

      {/* Local keyframes for banner entrance animation */}
      <style>{`
        @keyframes fadeSlideIn {
          from { opacity: 0; transform: translateY(-6px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}