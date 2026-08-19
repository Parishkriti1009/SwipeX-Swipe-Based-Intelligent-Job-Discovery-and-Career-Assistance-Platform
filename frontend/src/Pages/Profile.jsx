import React, { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  User, Mail, MapPin, Phone, Globe, Edit2, X, Save,
  Camera, Upload, Download, Eye, FileText, GraduationCap, Award,
  FolderGit2, Briefcase, Sparkles, Shield, Users, Building2, TrendingUp,
  CheckCircle2, Circle, Share2, Code2
} from "lucide-react";

/* ------------------------------------------------------------------ */
/*  SwipeX design tokens                                              */
/* ------------------------------------------------------------------ */
const GRADIENT = "linear-gradient(90deg, #7B61FF 0%, #5EA2FF 50%, #2FE6FF 100%)";
const BG = "#050816";
const SUBTEXT = "#B7C0D8";

const glass =
  "bg-white/[0.04] backdrop-blur-xl border border-white/10 rounded-[22px] shadow-[0_8px_32px_rgba(0,0,0,0.35)]";

const GradientText = ({ children, className = "" }) => (
  <span
    className={`bg-clip-text text-transparent ${className}`}
    style={{ backgroundImage: GRADIENT }}
  >
    {children}
  </span>
);

const GradientButton = ({ children, onClick, icon: Icon, className = "", type = "button" }) => (
  <motion.button
    type={type}
    whileHover={{ scale: 1.03, boxShadow: "0 0 28px rgba(94,162,255,0.45)" }}
    whileTap={{ scale: 0.97 }}
    onClick={onClick}
    className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold text-white transition-shadow ${className}`}
    style={{ backgroundImage: GRADIENT }}
  >
    {Icon && <Icon size={16} />}
    {children}
  </motion.button>
);

const GhostButton = ({ children, onClick, icon: Icon, className = "" }) => (
  <motion.button
    whileHover={{ scale: 1.02, backgroundColor: "rgba(255,255,255,0.08)" }}
    whileTap={{ scale: 0.97 }}
    onClick={onClick}
    className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium text-white/80 border border-white/15 transition-colors ${className}`}
  >
    {Icon && <Icon size={15} />}
    {children}
  </motion.button>
);

const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.06, duration: 0.45, ease: "easeOut" },
  }),
};

/* ------------------------------------------------------------------ */
/*  Section shell                                                     */
/* ------------------------------------------------------------------ */
const Card = ({ children, className = "", index = 0, hover = true }) => (
  <motion.div
    variants={fadeUp}
    initial="hidden"
    animate="show"
    custom={index}
    whileHover={hover ? { y: -3, boxShadow: "0 14px 40px rgba(94,162,255,0.12)" } : {}}
    className={`${glass} p-6 ${className}`}
  >
    {children}
  </motion.div>
);

const SectionHeading = ({ icon: Icon, title, action }) => (
  <div className="flex items-center justify-between mb-5">
    <div className="flex items-center gap-2.5">
      <div
        className="w-8 h-8 rounded-xl flex items-center justify-center"
        style={{ backgroundImage: GRADIENT }}
      >
        <Icon size={16} className="text-white" />
      </div>
      <h3 className="text-white font-semibold text-[15px] tracking-wide">{title}</h3>
    </div>
    {action}
  </div>
);

