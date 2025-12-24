import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Play, BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const pills = [
  'Written',
  'Practical', 
  'Interview',
  'Objective + Subjective',
  'English & Nepali Typing'
];

export function HeroSection() {
  return (
    <section className="container max-w-6xl mx-auto px-4 py-8 md:py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center max-w-3xl mx-auto"
      >
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 mb-6"
        >
          <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
          <span className="text-sm font-medium text-primary">Level 5 • Computer Operator</span>
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-4 leading-tight"
        >
          Computer Operator{' '}
          <span className="gradient-text">Loksewa Prep Hub</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-base sm:text-lg text-muted-foreground mb-8 max-w-2xl mx-auto"
        >
          Your complete preparation dashboard for Nepal Loksewa Aayog. 
          Practice MCQs, write subjective answers, master typing, and track your progress.
        </motion.p>

        {/* Pills */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="flex flex-wrap justify-center gap-2 mb-10"
        >
          {pills.map((pill, index) => (
            <motion.span
              key={pill}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 + index * 0.05 }}
              className="px-3 py-1 text-xs sm:text-sm font-medium rounded-full bg-secondary text-secondary-foreground border border-border"
            >
              {pill}
            </motion.span>
          ))}
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link to="/mcq">
            <Button variant="hero" size="xl" className="gap-2 w-full sm:w-auto">
              <Play className="w-5 h-5" />
              Start MCQ Session
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
          <Link to="/syllabus">
            <Button variant="heroOutline" size="xl" className="gap-2 w-full sm:w-auto">
              <BookOpen className="w-5 h-5" />
              Open Full Syllabus
            </Button>
          </Link>
        </motion.div>
      </motion.div>

      {/* Decorative Elements */}
      <div className="absolute top-1/3 left-10 w-72 h-72 bg-primary/20 rounded-full blur-3xl opacity-20 pointer-events-none" />
      <div className="absolute top-1/2 right-10 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl opacity-20 pointer-events-none" />
    </section>
  );
}
