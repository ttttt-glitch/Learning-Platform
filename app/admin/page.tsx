"use client";

import { useState } from "react";

// Same course list as your CourseExplorer component — keep these in sync
const ADMIN_COURSES = [
  { id: "journalism-1", title: "Introduction to Investigative Reporting", category: "Journalism" },
  { id: "journalism-2", title: "Ethics and Media Law", category: "Journalism" },
  { id: "journalism-3", title: "Digital Journalism & Storytelling", category: "Journalism" },
  { id: "pharmacology-1", title: "Basics of Pharmacokinetics", category: "Pharmacology" },
  { id: "pharmacology-2", title: "Understanding Receptor Interactions", category: "Pharmacology" },
  { id: "pharmacology-3", title: "Introduction to Drug Classifications", category: "Pharmacology" },
  { id: "computer-1", title: "Hardware vs. Software Architecture", category: "Computer Basics" },
  { id: "computer-2", title: "Navigating Networks and the Internet", category: "Computer Basics" },
  { id: "computer-3", title: "Operating Systems Explained", category: "Computer Basics" },
  { id: "public-health-1", title: "Introduction to Epidemiology", category: "Public Health" },
  { id: "public-health-2", title: "Community Health Interventions", category: "Public Health" },
  { id: "public-health-3", title: "Global Health Policy & Systems", category: "Public Health" },
];

const CATEGORIES = Array.from(new Set(ADMIN_COURSES.map((c) => c.category)));

// TEMPORARY: hardcoded here for now (Option A). Move server-side later.
const GRANT_SECRET = "bosaso_wwe_secure_key";

// Special value meaning "grant every course in the selected category"
const ALL_IN_CATEGORY = "_ALL_";

export default function AdminPage() {
  const [email, setEmail] = useState("");
  const [category, setCategory] = useState(CATEGORIES[0]);
  const [courseId, setCourseId] = useState<string>(ALL_IN_CATEGORY);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const coursesInCategory = ADMIN_COURSES.filter((c) => c.category === category);

  async function handleGrant(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("loading");
    setMessage("");

    const courseIds =
      courseId === ALL_IN_CATEGORY
        ? coursesInCategory.map((c) => c.id)
        : [courseId];

    try {
      const response = await fetch("/api/grant-access", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ secret: GRANT_SECRET, email, courseIds }),
      });

      const data = await response.json().catch(() => ({}));

      if (response.ok) {
        setStatus("success");
        setMessage(`Access granted: ${email} -> ${courseIds.join(", ")}`);
      } else {
        setStatus("error");
        setMessage( data?.error || data?.message || `Request failed (${response.status})`);
      }
    } catch (err) {
      setStatus("error");
      setMessage("Network error - check your connection and try again.");
    }
  }

  return (
    <main className="min-h-screen bg-gray-50 flex items-center justify-center p-8">
      <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow border">
        <h1 className="text-2xl font-bold mb-6">Grant Course Access</h1>

        <form onSubmit={handleGrant} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Student Email
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="student@example.com"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Category
            </label>
            <select
              value={category}
              onChange={(e) => {
                setCategory(e.target.value);
                setCourseId(ALL_IN_CATEGORY);
              }}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            >
              {CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Course
            </label>
            <select
              value={courseId}
              onChange={(e) => setCourseId(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            >
              <option value={ALL_IN_CATEGORY}>
                All {category} courses ({coursesInCategory.length})
              </option>
              {coursesInCategory.map((course) => (
                <option key={course.id} value={course.id}>
                  {course.title} ({course.id})
                </option>
              ))}
            </select>
          </div>

          <button
            type="submit"
            disabled={status === "loading"}
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold shadow hover:bg-blue-700 transition disabled:opacity-50"
          >
            {status === "loading" ? "Granting..." : "Grant Access"}
          </button>
        </form>

        {message && (
          <div
            className={`mt-4 p-3 rounded-lg text-sm ${
              status === "success"
                ? "bg-green-50 border border-green-200 text-green-800"
                : "bg-red-50 border border-red-200 text-red-700"
            }`}
          >
            {message}
          </div>
        )}
      </div>
    </main>
  );
}