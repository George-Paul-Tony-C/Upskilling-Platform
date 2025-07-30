// src/api/APIPATH.ts
// Central place for every backend route the React app calls.
// Import this file anywhere you need a path string – keeps URLs consistent.

/**
 * Optionally set this in an env file so you can switch between
 * local dev (http://localhost:4000) and prod (https://api.example.com).
 */
export const API_BASE = import.meta.env.VITE_API_BASE ?? "http://localhost:4000";

/**
 * Helpers to build paths that need dynamic segments. Functions return the full path.
 */
export const APIPATH = {
  // ──────────────── AUTH ────────────────
  AUTH: {
    LOGIN: () => `${API_BASE}/auth/login`,
  },

  // ────────────── LEARNER ───────────────
  LEARNER: {
    PROFILE: () => `${API_BASE}/learner/profile/me`,
    DASHBOARD: () => `${API_BASE}/learner/dashboard/me`,
    PATH: () => `${API_BASE}/learner/path/me`,
    TRACKER_LATEST: () => `${API_BASE}/learner/tracker/latest-assessment`,

    ASSESSMENT_START: () => `${API_BASE}/learner/assessment/start`,
    ASSESSMENT_ANSWER: (assessmentId: string) =>
      `${API_BASE}/learner/assessment/${assessmentId}/answer`,
    ASSESSMENT_FINISH: (assessmentId: string) =>
      `${API_BASE}/learner/assessment/${assessmentId}/finish`,
  },

  // ──────────────── ADMIN ───────────────
  ADMIN: {
    DASHBOARD: () => `${API_BASE}/admin/dashboard`,

    USERS: () => `${API_BASE}/admin/users`,             // list & create
    USER: (id: string) => `${API_BASE}/admin/users/${id}`,

    AGENTS: () => `${API_BASE}/admin/agents`,
    ANALYTICS: () => `${API_BASE}/admin/analytics`,
  },
} as const;

// ---------------------------------------------------------------------------
// Example usage with fetch + token helper
// ---------------------------------------------------------------------------
// import { APIPATH } from "@/api/APIPATH";
//
// const token = localStorage.getItem("jwt");
// fetch(APIPATH.LEARNER.DASHBOARD(), {
//   headers: { Authorization: `Bearer ${token}` }
// }).then(r => r.json()).then(console.log);

export default APIPATH;
