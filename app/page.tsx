'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Github,
  Linkedin,
  Mail,
  ExternalLink,
  Code,
  Award,
  Users,
  Calendar,
  MapPin,
  Menu,
  X
} from 'lucide-react'
import '@n8n/chat/style.css';
import { createChat } from '@n8n/chat';

export default function Home() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  // Universal CTA tracking function
  const trackCTAClick = (ctaName: string, ctaType: string, additionalData: Record<string, any> = {}) => {
    const eventData = {
      event_category: 'cta_click',
      event_label: ctaName,
      cta_type: ctaType,
      page_url: typeof window !== 'undefined' ? window.location.href : 'unknown',
      timestamp: new Date().toISOString(),
      ...additionalData
    };

    // Track with Umami analytics
    if (typeof window !== 'undefined' && (window as any).umami) {
      (window as any).umami.track('cta-click', eventData);
    }
    
    // Log to console for debugging
    console.info(`CTA clicked: ${ctaName} (${ctaType})`, eventData);
  };

  useEffect(() => {
    const webhookUrl = 'https://n8n.techkanna.com/webhook/c8973ea3-9f48-4328-be57-9e095e42964e/chat'
    createChat({
      webhookUrl,
      webhookConfig: {
        method: 'POST',
        headers: {}
      },
      target: '#n8n-chat',
      mode: 'window',
      chatInputKey: 'chatInput',
      chatSessionKey: 'sessionId',
      loadPreviousSession: true,
      metadata: {},
      showWelcomeScreen: false,
      defaultLanguage: 'en',
      initialMessages: [
        `Hi, I'm Senthilkannan's AI assistant, answering on his behalf. I'll speak in first person to keep things natural. I can walk you through his projects, skills, and journey as a full stack web developer. What would you like to check out first?`,
      ],
      i18n: {
        en: {
          title: 'Hi there! 👋',
          subtitle: "Start a chat. We're here to help you 24/7.",
          footer: '',
          getStarted: 'New Conversation',
          inputPlaceholder: 'Type your question..',
          closeButtonTooltip: ''
        },
      },
      enableStreaming: true,
    });

    // Track n8n chat button clicks with Umami
    const trackChatButtonClick = () => {
      trackCTAClick('chat-button', 'chat-widget', {
        widget_type: 'n8n-chat'
      });
    };

    let eventListenerAttached = false;
    // Wait for n8n chat to be fully loaded and find the chat button
    const setupChatButtonTracking = () => {

      const attachEventListener = (button: HTMLElement) => {
        if (!eventListenerAttached) {
          button.addEventListener('click', trackChatButtonClick);
          eventListenerAttached = true;
          console.info('Chat button event listener attached');
        }
      };

      const findChatButton = (): HTMLElement | null => {
        // Use the specific class name for n8n chat toggle button
        const button: HTMLElement | null = document.querySelector('.chat-window-toggle');
        if (button) {
          console.info('Found n8n chat button');
          return button;
        }
        return null;
      };

      // Try to find the button immediately
      const chatButton = findChatButton();
      
      if (chatButton) {
        attachEventListener(chatButton);
      }
    };

    // Setup tracking after a short delay to ensure n8n chat is loaded
    setTimeout(setupChatButtonTracking, 2000);
  }, []);


  const toggleMobileMenu = () => {
    trackCTAClick('mobile-menu-toggle', 'navigation', {
      action: isMobileMenuOpen ? 'close' : 'open',
      location: 'mobile-nav'
    });
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false)
  }

  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 }
  }

  const staggerChildren = {
    animate: {
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const skills = [
    { name: 'React', level: 95, icon: '⚛️' },
    { name: 'Next.js', level: 95, icon: '▲' },
    { name: 'JavaScript', level: 98, icon: '🟨' },
    { name: 'Tailwind CSS', level: 90, icon: '🎨' },
    { name: 'Storybook', level: 85, icon: '📚' },
    { name: 'PostgreSQL', level: 75, icon: '🐘' },
    { name: 'Docker', level: 80, icon: '🐳' },
    { name: 'AI Integration', level: 85, icon: '🤖' }
  ]

  const projects = [
    {
      title: 'AI-Powered Creative Studio',
      description: 'Platform where users can generate text-to-image and image-to-image outputs using Stable Diffusion models hosted on our servers. Access is plan-based, with advanced customization options for higher tiers.',
      tech: ['Next.js', 'Python', 'Stable Diffusion', 'PostgreSQL', 'Drizzle', 'Docker', 'Proxmox'],
      image: '🎨',
      link: 'https://gen-img.techkanna.com',
    },
    {
      title: 'AI-Powered Job Practice Platform',
      description: 'Intelligent resume analysis and job practice platform powered by fully local LLM with plan-based AI reasoning. Features include resume optimization, interview simulation, and personalized career guidance.',
      tech: ['Next.js', 'Python', 'Ollama', 'PostgreSQL', 'Drizzle', 'Docker', 'proxmox'],
      image: '🧑‍💻',
      link: 'http://landr.techkanna.com',
    },
    {
      title: 'AI Agents Platform with n8n',
      description: 'Scalable AI chatbot platform built with n8n workflow automation, deployed on Proxmox with Ollama for local LLM processing. Features customizable workflows, easy scaling.',
      tech: ['n8n', 'Ollama', 'Proxmox', 'Docker'],
      image: '🔗',
      link: 'https://n8n.techkanna.com',
    }
  ]


  const experience = [
    {
      company: 'Techdew UX Design Pvt. Ltd.',
      position: 'Lead UI Engineer - React.js / Next.js',
      duration: 'Mar 2023 - Present',
      location: 'Thoothukudi',
      achievements: [
        'Led and managed multiple React.js projects from initiation to deployment',
        'Showcased internal full-stack & AI POCs (Next.js, n8n, PostgreSQL, OpenAI/Ollama API, Docker, Proxmox), exploring modern architectures and integrations.',
        'Set up CI/CD pipelines (GitHub Actions, Docker, Proxmox) for personal demos.',
        'Produced detailed project plans, schedules and risk mitigation strategies',
        'Coordinated cross-functional teams (design, backend, QA) ensuring alignment',
        'Implemented Agile Scrum process with sprint planning and retrospectives',
        'Architected full-stack solutions achieving 30% performance improvements',
        'Mentored 10+ junior developers in React.js and best coding practices'
      ]
    },
    {
      company: 'Techdew UX Design Pvt. Ltd.',
      position: 'Senior UI Engineer',
      duration: 'Mar 2022 - Mar 2023',
      location: 'Thoothukudi',
      achievements: [
        'Designed and developed responsive, high-performance user interfaces',
        'Collaborated closely with clients and team members on requirements',
        'Optimized frontend performance and user experience metrics',
        'Implemented modern UI/UX patterns and design systems'
      ]
    },
    {
      company: 'Techdew UX Design Pvt. Ltd.',
      position: 'UI Engineer',
      duration: 'Sep 2020 - Mar 2022',
      location: 'Thoothukudi',
      achievements: [
        'Developed and maintained reusable frontend components',
        'Participated in code reviews and contributed to best practices',
        'Built responsive web applications with modern frameworks',
        'Collaborated with design team to implement pixel-perfect interfaces'
      ]
    },
    {
      company: 'Techdew UX Design Pvt. Ltd.',
      position: 'UI Engineer Trainee',
      duration: 'Sep 2019 - Sep 2020',
      location: 'Chennai',
      achievements: [
        'Learned and applied modern web development technologies',
        'Created pixel-perfect, user-friendly web applications',
        'Gained hands-on experience with React.js and frontend frameworks',
        'Developed strong foundation in HTML, CSS, and JavaScript'
      ]
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-dark-900 via-dark-800 to-dark-900 text-white">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-dark-900/80 backdrop-blur-md border-b border-dark-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <motion.div
              className="text-2xl font-bold gradient-text"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              Senthilkannan
            </motion.div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex space-x-8">
              {['About', 'Skills', 'Projects', 'Experience', 'Contact'].map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="text-gray-300 hover:text-white transition-colors duration-200"
                  onClick={() => trackCTAClick(`nav-${item.toLowerCase()}`, 'navigation', {
                    section: item.toLowerCase(),
                    location: 'desktop-nav'
                  })}
                >
                  {item}
                </a>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={toggleMobileMenu}
              className="md:hidden p-2 text-gray-300 hover:text-white transition-colors duration-200"
              aria-label="Toggle mobile menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Mobile Navigation Menu */}
          <AnimatePresence>
            {isMobileMenuOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="md:hidden bg-dark-800/95 backdrop-blur-md border-t border-dark-700"
              >
                <div className="px-4 py-4 space-y-4">
                  {['About', 'Skills', 'Projects', 'Experience', 'Contact'].map((item) => (
                    <a
                      key={item}
                      href={`#${item.toLowerCase()}`}
                      onClick={() => {
                        trackCTAClick(`nav-${item.toLowerCase()}`, 'navigation', {
                          section: item.toLowerCase(),
                          location: 'mobile-nav'
                        });
                        closeMobileMenu();
                      }}
                      className="block text-gray-300 hover:text-white transition-colors duration-200 py-2"
                    >
                      {item}
                    </a>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-20 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center"
            initial="initial"
            animate="animate"
            variants={staggerChildren}
          >
            <motion.h1
              className="text-4xl md:text-6xl font-bold mb-6"
              variants={fadeInUp}
              transition={{ duration: 0.6 }}
            >
              <span className="text-white">UI Engineer <span className="text-sm">by</span> <span className="gradient-text"> Profession</span>
                <br />
                Full Stack Developer <span className="text-sm">by</span> <span className="gradient-text"> Passion</span></span>
            </motion.h1>
            <motion.p
              className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto"
              variants={fadeInUp}
              transition={{ duration: 0.6 }}
            >
              Building exceptional web experiences with 6+ years of expertise in React, Next.js, and modern frontend technologies
            </motion.p>
            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center"
              variants={fadeInUp}
              transition={{ duration: 0.6 }}
            >
              <a
                href="#contact"
                className="bg-primary-600 hover:bg-primary-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors duration-200"
                onClick={() => trackCTAClick('get-in-touch', 'hero-cta', {
                  section: 'hero',
                  target: 'contact',
                  style: 'primary'
                })}
              >
                Get In Touch
              </a>
              <a
                href="#projects"
                className="border border-primary-600 text-primary-400 hover:bg-primary-600 hover:text-white px-8 py-3 rounded-lg font-semibold transition-colors duration-200"
                onClick={() => trackCTAClick('view-my-work', 'hero-cta', {
                  section: 'hero',
                  target: 'projects',
                  style: 'secondary'
                })}
              >
                View My Work
              </a>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-16 px-4 sm:px-6 lg:px-8 bg-dark-800/50">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold mb-4">About Me</h2>
            <p className="text-gray-300 text-lg max-w-3xl mx-auto text-left">
              I’m a UI Engineer with 6+ years of experience building scalable, high-performance user interfaces with React.js and Next.js. Over time, I’ve expanded my skillset beyond frontend to include backend development, database design, DevOps, and AI integration.
              <br />
              <br />
              While my professional work has focused on frontend leadership, I have built and showcased multiple proof-of-concepts (POCs) in full-stack and AI-driven applications, gaining practical hands-on experience in Node.js, PostgreSQL, Docker, Proxmox, and AI APIs.
              <br />
              <br />
              My goal is to bridge my strong frontend expertise with full-stack problem solving, delivering end-to-end solutions that are scalable, modern, and AI-ready.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: <Code className="w-8 h-8" />, title: 'Clean Code', desc: 'Writing maintainable, scalable code' },
              { icon: <Users className="w-8 h-8" />, title: 'Team Leadership', desc: 'Mentoring and leading development teams' },
              { icon: <Award className="w-8 h-8" />, title: 'Best Practices', desc: 'Following industry standards and patterns' }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center p-6 bg-dark-700/50 rounded-lg"
              >
                <div className="text-primary-400 mb-4 flex justify-center">
                  {item.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                <p className="text-gray-300">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-16 px-4 sm:px-6 lg:px-8 bg-dark-800/50">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold mb-4">Featured Projects</h2>
            <p className="text-gray-300 text-lg">
              A showcase of my recent work and side projects
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-dark-700/50 rounded-lg overflow-hidden hover:bg-dark-700 transition-colors duration-200"
              >
                <div className="p-6">
                  <div className="text-4xl mb-4">{project.image}</div>
                  <h3 className="text-xl font-semibold mb-3">{project.title}</h3>
                  <p className="text-gray-300 mb-4">{project.description}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tech.map((tech) => (
                      <span
                        key={tech}
                        className="bg-primary-600/20 text-primary-300 px-2 py-1 rounded text-sm"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  <div>
                    <a
                      href={project.link}
                      className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors"
                      onClick={() => trackCTAClick('project-demo', 'project-cta', {
                        project_title: project.title,
                        project_index: index,
                        action: 'view_demo',
                        platform: 'external'
                      })}
                    >
                      <ExternalLink className="w-4 h-4" />
                      Live Demo
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold mb-4">Technical Skills</h2>
            <p className="text-gray-300 text-lg">
              Technologies and tools I work with to create amazing web experiences
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {skills.map((skill, index) => (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-dark-700/50 p-6 rounded-lg text-center hover:bg-dark-700 transition-colors duration-200"
              >
                <div className="text-4xl mb-3">{skill.icon}</div>
                <h3 className="font-semibold mb-2">{skill.name}</h3>
                <div className="w-full bg-dark-600 rounded-full h-2">
                  <motion.div
                    className="bg-primary-500 h-2 rounded-full"
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.level}%` }}
                    transition={{ duration: 1, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  />
                </div>
                <span className="text-sm text-gray-400 mt-1">{skill.level}%</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>


      {/* Experience Section */}
      <section id="experience" className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold mb-4">Work Experience</h2>
            <p className="text-gray-300 text-lg">
              My professional journey in web development
            </p>
          </motion.div>

          <div className="space-y-8">
            {experience.map((job, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-dark-700/50 p-6 rounded-lg"
              >
                <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-4">
                  <div>
                    <h3 className="text-xl font-semibold">{job.position}</h3>
                    <p className="text-primary-400 font-medium">{job.company}</p>
                  </div>
                  <div className="text-sm text-gray-400 mt-2 md:mt-0">
                    <div className="flex items-center gap-1 mb-1">
                      <Calendar className="w-4 h-4" />
                      {job.duration}
                    </div>
                    <div className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      {job.location}
                    </div>
                  </div>
                </div>
                <ul className="text-gray-300 space-y-2">
                  {job.achievements.map((achievement, achievementIndex) => (
                    <li key={achievementIndex} className="flex items-start">
                      <span className="text-primary-400 mr-3 mt-1">•</span>
                      <span>{achievement}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16 px-4 sm:px-6 lg:px-8 bg-dark-800/50">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold mb-4">Let's Work Together</h2>
            <p className="text-gray-300 text-lg max-w-2xl mx-auto">
              I'm always interested in new opportunities and exciting projects.
              Let's discuss how we can bring your ideas to life.
            </p>
          </motion.div>

          <div className="flex flex-col md:flex-row gap-8 items-center justify-center">
            <motion.a
              href="mailto:contact@techkanna.com"
              className="flex items-center gap-3 bg-primary-600 hover:bg-primary-700 text-white px-8 py-4 rounded-lg font-semibold transition-colors duration-200"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => trackCTAClick('contact-email', 'contact-cta', {
                section: 'contact',
                action: 'send_email',
                platform: 'email',
                email: 'contact@techkanna.com'
              })}
            >
              <Mail className="w-5 h-5" />
              Get In Touch
            </motion.a>

            <div className="flex gap-4">
              <motion.a
                href="https://github.com/techkanna"
                className="p-3 bg-dark-700 hover:bg-dark-600 rounded-lg transition-colors duration-200"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => trackCTAClick('contact-github', 'contact-cta', {
                  section: 'contact',
                  action: 'visit_profile',
                  platform: 'github',
                  url: 'https://github.com/techkanna'
                })}
              >
                <Github className="w-6 h-6" />
              </motion.a>
              <motion.a
                href="https://www.linkedin.com/in/techkanna"
                className="p-3 bg-dark-700 hover:bg-dark-600 rounded-lg transition-colors duration-200"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => trackCTAClick('contact-linkedin', 'contact-cta', {
                  section: 'contact',
                  action: 'visit_profile',
                  platform: 'linkedin',
                  url: 'https://www.linkedin.com/in/techkanna'
                })}
              >
                <Linkedin className="w-6 h-6" />
              </motion.a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 sm:px-6 lg:px-8 border-t border-dark-700">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-gray-400">
            © {new Date().getFullYear()} Senthilkannan. Built with Next.js and Tailwind CSS.
          </p>
        </div>
      </footer>
    </div>
  )
}