const Field = ({ label, value, icon: Icon, editing, onChange, type = "text", full = false }) => (
  <div className={full ? "col-span-2" : ""}>
    <label className="flex items-center gap-1.5 text-[11px] uppercase tracking-wider mb-1.5" style={{ color: SUBTEXT }}>
      {Icon && <Icon size={12} />} {label}
    </label>
    {editing ? (
      type === "textarea" ? (
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          rows={3}
          className="w-full bg-white/[0.06] border border-white/15 rounded-xl px-3 py-2 text-sm text-white outline-none focus:border-[#5EA2FF]/60 resize-none"
        />
      ) : (
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full bg-white/[0.06] border border-white/15 rounded-xl px-3 py-2 text-sm text-white outline-none focus:border-[#5EA2FF]/60"
        />
      )
    ) : (
      <p className="text-sm text-white/90 break-words">{value || <span style={{ color: SUBTEXT }}>Not added yet</span>}</p>
    )}
  </div>
);

/* ------------------------------------------------------------------ */
/*  Circular progress                                                 */
/* ------------------------------------------------------------------ */
const CircularProgress = ({ percent, size = 132, stroke = 10, label, sub }) => {
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const offset = c - (percent / 100) * c;
  return (
    <div className="relative flex flex-col items-center justify-center">
      <svg width={size} height={size} className="-rotate-90">
        <defs>
          <linearGradient id="ringGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#7B61FF" />
            <stop offset="50%" stopColor="#5EA2FF" />
            <stop offset="100%" stopColor="#2FE6FF" />
          </linearGradient>
        </defs>
        <circle cx={size / 2} cy={size / 2} r={r} stroke="rgba(255,255,255,0.08)" strokeWidth={stroke} fill="none" />
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          stroke="url(#ringGrad)"
          strokeWidth={stroke}
          fill="none"
          strokeLinecap="round"
          strokeDasharray={c}
          initial={{ strokeDashoffset: c }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 1.1, ease: "easeOut" }}
        />
      </svg>
      <div className="absolute flex flex-col items-center">
        <span className="text-2xl font-bold text-white">{percent}%</span>
        {label && <span className="text-[11px]" style={{ color: SUBTEXT }}>{label}</span>}
      </div>
      {sub && <span className="mt-2 text-xs" style={{ color: SUBTEXT }}>{sub}</span>}
    </div>
  );
};

const Bar = ({ percent }) => (
  <div className="w-full h-1.5 rounded-full bg-white/[0.08] overflow-hidden">
    <motion.div
      className="h-full rounded-full"
      style={{ backgroundImage: GRADIENT }}
      initial={{ width: 0 }}
      animate={{ width: `${percent}%` }}
      transition={{ duration: 0.9, ease: "easeOut" }}
    />
  </div>
);

/* ------------------------------------------------------------------ */
/*  Role metadata mappings                                            */
/* ------------------------------------------------------------------ */
const ROLE_META = {
  seeker: { label: "Job Seeker", icon: GraduationCap },
  recruiter: { label: "Recruiter", icon: Building2 },
  admin: { label: "Administrator", icon: Shield },
};

