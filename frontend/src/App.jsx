import React from "react";
import { Routes, Route, useNavigate } from "react-router-dom";

// Fixed paths: Pointing directly inside the Pages folder
import LandingPage from "./Pages/LandingPage"; 
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import Dashboard from "./Pages/Dashboard";
import JobDiscovery from "./Pages/JobDiscovery";
import SavedJobs from "./Pages/SavedJobs";
import Companies from "./pages/Companies";
import Startups from "./pages/Startups";
import MNC from "./pages/MNC";
import Applications from "./Pages/Applications";
import ResumeAnalysis from "./Pages/ResumeAnalysis";
import Profile from "./pages/Profile";
import PostedJobs from "./Pages/PostedJobs";
import Applicants from "./Pages/Applicants";
import Analytics from "./Pages/Analytics";
import CompanyProfile from "./Pages/CompanyProfile";
import Settings from "./pages/Settings";
import UserManagement from "./pages/UserManagement";
import RecruiterManagement from "./Pages/RecruiterManagement";
import JobManagement from "./Pages/JobManagement";
import Reports from "./Pages/Reports";

// A small wrapper component to grant LandingPage access to the Router's navigation
function ConnectedLandingPage() {
  const navigate = useNavigate();

  return (
    <LandingPage
      onLoginClick={() => navigate("/login")}
      onRegisterClick={() => navigate("/register")}
      onGetStartedClick={() => navigate("/register")}
    />
  );
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<ConnectedLandingPage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/jobs" element={<JobDiscovery />} />
      <Route path="/saved-jobs" element={<SavedJobs />} />
      <Route path="/companies" element={<Companies />} />
      <Route path="/startups" element={<Startups />} />
      <Route path="/mnc" element={<MNC />} />
      <Route path="/applications" element={<Applications />} />
      <Route path="/resume-analysis"element={<ResumeAnalysis />}/>
      <Route path="/profile" element={<Profile />} />
      <Route path="/posted-jobs" element={<PostedJobs />} />
      <Route path="/applicants" element={<Applicants />} />
      <Route path="/analytics" element={<Analytics />} />
      <Route path="/company-profile" element={<CompanyProfile />} />
      <Route path="/settings" element={<Settings />} />
      <Route path="/users" element={<UserManagement />} />
      <Route path="/recruiters"element={<RecruiterManagement />}/>
      <Route path="/jobs-management"element={<JobManagement />}/>
      <Route path="/reports" element={<Reports />} />
    </Routes>
  );
}