"use client";

import React, { useState } from "react";

const CATEGORIES = ["All", "Journalism", "Pharmacology", "Computer Basics", "Public Health"];

const COURSES = [
  {
    category: "Journalism",
    title: "Introduction to Investigative Reporting",
    description: "Learn how to uncover facts, verify sources, and build compelling investigative stories.",
    embedUrl: "https://www.youtube.com/embed/O8_isifBeKk",
  },
  {
    category: "Journalism",
    title: "Ethics and Media Law",
    description: "Understand the legal boundaries, responsibilities, and ethical dilemmas faced by modern journalists.",
    embedUrl: "https://www.youtube.com/embed/5Hw7h0x_m60",
  },
  {
    category: "Pharmacology",
    title: "Fundamentals of Drug Action",
    description: "Explore pharmacokinetics, pharmacodynamics, and how medications interact with biological systems.",
    embedUrl: "https://www.youtube.com/embed/3v68v6v6v6v",
  },
  {
    category: "Pharmacology",
    title: "Antibiotics and Resistance",
    description: "An in-depth look at antimicrobial classes, mechanisms of action, and the global challenge of resistance.",
    embedUrl: "https://www.youtube.com/embed/7x777777777",
  },
  {
    category: "Computer Basics",
    title: "Introduction to Computer Hardware",
    description: "Understand the core physical components of a computer, from the CPU to storage and memory.",
    embedUrl: "https://www.youtube.com/embed/8y888888888",
  },
  {
    category: "Computer Basics",
    title: "Operating Systems Explained",
    description: "Learn how operating systems manage hardware resources, software applications, and user interfaces.",
    embedUrl: "https://www.youtube.com/embed/9z999999999",
  },
  {
    category: "Public Health",
    title: "Global Health Challenges",
    description: "Examine major public health issues, disease prevention strategies, and healthcare policy worldwide.",
    embedUrl: "https://www.youtube.com/embed/0a000000000",
  },
  {
    category: "Public Health",
    title: "Epidemiology 101",
    description: "Discover how public health professionals track disease outbreaks, analyze health data, and protect communities.",
    embedUrl: "https://www.youtube.com/embed/1b111111111",
  }
];

export default function Home() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredCourses = COURSES.filter((course) => {
    const matchesCategory = activeCategory === "All" || course.category === activeCategory;
    const matchesSearch =
      course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      {/* Header / Navbar */}
      <header className="border-b bg-white sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-xl font-bold text-blue-600">Learning Platform</h1>
          <nav className="flex gap-6 text-sm font-medium text-gray-600">
            <a href="#courses" className="hover:text-blue-600 transition">Courses Us</a>
            <a href="#contact" className="hover:text-blue-600 transition">Contact</a>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 py-8">
        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-6">Featured Video Lessons</h2>

          {/* Search Bar Component */}
          <div className="mb-6 relative max-w-xl">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-gray-400">
              🔍
            </span>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search courses by title or description..."
              className="w-full pl-10 pr-4 py-3 bg-white border border-gray-300 rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm transition"
            />
          </div>

          {/* Category Filter Buttons */}
          <div className="flex flex-wrap gap-2 mb-8" id="courses">
            {CATEGORIES.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-5 py-2 rounded-full text-sm font-medium transition shadow-sm ${
                  activeCategory === category
                    ? "bg-blue-600 text-white"
                    : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-100"
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Courses Grid */}
          {filteredCourses.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredCourses.map((course, index) => (
                <div
                  key={index}
                  className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition flex flex-col"
                >
                  <div className="relative aspect-video bg-black">
                    <iframe
                      src={course.embedUrl}
                      title={course.title}
                      className="w-full h-full"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                  </div>
                  <div className="p-6 flex flex-col flex-grow">
                    <span className="text-xs font-semibold text-blue-600 uppercase tracking-wider mb-2">
                      {course.category}
                    </span>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">
                      {course.title}
                    </h3>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      {course.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-white border border-gray-200 rounded-2xl shadow-sm">
              <p className="text-gray-500 text-base font-medium">
                No courses found matching your search.
              </p>
            </div>
          )}
        </section>
      </main>

      {/* Footer / Contact Section */}
      <footer id="contact" className="border-t bg-white mt-16 py-8">
        <div className="max-w-6xl mx-auto px-4 text-center text-sm text-gray-500">
          &copy; {new Date().getFullYear()} Learning Platform. All rights reserved.
        </div>
      </footer>
    </div>
  );
}