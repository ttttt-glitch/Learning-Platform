"use client";

import { useState } from "react";

// Define categories for the filter bar
const CATEGORIES = ["All", "Journalism", "Pharmacology", "Computer Basics", "Public Health"];

// Define our comprehensive list of courses with categories
const COURSES = [
  // Journalism
  {
    category: "Journalism",
    title: "Introduction to Investigative Reporting",
    description: "Learn how to uncover facts, verify sources, and build compelling investigative stories.",
    embedUrl: "https://www.youtube.com/embed/z3eM2pV7xEM",
  },
  {
    category: "Journalism",
    title: "Ethics and Media Law",
    description: "Understand the legal boundaries, responsibilities, and ethical standards of modern media.",
    embedUrl: "https://www.youtube.com/embed/5Hw7h0x_m60",
  },
  {
    category: "Journalism",
    title: "Digital Journalism & Storytelling",
    description: "Adapt traditional reporting for digital platforms, social media, and modern web audiences.",
    embedUrl: "https://www.youtube.com/embed/3v68v6v6v6v",
  },
  // Pharmacology
  {
    category: "Pharmacology",
    title: "Basics of Pharmacokinetics",
    description: "Explore how drugs move through the body—absorption, distribution, metabolism, and excretion.",
    embedUrl: "https://www.youtube.com/embed/7X8c4Vz2q50",
  },
  {
    category: "Pharmacology",
    title: "Understanding Receptor Interactions",
    description: "An introductory look into how medications bind to cellular receptors to create therapeutic responses.",
    embedUrl: "https://www.youtube.com/embed/8vY0f3c5b20",
  },
  {
    category: "Pharmacology",
    title: "Introduction to Drug Classifications",
    description: "Overview of major pharmaceutical classes, mechanisms of action, and clinical applications.",
    embedUrl: "https://www.youtube.com/embed/2x2v2v2v2v2",
  },
  // Computer Basics
  {
    category: "Computer Basics",
    title: "Hardware vs. Software Architecture",
    description: "Discover how physical components and operating systems communicate to run applications.",
    embedUrl: "https://www.youtube.com/embed/Ak7ifoZkcKA",
  },
  {
    category: "Computer Basics",
    title: "Navigating Networks and the Internet",
    description: "Learn fundamental concepts behind IP addresses, routers, and secure web browsing.",
    embedUrl: "https://www.youtube.com/embed/DJoYwA3mSNg",
  },
  {
    category: "Computer Basics",
    title: "Operating Systems Explained",
    description: "Understand file systems, process management, and user interfaces across major operating systems.",
    embedUrl: "https://www.youtube.com/embed/rN9i40F2jB0",
  },
  // Public Health
  {
    category: "Public Health",
    title: "Introduction to Epidemiology",
    description: "Study the patterns, causes, and effects of health and disease conditions in defined populations.",
    embedUrl: "https://www.youtube.com/embed/0K4X2t8L3z0",
  },
  {
    category: "Public Health",
    title: "Community Health Interventions",
    description: "Explore how health programs and policies are designed to protect populations and prevent disease outbreaks.",
    embedUrl: "https://www.youtube.com/embed/4K5f6g7h8i9",
  },
  {
    category: "Public Health",
    title: "Global Health Policy & Systems",
    description: "Examine international health organizations, healthcare delivery models, and systemic inequalities.",
    embedUrl: "https://www.youtube.com/embed/1A2B3C4D5E6",
  },
];
interface Article {
  id: string;
  category: string;
  title: string;
  summary: string;
  content: string;
  author: string;
  readTime: string;
  date: string;
}

const ARTICLES: Article[] = [
  {
    id: "journalism-1",
    category: "Journalism",
    title: "The Fundamentals of Investigative Journalism",
    summary: "Understand the principles of uncovering truthful and reliable information.",
    content: `Write your full article here. You can make this as long as you want. Explain concepts, provide examples, and teach students in detail.

You can even write multiple paragraphs.

This is where your lesson or article goes.`,
    author: "Learning Platform",
    readTime: "6 min read",
    date: "July 24, 2026",
  },

  {
    id: "journalism-2",
    category: "Journalism",
    title: "Media Ethics",
    summary: "Professional responsibilities of journalists.",
    content: "Write your article here...",
    author: "Learning Platform",
    readTime: "5 min read",
    date: "July 24, 2026",
  },

  {
    id: "pharmacology-1",
    category: "Pharmacology",
    title: "Introduction to Pharmacokinetics",
    summary: "Learn how medicines travel through the human body.",
    content: "Write your article here...",
    author: "Learning Platform",
    readTime: "7 min read",
    date: "July 24, 2026",
  },

  {
    id: "computer-1",
    category: "Computer Basics",
    title: "Understanding Computer Hardware",
    summary: "An introduction to the essential parts of a computer.",
    content: "Write your article here...",
    author: "Learning Platform",
    readTime: "8 min read",
    date: "July 24, 2026",
  },

  {
    id: "public-health-1",
    category: "Public Health",
    title: "What Is Public Health?",
    summary: "Learn how public health protects communities.",
    content: "Write your article here...",
    author: "Learning Platform",
    readTime: "6 min read",
    date: "July 24, 2026",
  },
];

