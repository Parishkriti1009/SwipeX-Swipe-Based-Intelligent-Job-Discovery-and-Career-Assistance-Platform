import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../Components/Sidebar";
import MatchAnalysisModal from "../Components/MatchAnalysisModal";
import axios from "axios";
import {
  motion,
  AnimatePresence,
  useAnimation,
  useMotionValue,
  useTransform,
} from "framer-motion";
import {
  FiHome,
  FiCompass,
  FiBookmark,
  FiFileText,
  FiUser,
  FiSettings,
  FiLogOut,
  FiZap,
  FiSearch,
  FiSliders,
  FiMapPin,
  FiBriefcase,
  FiClock,
  FiUsers,
  FiCheckCircle,
  FiTrendingUp,
  FiHeart,
  FiX,
  FiThumbsDown,
  FiCpu,
  FiRefreshCw,
} from "react-icons/fi";

export default function JobDiscovery() {
 
  /* ---------------------------------- Filters ---------------------------------- */
  const filterOptions = [
    "All",
    "MNC",
    "Startup",
    "Companies",
    "Remote",
    "Hybrid",
    "On-site",
    "Internship",
    "Full Time",
    "Fresher",
  ];
  const [activeFilter, setActiveFilter] = useState("All");
  const [search, setSearch] = useState("");

  /* ---------------------------------- Job Data ---------------------------------- */

    

const [jobs, setJobs] = useState([]);
const resumeUploaded = !!localStorage.getItem("resumeName");
const [loading, setLoading] = useState(true);
const [isMatchModalOpen, setIsMatchModalOpen] = useState(false);
const [matchData, setMatchData] = useState(null);
const [totalJobs, setTotalJobs] = useState(0);



const [selectedJobId, setSelectedJobId] = useState(null);
const fileInputRef = useRef(null);

  const fetchRecommendations = async () => {
  setLoading(true);

  try {
    const token = localStorage.getItem("token");



const response = await axios.get(
  "https://swipex-backend-pwin.onrender.com/recommendations/",
  {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
);

    const mappedJobs = response.data.map((job) => ({
      ...job,

      company: job.company?.name || "Unknown Company",

companyType: job.company?.is_mnc
  ? "MNC"
  : job.company?.is_startup
  ? "Startup"
  : "Company",

initials: job.company?.name
  ? job.company.name.substring(0, 2).toUpperCase()
  : "CO",

      verified: true,

      match: Math.floor(Math.random() * 15) + 85,

      title: job.title || "Untitled Job",

      location: job.location || "Remote",

      salary: job.salary || "Not Disclosed",

      experience: job.experience || "Fresher",

      mode: job.work_mode || "Remote",

      type: job.job_type || "Full Time",

      description:
        job.description || "No description available.",

      skills: Array.isArray(job.skills)
        ? job.skills
        : job.skills
        ? job.skills.split(",").map((skill) => skill.trim())
        : [],

      posted: "Recently",

      easyApply: true,

      applicants: Math.floor(Math.random() * 200) + 20,
    }));

    setJobs(mappedJobs);

    setTotalJobs(mappedJobs.length);

  } catch (error) {
 console.error(
   "Recommendation API Error:",
   error.response?.data || error.message
 );
} finally {
    setLoading(false);
  }
};

const fetchFilteredJobs = async (params = {}) => {
  setLoading(true);

  try {
    const response = await axios.get(
      "https://swipex-backend-pwin.onrender.com/jobs/search",
      {
        params: params,
      }
    );

    const mappedJobs = response.data.map((job) => ({
      ...job,

      company: job.company?.name || "Unknown Company",

      companyType: job.company?.is_mnc
        ? "MNC"
        : job.company?.is_startup
        ? "Startup"
        : "Company",

      initials: job.company?.name
        ? job.company.name.substring(0, 2).toUpperCase()
        : "CO",

      verified: true,

      match: Math.floor(Math.random() * 15) + 85,

      mode: job.work_mode,

      type: job.job_type,

      skills: job.skills
        ? job.skills.split(",").map((s) => s.trim())
        : [],

      posted: "Recently",

      easyApply: true,

      applicants: Math.floor(Math.random() * 200) + 20,
    }));

    setJobs(mappedJobs);
    setTotalJobs(mappedJobs.length);

  } catch (error) {
    console.error(error);
  } finally {
    setLoading(false);
  }
};

const fetchCompatibility = async (jobId) => {
  try {

    const response = await axios.post(
      "https://swipex-backend-pwin.onrender.com/jobs/match",
      {
        job_id: jobId,
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    setMatchData(response.data);
    setIsMatchModalOpen(true);

  } catch (error) {

    console.log(error);

    alert("Unable to fetch compatibility analysis.");

  }
};
  const reviewedCount = totalJobs - jobs.length;

  useEffect(() => {
  fetchRecommendations();
}, []);

  /* ---------------------------------- Swipe Logic ---------------------------------- */
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-300, 300], [-18, 18]);
  const likeOpacity = useTransform(x, [20, 140], [0, 1]);
  const nopeOpacity = useTransform(x, [-140, -20], [1, 0]);
  const controls = useAnimation();

  const handleSwipe = async (direction) => {
  if (jobs.length === 0) return;

  const currentJob = jobs[0];

  try {
    await axios.post(
  "https://swipex-backend-pwin.onrender.com/swipe/",
  {
    job_id: currentJob.id,
    action: direction === "right" ? "LIKE" : "SKIP",
  },
  {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  }
);

    console.log("Swipe recorded.");
  } catch (err) {
    console.error(err);

    // Prevent duplicate swipe crash
    if (
      err.response &&
      err.response.data.detail ===
        "You have already swiped this job."
    ) {
      console.log("Already swiped.");
    }
  }

  const flyX = direction === "right" ? 700 : -700;

  controls
    .start({
      x: flyX,
      rotate: direction === "right" ? 25 : -25,
      opacity: 0,
      transition: {
        duration: 0.35,
        ease: "easeOut",
      },
    })
    .then(() => {
      setJobs((prev) => prev.slice(1));

      x.set(0);

      controls.set({
        x: 0,
        rotate: 0,
        opacity: 1,
      });
    });
};

  const handleDragEnd = (event, info) => {
    if (info.offset.x > 120) {
      handleSwipe("right");
    } else if (info.offset.x < -120) {
      handleSwipe("left");
    } else {
      controls.start({
        x: 0,
        rotate: 0,
        transition: { type: "spring", stiffness: 300, damping: 22 },
      });
    }
  };
const handleReload = async () => {
  setJobs([]); // clear old cards immediately

  x.set(0);

  controls.set({
    x: 0,
    rotate: 0,
    opacity: 1,
  });

  await fetchRecommendations();
};

const applyJob = async (jobId) => {
  try {
    console.log("Applying for job:", jobId);

    const response = await axios.post(
      "https://swipex-backend-pwin.onrender.com/applications/apply",
      {
        job_id: jobId,
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    console.log("SUCCESS:");
    console.log(response);

    alert("✅ Application submitted successfully!");
  } catch (error) {
    console.log("ERROR:");
    console.log(error);
    console.log("Response:", error.response);
    console.log("Data:", error.response?.data);
    console.log("Status:", error.response?.status);

    if (error.response) {
      alert(error.response.data.detail);
    } else {
      alert("Something went wrong.");
    }
  }
};
const handleCompatibilityClick = (jobId) => {
    console.log("Compatibility button clicked");

    console.log("fileInputRef:", fileInputRef.current);

    setSelectedJobId(jobId);

    if (fileInputRef.current) {
        fileInputRef.current.click();
    } else {
        alert("File input is null");
    }
};
const uploadResumeForMatch = async (e) => {

    const file = e.target.files[0];

    if (!file) return;

    const formData = new FormData();

    formData.append("file", file);

    try {

        const response = await axios.post(

            `https://swipex-backend-pwin.onrender.com/resume/match/${selectedJobId}`,

            formData,

            {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            }

        );

        setMatchData(response.data);

        setIsMatchModalOpen(true);
        e.target.value = "";

    }

    catch(error){

        console.log(error);

        alert("Unable to generate compatibility.");

    }

};

 const filteredJobs = jobs.filter((job)=>{

  const searchMatch =
    job.title.toLowerCase().includes(search.toLowerCase()) ||
    job.company.toLowerCase().includes(search.toLowerCase()) ||
    job.skills.some(skill =>
      skill.toLowerCase().includes(search.toLowerCase())
    );


  if(!searchMatch)
    return false;


  if(activeFilter==="All")
    return true;


  if(activeFilter==="MNC")
    return job.companyType==="MNC";


  if(activeFilter==="Startup")
    return job.companyType==="Startup";


  if(activeFilter==="Companies")
    return true;


  if(activeFilter==="Remote")
    return job.mode==="Remote";


  if(activeFilter==="Hybrid")
    return job.mode==="Hybrid";


  if(activeFilter==="On-site")
    return job.mode==="On-site";


  if(activeFilter==="Internship")
    return job.type==="Internship";


  if(activeFilter==="Full Time")
    return job.type==="Full Time";


  if(activeFilter==="Fresher")
    return job.experience==="Fresher";


  return true;

});


// ADD THIS LINE BELOW THE ABOVE BLOCK
const visibleStack = jobs
  .filter((job) =>
    job.title.toLowerCase().includes(search.toLowerCase()) ||
    job.company.toLowerCase().includes(search.toLowerCase()) ||
    job.skills.some((skill) =>
      skill.toLowerCase().includes(search.toLowerCase())
    )
  )
  .slice(0, 5);

if (loading) {
  return (
    <div className="min-h-screen bg-[#050816] flex">
      <Sidebar />

      <main className="flex-1 flex items-center justify-center">
        <div className="text-center">
          <FiRefreshCw
            className="animate-spin mx-auto mb-4 text-[#2FE6FF]"
            size={32}
          />

          <p className="text-white text-lg">
            Loading AI Recommendations...
          </p>
        </div>
      </main>
    </div>
  );
}
  return (
  <>
<input
    ref={fileInputRef}
    type="file"
    accept=".pdf"
    hidden
    onChange={uploadResumeForMatch}
/>

<div className="min-h-screen bg-[#050816] text-white flex">
      {/* ---------------------------------- Sidebar ---------------------------------- */}
      <Sidebar />
      {/* ---------------------------------- Main Content ---------------------------------- */}
      <main className="flex-1">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-10 py-8 lg:py-12">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-3">
              <span className="w-2 h-2 rounded-full bg-gradient-to-r from-[#7B61FF] to-[#2FE6FF] shadow-[0_0_12px_2px_rgba(47,230,255,0.6)]" />
              <span className="text-xs tracking-wide uppercase text-[#B7C0D8]">
                SwipeX AI
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-[#7B61FF] via-[#5EA2FF] to-[#2FE6FF] bg-clip-text text-transparent">
              Discover Jobs
            </h1>
            <p className="mt-3 text-[#B7C0D8] text-sm sm:text-base max-w-xl">
              Swipe to discover AI-curated opportunities tailored for your
              profile.
            </p>
          </div>

          {/* Search + Filters */}
          <div className="flex flex-col gap-4 mb-10">
            <div className="flex items-center gap-3 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl px-5 py-4 focus-within:border-[#5EA2FF]/50 transition-all duration-300">
              <FiSearch size={19} className="text-[#B7C0D8]" />
              <input
                type="text"
                value={search}
                onChange={(e) => {
  const value = e.target.value;

  setSearch(value);

  if (value.trim() === "") {
    fetchRecommendations();
  } else {
    fetchFilteredJobs({
      title: value,
    });
  }
}}
                placeholder="Search by job title, company or skills..."
                className="w-full bg-transparent outline-none text-sm text-white placeholder:text-[#B7C0D8]/70"
              />
            </div>

            <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
              {filterOptions.map((filter) => (
                <button
                  key={filter}
                  onClick={() => {
  setActiveFilter(filter);

  if (filter === "All") {
    fetchRecommendations();
  }

  else if (filter === "Remote") {
    fetchFilteredJobs({
      work_mode: "Remote",
    });
  }

  else if (filter === "Hybrid") {
    fetchFilteredJobs({
      work_mode: "Hybrid",
    });
  }

  else if (filter === "On-site") {
    fetchFilteredJobs({
      work_mode: "On-site",
    });
  }

  else if (filter === "Internship") {
    fetchFilteredJobs({
      job_type: "Internship",
    });
  }

  else if (filter === "Full Time") {
    fetchFilteredJobs({
      job_type: "Full Time",
    });
  }

  else if (filter === "Fresher") {
    fetchFilteredJobs({
      experience: "Fresher",
    });
  }

  else if (filter === "Startup") {
    fetchFilteredJobs({
      startup: true,
    });
  }

  else if (filter === "MNC") {
    fetchFilteredJobs({
      mnc: true,
    });
  }
}}
                  className={`shrink-0 text-xs sm:text-sm px-4 py-2 rounded-full border whitespace-nowrap transition-all duration-300 ${
                    activeFilter === filter
                      ? "bg-gradient-to-r from-[#7B61FF] via-[#5EA2FF] to-[#2FE6FF] text-white border-transparent shadow-[0_0_15px_rgba(94,162,255,0.35)]"
                      : "bg-white/5 text-[#B7C0D8] border-white/10 hover:bg-white/10 hover:text-white"
                  }`}
                >
                  {filter}
                </button>
              ))}
              <button className="shrink-0 flex items-center gap-1.5 text-xs sm:text-sm px-4 py-2 rounded-full border border-white/10 bg-white/5 text-[#B7C0D8] hover:bg-white/10 hover:text-white transition-all duration-300">
                <FiSliders size={14} />
                Filters
              </button>
            </div>
          </div>

          {/* Swipe Card Stack */}
          <div className="relative w-full max-w-md mx-auto h-[520px] sm:h-[540px] mb-8">
            <AnimatePresence>
              {visibleStack.length === 0 ? (
                <motion.div
                  key="empty"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="absolute inset-0 flex flex-col items-center justify-center text-center rounded-[24px] bg-white/5 border border-white/10 backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.35)] p-8"
                >
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#7B61FF] via-[#5EA2FF] to-[#2FE6FF] flex items-center justify-center mb-5 shadow-[0_0_25px_rgba(94,162,255,0.35)]">
                    <FiCompass size={26} className="text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">
                    No more recommendations today.
                  </h3>
                  <p className="text-[#B7C0D8] text-sm mb-6">
                    Check back later! SwipeX AI is finding fresh matches for
                    your profile.
                  </p>
                  <button
                    onClick={handleReload}
                    className="px-6 py-3 rounded-2xl font-semibold text-white bg-gradient-to-r from-[#7B61FF] via-[#5EA2FF] to-[#2FE6FF] hover:brightness-110 hover:shadow-[0_0_25px_rgba(94,162,255,0.45)] transition-all duration-300 flex items-center gap-2"
                  >
                    <FiRefreshCw size={16} />
                    Reload Recommendations
                  </button>
                </motion.div>
              ) : (
                visibleStack
                  .map((job, idx) => {
                    const isTop = idx === 0;
                    const scale = 1 - idx * 0.045;
                    const translateY = idx * 14;
                    const skew = idx % 2 === 0 ? idx * 1.5 : -idx * 1.5;
                    const opacityLevel = 1 - idx * 0.18;
                    const zIndex = visibleStack.length - idx;

                    if (isTop) {
                      return (
                        <motion.div
                          key={job.id}
                          className="absolute inset-0 rounded-[24px] bg-white/5 border border-white/10 backdrop-blur-xl shadow-[0_20px_60px_rgba(0,0,0,0.5)] p-6 flex flex-col cursor-grab active:cursor-grabbing"
                          style={{ x, rotate, zIndex }}
                          animate={controls}
                          drag="x"
                          dragConstraints={{ left: 0, right: 0 }}
                          dragElastic={1}
                          onDragEnd={handleDragEnd}
                        >
                          {/* Overlay Labels */}
                          <motion.div
                            style={{ opacity: likeOpacity }}
                            className="absolute top-8 left-8 z-20 pointer-events-none px-4 py-2 rounded-xl border-2 border-[#4ADE80] text-[#4ADE80] font-bold text-sm -rotate-12 shadow-[0_0_20px_rgba(74,222,128,0.5)] bg-[#4ADE80]/10"
                          >
                            INTERESTED ❤️
                          </motion.div>
                          <motion.div
                            style={{ opacity: nopeOpacity }}
                            className="absolute top-8 right-8 z-20 pointer-events-none px-4 py-2 rounded-xl border-2 border-[#FF5C5C] text-[#FF5C5C] font-bold text-sm rotate-12 shadow-[0_0_20px_rgba(255,92,92,0.5)] bg-[#FF5C5C]/10"
                          >
                            NOT INTERESTED ✖️
                          </motion.div>*

                          <JobCardContent
    job={job}
    applyJob={applyJob}
    handleCompatibilityClick={handleCompatibilityClick}
/>
                        </motion.div>
                      );
                    }

                    return (
                      <div
                        key={job.id}
                        className="absolute inset-0 rounded-[24px] bg-white/5 border border-white/10 backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.35)] p-6 pointer-events-none"
                        style={{
                          transform: `scale(${scale}) translateY(${translateY}px) rotate(${skew}deg)`,
                          opacity: opacityLevel,
                          zIndex,
                        }}
                      >
                        <JobCardContent
    job={job}
    applyJob={applyJob}
    handleCompatibilityClick={handleCompatibilityClick}
/>
                      </div>
                    );
                  })
                  .reverse()
              )}
            </AnimatePresence>
          </div>

          {/* Action Buttons */}
          {visibleStack.length > 0 && (
            <div className="flex items-center justify-center gap-6 mb-10">
              <button
                onClick={() => handleSwipe("left")}
                className="w-16 h-16 rounded-full bg-white/5 border border-white/10 backdrop-blur-xl flex items-center justify-center text-[#FF5C5C] hover:bg-[#FF5C5C]/10 hover:border-[#FF5C5C]/40 hover:scale-105 transition-all duration-300 shadow-[0_8px_24px_rgba(0,0,0,0.35)]"
              >
                <FiX size={26} />
              </button>
              <button
                onClick={() => handleSwipe("right")}
                className="w-20 h-20 rounded-full bg-gradient-to-br from-[#7B61FF] via-[#5EA2FF] to-[#2FE6FF] flex items-center justify-center text-white hover:brightness-110 hover:scale-105 transition-all duration-300 shadow-[0_0_30px_rgba(94,162,255,0.5)]"
              >
                <FiHeart size={28} />
              </button>
            </div>
          )}

          {/* Progress */}
          <div className="max-w-sm mx-auto mb-14">
            <p className="text-center text-sm text-[#B7C0D8] mb-2">
  Reviewed {reviewedCount} of {totalJobs} jobs
</p>
            <div className="w-full h-2 rounded-full bg-white/5 border border-white/10 overflow-hidden">
              <motion.div
                className="h-full rounded-full bg-gradient-to-r from-[#7B61FF] via-[#5EA2FF] to-[#2FE6FF]"
                animate={{
  width:
    totalJobs > 0
      ? `${(reviewedCount / totalJobs) * 100}%`
      : "0%",
}}
                transition={{ duration: 0.4, ease: "easeOut" }}
              />
            </div>
          </div>

          {/* How SwipeX Works */}
          <div className="rounded-[24px] bg-white/5 border border-white/10 backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.35)] p-6 sm:p-8 mb-10">
            <h3 className="text-lg font-semibold text-white mb-1">
              How SwipeX Works
            </h3>
            <p className="text-sm text-[#B7C0D8] mb-6">
              Three simple gestures power a smarter job search.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-[#FF5C5C]/40 hover:bg-white/[0.06] transition-all duration-300">
                <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#FF5C5C]/30 to-[#FF5C5C]/10 border border-white/10 flex items-center justify-center mb-4">
                  <FiThumbsDown size={19} className="text-[#FF5C5C]" />
                </div>
                <h4 className="text-sm font-semibold text-white mb-1.5">
                  Swipe Left
                </h4>
                <p className="text-xs text-[#B7C0D8] leading-relaxed">
                  Not interested in this job — it's removed and won't be
                  shown again.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-[#4ADE80]/40 hover:bg-white/[0.06] transition-all duration-300">
                <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#4ADE80]/30 to-[#4ADE80]/10 border border-white/10 flex items-center justify-center mb-4">
                  <FiHeart size={19} className="text-[#4ADE80]" />
                </div>
                <h4 className="text-sm font-semibold text-white mb-1.5">
                  Swipe Right
                </h4>
                <p className="text-xs text-[#B7C0D8] leading-relaxed">
                  Interested — save it to your list or apply in a single
                  tap.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-[#2FE6FF]/40 hover:bg-white/[0.06] transition-all duration-300">
                <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#7B61FF]/30 via-[#5EA2FF]/30 to-[#2FE6FF]/30 border border-white/10 flex items-center justify-center mb-4">
                  <FiCpu size={19} className="text-[#2FE6FF]" />
                </div>
                <h4 className="text-sm font-semibold text-white mb-1.5">
                  AI Learns Your Preferences
                </h4>
                <p className="text-xs text-[#B7C0D8] leading-relaxed">
                  The recommendation engine gets sharper with every swipe you
                  make.
                </p>
              </div>
            </div>
          </div>
        </div>
        <MatchAnalysisModal
    isOpen={isMatchModalOpen}
    onClose={() => setIsMatchModalOpen(false)}
    matchData={matchData}
/>
      </main>
    </div>
  </>
  );
}

/* ---------------------------------- Job Card Content ---------------------------------- */
function JobCardContent({
    job,
    applyJob,
    handleCompatibilityClick
}) {
  return (
    <div className="flex flex-col h-auto select-none">
      {/* Top Row */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#7B61FF]/30 via-[#5EA2FF]/30 to-[#2FE6FF]/30 border border-white/10 flex items-center justify-center font-bold text-lg text-white shrink-0">
            {job.initials}
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <p className="text-sm font-semibold text-white">
                {job.company}
              </p>
              {job.verified && (
                <FiCheckCircle size={13} className="text-[#2FE6FF]" />
              )}
            </div>
            <p className="text-xs text-[#B7C0D8]">{job.posted}</p>
          </div>
        </div>
        <button
    onPointerDown={(e) => e.stopPropagation()}
    onClick={(e) => {
        e.stopPropagation();
        console.log("Compatibility button clicked");
        handleCompatibilityClick(job.id);
    }}

    className="flex items-center gap-1 text-xs font-semibold px-3 py-1.5 rounded-full bg-gradient-to-r from-[#7B61FF]/20 via-[#5EA2FF]/20 to-[#2FE6FF]/20 border border-white/10 text-[#2FE6FF] hover:scale-105 transition"
>
    <FiTrendingUp size={12} />
    Compatibility Analysis
</button>
      </div>

      {/* Title */}
      <h3 className="text-xl font-bold text-white mb-1">{job.title}</h3>

      {/* Meta */}
      <div className="flex flex-wrap gap-x-4 gap-y-1.5 text-xs text-[#B7C0D8] mb-4">
        <span className="flex items-center gap-1.5">
          <FiMapPin size={13} /> {job.location}
        </span>
        <span className="flex items-center gap-1.5">
          <FiBriefcase size={13} /> {job.mode}
        </span>
        <span className="flex items-center gap-1.5">
          <FiClock size={13} /> {job.experience}
        </span>
      </div>

      {/* Salary + Type */}
      <div className="flex items-center gap-2 mb-4">
        <span className="text-sm font-semibold text-white bg-white/5 border border-white/10 px-3 py-1.5 rounded-full">
          {job.salary}
        </span>
        <span className="text-xs text-[#B7C0D8] bg-white/5 border border-white/10 px-3 py-1.5 rounded-full">
          {job.type}
        </span>
      </div>

      {/* Description */}
      <p className="text-sm text-[#B7C0D8] leading-relaxed mb-3 line-clamp-3">
        {job.description}
      </p>

      {/* Skills */}
      <div className="flex flex-wrap gap-2 mb-3">
        {(job.skills || []).map((skill) => (
  <span
    key={skill}
    className="text-[11px] px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[#B7C0D8]"
  >
    {skill}
  </span>
))}
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between pt-3 border-t border-white/10">
        <span className="flex items-center gap-1.5 text-xs text-[#B7C0D8]">
          <FiUsers size={13} />
          {job.applicants} applicants
        </span>
        {job.easyApply && (
  <button
    onClick={() => applyJob(job.id)}
    className="px-4 py-2 rounded-lg bg-gradient-to-r from-[#7B61FF] to-[#2FE6FF] text-white text-xs font-semibold hover:scale-105 transition"
  >
    Apply Now
  </button>
)}
      </div>
    </div>
  );
}