/* ------------------------------------------------------------------ */
/*  Edit modal                                                        */
/* ------------------------------------------------------------------ */
function EditProfileModal({ open, onClose, data, onSave }) {
  const [draft, setDraft] = useState(data);
  React.useEffect(() => setDraft(data), [data, open]);

  const set = (k) => (v) => setDraft((d) => ({ ...d, [k]: v }));

  if (!open) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, y: 24, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 24, scale: 0.97 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          onClick={(e) => e.stopPropagation()}
          className={`${glass} w-full max-w-2xl max-h-[85vh] overflow-y-auto p-6`}
          style={{ background: "rgba(10,12,28,0.9)" }}
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-white">Edit personal information</h2>
            <button onClick={onClose} className="text-white/50 hover:text-white transition-colors">
              <X size={20} />
            </button>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Field label="Full name" icon={User} value={draft.name} editing onChange={set("name")} />
            <Field label="Email" icon={Mail} value={draft.email} editing onChange={set("email")} />
            <Field label="Phone" icon={Phone} value={draft.phone} editing onChange={set("phone")} />
            <Field label="Location" icon={MapPin} value={draft.location} editing onChange={set("location")} />
            <Field label="LinkedIn" icon={Share2} value={draft.linkedin} editing onChange={set("linkedin")} />
            <Field label="GitHub" icon={Code2} value={draft.github} editing onChange={set("github")} />
            <Field
  label="Preferred job role"
  value={draft.preferredRole}
  editing
  onChange={set("preferredRole")}
/>

<Field
  label="Preferred location"
  value={draft.prefLocation}
  editing
  onChange={set("prefLocation")}
/>

<Field
  label="Job type"
  value={draft.prefJobType}
  editing
  onChange={set("prefJobType")}
/>

<Field
  label="Work mode"
  value={draft.workMode}
  editing
  onChange={set("workMode")}
/>

<Field
  label="Expected salary"
  value={draft.expectedSalary}
  editing
  onChange={set("expectedSalary")}
/>

<Field
  label="Achievements"
  value={draft.achievements}
  editing
  onChange={set("achievements")}
  type="textarea"
  full
/>
            <Field label="Bio" value={draft.bio} editing onChange={set("bio")} type="textarea" full />
          </div>

          <div className="flex justify-end gap-3 mt-6">
            <GhostButton onClick={onClose}>Cancel</GhostButton>
            <GradientButton
              icon={Save}
              onClick={() => {
                onSave(draft);
                onClose();
              }}
            >
              Save changes
            </GradientButton>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

/* ------------------------------------------------------------------ */
/*  Hero                                                              */
/* ------------------------------------------------------------------ */
function ProfileHero({ data, onEdit }) {
  const meta = ROLE_META[data.role] || ROLE_META.seeker;
  return (
    <Card index={0} className="relative overflow-hidden">
      <div
        className="absolute -top-24 -right-24 w-72 h-72 rounded-full opacity-20 blur-3xl pointer-events-none"
        style={{ backgroundImage: GRADIENT }}
      />
      <div className="relative flex flex-col sm:flex-row sm:items-center gap-6">
        <div className="relative w-24 h-24 shrink-0">
          <div
            className="w-24 h-24 rounded-3xl flex items-center justify-center text-2xl font-bold text-white"
            style={{ backgroundImage: GRADIENT }}
          >
            {data.name ? data.name.split(" ").map((n) => n[0]).join("") : "U"}
          </div>
          <button className="absolute -bottom-1.5 -right-1.5 w-8 h-8 rounded-full bg-white/10 border border-white/20 backdrop-blur flex items-center justify-center hover:bg-white/20 transition-colors">
            <Camera size={14} className="text-white" />
          </button>
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-3">
            <h1 className="text-2xl font-bold text-white truncate">{data.name}</h1>
            <span
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold text-white"
              style={{ backgroundImage: GRADIENT }}
            >
              <meta.icon size={13} /> {meta.label}
            </span>
          </div>
          <p className="text-sm mt-1 flex items-center gap-1.5" style={{ color: SUBTEXT }}>
            <Mail size={13} /> {data.email}
          </p>
          <p className="text-sm mt-2 max-w-xl" style={{ color: SUBTEXT }}>{data.bio}</p>

          <div className="flex flex-wrap gap-4 mt-3 text-xs" style={{ color: SUBTEXT }}>
            {data.phone && <span className="flex items-center gap-1.5"><Phone size={12} /> {data.phone}</span>}
            {data.location && <span className="flex items-center gap-1.5"><MapPin size={12} /> {data.location}</span>}
            {data.linkedin && <span className="flex items-center gap-1.5"><Share2 size={12} /> {data.linkedin}</span>}
            {data.github && <span className="flex items-center gap-1.5"><Code2 size={12} /> {data.github}</span>}
          </div>
        </div>

        <GradientButton icon={Edit2} onClick={onEdit} className="self-start sm:self-center shrink-0">
          Edit profile
        </GradientButton>
      </div>
    </Card>
  );
}

/* ------------------------------------------------------------------ */
/*  Role-Specific Sections                                           */
/* ------------------------------------------------------------------ */
function SeekerSection({ data, index }) {
  return (
    <>
      <Card index={index}>
        <SectionHeading icon={GraduationCap} title="Education" />
        <div className="grid grid-cols-2 gap-4">
          <Field label="College" value={data.college} />
          <Field label="Degree" value={data.degree} />
          <Field label="Branch" value={data.branch} />
          <Field label="Graduation year" value={data.gradYear} />
          <Field label="CGPA" value={data.cgpa} />
          <Field label="Preferred location" value={data.prefLocation} />
          <Field label="Preferred job type" value={data.prefJobType} />
        </div>
      </Card>

      <Card index={index + 1}>
        <SectionHeading icon={Award} title="Skills & experience" />
        <div className="flex flex-wrap gap-2 mb-4">
          {data.skills?.map((s) => (
            <span
              key={s}
              className="px-3 py-1 rounded-full text-xs font-medium text-white/90 border border-white/15 bg-white/[0.05]"
            >
              {s}
            </span>
          ))}
        </div>
        <div className="grid grid-cols-2 gap-4">
          <Field label="Experience" icon={Briefcase} value={data.experience} full />
          <Field label="Projects" icon={FolderGit2} value={data.projects} full />
          <Field label="Certifications" icon={Award} value={data.certifications} full />
        </div>
      </Card>

      <Card index={index + 2}>
  <SectionHeading
    icon={Briefcase}
    title="Career Preferences"
  />

  <div className="grid grid-cols-2 gap-4">
    <Field
      label="Preferred job role"
      value={data.preferredRole}
    />

    <Field
      label="Job type"
      value={data.prefJobType}
    />

    <Field
      label="Preferred location"
      value={data.prefLocation}
    />

    <Field
      label="Work mode"
      value={data.workMode}
    />

    <Field
      label="Expected salary"
      value={data.expectedSalary}
    />
  </div>
</Card>

<Card index={index + 3}>
  <SectionHeading
    icon={Award}
    title="Achievements & Activities"
  />

  <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-4">
    <p className="text-sm text-white/90 leading-relaxed">
      {data.achievements || "No achievements added yet."}
    </p>
  </div>
</Card>

      <Card index={index + 4}>
        <SectionHeading
          icon={FileText}
          title="Resume"
          action={
            <span className="flex items-center gap-1 text-xs font-medium text-emerald-300">
              <CheckCircle2 size={13} /> {data.resumeStatus}
            </span>
          }
        />
        <div className="flex items-center justify-between gap-4 bg-white/[0.05] border border-white/10 rounded-2xl px-4 py-3">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style={{ backgroundImage: GRADIENT }}>
              <FileText size={17} className="text-white" />
            </div>
            <div className="min-w-0">
              <p className="text-sm text-white truncate">{data.resumeName}</p>
              <p className="text-xs" style={{ color: SUBTEXT }}>Used to power your AI job recommendations</p>
            </div>
          </div>
          <div className="flex items-center gap-1.5 shrink-0">
            <GhostButton icon={Eye} className="!px-3">Preview</GhostButton>
            <GhostButton icon={Download} className="!px-3">Download</GhostButton>
            <GradientButton icon={Upload} className="!px-3 !py-2">Replace</GradientButton>
          </div>
        </div>
      </Card>
    </>
  );
}

function RecruiterSection({ data, index }) {
  return (
    <>
      <Card index={index}>
        <SectionHeading icon={Building2} title="Company information" />
        <div className="grid grid-cols-2 gap-4">
          <Field label="Company name" value={data.companyName} full />
          <Field label="Designation" value={data.designation} />
          <Field label="Industry" value={data.industry} />
          <Field label="Website" icon={Globe} value={data.website} />
          <Field label="Company size" value={data.companySize} />
          <Field label="Company description" value={data.companyDesc} full />
        </div>
      </Card>

      <Card index={index + 1}>
        <SectionHeading icon={Briefcase} title="Hiring details" />
        <div className="grid grid-cols-2 gap-4">
          <Field label="Hiring domains" value={data.hiringDomains} full />
          <Field label="Open positions" value={String(data.openPositions)} />
          <Field label="Contact information" icon={Mail} value={data.contact} />
          <Field label="Hiring preferences" value={data.hiringPrefs} full />
        </div>
      </Card>
    </>
  );
}

function AdminSection({ data, index }) {
  return (
    <>
      <Card index={index}>
        <SectionHeading icon={Shield} title="Administrative information" />
        <div className="grid grid-cols-2 gap-4">
          <Field label="Admin ID" value={data.adminId} />
          <Field label="Department" value={data.department} />
          <Field label="Access level" value={data.accessLevel} />
          <Field label="Last login" value={data.lastLogin} />
          <Field label="Permissions" value={data.permissions} full />
        </div>
      </Card>

      <Card index={index + 1}>
        <SectionHeading icon={Users} title="System statistics" />
        <div className="grid grid-cols-2 gap-4">
          <Field label="Total managed users" value={data.managedUsers?.toLocaleString()} />
          <Field label="Administrative notes" value="No flags raised this cycle." full />
        </div>
      </Card>
    </>
  );
}

/* ------------------------------------------------------------------ */
/*  AI Insights + Quick stats (right rail)                            */
/* ------------------------------------------------------------------ */
function computeCompletion(role, data) {
  const commonFields = [data.phone, data.location, data.linkedin, data.bio];
  let filled = commonFields.filter(Boolean).length;
  let total = commonFields.length;

  if (role === "seeker") {
    const extra = [
  data.college,
  data.cgpa,
  data.skills?.length,
  data.resumeName,
  data.projects,
  data.certifications,
  data.preferredRole,
  data.prefLocation,
  data.prefJobType,
  data.workMode,
  data.expectedSalary,
  data.achievements
];
    filled += extra.filter(Boolean).length;
    total += extra.length;
  } else if (role === "recruiter") {
    const extra = [data.companyDesc, data.website, data.hiringDomains, data.openPositions];
    filled += extra.filter(Boolean).length;
    total += extra.length;
  } else {
    const extra = [data.permissions, data.department];
    filled += extra.filter(Boolean).length;
    total += extra.length;
  }
  return Math.round((filled / total) * 100);
}

function AIInsights({ role, data, index }) {
  const completion = useMemo(() => computeCompletion(role, data), [role, data]);
  const resumeQuality = role === "seeker" ? 76 : null;

  const recommendations = useMemo(() => {
    const recs = [];
    if (role === "seeker") {
      if (!data.resumeName) recs.push("Upload your resume");
      if ((data.skills?.length || 0) < 8) recs.push("Add more skills");
      if (!data.certifications) recs.push("Complete education details");
      if (!data.linkedin) recs.push("Add LinkedIn profile");
      if (recs.length === 0) recs.push("Your profile looks great — keep it fresh");
    } else if (role === "recruiter") {
      if (!data.website) recs.push("Add your company website");
      if (!data.companyDesc) recs.push("Write a company description");
      if (!data.hiringDomains) recs.push("List your hiring domains");
      if (recs.length === 0) recs.push("Your company profile is complete");
    } else {
      if (!data.permissions) recs.push("Review assigned permissions");
      recs.push("Audit last login activity");
    }
    return recs.slice(0, 4);
  }, [role, data]);

  return (
    <Card index={index} hover={false} className="text-center">
      <SectionHeading icon={Sparkles} title="AI Insights" />
      <div className="flex justify-center">
        <CircularProgress percent={completion} label="Profile complete" />
      </div>

      {resumeQuality !== null && (
        <div className="mt-5 text-left">
          <div className="flex justify-between text-xs mb-1.5">
            <span style={{ color: SUBTEXT }}>Resume quality</span>
            <span className="text-white font-semibold">{resumeQuality}/100</span>
          </div>
          <Bar percent={resumeQuality} />
        </div>
      )}

      <div className="mt-6 text-left space-y-2.5">
        {recommendations.map((r) => (
          <div key={r} className="flex items-center gap-2 text-xs" style={{ color: SUBTEXT }}>
            <Circle size={6} className="shrink-0 fill-current" style={{ color: "#5EA2FF" }} />
            <span>{r}</span>
          </div>
        ))}
      </div>
    </Card>
  );
}

function statFor(role, data) {
  const base = [
    { label: "Profile completion", value: `${computeCompletion(role, data)}%`, icon: TrendingUp },
  ];
  if (role === "seeker") {
    return [
      ...base,
      { label: "Applications submitted", value: "27", icon: Briefcase },
      { label: "Resume uploaded", value: data.resumeName ? "Yes" : "No", icon: FileText },
      { label: "Skills listed", value: String(data.skills?.length ?? 0), icon: Award },
    ];
  }
  if (role === "recruiter") {
    return [
      ...base,
      { label: "Jobs posted", value: "38", icon: Briefcase },
      { label: "Active listings", value: String(data.openPositions ?? 0), icon: FolderGit2 },
      { label: "Last updated", value: "2 days ago", icon: TrendingUp },
    ];
  }
  return [
    ...base,
    { label: "Managed users", value: data.managedUsers?.toLocaleString() ?? "0", icon: Users },
    { label: "Last login", value: data.lastLogin?.split(",")[0] ?? "Today", icon: Shield },
    { label: "Access level", value: data.accessLevel, icon: Shield },
  ];
}

function QuickStats({ role, data, index }) {
  const stats = statFor(role, data);
  return (
    <Card index={index} hover={false}>
      <SectionHeading icon={TrendingUp} title="Quick statistics" />
      <div className="grid grid-cols-2 gap-3">
        {stats.map((s, i) => (
          <motion.div
            key={s.label}
            variants={fadeUp}
            custom={i}
            initial="hidden"
            animate="show"
            whileHover={{ y: -2 }}
            className="bg-white/[0.05] border border-white/10 rounded-2xl p-3.5"
          >
            <s.icon size={15} className="mb-2" style={{ color: "#5EA2FF" }} />
            <p className="text-lg font-bold text-white leading-tight">{s.value}</p>
            <p className="text-[11px]" style={{ color: SUBTEXT }}>{s.label}</p>
          </motion.div>
        ))}
      </div>
    </Card>
  );
}

/* ------------------------------------------------------------------ */
/*  Root Component                                                    */
/* ------------------------------------------------------------------ */
export default function SwipeXProfilePage({ currentUser }) {
  const defaultUser = {
    role: "seeker",
    name: "Parishkriti Gupta",
    email: "kriti@gmail.com",
    bio: "Frontend-leaning full stack engineer chasing clean UI and fast APIs.",
    phone: "+91 98765 43210",
    location: "Delhi, India",
    linkedin: "linkedin.com/in/parishkriti",
    github: "github.com/parishkriti",
    college: "Indian Institute of Technology, Delhi",
    degree: "B.Tech",
    branch: "Computer Science & Engineering",
    gradYear: "2028",
    cgpa: "9.306",
    skills: ["React", "TypeScript", "Node.js", "Python", "TailwindCSS", "PostgreSQL"],
    experience: "1 yr · Frontend Intern @ Nimbus Labs",
    projects: "SwipeX AI Matcher, ExpenseSense, DevBoard",
    certifications: "AWS Cloud Practitioner, Meta Front-End Certificate",
    prefLocation: "Bengaluru / Remote",
    prefJobType: "Full-time",
    preferredRole: "Software Developer",
workMode: "Remote / Hybrid",
expectedSalary: "₹8–12 LPA",

achievements:
  "Shortlisted for Flipkart GRiD, SIH Internal Round, PromptWars Rank 23",
    resumeName: "Parishkriti_Gupta_Resume.pdf",
    resumeStatus: "Verified",
    companyName: "BrightForge Technologies",
    designation: "Senior Talent Acquisition Manager",
    industry: "FinTech",
    website: "brightforge.com",
    companyDesc: "BrightForge builds embedded finance infrastructure for SMEs across South Asia.",
    hiringDomains: "Frontend, Backend, Data, DevOps",
    companySize: "250–500 employees",
    openPositions: 14,
    hiringPrefs: "2–5 yrs experience, strong system design fundamentals",
    contact: "hiring@brightforge.com",
    adminId: "ADM-00231",
    department: "Platform Operations",
    accessLevel: "Super Admin",
    permissions: "User Management, Content Moderation, Billing, Analytics",
    lastLogin: "27 Jul 2026, 10:42 AM",
    managedUsers: 12480,
  };

  const [profileData, setProfileData] = useState(currentUser || defaultUser);
  const [loading, setLoading] = useState(!currentUser);
  const [editOpen, setEditOpen] = useState(false);

 useEffect(() => {
  if (!currentUser) {
    const user = JSON.parse(localStorage.getItem("user"));

    if (user) {
      setProfileData((prev) => ({
        ...prev,
        ...user,
      }));
    }

    setLoading(false);
  }
}, [currentUser]);
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white" style={{ background: BG }}>
        Loading profile credentials...
      </div>
    );
  }

  const role = profileData.role || "seeker";

  return (
    <div className="min-h-screen w-full" style={{ background: BG }}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-10">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] mb-1" style={{ color: SUBTEXT }}>SwipeX</p>
            <h1 className="text-xl font-bold">
              <GradientText>Your profile</GradientText>
            </h1>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          <div className="lg:col-span-2 flex flex-col gap-5">
            <ProfileHero data={profileData} onEdit={() => setEditOpen(true)} />
            {role === "seeker" && <SeekerSection data={profileData} index={1} />}
            {role === "recruiter" && <RecruiterSection data={profileData} index={1} />}
            {role === "admin" && <AdminSection data={profileData} index={1} />}
          </div>

          <div className="flex flex-col gap-5">
            <AIInsights role={role} data={profileData} index={1} />
            <QuickStats role={role} data={profileData} index={2} />
          </div>
        </div>
      </div>

      <EditProfileModal
        open={editOpen}
        onClose={() => setEditOpen(false)}
        data={profileData}
        onSave={(updated) => setProfileData((prev) => ({ ...prev, ...updated }))}
      />
    </div>
  );
}