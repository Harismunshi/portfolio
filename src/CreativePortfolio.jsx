import React, { useState, useEffect, useRef, useMemo } from "react";
import {
  ChevronDown,
  Github,
  ExternalLink,
  Mail,
  Linkedin,
  Twitter,
  ArrowRight,
  Code,
  Palette,
  Zap,
  Star,
  Eye,
  Users,
  Moon,
  Sun,
  Download,
} from "lucide-react";

const CreativePortfolio = () => {
  const [activeSection, setActiveSection] = useState("hero");
  const [scrollY, setScrollY] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    message: "",
  });
  const portfolioRef = useRef(null);
  const heroRef = useRef(null);

  // Optimized background stars generation
  const stars = useMemo(
    () =>
      Array.from({ length: 50 }, (_, i) => ({
        id: i,
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        delay: `${Math.random() * 3}s`,
        duration: `${2 + Math.random() * 3}s`,
      })),
    []
  );

  // Intersection Observer for section highlighting
  useEffect(() => {
    const sections = document.querySelectorAll("section");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.6 }
    );

    sections.forEach((section) => observer.observe(section));
    return () => sections.forEach((section) => observer.unobserve(section));
  }, []);

  // Optimized scroll handler with requestAnimationFrame
  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrollY(window.scrollY);
          ticking = false;
        });
        ticking = true;
      }
    };

    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    element?.scrollIntoView({ behavior: "smooth" });
  };

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };
  const handleContactSubmit = (e) => {
    e.preventDefault();
    // In a real application, you would send this data to a server
    alert("Thank you for your message! I will get back to you soon.");
    setContactForm({ name: "", email: "", message: "" });
  };

  const handleContactChange = (e) => {
    setContactForm({
      ...contactForm,
      [e.target.name]: e.target.value,
    });
  };

  const projects = [
    {
      id: 1,
      title: "AI-Powered Resume Builder",
      category: "AI Integration & Frontend",
      description:
        "A smart resume generator where users input career details, and the system creates multiple tailored resume templates with AI-driven personalization.",
      tech: ["React.js", "Tailwind CSS", "Node.js", "OpenAI API", "PDF Export"],
      image: "/Resume_Builder.png",
      stats: { views: "42K", stars: "2.1K", users: "12K" },
    },
    {
      id: 2,
      title: "Real-Time Collaboration Whiteboard",
      category: "Real-Time Communication",
      description:
        "A collaborative online whiteboard enabling multiple users to draw, type, and brainstorm in real-time with live cursors and interactive features.",
      tech: ["React.js", "Material UI", "Socket.io", "Node.js", "Canvas API"],
      image: "/Whiteboard.png",
      stats: { views: "38K", stars: "1.9K", users: "9K" },
    },
    {
      id: 3,
      title: "Creative Portfolio Website with Animations",
      category: "Animation & UI/UX Design",
      description:
        "A visually engaging portfolio website with smooth parallax scrolling, timeline animations, and micro-interactions using advanced animation frameworks.",
      tech: ["React.js", "GSAP", "Framer Motion", "Tailwind CSS", "WebGL"],
      image: "Portfolio_UI.png",
      stats: { views: "35K", stars: "1.7K", users: "7K" },
    },
  ];

  const skills = [
    {
      name: "Frontend Development",
      level: 95,
      icon: Code,
      color: "from-blue-500 to-cyan-500",
    },
    {
      name: "UI/UX Design",
      level: 80,
      icon: Palette,
      color: "from-purple-500 to-pink-500",
    },
    {
      name: "Animation & Motion",
      level: 70,
      icon: Zap,
      color: "from-green-500 to-teal-500",
    },
  ];

  const timeline = [
    {
      year: "2026",
      title: "BCA Graduate",
      company: "KSV University, Gandhinagar",
      description:
        "Graduating with Bachelor's of Computer Application, specializing in modern web technologies and software development.",
    },
    {
      year: "2025",
      title: "Advanced Projects & Internships",
      company: "Final Year Focus",
      description:
        "Building complex full-stack applications, integrating AI technologies, and developing real-time collaborative platforms.",
    },
    {
      year: "2024",
      title: "Full-Stack Development Mastery",
      company: "Third Year Studies",
      description:
        "Mastered React.js, Node.js, database management, and started working on professional-level projects with modern frameworks.",
    },
    {
      year: "2023",
      title: "BCA Journey Begins",
      company: "KSV University, Gandhinagar",
      description:
        "Started Bachelor's in Computer Application, learning programming fundamentals, web development, and building first projects.",
    },
  ];

  return (
    <div
      className={`${
        isDarkMode ? "bg-black text-white" : "bg-white text-gray-900"
      } overflow-hidden transition-colors duration-500`}
      ref={portfolioRef}
    >
      {/* Custom Cursor */}
      <div
        className="fixed w-6 h-6 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full pointer-events-none z-50 mix-blend-difference transition-transform duration-150 ease-out"
        style={{
          left: mousePosition.x - 12,
          top: mousePosition.y - 12,
          transform: `scale(${activeSection === "hero" ? 1.5 : 1})`,
        }}
      />

      {/* Navigation */}
      <nav
        className={`fixed top-0 left-0 right-0 z-40 ${
          isDarkMode ? "bg-black/80" : "bg-white/80"
        } backdrop-blur-md border-b ${
          isDarkMode ? "border-gray-800" : "border-gray-200"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Portfolio
            </div>
            <div className="hidden md:flex space-x-8">
              {["About", "Projects", "Skills", "Experience", "Contact"].map(
                (item) => (
                  <button
                    key={item}
                    onClick={() => scrollToSection(item.toLowerCase())}
                    className={`hover:text-purple-400 transition-colors duration-300 relative group ${
                      activeSection === item.toLowerCase()
                        ? "text-purple-400"
                        : ""
                    }`}
                  >
                    {item}
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-400 to-pink-400 group-hover:w-full transition-all duration-300" />
                  </button>
                )
              )}
            </div>
            <button
              onClick={toggleTheme}
              className={`p-2 rounded-full ${
                isDarkMode ? "hover:bg-gray-800" : "hover:bg-gray-100"
              } transition-colors duration-300`}
              aria-label="Toggle theme"
            >
              {isDarkMode ? (
                <Sun className="w-5 h-5" />
              ) : (
                <Moon className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section
        id="hero"
        ref={heroRef}
        className="min-h-screen flex items-center justify-center relative overflow-hidden"
      >
        {/* Animated Background */}
        <div className="absolute inset-0">
          <div
            className={`absolute inset-0 ${
              isDarkMode
                ? "bg-gradient-to-br from-purple-900/20 via-black to-pink-900/20"
                : "bg-gradient-to-br from-purple-100/30 via-white to-pink-100/30"
            }`}
          />
          {stars.map((star) => (
            <div
              key={star.id}
              className={`absolute w-1 h-1 ${
                isDarkMode ? "bg-white" : "bg-gray-600"
              } rounded-full opacity-20 animate-pulse`}
              style={{
                left: star.left,
                top: star.top,
                animationDelay: star.delay,
                animationDuration: star.duration,
              }}
            />
          ))}
        </div>

        {/* Parallax Elements */}
        <div
          className="absolute inset-0 opacity-10"
          style={{ transform: `translateY(${scrollY * 0.5}px)` }}
        >
          <div className="w-96 h-96 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full blur-3xl absolute top-20 left-20" />
          <div className="w-64 h-64 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full blur-3xl absolute bottom-20 right-20" />
        </div>

        <div className="text-center z-10 px-6">
          <div
            className="transform transition-all duration-1000 ease-out"
            style={{ transform: `translateY(${scrollY * -0.2}px)` }}
          >
            <h1 className="text-4xl md:text-7xl font-bold mb-6 leading-tight">
              <span className="block bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent animate-pulse">
                Harisahmed
              </span>
              <span
                className={`block ${
                  isDarkMode ? "text-white" : "text-gray-900"
                }`}
              >
                Developer
              </span>
            </h1>
            <p
              className={`text-xl md:text-2xl ${
                isDarkMode ? "text-gray-300" : "text-gray-700"
              } mb-8 max-w-2xl mx-auto`}
            >
              Crafting immersive digital experiences with cutting-edge
              animations and modern web technologies
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => scrollToSection("projects")}
                className="px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full text-white font-semibold hover:from-purple-600 hover:to-pink-600 transform hover:scale-105 transition-all duration-300 flex items-center justify-center group"
              >
                View My Work
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
              </button>
              <a
                href="/Harisahmed.pdf"
                download="Resume.pdf"
                className="px-8 py-4 border-2 border-purple-400 rounded-full text-purple-400 font-semibold hover:bg-purple-400 hover:text-white transform hover:scale-105 transition-all duration-300 flex items-center justify-center"
              >
                <Download className="w-5 h-5 mr-2" />
                Download Resume
              </a>
            </div>
          </div>
        </div>

        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ChevronDown className="w-8 h-8 text-purple-400" />
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                About Me
              </h2>
              <p className="text-gray-300 text-lg mb-6 leading-relaxed">
                I'm a passionate creative developer who bridges the gap between
                design and technology. With over 4 years of experience, I
                specialize in creating immersive digital experiences that
                captivate users and drive engagement.
              </p>
              <p className="text-gray-300 text-lg mb-8 leading-relaxed">
                Creative and detail-oriented Frontend Developer passionate about
                building responsive, accessible, and user-centric web
                applications. Proficient in React.js, Tailwind CSS, Material UI,
                and JavaScript, with hands-on experience developing dynamic UI
                components and single-page applications. Skilled in integrating
                backend systems using Node.js, PHP, and MySQL. Currently
                exploring the MERN stack (MongoDB, Express.js, React.js,
                Node.js) and modern frameworks like Next.js and Framer Motion to
                deliver seamless, high-performance digital experiences.
              </p>
              <div className="flex space-x-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-400">10+</div>
                  <div className="text-gray-400">Projects Built</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-pink-400">3+</div>
                  <div className="text-gray-400">Years Learning</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-cyan-400">2026</div>
                  <div className="text-gray-400">Graduation Year</div>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="w-full h-70 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-2xl backdrop-blur-sm border border-gray-700 p-8">
                <div className="space-y-4">
                  {skills.map((skill, index) => (
                    <div key={skill.name} className="group cursor-pointer">
                      <div className="flex justify-between mb-2">
                        <div className="flex items-center">
                          <skill.icon className="w-5 h-5 mr-2 text-purple-400" />
                          <span className="text-white font-medium">
                            {skill.name}
                          </span>
                        </div>
                        <span className="text-purple-400 font-semibold">
                          {skill.level}%
                        </span>
                      </div>
                      <div className="w-full bg-gray-700 rounded-full h-2 overflow-hidden">
                        <div
                          className={`h-full bg-gradient-to-r ${skill.color} rounded-full transition-all duration-1000 ease-out group-hover:animate-pulse`}
                          style={{ width: `${skill.level}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section
        id="projects"
        className={`py-20 px-6 ${
          isDarkMode
            ? "bg-gradient-to-b from-gray-900/50 to-black"
            : "bg-gradient-to-b from-gray-100/50 to-white"
        }`}
      >
        <div className="max-w-7xl mx-auto">
          <h2 className="text-5xl font-bold text-center mb-16 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            Featured Projects
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <div
                key={project.id}
                className={`group ${
                  isDarkMode
                    ? "bg-gray-900/50 border-gray-700 hover:border-purple-500"
                    : "bg-white border-gray-200 hover:border-purple-400"
                } rounded-2xl overflow-hidden border transition-all duration-500 hover:transform hover:scale-105 shadow-lg`}
              >
                <div className="relative overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                  <div className="absolute top-4 right-4">
                    <div className="bg-purple-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                      {project.category}
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <h3
                    className={`text-xl font-bold mb-3 ${
                      isDarkMode ? "text-white" : "text-gray-900"
                    } group-hover:text-purple-400 transition-colors duration-300`}
                  >
                    {project.title}
                  </h3>
                  <p
                    className={`${
                      isDarkMode ? "text-gray-300" : "text-gray-600"
                    } mb-4 text-sm leading-relaxed`}
                  >
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tech.map((tech) => (
                      <span
                        key={tech}
                        className={`${
                          isDarkMode
                            ? "bg-gray-800 text-gray-300"
                            : "bg-gray-100 text-gray-700"
                        } px-3 py-1 rounded-full text-xs`}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  <div
                    className={`flex justify-between items-center mb-4 text-sm ${
                      isDarkMode ? "text-gray-400" : "text-gray-500"
                    }`}
                  >
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center">
                        <Eye className="w-4 h-4 mr-1" />
                        {project.stats.views}
                      </div>
                      <div className="flex items-center">
                        <Star className="w-4 h-4 mr-1" />
                        {project.stats.stars}
                      </div>
                      <div className="flex items-center">
                        <Users className="w-4 h-4 mr-1" />
                        {project.stats.users}
                      </div>
                    </div>
                  </div>
                  <div className="flex space-x-4">
                    <a
                      href="https://github.com/Harismunshi"
                      className="flex items-center text-purple-400 hover:text-purple-300 transition-colors duration-300"
                      aria-label="View GitHub repository"
                      target="_blank"
                    >
                      <Github className="w-4 h-4 mr-2" />
                      Code
                    </a>
                    <a
                      href="https://github.com/Harismunshi"
                      className="flex items-center text-pink-400 hover:text-pink-300 transition-colors duration-300"
                      aria-label="View live demo"
                      target="_blank"
                    >
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Live Demo
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-5xl font-bold mb-16 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            Skills & Expertise
          </h2>
          <div className="grid gap-8 justify-center sm:grid-cols-2 lg:grid-cols-3">
            {skills.map((skill, index) => (
              <div
                key={skill.name}
                className={`${
                  isDarkMode
                    ? "bg-gray-900/50 border-gray-700 hover:border-purple-500"
                    : "bg-white border-gray-200 hover:border-purple-400"
                } p-8 rounded-2xl border transition-all duration-500 hover:transform hover:scale-105 group cursor-pointer shadow-lg`}
              >
                <div
                  className={`w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r ${skill.color} flex items-center justify-center group-hover:animate-spin`}
                >
                  <skill.icon className="w-8 h-8 text-white" />
                </div>
                <h3
                  className={`text-xl font-semibold mb-4 ${
                    isDarkMode ? "text-white" : "text-gray-900"
                  }`}
                >
                  {skill.name}
                </h3>
                <div
                  className={`w-full ${
                    isDarkMode ? "bg-gray-700" : "bg-gray-300"
                  } rounded-full h-3 mb-2`}
                >
                  <div
                    className={`h-full bg-gradient-to-r ${skill.color} rounded-full transition-all duration-1000 ease-out`}
                    style={{ width: `${skill.level}%` }}
                  />
                </div>
                <span className="text-purple-400 font-semibold">
                  {skill.level}%
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Experience Timeline */}
      <section
        id="experience"
        className={`py-20 px-6 ${
          isDarkMode
            ? "bg-gradient-to-b from-gray-900/50 to-black"
            : "bg-gradient-to-b from-gray-100/50 to-white"
        }`}
      >
        <div className="max-w-4xl mx-auto">
          <h2 className="text-5xl font-bold text-center mb-16 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent leading-snug">
            Academic Journey
          </h2>
          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-0.5 w-1 h-full bg-gradient-to-b from-purple-500 to-pink-500" />
            {timeline.map((item, index) => (
              <div
                key={index}
                className={`mb-12 flex items-center ${
                  index % 2 === 0 ? "flex-row" : "flex-row-reverse"
                }`}
              >
                <div
                  className={`w-1/2 ${
                    index % 2 === 0 ? "pr-8 text-right" : "pl-8 text-left"
                  }`}
                >
                  <div
                    className={`${
                      isDarkMode
                        ? "bg-gray-900/80 border-gray-700 hover:border-purple-500"
                        : "bg-white border-gray-200 hover:border-purple-400"
                    } p-6 rounded-lg border transition-all duration-300 hover:transform hover:scale-105 shadow-lg`}
                  >
                    <div className="text-2xl font-bold text-purple-400 mb-2">
                      {item.year}
                    </div>
                    <h3
                      className={`text-xl font-semibold ${
                        isDarkMode ? "text-white" : "text-gray-900"
                      } mb-2`}
                    >
                      {item.title}
                    </h3>
                    <div className="text-pink-400 font-medium mb-3">
                      {item.company}
                    </div>
                    <p
                      className={`${
                        isDarkMode ? "text-gray-300" : "text-gray-600"
                      } text-sm leading-relaxed`}
                    >
                      {item.description}
                    </p>
                  </div>
                </div>
                <div className="relative z-10">
                  <div className="w-6 h-6 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full border-4 border-black" />
                </div>
                <div className="w-1/2" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent leading-snug">
              Let's Create Something Amazing
            </h2>
            <p
              className={`text-xl ${
                isDarkMode ? "text-gray-300" : "text-gray-600"
              } mb-8 max-w-2xl mx-auto`}
            >
              Ready to bring your vision to life? Let's collaborate and create
              extraordinary digital experiences together.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-start">
            {/* Contact Form */}
            <form
              onSubmit={handleContactSubmit}
              className={`${
                isDarkMode
                  ? "bg-gray-900/50 border-gray-700"
                  : "bg-white border-gray-200"
              } p-8 rounded-2xl border shadow-lg`}
            >
              <h3
                className={`text-2xl font-bold mb-6 ${
                  isDarkMode ? "text-white" : "text-gray-900"
                }`}
              >
                Send Message
              </h3>

              <div className="mb-6">
                <label
                  htmlFor="name"
                  className={`block text-sm font-medium mb-2 ${
                    isDarkMode ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  Your Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={contactForm.name}
                  onChange={handleContactChange}
                  required
                  className={`w-full px-4 py-3 rounded-lg border ${
                    isDarkMode
                      ? "bg-gray-800 border-gray-600 text-white placeholder-gray-400"
                      : "bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-500"
                  } focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300`}
                  placeholder="Enter your name"
                />
              </div>

              <div className="mb-6">
                <label
                  htmlFor="email"
                  className={`block text-sm font-medium mb-2 ${
                    isDarkMode ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={contactForm.email}
                  onChange={handleContactChange}
                  required
                  className={`w-full px-4 py-3 rounded-lg border ${
                    isDarkMode
                      ? "bg-gray-800 border-gray-600 text-white placeholder-gray-400"
                      : "bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-500"
                  } focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300`}
                  placeholder="Enter your email"
                />
              </div>

              <div className="mb-6">
                <label
                  htmlFor="message"
                  className={`block text-sm font-medium mb-2 ${
                    isDarkMode ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={contactForm.message}
                  onChange={handleContactChange}
                  required
                  rows="5"
                  className={`w-full px-4 py-3 rounded-lg border ${
                    isDarkMode
                      ? "bg-gray-800 border-gray-600 text-white placeholder-gray-400"
                      : "bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-500"
                  } focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 resize-none`}
                  placeholder="Tell me about your project or just say hello!"
                />
              </div>

              <button
                type="submit"
                className="w-full px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg text-white font-semibold hover:from-purple-600 hover:to-pink-600 transform hover:scale-105 transition-all duration-300 flex items-center justify-center"
              >
                <Mail className="w-5 h-5 mr-2" />
                Send Message
              </button>
            </form>

            {/* Contact Info */}
            <div className="space-y-8">
              <div>
                <h3
                  className={`text-2xl font-bold mb-6 ${
                    isDarkMode ? "text-white" : "text-gray-900"
                  }`}
                >
                  Get In Touch
                </h3>
                <p
                  className={`${
                    isDarkMode ? "text-gray-300" : "text-gray-600"
                  } mb-6 leading-relaxed`}
                >
                  I'm always excited to work on new projects and collaborate
                  with creative minds. Whether you have a project in mind or
                  just want to chat about technology, feel free to reach out!
                </p>

                <div className="space-y-4">
                  <div
                    className={`flex items-center ${
                      isDarkMode ? "text-gray-300" : "text-gray-600"
                    }`}
                  >
                    <Mail className="w-5 h-5 mr-3 text-purple-400" />
                    <span>hmtechnicalpoint20@gmail.com</span>
                  </div>
                  <div
                    className={`flex items-center ${
                      isDarkMode ? "text-gray-300" : "text-gray-600"
                    }`}
                  >
                    <div className="w-5 h-5 mr-3 flex items-center justify-center">
                      <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                    </div>
                    <span>Gandhinagar, Gujarat, India</span>
                  </div>
                  <div
                    className={`flex items-center ${
                      isDarkMode ? "text-gray-300" : "text-gray-600"
                    }`}
                  >
                    <div className="w-5 h-5 mr-3 flex items-center justify-center">
                      <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                    </div>
                    <span>Available for internships & projects</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href="/Harisahmed.pdf"
                  download="Resume.pdf"
                  className={`px-6 py-3 border-2 border-purple-400 rounded-lg text-purple-400 font-semibold ${
                    isDarkMode
                      ? "hover:bg-purple-400 hover:text-white"
                      : "hover:bg-purple-400 hover:text-white"
                  } transform hover:scale-105 transition-all duration-300 flex items-center justify-center`}
                >
                  <Download className="w-5 h-5 mr-2" />
                  Download Resume
                </a>
              </div>
            </div>
          </div>

          <div className="mt-16">
            <div className="flex justify-center space-x-6">
              {[
                {
                  icon: Github,
                  label: "GitHub",
                  url: "https://github.com/Harismunshi",
                },
                {
                  icon: Linkedin,
                  label: "LinkedIn",
                  url: "linkedin.com/in/harismunshi",
                },
                { icon: Twitter, label: "Twitter", url: "https://twitter.com" },
                {
                  icon: Mail,
                  label: "Email",
                  url: "mailto:hmtechnicalpoint20@gmail.com",
                },
              ].map((social) => (
                <a
                  key={social.label}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Visit ${social.label} profile`}
                  className={`w-12 h-12 ${
                    isDarkMode
                      ? "bg-gray-900/50 border-gray-700 hover:border-purple-500 text-gray-400 hover:text-purple-400"
                      : "bg-gray-100 border-gray-200 hover:border-purple-400 text-gray-600 hover:text-purple-500"
                  } rounded-full border flex items-center justify-center transition-all duration-300 hover:transform hover:scale-110 group`}
                >
                  <social.icon className="w-6 h-6 group-hover:animate-pulse" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 border-t border-gray-800">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-gray-400">
            © 2024 BCA Student Portfolio - KSV University, Gandhinagar. Built
            with passion for modern web technologies.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default CreativePortfolio;
