'use client'

import { motion } from 'framer-motion'

interface HeroProps {
  trackCTAClick: (ctaName: string, ctaType: string, additionalData?: Record<string, any>) => void
}

export default function Hero({ trackCTAClick }: HeroProps) {
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

  return (
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
  )
}
