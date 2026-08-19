import React, { useState, useEffect } from "react";
// 1. IMPORT THENUSE_NAVIGATE HOOK AT THE TOP
import { useNavigate } from "react-router-dom"; 
import { Bell } from "lucide-react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";
import Sidebar from "../Components/Sidebar";
import NotificationPanel from "../Components/NotificationPanel";

// ============================================================================
// SwipeX — Dashboard.jsx
// Milestone 1: Frontend-only, role-based dashboard (Job Seeker / Recruiter / Admin)
// Change the value below to preview each role's dashboard.
// ============================================================================


 export default function Dashboard() {
  // 2. INITIALIZE THE ROUTER NAVIGATION HOOK
  const navigate = useNavigate();
  useEffect(() => {
  const token = localStorage.getItem("token");

  if (!token) {
    navigate("/login");
  }
}, [navigate]);

useEffect(() => {
  const fetchHiringData = async () => {
    try {
      const token = localStorage.getItem("token");

      const headers = {
        Authorization: `Bearer ${token}`,
      };

      // Hiring visualisation
      const visualizationResponse = await fetch(
        "https://swipex-backend-pwin.onrender.com/dashboard/hiring-visualisation",
        {
          headers,
        }
      );

      if (!visualizationResponse.ok) {
        throw new Error("Failed to fetch hiring visualisation");
      }

      const visualizationData =
        await visualizationResponse.json();

      console.log(
        "HIRING VISUALIZATION:",
        visualizationData
      );

      setHiringVisualization({
  total_job_openings:
    visualizationData.total_job_openings || 0,

  most_demanded_roles:
    visualizationData.most_demanded_roles || [],

  company_hiring:
    visualizationData.company_hiring || [],

  startup_vs_mnc:
    visualizationData.startup_vs_mnc || {
      startup: 0,
      mnc: 0,
    },

  hiring_trends:
    visualizationData.hiring_trends || [],

  hiring_demand_distribution:
    visualizationData.hiring_demand_distribution || [],

  top_hiring_skills:
    visualizationData.top_hiring_skills || [],

  hiring_activity_over_time:
    visualizationData.hiring_activity_over_time || [],
});

     

    } catch (error) {
      console.error(
        "Hiring data error:",
        error
      );
    } finally {
      setHiringLoading(false);
    }
  };

  fetchHiringData();
}, []);


useEffect(() => {
  const fetchDashboardData = async () => {
    try {
      

      const token = localStorage.getItem("token");

const response = await fetch(
  "https://swipex-backend-pwin.onrender.com/dashboard/jobseeker",
  {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  }
);

      if (!response.ok) {
        throw new Error(
          "Failed to fetch job seeker dashboard"
        );
      }

      const data = await response.json();

      console.log(
        "JOBSEEKER DASHBOARD:",
        data
      );

      setDashboardData(data);

    } catch (error) {
      console.error(
        "Dashboard data error:",
        error
      );
    }
  };

  fetchDashboardData();
}, []);


useEffect(() => {
  const fetchNotifications = async () => {
    try {
      const token = localStorage.getItem("token");

      const loggedInUser = JSON.parse(
  localStorage.getItem("user") || "{}"
);

if (!loggedInUser.id) {
  console.error("User ID not found");
  return;
}

const response = await fetch(
  `https://swipex-backend-pwin.onrender.com/notifications/${loggedInUser.id}`,
  {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
);

      if (!response.ok) {
        throw new Error("Failed to fetch notifications");
      }

      const data = await response.json();

      console.log("NOTIFICATIONS:", data);

      // Handles either:
      // [ ...notifications ]
      // OR { notifications: [...] }
      setNotifications(
        Array.isArray(data)
          ? data
          : data.notifications || []
      );

    } catch (error) {
      console.error("Notifications error:", error);
      setNotifications([]);
    } finally {
      setNotificationsLoading(false);
    }
  };

  fetchNotifications();
}, []);

useEffect(() => {
  const fetchResumePerformance = async () => {
    try {
      const token = localStorage.getItem("token");

      const loggedInUser = JSON.parse(
        localStorage.getItem("user") || "{}"
      );

      console.log(
        "LOGGED IN USER:",
        loggedInUser
      );

      if (!loggedInUser.id) {
        console.error(
          "User ID not found in localStorage"
        );
        return;
      }

      const response = await fetch(
        `https://swipex-backend-pwin.onrender.com/dashboard/resume-performance/${loggedInUser.id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error(
          "Failed to fetch resume performance"
        );
      }

      const data = await response.json();

      console.log(
        "RESUME PERFORMANCE:",
        data
      );

      setResumePerformanceData(data);

    } catch (error) {
      console.error(
        "Resume performance error:",
        error
      );
    }
  };

  fetchResumePerformance();
}, []);



const user = JSON.parse(localStorage.getItem("user") || "{}");

const userName = user?.name || "User";
const role = user?.role || "jobSeeker";

  // A helper handler to deal with the routing and clearing auth state
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/"); // Redirect to landing page root
  };

  // ---------------------------------------------------------------------------
  // Role-based navigation config
  // ---------------------------------------------------------------------------
  

 
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [analyticsPeriod, setAnalyticsPeriod] = useState("week");

  const [hiringVisualization, setHiringVisualization] = useState({
  total_job_openings: 0,

  most_demanded_roles: [],
  company_hiring: [],

  startup_vs_mnc: {
    startup: 0,
    mnc: 0,
  },

  // These are used by the charts below
  hiring_trends: [],
  hiring_demand_distribution: [],
  top_hiring_skills: [],
  hiring_activity_over_time: [],
});


const [hiringLoading, setHiringLoading] = useState(true);



const [dashboardData, setDashboardData] = useState(null);
const [resumePerformanceData, setResumePerformanceData] = useState(null);

const [notifications, setNotifications] = useState([]);
const [notificationsLoading, setNotificationsLoading] = useState(true);

  const roleLabel = {
    jobSeeker: "Job Seeker",
    recruiter: "Recruiter",
    admin: "Administrator",
  }[role];

  // ---------------------------------------------------------------------------
  // Dummy data
  // ---------------------------------------------------------------------------
 const jobSeekerStats = [
  {
    label: "AI Match Score",
    value: "87%",
    icon: "🧠",
    sub: "AI-powered matching",
  },

  {
    label: "Applications Sent",
    value: dashboardData?.applications?.total || 0,
    icon: "📄",
    sub: `${dashboardData?.time_based?.this_week || 0} this week`,
  },

  {
    label: "Saved Jobs",
    value: dashboardData?.job_activity?.saved_jobs || 0,
    icon: "❤️",
    sub: "Saved opportunities",
  },

  {
    label: "Interview Invites",
    value: dashboardData?.applications?.interview || 0,
    icon: "🎉",
    sub: "Interview stage",
  },
];

  const recommendedJobs = [
    {
      company: "TechNova Inc.",
      role: "Senior Frontend Engineer",
      location: "Bengaluru, India",
      salary: "₹18L – ₹22L / yr",
      match: 94,
      skills: ["React", "TypeScript", "Tailwind CSS"],
    },
    {
      company: "Quantum Labs",
      role: "Full Stack Developer",
      location: "Remote",
      salary: "₹15L – ₹20L / yr",
      match: 89,
      skills: ["Node.js", "React", "MongoDB"],
    },
    {
      company: "NexGen Systems",
      role: "UI/UX Engineer",
      location: "Hyderabad, India",
      salary: "₹12L – ₹16L / yr",
      match: 85,
      skills: ["Figma", "React", "CSS"],
    },
    {
      company: "CloudSphere",
      role: "Backend Engineer",
      location: "Pune, India",
      salary: "₹16L – ₹21L / yr",
      match: 82,
      skills: ["Python", "Django", "AWS"],
    },
  ];



const unreadNotifications = notifications.filter(
  (notification) =>
    notification.unread === true ||
    notification.is_read === false
).length;

  

  // ---------------------------------------------------------------------------
// Phase 3 — Job Seeker Analytics
// ---------------------------------------------------------------------------

const applicationAnalytics = {
  week: {
    applied:
      dashboardData?.time_based?.this_week || 0,

    shortlisted:
  resumePerformanceData?.applications?.shortlisted || 0,

    interviews:
      dashboardData?.applications?.interview || 0,

    accepted:
      dashboardData?.applications?.accepted || 0,

    rejected:
      dashboardData?.applications?.rejected || 0,
  },

  month: {
    applied:
      dashboardData?.time_based?.this_month || 0,

    shortlisted:
  resumePerformanceData?.applications?.shortlisted || 0,

    interviews:
      dashboardData?.applications?.interview || 0,

    accepted:
      dashboardData?.applications?.accepted || 0,

    rejected:
      dashboardData?.applications?.rejected || 0,
  },
};

const resumePerformance = {
  totalApplied:
    resumePerformanceData?.total_applications || 0,

  screeningPassed:
    (resumePerformanceData?.applications?.shortlisted || 0) +
    (resumePerformanceData?.applications?.interview || 0) +
    (resumePerformanceData?.applications?.accepted || 0),

  shortlisted:
    resumePerformanceData?.applications?.shortlisted || 0,

  interviews:
    resumePerformanceData?.applications?.interview || 0,

  passRate:
    resumePerformanceData?.screening_success_rate || 0,

  status:
    resumePerformanceData?.performance ||
    "Needs Improvement",

  missingSkills: [],
};

const recommendationInsights = [
  { label: "Frontend / Developer", value: 42 },
  { label: "AI / ML", value: 28 },
  { label: "Data Science", value: 18 },
  { label: "Backend", value: 12 },
];









const chartColors = [
  "#7B61FF",
  "#5EA2FF",
  "#2FE6FF",
  "#A78BFA",
  "#64748B",
];

  const recruiterStats = [
    { label: "Active Job Posts", value: "8", icon: "📢", sub: "2 expiring this week" },
    { label: "Applicants", value: "142", icon: "👥", sub: "+18 this week" },
    { label: "Interviews Scheduled", value: "19", icon: "🗓️", sub: "6 today" },
    { label: "Hiring Rate", value: "32%", icon: "📈", sub: "+4% vs last month" },
  ];

  const recentApplicants = [
    { name: "Ananya Sharma", role: "Frontend Developer", match: 92, status: "Shortlisted" },
    { name: "Rohan Mehta", role: "Backend Engineer", match: 88, status: "Under Review" },
    { name: "Priya Nair", role: "Product Designer", match: 84, status: "Interview Set" },
    { name: "Karan Verma", role: "Data Analyst", match: 79, status: "Under Review" },
  ];

  const postedJobs = [
    { title: "Senior Frontend Engineer", applicants: 46, status: "Active" },
    { title: "Product Manager", applicants: 31, status: "Active" },
    { title: "DevOps Engineer", applicants: 22, status: "Paused" },
    { title: "UI/UX Designer", applicants: 18, status: "Active" },
  ];

  const hiringAnalytics = [
    { label: "Applied", value: 100 },
    { label: "Shortlisted", value: 62 },
    { label: "Interviewed", value: 38 },
    { label: "Hired", value: 14 },
  ];

  const adminStats = [
    { label: "Total Users", value: "12,480", icon: "👥", sub: "+320 this week" },
    { label: "Recruiters", value: "860", icon: "🏢", sub: "+15 this week" },
    { label: "Active Jobs", value: "1,240", icon: "💼", sub: "94 posted today" },
    { label: "Platform Health", value: "99.8%", icon: "🛡️", sub: "All systems normal" },
  ];

  const platformActivity = [
    { text: "New recruiter 'Orbit Technologies' registered", time: "5 min ago" },
    { text: "Job post 'Senior Backend Engineer' flagged for review", time: "22 min ago" },
    { text: "324 new job seekers onboarded today", time: "1 hr ago" },
    { text: "Platform-wide AI matching model updated to v2.3", time: "3 hrs ago" },
  ];

  const userStats = [
    { label: "Job Seekers", value: "10,920" },
    { label: "Verified Profiles", value: "8,410" },
    { label: "Active This Week", value: "6,205" },
  ];

  const recruiterStatsList = [
    { label: "Verified Companies", value: "702" },
    { label: "Pending Verification", value: "38" },
    { label: "Suspended", value: "6" },
  ];

  const jobModeration = [
    { title: "Backend Engineer @ ByteWorks", reason: "Salary details missing", status: "Pending" },
    { title: "Sales Executive @ Marko Retail", reason: "Reported by users", status: "Pending" },
    { title: "Data Scientist @ Insight Corp", reason: "Duplicate listing", status: "Resolved" },
  ];

  // ---------------------------------------------------------------------------
  // Small in-file presentational helpers
  // ---------------------------------------------------------------------------
  const GlowBackground = () => (
    <>
      <div className="pointer-events-none fixed -top-32 -left-32 w-[28rem] h-[28rem] bg-[#7B61FF] opacity-20 blur-[120px] rounded-full" />
      <div className="pointer-events-none fixed top-1/3 -right-32 w-[26rem] h-[26rem] bg-[#2FE6FF] opacity-20 blur-[120px] rounded-full" />
      <div className="pointer-events-none fixed bottom-0 left-1/4 w-[22rem] h-[22rem] bg-[#5EA2FF] opacity-10 blur-[120px] rounded-full" />
    </>
  );

  const GradientBar = ({ percent }) => (
    <div className="w-full h-2 rounded-full bg-white/10 overflow-hidden">
      <div
        className="h-full rounded-full bg-gradient-to-r from-[#7B61FF] via-[#5EA2FF] to-[#2FE6FF] transition-all duration-700"
        style={{ width: `${percent}%` }}
      />
    </div>
  );

  const AnalyticsBar = ({ label, value, max = 100 }) => (
  <div className="space-y-2">
    <div className="flex items-center justify-between">
      <span className="text-sm text-[#B7C0D8]">{label}</span>
      <span className="text-sm font-semibold text-white">{value}</span>
    </div>

    <div className="w-full h-2 rounded-full bg-white/10 overflow-hidden">
      <div
        className="h-full rounded-full bg-gradient-to-r from-[#7B61FF] via-[#5EA2FF] to-[#2FE6FF]"
        style={{ width: `${Math.min((value / max) * 100, 100)}%` }}
      />
    </div>
  </div>
);

  const StatCard = ({ label, value, icon, sub }) => (
    <div className="rounded-[22px] bg-white/[0.04] border border-white/10 backdrop-blur-xl p-5 sm:p-6 hover:-translate-y-1 hover:border-white/20 transition-all duration-300 shadow-[0_8px_30px_rgba(0,0,0,0.3)]">
      <div className="flex items-center justify-between">
        <span className="text-2xl">{icon}</span>
        <span className="text-xs text-[#B7C0D8]">{sub}</span>
      </div>
      <p className="mt-4 text-3xl font-bold text-white tracking-tight">{value}</p>
      <p className="mt-1 text-sm text-[#B7C0D8]">{label}</p>
    </div>
  );

  const Pill = ({ children }) => (
    <span className="px-3 py-1 rounded-full text-xs bg-white/[0.06] border border-white/10 text-[#B7C0D8]">
      {children}
    </span>
  );

  const SectionCard = ({ title, subtitle, children, className = "" }) => (
    <div
      className={`rounded-[22px] bg-white/[0.04] border border-white/10 backdrop-blur-xl p-5 sm:p-6 shadow-[0_8px_30px_rgba(0,0,0,0.3)] ${className}`}
    >
      <div className="mb-5">
        <h3 className="text-white font-semibold text-lg">{title}</h3>
        {subtitle && <p className="text-[#B7C0D8] text-sm mt-0.5">{subtitle}</p>}
      </div>
      {children}
    </div>
  );

  // ---------------------------------------------------------------------------
  // Role-specific dashboards
  // ---------------------------------------------------------------------------
  const JobSeekerDashboard = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
        {jobSeekerStats.map((s) => (
          <StatCard key={s.label} {...s} />
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6">
        <SectionCard
          title="Recommended Jobs"
          subtitle="Curated by SwipeX AI based on your profile"
          className="w-full"
        >
          <div className="grid sm:grid-cols-2 gap-4">
            {recommendedJobs.map((job) => (
              <div
                key={job.company}
                className="rounded-[20px] bg-white/[0.03] border border-white/10 p-4 hover:-translate-y-1 hover:border-white/20 transition-all duration-300"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-white font-semibold">{job.role}</p>
                    <p className="text-[#B7C0D8] text-sm">{job.company}</p>
                  </div>
                  <span className="text-xs font-semibold px-2 py-1 rounded-full bg-gradient-to-r from-[#7B61FF] via-[#5EA2FF] to-[#2FE6FF] text-white shrink-0">
                    {job.match}% match
                  </span>
                </div>
                <div className="mt-3 flex items-center gap-3 text-xs text-[#B7C0D8]">
                  <span>📍 {job.location}</span>
                  <span>💰 {job.salary}</span>
                </div>
                <div className="mt-3 flex flex-wrap gap-2">
                  {job.skills.map((sk) => (
                    <Pill key={sk}>{sk}</Pill>
                  ))}
                </div>
                <button className="mt-4 w-full py-2 rounded-xl bg-gradient-to-r from-[#7B61FF] via-[#5EA2FF] to-[#2FE6FF] text-white text-sm font-medium hover:opacity-90 active:scale-[0.98] transition-all duration-200">
                  Apply Now
                </button>
              </div>
            ))}
          </div>
        </SectionCard>

        
      </div>
       {/* ================================================================
          PHASE 3 — ANALYTICS
          ================================================================ */}

      {/* Application Analytics */}
      <SectionCard
        title="Application Analytics"
        subtitle="Track your application performance over time"
      >
        <div className="flex justify-end mb-5">
          <div className="flex gap-1 p-1 rounded-xl bg-white/[0.04] border border-white/10">
            <button
              onClick={() => setAnalyticsPeriod("week")}
              className={`px-4 py-1.5 rounded-lg text-xs font-medium transition-all ${
                analyticsPeriod === "week"
                  ? "bg-gradient-to-r from-[#7B61FF] to-[#2FE6FF] text-white"
                  : "text-[#B7C0D8] hover:text-white"
              }`}
            >
              This Week
            </button>

            <button
              onClick={() => setAnalyticsPeriod("month")}
              className={`px-4 py-1.5 rounded-lg text-xs font-medium transition-all ${
                analyticsPeriod === "month"
                  ? "bg-gradient-to-r from-[#7B61FF] to-[#2FE6FF] text-white"
                  : "text-[#B7C0D8] hover:text-white"
              }`}
            >
              This Month
            </button>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {[
            {
              label: "Applied",
              value: applicationAnalytics[analyticsPeriod].applied,
              icon: "📄",
            },
            {
              label: "Shortlisted",
              value: applicationAnalytics[analyticsPeriod].shortlisted,
              icon: "⭐",
            },
            {
              label: "Interviews",
              value: applicationAnalytics[analyticsPeriod].interviews,
              icon: "🎯",
            },
            {
              label: "Accepted",
              value: applicationAnalytics[analyticsPeriod].accepted,
              icon: "🎉",
            },
            {
              label: "Rejected",
              value: applicationAnalytics[analyticsPeriod].rejected,
              icon: "❌",
            },
          ].map((item) => (
            <div
              key={item.label}
              className="rounded-[16px] bg-white/[0.03] border border-white/10 p-4"
            >
              <div className="text-xl">{item.icon}</div>

              <p className="mt-3 text-2xl font-bold text-white">
                {item.value}
              </p>

              <p className="text-xs text-[#B7C0D8] mt-1">
                {item.label}
              </p>
            </div>
          ))}
        </div>
      </SectionCard>


      {/* Resume Performance + Recommendation Insights */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">

        {/* Resume Performance */}
        <SectionCard
          title="Resume Performance"
          subtitle="How your resume performs across applications"
        >
          <div className="grid grid-cols-2 gap-4 mb-6">

            <div className="rounded-[16px] bg-white/[0.03] border border-white/10 p-4">
              <p className="text-xs text-[#B7C0D8]">
                Jobs Applied
              </p>
              <p className="text-2xl font-bold text-white mt-2">
                {resumePerformance.totalApplied}
              </p>
            </div>

            <div className="rounded-[16px] bg-white/[0.03] border border-white/10 p-4">
              <p className="text-xs text-[#B7C0D8]">
                Screening Passed
              </p>
              <p className="text-2xl font-bold text-white mt-2">
                {resumePerformance.screeningPassed}
              </p>
            </div>

          </div>

          <div className="mb-5">
            <div className="flex justify-between mb-2">
              <span className="text-sm text-[#B7C0D8]">
                Screening Pass Rate
              </span>

              <span className="text-sm font-semibold text-white">
                {resumePerformance.passRate}%
              </span>
            </div>

            <GradientBar percent={resumePerformance.passRate} />
          </div>

          <div className="mb-5">
            <div className="flex items-center justify-between">
              <span className="text-sm text-[#B7C0D8]">
                Resume Performance
              </span>

              <span className="px-3 py-1 rounded-full text-xs bg-[#7B61FF]/10 border border-[#7B61FF]/30 text-[#B7C0D8]">
                {resumePerformance.status}
              </span>
            </div>
          </div>

          <div>
  <p className="text-sm text-[#B7C0D8] mb-3">
    Resume Insights
  </p>

  {resumePerformanceData?.suggestions?.length > 0 ? (
    <div className="space-y-2">
      {resumePerformanceData.suggestions.map(
        (suggestion, index) => (
          <div
            key={index}
            className="text-sm text-white/90 flex gap-2"
          >
            <span className="text-[#7B61FF]">
              ✦
            </span>

            <span>{suggestion}</span>
          </div>
        )
      )}
    </div>
  ) : (
    <p className="text-sm text-[#7D8597]">
      Apply to more jobs to generate resume insights.
    </p>
  )}
</div>
        </SectionCard>


        {/* Recommendation Insights */}
        <SectionCard
          title="Recommendation Insights"
          subtitle="What types of opportunities match your profile"
        >
          <div className="space-y-5">
            {recommendationInsights.map((item) => (
              <AnalyticsBar
                key={item.label}
                label={item.label}
                value={item.value}
              />
            ))}
          </div>

          <div className="mt-6 rounded-[16px] bg-[#7B61FF]/10 border border-[#7B61FF]/20 p-4">
            <p className="text-sm font-medium text-white">
              💡 Recommendation Insight
            </p>

            <p className="text-xs text-[#B7C0D8] mt-2 leading-relaxed">
              Your profile is currently receiving more recommendations
              for developer and AI-related roles. Tailoring your resume
              toward these roles may improve your match rate.
            </p>
          </div>
        </SectionCard>

      </div>


     {/* Hiring Visualization */}
<SectionCard
  title="Hiring Visualization"
  subtitle="Explore current hiring trends, demand distribution, skills, and activity"
>
  {hiringLoading ? (
  <div className="flex items-center justify-center py-20">
    <p className="text-[#B7C0D8]">
      Loading hiring insights...
    </p>
  </div>
) : (
  <div className="space-y-8">

    {/* your existing charts */}

  </div>
)}
  <div className="space-y-8">

    {/* Row 1 — Job Roles + Donut */}
    <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">

      {/* Most Hiring Job Roles */}
      <div className="rounded-[20px] bg-white/[0.03] border border-white/10 p-5">

        <h4 className="text-sm font-semibold text-white mb-1">
          Most Hiring Job Roles
        </h4>

        <p className="text-xs text-[#B7C0D8] mb-5">
          Roles currently showing the highest hiring demand
        </p>

        <div className="h-[280px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
               data={hiringVisualization.hiring_trends || []}
              layout="vertical"
              margin={{ top: 5, right: 20, left: 20, bottom: 5 }}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="rgba(255,255,255,0.08)"
              />

              <XAxis
                type="number"
                domain={[0, 100]}
                tick={{ fill: "#B7C0D8", fontSize: 11 }}
                axisLine={false}
                tickLine={false}
              />

              <YAxis
                type="category"
                dataKey="label"
                width={125}
                tick={{ fill: "#B7C0D8", fontSize: 11 }}
                axisLine={false}
                tickLine={false}
              />

              <Tooltip
                contentStyle={{
                  backgroundColor: "#0B1020",
                  border: "1px solid rgba(255,255,255,0.1)",
                  borderRadius: "12px",
                  color: "#fff",
                }}
              />

              <Bar
                dataKey="value"
                radius={[0, 8, 8, 0]}
                fill="#7B61FF"
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>


      {/* Hiring Demand Distribution */}
      <div className="rounded-[20px] bg-white/[0.03] border border-white/10 p-5">

        <h4 className="text-sm font-semibold text-white mb-1">
          Hiring Demand Distribution
        </h4>

        <p className="text-xs text-[#B7C0D8] mb-2">
          Distribution of current hiring demand by category
        </p>

        <div className="h-[280px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>

              <Pie
                data={hiringVisualization.hiring_demand_distribution || []}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                innerRadius={65}
                outerRadius={100}
                paddingAngle={3}
              >
                {(hiringVisualization.hiring_demand_distribution || []).map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={chartColors[index % chartColors.length]}
                  />
                ))}
              </Pie>

              <Tooltip
                contentStyle={{
                  backgroundColor: "#0B1020",
                  border: "1px solid rgba(255,255,255,0.1)",
                  borderRadius: "12px",
                  color: "#fff",
                }}
              />

              <Legend
                wrapperStyle={{
                  fontSize: "11px",
                  color: "#B7C0D8",
                }}
              />

            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

    </div>


    {/* Row 2 — Most In-Demand Skills */}
    <div className="rounded-[20px] bg-white/[0.03] border border-white/10 p-5">

      <h4 className="text-sm font-semibold text-white mb-1">
        Most In-Demand Skills
      </h4>

      <p className="text-xs text-[#B7C0D8] mb-5">
        Skills appearing most frequently in current job requirements
      </p>

      <div className="h-[280px]">

        <ResponsiveContainer width="100%" height="100%">
          <BarChart
             data={hiringVisualization.top_hiring_skills || []}
            layout="vertical"
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >

            <CartesianGrid
              strokeDasharray="3 3"
              stroke="rgba(255,255,255,0.08)"
            />

            <XAxis
              type="number"
              domain={[0, 100]}
              tick={{ fill: "#B7C0D8", fontSize: 11 }}
              axisLine={false}
              tickLine={false}
            />

            <YAxis
              type="category"
              dataKey="label"
              width={120}
              tick={{ fill: "#B7C0D8", fontSize: 11 }}
              axisLine={false}
              tickLine={false}
            />

            <Tooltip
              contentStyle={{
                backgroundColor: "#0B1020",
                border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: "12px",
                color: "#fff",
              }}
            />

            <Bar
              dataKey="value"
              radius={[0, 8, 8, 0]}
              fill="#2FE6FF"
            />

          </BarChart>
        </ResponsiveContainer>

      </div>
    </div>


    {/* Row 3 — Hiring Activity Over Time */}
    <div className="rounded-[20px] bg-white/[0.03] border border-white/10 p-5">

      <h4 className="text-sm font-semibold text-white mb-1">
        Hiring Activity Over Time
      </h4>

      <p className="text-xs text-[#B7C0D8] mb-5">
        Hiring activity trend across recent months
      </p>

      <div className="h-[300px]">

        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={hiringVisualization.hiring_activity_over_time || []}
            margin={{
              top: 10,
              right: 20,
              left: 10,
              bottom: 5,
            }}
          >

            <CartesianGrid
              strokeDasharray="3 3"
              stroke="rgba(255,255,255,0.08)"
            />

            <XAxis
              dataKey="month"
              tick={{ fill: "#B7C0D8", fontSize: 11 }}
              axisLine={false}
              tickLine={false}
            />

            <YAxis
              tick={{ fill: "#B7C0D8", fontSize: 11 }}
              axisLine={false}
              tickLine={false}
            />

            <Tooltip
              contentStyle={{
                backgroundColor: "#0B1020",
                border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: "12px",
                color: "#fff",
              }}
            />

            <Line
              type="monotone"
              dataKey="applications"
              stroke="#7B61FF"
              strokeWidth={3}
              dot={{
                r: 5,
                fill: "#2FE6FF",
              }}
              activeDot={{
                r: 7,
              }}
            />

          </LineChart>
        </ResponsiveContainer>

      </div>
    </div>

  </div>
</SectionCard>
    </div>
  );

   const RecruiterDashboard = () => (
  <div className="space-y-6">

    {/* Recruiter Stats */}
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
      {recruiterStats.map((s) => (
        <StatCard key={s.label} {...s} />
      ))}
    </div>

    {/* Recent Applicants + Posted Jobs */}
    <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">

      {/* Recent Applicants */}
      <SectionCard
        title="Recent Applicants"
        subtitle="Latest candidates applying to your jobs"
      >
        <div className="space-y-3">
          {recentApplicants.map((applicant) => (
            <div
              key={applicant.name}
              className="flex items-center justify-between rounded-[16px] bg-white/[0.03] border border-white/10 p-4"
            >
              <div>
                <p className="text-white font-medium">
                  {applicant.name}
                </p>

                <p className="text-[#B7C0D8] text-xs mt-1">
                  {applicant.role}
                </p>

                <p className="text-[#2FE6FF] text-xs mt-2">
                  {applicant.match}% AI Match
                </p>
              </div>

              <span
                className={`text-xs px-3 py-1 rounded-full border ${
                  applicant.status === "Shortlisted"
                    ? "bg-[#2FE6FF]/10 text-[#2FE6FF] border-[#2FE6FF]/30"
                    : applicant.status === "Interview Set"
                    ? "bg-[#7B61FF]/10 text-[#B7C0D8] border-[#7B61FF]/30"
                    : "bg-white/[0.05] text-[#B7C0D8] border-white/10"
                }`}
              >
                {applicant.status}
              </span>
            </div>
          ))}
        </div>
      </SectionCard>

      {/* Posted Jobs */}
      <SectionCard
        title="Your Posted Jobs"
        subtitle="Overview of your current job postings"
      >
        <div className="space-y-3">
          {postedJobs.map((job) => (
            <div
              key={job.title}
              className="flex items-center justify-between rounded-[16px] bg-white/[0.03] border border-white/10 p-4"
            >
              <div>
                <p className="text-white font-medium">
                  {job.title}
                </p>

                <p className="text-[#B7C0D8] text-xs mt-1">
                  {job.applicants} applicants
                </p>
              </div>

              <span
                className={`text-xs px-3 py-1 rounded-full border ${
                  job.status === "Active"
                    ? "bg-[#2FE6FF]/10 text-[#2FE6FF] border-[#2FE6FF]/30"
                    : "bg-[#7B61FF]/10 text-[#B7C0D8] border-[#7B61FF]/30"
                }`}
              >
                {job.status}
              </span>
            </div>
          ))}
        </div>
      </SectionCard>

    </div>

    {/* Hiring Analytics */}
    <SectionCard
      title="Hiring Analytics"
      subtitle="Candidate pipeline across your job postings"
    >
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">

        {hiringAnalytics.map((item) => (
          <div
            key={item.label}
            className="rounded-[16px] bg-white/[0.03] border border-white/10 p-5"
          >
            <p className="text-xs text-[#B7C0D8]">
              {item.label}
            </p>

            <p className="text-3xl font-bold text-white mt-2">
              {item.value}
            </p>

            <div className="mt-4">
              <GradientBar percent={item.value} />
            </div>
          </div>
        ))}

      </div>
    </SectionCard>

    {/* Recruiter Actions */}
    <SectionCard
      title="Recruiter Actions"
      subtitle="Manage your hiring workflow"
    >
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">

        <button
          onClick={() => navigate("/jobs/create")}
          className="p-5 rounded-[18px] bg-white/[0.04] border border-white/10 hover:bg-white/[0.08] transition-all text-left"
        >
          <div className="text-2xl mb-3">📢</div>
          <p className="text-white font-semibold">
            Post a Job
          </p>
          <p className="text-xs text-[#B7C0D8] mt-1">
            Create a new job opening
          </p>
        </button>

        <button
          onClick={() => navigate("/applications")}
          className="p-5 rounded-[18px] bg-white/[0.04] border border-white/10 hover:bg-white/[0.08] transition-all text-left"
        >
          <div className="text-2xl mb-3">👥</div>
          <p className="text-white font-semibold">
            View Applicants
          </p>
          <p className="text-xs text-[#B7C0D8] mt-1">
            Review candidate applications
          </p>
        </button>

        <button
          onClick={() => navigate("/jobs")}
          className="p-5 rounded-[18px] bg-white/[0.04] border border-white/10 hover:bg-white/[0.08] transition-all text-left"
        >
          <div className="text-2xl mb-3">💼</div>
          <p className="text-white font-semibold">
            Manage Jobs
          </p>
          <p className="text-xs text-[#B7C0D8] mt-1">
            Edit or manage your postings
          </p>
        </button>

      </div>
    </SectionCard>

  </div>
);     

  const AdminDashboard = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
        {adminStats.map((s) => (
          <StatCard key={s.label} {...s} />
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <SectionCard title="Recent Platform Activity" subtitle="Live feed across the platform" className="xl:col-span-2">
          <div className="space-y-3">
            {platformActivity.map((p, i) => (
              <div
                key={i}
                className="flex items-start justify-between rounded-[16px] bg-white/[0.03] border border-white/10 p-3"
              >
                <p className="text-sm text-white/90">{p.text}</p>
                <span className="text-xs text-[#B7C0D8] whitespace-nowrap ml-4">{p.time}</span>
              </div>
            ))}
          </div>
        </SectionCard>

        <SectionCard title="Job Moderation" subtitle="Listings needing review">
          <div className="space-y-3">
            {jobModeration.map((j, i) => (
              <div key={i} className="rounded-[16px] bg-white/[0.03] border border-white/10 p-3">
                <div className="flex items-center justify-between">
                  <p className="text-white text-sm font-medium">{j.title}</p>
                  <span
                    className={`text-xs px-2 py-0.5 rounded-full ${
                      j.status === "Pending"
                        ? "bg-[#7B61FF]/10 text-[#B7C0D8] border border-[#7B61FF]/30"
                        : "bg-[#2FE6FF]/10 text-[#2FE6FF] border border-[#2FE6FF]/30"
                    }`}
                  >
                    {j.status}
                  </span>
                </div>
                <p className="text-[#B7C0D8] text-xs mt-1">{j.reason}</p>
              </div>
            ))}
          </div>
        </SectionCard>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <SectionCard title="User Statistics" subtitle="Job seeker base overview">
          <div className="space-y-4">
            {userStats.map((u) => (
              <div key={u.label} className="flex items-center justify-between">
                <span className="text-sm text-[#B7C0D8]">{u.label}</span>
                <span className="text-white font-semibold">{u.value}</span>
              </div>
            ))}
          </div>
        </SectionCard>

        <SectionCard title="Recruiter Statistics" subtitle="Company account overview">
          <div className="space-y-4">
            {recruiterStatsList.map((r) => (
              <div key={r.label} className="flex items-center justify-between">
                <span className="text-sm text-[#B7C0D8]">{r.label}</span>
                <span className="text-white font-semibold">{r.value}</span>
              </div>
            ))}
          </div>
        </SectionCard>
      </div>

      <SectionCard title="Platform Analytics" subtitle="Growth trend across the last 4 weeks">
        <div className="grid grid-cols-4 gap-4 items-end h-40">
          {[62, 78, 54, 90].map((h, i) => (
            <div key={i} className="flex flex-col items-center justify-end h-full gap-2">
              <div
                className="w-full rounded-t-xl bg-gradient-to-t from-[#7B61FF] via-[#5EA2FF] to-[#2FE6FF]"
                style={{ height: `${h}%` }}
              />
              <span className="text-xs text-[#B7C0D8]">W{i + 1}</span>
            </div>
          ))}
        </div>
      </SectionCard>
    </div>
  );

  const renderMainDashboard = () => {
    if (role === "recruiter") return <RecruiterDashboard />;
    if (role === "admin") return <AdminDashboard />;
    return <JobSeekerDashboard />;
  };

  // ---------------------------------------------------------------------------
  // Layout
  // ---------------------------------------------------------------------------
  return (
    <div className="min-h-screen bg-[#050816] text-white relative overflow-x-hidden">
      <GlowBackground />

      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <Sidebar activePage="dashboard" />

      {/* Main column */}
      <div className="relative z-10 lg:ml-[264px]">
        {/* Top navbar */}
        <header className="sticky top-0 z-20 bg-[#050816]/70 backdrop-blur-xl border-b border-white/10 px-4 sm:px-8 py-4 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 min-w-0">
            <button
              className="lg:hidden w-9 h-9 flex items-center justify-center rounded-xl bg-white/[0.06] border border-white/10"
              onClick={() => setSidebarOpen(true)}
            >
              ☰
            </button>
            <div className="min-w-0">
              <p className="font-semibold truncate">Welcome back, {userName} 👋</p>
              <p className="text-xs text-[#B7C0D8] hidden sm:block">Here's what's happening today</p>
            </div>
          </div>

          <div className="hidden md:flex items-center flex-1 max-w-md">
            <div className="w-full flex items-center gap-2 px-4 py-2 rounded-[16px] bg-white/[0.04] border border-white/10">
              <span className="text-[#B7C0D8] text-sm">🔍</span>
              <input
                type="text"
                placeholder="Search jobs, applicants, reports..."
                className="w-full bg-transparent outline-none text-sm text-white placeholder:text-[#B7C0D8]"
              />
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            <button
  onClick={() => navigate("/profile")}
  className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-[14px] bg-white/[0.06] border border-white/10 text-sm font-medium hover:bg-white/[0.1] transition-all duration-300"
>
  <span>👤</span>
  <span>Profile</span>
</button>
<div className="relative">
  <button
    onClick={() => setNotificationOpen((prev) => !prev)}
    className="relative flex items-center justify-center w-10 h-10 rounded-[14px] bg-white/[0.06] border border-white/10 hover:bg-white/[0.1] transition-all duration-300"
    aria-label="Notifications"
  >
    <Bell size={18} className="text-[#B7C0D8]" />

    {unreadNotifications > 0 && (
      <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1 rounded-full bg-gradient-to-r from-[#7B61FF] to-[#2FE6FF] text-[10px] font-bold flex items-center justify-center text-white">
        {unreadNotifications}
      </span>
    )}
  </button>

  {notificationOpen && (
    <div className="absolute right-0 top-12 w-[360px] max-w-[calc(100vw-2rem)] rounded-[20px] bg-[#0B1020] border border-white/10 shadow-[0_20px_60px_rgba(0,0,0,0.5)] backdrop-blur-xl overflow-hidden z-50">

      <div className="flex items-center justify-between px-4 py-4 border-b border-white/10">
        <div>
          <h3 className="font-semibold text-white">
            Notifications
          </h3>

          <p className="text-xs text-[#7D8597] mt-0.5">
            AI-powered opportunities and alerts
          </p>
        </div>

        <span className="text-xs px-2 py-1 rounded-full bg-[#7B61FF]/10 text-[#B7C0D8] border border-[#7B61FF]/20">
          {unreadNotifications} new
        </span>
      </div>

      <div className="max-h-[400px] overflow-y-auto">

  {notificationsLoading ? (
    <div className="p-6 text-center text-sm text-[#B7C0D8]">
      Loading notifications...
    </div>
  ) : notifications.length === 0 ? (
    <div className="p-6 text-center text-sm text-[#B7C0D8]">
      No notifications yet.
    </div>
  ) : (
    notifications.map((notification) => {
  const notificationType =
    notification.type ||
    notification.notification_type ||
    "general";

  const isUnread =
    notification.unread === true ||
    notification.is_read === false;

  return (
          <div
            key={notification.id}
            className={`p-4 border-b border-white/[0.06] hover:bg-white/[0.04] transition-all ${
  isUnread ? "bg-white/[0.02]" : ""
}`}
          >
            <div className="flex gap-3">

              <div className="w-9 h-9 shrink-0 rounded-xl bg-gradient-to-br from-[#7B61FF]/20 to-[#2FE6FF]/20 border border-white/10 flex items-center justify-center">
                {notificationType === "high-match" && "🎯"}
{notificationType === "startup" && "🚀"}
{notificationType === "skill" && "💡"}
{notificationType === "competition" && "🔥"}
{notificationType === "general" && "🔔"}
              </div>

              <div className="min-w-0 flex-1">

                <div className="flex items-start justify-between gap-2">

                  <p className="text-sm font-medium text-white">
                    {notification.title}
                  </p>

                  {isUnread && (
                    <span className="w-2 h-2 shrink-0 rounded-full bg-[#2FE6FF] mt-1.5" />
                  )}

                </div>

                <p className="text-xs text-[#B7C0D8] mt-1 leading-relaxed">
                  {notification.message}
                </p>

                <p className="text-[11px] text-[#7D8597] mt-2">
                  {notification.time ||
  notification.created_at ||
  "Recently"}
                </p>

              </div>

            </div>
                   </div>
        );
      
    })
  )}

      </div>

      <button
        onClick={() => navigate("/notifications")}
        className="w-full px-4 py-3 text-sm text-[#5EA2FF] hover:bg-white/[0.04] transition-all"
      >
        View all notifications →
      </button>

    </div>
  )}
</div>
            {/* 3. TOP HEADER LOGOUT BUTTON ATTACHED HERE AS WELL */}
            <button 
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 rounded-[14px] bg-gradient-to-r from-[#7B61FF] via-[#5EA2FF] to-[#2FE6FF] text-sm font-medium hover:opacity-90 active:scale-[0.98] transition-all duration-200"
            >
              <span>🚪</span>
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </header>

        {/* Main content */}
        <main className="p-4 sm:p-8">
          <div className="mb-6">
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
    {roleLabel} Dashboard
</h1>
            <p className="text-[#B7C0D8] text-sm mt-1">
              {role === "jobSeeker" && "Your AI-powered job discovery, at a glance."}
              {role === "recruiter" && "Track your postings and candidate pipeline."}
              {role === "admin" && "Monitor and manage the SwipeX platform."}
            </p>
          </div>

          {renderMainDashboard()}
        </main>
      </div>
    </div>
  );
}