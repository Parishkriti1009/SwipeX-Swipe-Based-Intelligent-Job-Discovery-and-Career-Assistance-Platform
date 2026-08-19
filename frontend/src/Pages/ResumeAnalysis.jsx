import React, { useState } from "react";
import axios from "axios";
import Sidebar from "../Components/Sidebar";
import {
  FiUploadCloud,
  FiFile,
  FiRefreshCw,
  FiDownload,
  FiZap,
  FiCheckCircle,
  FiAlertTriangle,
  FiTarget,
  FiAward,
  FiBookOpen,
  FiBriefcase,
  FiLayers,
  FiTrendingUp,
  FiGitBranch,
} from "react-icons/fi";

export default function ResumeAnalysis() {
  const [resumeData, setResumeData] = useState(null);
  const [atsData, setAtsData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {

    const file = event.target.files[0];

    if(file){
        setSelectedFile(file);
    }

};

  const suggestions = atsData?.improvement_tips || [];

  const atsBreakdown =
atsData?.ats_breakdown || [];

  const strengthStats = [
  {
    label: "Skills Matched",
    value: resumeData?.skills?.length || 0,
    icon: <FiCheckCircle size={20} className="text-[#2FE6FF]" />,
  },
  {
    label: "Missing Skills",
    value: atsData?.missing_skills?.length || 0,
    icon: <FiAlertTriangle size={20} className="text-[#FFB020]" />,
  },
  {
    label: "Projects",
    value: resumeData?.projects?.length || 0,
    icon: <FiLayers size={20} className="text-[#5EA2FF]" />,
  },
  {
    label: "Certifications",
    value: resumeData?.certifications?.length || 0,
    icon: <FiAward size={20} className="text-[#7B61FF]" />,
  },
];

  // Circular progress math for the 87% ATS score ring
  const radius = 70;
  const circumference = 2 * Math.PI * radius;
  const scoreValue = atsData?.ats_score || 0;
  const dashOffset = circumference - (scoreValue / 100) * circumference;


  const analyzeResume = async () => {

    if (!selectedFile) {
        alert("Please upload your resume first");
        return;
    }

    const token = localStorage.getItem("token");

    if (!token) {
        alert("No login token found. Please login again.");
        return;
    }

    const formData = new FormData();

    formData.append("file", selectedFile);

    try {

        setLoading(true);

        console.log("Sending resume with token:", token);

        const response = await axios.post(
            "http://localhost:8000/resume/upload",
            formData,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );

        console.log("RESUME API RESPONSE:", response.data);

        setResumeData(response.data.resume_data);
        setAtsData(response.data);

        localStorage.setItem(
            "resumeName",
            selectedFile.name
        );

    } catch (error) {

        console.error(
            "RESUME ERROR:",
            error.response?.status,
            error.response?.data || error.message
        );

        alert(
            error.response?.data?.detail ||
            "Resume analysis failed"
        );

    } finally {

        setLoading(false);

    }
};
const detectedSkills = resumeData?.skills || [];
const missingSkills = atsData?.missing_skills || [];
  return (
  <div className="flex bg-[#050816]">
    <Sidebar activePage="resume-analysis" />

    <main className="flex-1 min-h-screen overflow-y-auto">
      <div className="w-full text-white px-4 sm:px-6 lg:px-10 py-8 lg:py-12"></div>
      {/* Header */}
      <div className="max-w-7xl mx-auto mb-10">
        <div className="flex items-center gap-2 mb-3">
          <span className="w-2 h-2 rounded-full bg-gradient-to-r from-[#7B61FF] to-[#2FE6FF] shadow-[0_0_12px_2px_rgba(47,230,255,0.6)]" />
          <span className="text-xs tracking-wide uppercase text-[#B7C0D8]">
            SwipeX AI
          </span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-[#7B61FF] via-[#5EA2FF] to-[#2FE6FF] bg-clip-text text-transparent">
          Resume Analysis &amp; ATS Score
        </h1>
        <p className="mt-3 text-[#B7C0D8] max-w-2xl text-sm sm:text-base leading-relaxed">
          SwipeX AI scans your resume against real ATS engines, evaluates
          compatibility, identifies missing skills, and delivers personalized
          suggestions to help you get shortlisted faster.
        </p>
      </div>

      {/* Main Grid */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-5 gap-6 lg:gap-8">
        {/* LEFT SECTION */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          {/* Upload Card */}
          <div className="rounded-[24px] bg-white/5 border border-white/10 backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.35)] p-6 sm:p-8">
            <h2 className="text-lg font-semibold mb-1">Upload Your Resume</h2>
            <p className="text-[#B7C0D8] text-sm mb-6">
              Let SwipeX AI break down your resume in seconds.
            </p>

            <div className="group relative rounded-[20px] border-2 border-dashed border-white/15 hover:border-[#5EA2FF]/60 transition-all duration-300 bg-white/[0.03] hover:bg-white/[0.06] px-6 py-10 flex flex-col items-center text-center cursor-pointer">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#7B61FF] via-[#5EA2FF] to-[#2FE6FF] flex items-center justify-center mb-4 shadow-[0_0_25px_rgba(94,162,255,0.35)] group-hover:scale-105 transition-transform duration-300">
                <FiUploadCloud size={28} className="text-white" />
              </div>
              <p className="font-medium text-white">Drag &amp; Drop Resume</p>
              <p className="text-[#B7C0D8] text-sm mt-1">
                or{" "}
                <label 
className="text-[#2FE6FF] font-medium cursor-pointer"
>
Browse Files

<input
type="file"
accept=".pdf,.doc,.docx"
hidden
onChange={handleFileChange}
/>

</label>
              </p>

              <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
                {["PDF", "DOC", "DOCX"].map((format) => (
                  <span
                    key={format}
                    className="text-xs px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[#B7C0D8]"
                  >
                    {format}
                  </span>
                ))}
              </div>
              <p className="text-xs text-[#B7C0D8]/70 mt-3">
                Maximum file size: 5 MB
              </p>
            </div>

            <button
            onClick={analyzeResume}
            className="mt-6 w-full py-3.5 rounded-2xl font-semibold text-white bg-gradient-to-r from-[#7B61FF] via-[#5EA2FF] to-[#2FE6FF] hover:brightness-110 hover:shadow-[0_0_25px_rgba(94,162,255,0.45)] transition-all duration-300 flex items-center justify-center gap-2">
              <FiZap size={18} />
              Analyze Resume
            </button>
          </div>

          {/* Previously Uploaded Resume */}
          <div className="rounded-[20px] bg-white/5 border border-white/10 backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.3)] p-5 sm:p-6">
            <h3 className="text-sm font-semibold text-[#B7C0D8] uppercase tracking-wide mb-4">
              Previously Uploaded Resume
            </h3>
            <div className="flex items-center justify-between gap-4 flex-wrap">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#7B61FF]/20 to-[#2FE6FF]/20 border border-white/10 flex items-center justify-center">
                  <FiFile size={20} className="text-[#5EA2FF]" />
                </div>
                <div>
                  <p className="text-sm font-medium text-white">
{
selectedFile 
? selectedFile.name 
: "No resume uploaded"
}
</p>
                  <p className="text-xs text-[#B7C0D8]">
                    Recently Uploaded &middot; 842 KB
                  </p>
                </div>
              </div>
              <button className="text-sm px-4 py-2 rounded-xl border border-white/15 text-white hover:bg-white/10 transition-all duration-300 flex items-center gap-2">
                <FiRefreshCw size={14} />
                Replace Resume
              </button>
            </div>
          </div>
        </div>

        {/* RIGHT SECTION */}
        <div className="lg:col-span-3 flex flex-col gap-6">
          {/* ATS Score + Summary */}
          <div className="grid grid-cols-1 sm:grid-cols-5 gap-6">
            {/* ATS Score Card */}
            <div className="sm:col-span-2 rounded-[24px] bg-white/5 border border-white/10 backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.35)] p-6 flex flex-col items-center justify-center text-center">
              <p className="text-sm text-[#B7C0D8] mb-4">ATS Score</p>
              <div className="relative w-[160px] h-[160px]">
                <svg
                  viewBox="0 0 160 160"
                  className="w-full h-full -rotate-90"
                >
                  <defs>
                    <linearGradient
                      id="scoreGradient"
                      x1="0%"
                      y1="0%"
                      x2="100%"
                      y2="100%"
                    >
                      <stop offset="0%" stopColor="#7B61FF" />
                      <stop offset="50%" stopColor="#5EA2FF" />
                      <stop offset="100%" stopColor="#2FE6FF" />
                    </linearGradient>
                  </defs>
                  <circle
                    cx="80"
                    cy="80"
                    r="70"
                    fill="none"
                    stroke="rgba(255,255,255,0.08)"
                    strokeWidth="12"
                  />
                  <circle
                    cx="80"
                    cy="80"
                    r="70"
                    fill="none"
                    stroke="url(#scoreGradient)"
                    strokeWidth="12"
                    strokeLinecap="round"
                    strokeDasharray={circumference}
                    strokeDashoffset={dashOffset}
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-3xl font-bold text-white">{scoreValue}%</span>
                  <span className="text-xs text-[#B7C0D8] mt-1">
                    ATS Score
                  </span>
                </div>
              </div>
              <span className="mt-4 text-xs font-medium px-3 py-1.5 rounded-full bg-gradient-to-r from-[#7B61FF]/20 via-[#5EA2FF]/20 to-[#2FE6FF]/20 border border-white/10 text-[#2FE6FF]">
                {atsData?.ats_status}
              </span>
            </div>

            {/* Resume Summary Card */}
            <div className="sm:col-span-3 rounded-[24px] bg-white/5 border border-white/10 backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.35)] p-6">
              <h3 className="text-sm font-semibold text-[#B7C0D8] uppercase tracking-wide mb-5">
                Resume Summary
              </h3>
              <div className="grid grid-cols-2 gap-5">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                    <FiBriefcase size={16} className="text-[#5EA2FF]" />
                  </div>
                  <div>
                    <p className="text-lg font-semibold text-white">
{
resumeData?.experience || "0 yrs"
}
</p>
                    <p className="text-xs text-[#B7C0D8]">Experience</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                    <FiBookOpen size={16} className="text-[#7B61FF]" />
                  </div>
                  <div>
                    <p className="text-lg font-semibold text-white">
                      
{resumeData?.education?.[0] || "Not detected"}

                    </p>
                    <p className="text-xs text-[#B7C0D8]">Education</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                    <FiZap size={16} className="text-[#2FE6FF]" />
                  </div>
                  <div>
                    <p className="text-lg font-semibold text-white">{
resumeData?.skills?.length || 0
}</p>
                    <p className="text-xs text-[#B7C0D8]">Skills Detected</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                    <FiLayers size={16} className="text-[#5EA2FF]" />
                  </div>
                  <div>
                    <p className="text-lg font-semibold text-white">{
resumeData?.projects?.length || 0
}</p>
                    <p className="text-xs text-[#B7C0D8]">Projects</p>
                  </div>
                  {/* AI Summary */}
{atsData?.ai_summary && (
  <div className="mt-6 pt-5 border-t border-white/10">
    <h4 className="text-sm font-semibold text-[#B7C0D8] uppercase tracking-wide mb-2">
      AI Summary
    </h4>

    <p className="text-sm text-[#B7C0D8] leading-relaxed">
      {atsData.ai_summary}
    </p>
  </div>
)}
                </div>
              </div>
            </div>
          </div>

          {/* Skills Analysis */}
          <div className="rounded-[24px] bg-white/5 border border-white/10 backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.35)] p-6">
            <h3 className="text-sm font-semibold text-[#B7C0D8] uppercase tracking-wide mb-5">
              Skills Analysis
            </h3>

            <div className="mb-6">
              <p className="text-xs text-[#B7C0D8] mb-3">Detected Skills</p>
              <div className="flex flex-wrap gap-2">
                {detectedSkills.map((skill) => (
                  <span
                    key={skill}
                    className="text-xs sm:text-sm px-4 py-1.5 rounded-full text-white bg-gradient-to-r from-[#7B61FF]/25 via-[#5EA2FF]/25 to-[#2FE6FF]/25 border border-white/10 hover:brightness-125 transition-all duration-300"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <p className="text-xs text-[#B7C0D8] mb-3">Missing Skills</p>
              <div className="flex flex-wrap gap-2">
                {missingSkills.map((skill) => (
                  <span
                    key={skill}
                    className="text-xs sm:text-sm px-4 py-1.5 rounded-full text-[#FFB020] bg-[#FFB020]/10 border border-[#FFB020]/25 hover:bg-[#FFB020]/15 transition-all duration-300"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* AI Suggestions */}
          <div className="rounded-[24px] bg-white/5 border border-white/10 backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.35)] p-6">
            <h3 className="text-sm font-semibold text-[#B7C0D8] uppercase tracking-wide mb-5">
              AI Suggestions
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {suggestions.map((s) => (
                <div
                  key={s.text}
                  className="flex items-start gap-3 p-4 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-[#5EA2FF]/40 hover:bg-white/[0.06] transition-all duration-300"
                >
                  <div className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                    {s.icon}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white">
    {s}
</p>

<p className="text-xs text-[#B7C0D8] mt-1 leading-relaxed">
    Add improvements based on ATS analysis
</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ATS Breakdown */}
          <div className="rounded-[24px] bg-white/5 border border-white/10 backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.35)] p-6">
            <h3 className="text-sm font-semibold text-[#B7C0D8] uppercase tracking-wide mb-5">
              ATS Breakdown
            </h3>
            <div className="flex flex-col gap-5">
              {atsBreakdown.map((item) => (
                <div key={item.label}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-white">{item.label}</span>
                    <span className="text-sm text-[#B7C0D8]">
                      {item.value}%
                    </span>
                  </div>
                  <div className="w-full h-2.5 rounded-full bg-white/5 border border-white/10 overflow-hidden">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-[#7B61FF] via-[#5EA2FF] to-[#2FE6FF] transition-all duration-700"
                      style={{ width: `${item.value}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Resume Strength Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {strengthStats.map((stat) => (
              <div
                key={stat.label}
                className="rounded-[20px] bg-white/5 border border-white/10 backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.3)] p-5 flex flex-col gap-3 hover:-translate-y-1 hover:border-[#5EA2FF]/40 transition-all duration-300"
              >
                <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center">
                  {stat.icon}
                </div>
                <div>
                  <p className="text-xl font-semibold text-white">
                    {stat.value}
                  </p>
                  <p className="text-xs text-[#B7C0D8]">{stat.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Actions */}
      <div className="max-w-7xl mx-auto mt-10 flex flex-col sm:flex-row gap-4">
        <button className="flex-1 py-4 rounded-2xl font-semibold text-white border border-white/15 bg-white/5 hover:bg-white/10 transition-all duration-300 flex items-center justify-center gap-2">
          <FiDownload size={18} />
          Download Analysis Report
        </button>
        <button className="flex-1 py-4 rounded-2xl font-semibold text-white bg-gradient-to-r from-[#7B61FF] via-[#5EA2FF] to-[#2FE6FF] hover:brightness-110 hover:shadow-[0_0_30px_rgba(94,162,255,0.45)] transition-all duration-300 flex items-center justify-center gap-2">
          <FiZap size={18} />
          Improve Resume with AI
        </button>
            </div>
    </main>
  </div>
 );
 }