export default function Home() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  // Contact form state hooks
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // Filter courses based on active category and search query
  const filteredCourses = COURSES.filter((course) => {
    const matchesCategory = activeCategory === "All" || course.category === activeCategory;
    const matchesSearch =
      course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Filter articles based on active category and search query
  const filteredArticles = ARTICLES.filter((article) => {
    const matchesCategory = activeCategory === "All" || article.category === activeCategory;
    const matchesSearch =
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.summary.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Asynchronous handleSubmit function using fetch API with your Formspree endpoint
  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitting(true);
    setErrorMessage("");

    const formData = new FormData(event.currentTarget);
    const data = {
      name: formData.get("name"),
      email: formData.get("email"),
      message: formData.get("message"),
    };

    try {
      const response = await fetch("https://formspree.io/f/mpqvjalw", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
      });

      if (response.ok) {
        setSubmitted(true);
      } else {
        const responseData = await response.json();
        if (responseData && responseData.errors) {
          setErrorMessage(responseData.errors.map((error: any) => error.message).join(", "));
        } else {
          setErrorMessage("Oops! There was a problem submitting your form.");
        }
      }
    } catch (error) {
      setErrorMessage("Oops! There was a network error connecting to Formspree.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main className="min-h-screen bg-gray-50 text-gray-900 p-8">
      {/* Header / Navigation */}
      <nav className="flex justify-between items-center max-w-6xl mx-auto mb-12 border-b pb-4 sticky top-0 bg-gray-50/90 backdrop-blur z-10 py-4">
        <h1 className="text-2xl font-bold text-blue-600">Learning Platform</h1>
        <div className="space-x-6 text-sm font-medium">
          <a href="#courses" className="hover:text-blue-600">Courses</a>
          <a href="#articles" className="hover:text-blue-600">Articles</a>
          <a href="#contact" className="hover:text-blue-600">Contact Us</a>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="text-center max-w-3xl mx-auto mb-16">
        <h2 className="text-4xl font-extrabold tracking-tight mb-4">
          Expand Your Knowledge Across Disciplines
        </h2>
        <p className="text-lg text-gray-600 mb-8">
          Explore specialized categories, watch curated educational video lessons, and learn at your own pace.
        </p>
      </section>

      {/* Course Section & Filter Bar */}
      <section id="courses" className="max-w-6xl mx-auto mb-20">
        <h3 className="text-2xl font-bold mb-6 border-l-4 border-blue-600 pl-3">Featured Video Lessons</h3>

        {/* Search Bar Input */}
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

        {/* Filter Button Bar */}
        <div className="flex flex-wrap gap-2 mb-8">
          {CATEGORIES.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition ${
                activeCategory === category
                  ? "bg-blue-600 text-white shadow"
                  : "bg-white text-gray-700 border hover:bg-gray-100"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Dynamic Course Grid */}
        {filteredCourses.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredCourses.map((course, index) => (
              <div key={index} className="bg-white p-4 rounded-xl shadow border flex flex-col justify-between">
                <div>
                  <div className="aspect-video mb-4 bg-black rounded-lg overflow-hidden">
                    <iframe 
                      className="w-full h-full" 
                      src={course.embedUrl} 
                      title={course.title} 
                      allowFullScreen
                    ></iframe>
                  </div>
                  <span className="text-xs font-semibold text-blue-600 uppercase tracking-wider">{course.category}</span>
                  <h4 className="text-xl font-semibold mb-2 mt-1">{course.title}</h4>
                  <p className="text-gray-600 text-sm">{course.description}</p>
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

      {/* Course Articles & Resources Section */}
      <section id="articles" className="max-w-6xl mx-auto mb-20">
        <h3 className="text-2xl font-bold mb-6 border-l-4 border-blue-600 pl-3">Course Articles & Readings</h3>

        {filteredArticles.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredArticles.map((article) => (
              <div key={article.id} className="bg-white p-6 rounded-xl shadow border flex flex-col justify-between">
                <div>
                  <span className="text-xs font-semibold text-blue-600 uppercase tracking-wider">{article.category}</span>
                  <h4 className="text-xl font-semibold mb-2 mt-1">{article.title}</h4>
                  <p className="text-gray-600 text-sm mb-4">{article.summary}</p>
                  <div className="bg-gray-50 p-3 rounded-lg border border-gray-100 mb-4">
                    <p className="text-xs text-gray-700 italic whitespace-pre-line line-clamp-3">{article.content}</p>
                  </div>
                </div>
                <div className="pt-4 border-t border-gray-100 flex justify-between items-center text-xs text-gray-400">
                  <span>{article.author}</span>
                  <span>{article.readTime} • {article.date}</span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-white border border-gray-200 rounded-2xl shadow-sm">
            <p className="text-gray-500 text-base font-medium">
              No articles found matching your search.
            </p>
          </div>
        )}
      </section>

      {/* Contact Us Section with Formspree Async JSON Handler */}
      <section id="contact" className="max-w-xl mx-auto bg-white p-8 rounded-2xl shadow-lg border mb-12">
        <div className="text-center mb-6">
          <h3 className="text-2xl font-bold text-gray-900">Get in Touch</h3>
          <p className="text-gray-600 text-sm mt-1">Have questions or feedback? Drop us a message below.</p>
        </div>

        {submitted ? (
          <div className="bg-green-50 border border-green-200 text-green-800 p-4 rounded-lg text-center font-medium">
            Thank you! Your message has been sent successfully.
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            {errorMessage && (
              <div className="bg-red-50 border border-red-200 text-red-700 p-3 rounded-lg text-sm">
                {errorMessage}
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Your Name</label>
              <input 
                type="text" 
                name="name" 
                required 
                placeholder="Jane Doe" 
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Your Email</label>
              <input 
                type="email" 
                name="email" 
                required 
                placeholder="jane@example.com" 
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Your Message</label>
              <textarea 
                name="message" 
                rows={4} 
                required 
                placeholder="How can we help you?" 
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              ></textarea>
            </div>

            <button 
              type="submit" 
              disabled={submitting}
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold shadow hover:bg-blue-700 transition disabled:opacity-50"
            >
              {submitting ? "Sending..." : "Send Message"}
            </button>
          </form>
        )}
      </section>
    </main>
  );
}