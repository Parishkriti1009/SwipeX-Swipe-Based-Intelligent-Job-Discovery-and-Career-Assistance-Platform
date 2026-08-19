import React from "react";
import {
  Bell,
  Sparkles,
  Rocket,
  TrendingDown,
  CheckCircle,
  Clock,
  X,
} from "lucide-react";

const notifications = [
  {
    id: 1,
    type: "match",
    title: "94% Match Opportunity",
    message:
      "Senior Frontend Engineer is a strong match for your profile.",
    time: "10 min ago",
    icon: Sparkles,
    unread: true,
  },
  {
    id: 2,
    type: "startup",
    title: "New Startup Hiring",
    message:
      "Quantum Labs is hiring React and Full Stack developers.",
    time: "25 min ago",
    icon: Rocket,
    unread: true,
  },
  {
    id: 3,
    type: "competition",
    title: "Low Competition Opportunity",
    message:
      "Backend Engineer currently has only 8 applicants.",
    time: "1 hour ago",
    icon: TrendingDown,
    unread: true,
  },
  {
    id: 4,
    type: "application",
    title: "Application Update",
    message:
      "Your application for UI/UX Engineer has been shortlisted.",
    time: "2 hours ago",
    icon: CheckCircle,
    unread: false,
  },
  {
    id: 5,
    type: "recommendation",
    title: "Resume Recommendation",
    message:
      "Adding TypeScript and AWS could improve your job matches.",
    time: "Yesterday",
    icon: Sparkles,
    unread: false,
  },
];

export default function NotificationPanel({ onClose }) {
  return (
    <div className="absolute right-0 top-14 z-50 w-[380px] max-w-[calc(100vw-2rem)] overflow-hidden rounded-2xl border border-white/10 bg-[#0B1020]/95 shadow-2xl backdrop-blur-xl">

      {/* Header */}
      <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">

        <div>
          <h3 className="text-base font-semibold text-white">
            Notifications
          </h3>

          <p className="mt-0.5 text-xs text-[#7D8597]">
            Stay updated with your opportunities
          </p>
        </div>

        <button
          type="button"
          onClick={onClose}
          className="rounded-lg p-2 text-[#7D8597] transition hover:bg-white/[0.06] hover:text-white"
        >
          <X size={18} />
        </button>

      </div>

      {/* Notifications */}
      <div className="max-h-[430px] overflow-y-auto">

        {notifications.map((notification) => {
          const Icon = notification.icon;

          return (
            <div
              key={notification.id}
              className={`border-b border-white/[0.06] px-5 py-4 transition hover:bg-white/[0.04] ${
                notification.unread
                  ? "bg-white/[0.025]"
                  : ""
              }`}
            >

              <div className="flex gap-3">

                {/* Icon */}
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[#7B61FF]/20 to-[#2FE6FF]/20 border border-white/10">

                  <Icon
                    size={17}
                    className="text-[#5EA2FF]"
                  />

                </div>

                {/* Content */}
                <div className="min-w-0 flex-1">

                  <div className="flex items-start justify-between gap-2">

                    <p className="text-sm font-medium text-white">
                      {notification.title}
                    </p>

                    {notification.unread && (
                      <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-[#2FE6FF]" />
                    )}

                  </div>

                  <p className="mt-1 text-xs leading-5 text-[#B7C0D8]">
                    {notification.message}
                  </p>

                  <div className="mt-2 flex items-center gap-1.5 text-[11px] text-[#7D8597]">
                    <Clock size={11} />
                    {notification.time}
                  </div>

                </div>

              </div>

            </div>
          );
        })}

      </div>

      {/* Footer */}
      <div className="border-t border-white/10 px-5 py-3">

        <button
          type="button"
          className="w-full rounded-xl py-2 text-xs font-medium text-[#5EA2FF] transition hover:bg-white/[0.05]"
        >
          View all notifications
        </button>

      </div>

    </div>
  );
}