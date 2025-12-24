import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  FileQuestion, 
  FileText, 
  BookOpen, 
  Keyboard, 
  CalendarDays, 
  FolderOpen,
  ArrowRight
} from 'lucide-react';

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  features: string[];
  to: string;
  color: string;
  delay: number;
}

function FeatureCard({ icon, title, description, features, to, color, delay }: FeatureCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.4 }}
    >
      <Link to={to}>
        <div className="group glass rounded-2xl p-6 h-full hover-lift cursor-pointer relative overflow-hidden">
          {/* Gradient overlay on hover */}
          <div className={`absolute inset-0 ${color} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
          
          <div className="relative z-10">
            {/* Icon */}
            <div className={`inline-flex p-3 rounded-xl ${color} mb-4`}>
              {icon}
            </div>

            {/* Title & Description */}
            <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-foreground transition-colors">
              {title}
            </h3>
            <p className="text-sm text-muted-foreground mb-4">
              {description}
            </p>

            {/* Features */}
            <ul className="space-y-1.5 mb-4">
              {features.map((feature, index) => (
                <li key={index} className="flex items-center gap-2 text-sm text-muted-foreground">
                  <span className="w-1 h-1 rounded-full bg-accent" />
                  {feature}
                </li>
              ))}
            </ul>

            {/* Arrow */}
            <div className="flex items-center gap-2 text-primary text-sm font-medium">
              <span>Get Started</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

export function FeatureCards() {
  const features = [
    {
      icon: <FileQuestion className="w-6 h-6 text-primary" />,
      title: 'MCQ Practice',
      description: 'Master objective questions with timed practice tests.',
      features: ['Timed tests', 'Accuracy tracking', 'Topic-wise practice'],
      to: '/mcq',
      color: 'bg-primary/10',
    },
    {
      icon: <FileText className="w-6 h-6 text-purple-500" />,
      title: 'Subjective Notes',
      description: 'Write and save short & long answers for Paper II.',
      features: ['Short answers', 'Long answers', 'Save drafts'],
      to: '/subjective',
      color: 'bg-purple-500/10',
    },
    {
      icon: <BookOpen className="w-6 h-6 text-accent" />,
      title: 'Syllabus & Plan',
      description: 'Track your syllabus completion with detailed plans.',
      features: ['Written exam', 'Practical exam', 'Interview prep'],
      to: '/syllabus',
      color: 'bg-accent/10',
    },
    {
      icon: <Keyboard className="w-6 h-6 text-orange-500" />,
      title: 'Typing & Practical',
      description: 'Practice English & Nepali typing with time logging.',
      features: ['English typing', 'Nepali typing', 'MS Office tasks'],
      to: '/typing',
      color: 'bg-orange-500/10',
    },
    {
      icon: <CalendarDays className="w-6 h-6 text-pink-500" />,
      title: 'Daily Routine',
      description: 'Organize your morning and evening study schedule.',
      features: ['Morning routine', 'Evening routine', 'Editable schedule'],
      to: '/dashboard',
      color: 'bg-pink-500/10',
    },
    {
      icon: <FolderOpen className="w-6 h-6 text-cyan-500" />,
      title: 'Resources',
      description: 'Access curated PDF links, videos, and bookmarks.',
      features: ['PDF materials', 'Video tutorials', 'External links'],
      to: '/dashboard',
      color: 'bg-cyan-500/10',
    },
  ];

  return (
    <section className="container max-w-6xl mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.1 }}
        className="mb-6"
      >
        <h2 className="text-xl font-semibold text-foreground">Preparation Modules</h2>
        <p className="text-sm text-muted-foreground">Everything you need for complete preparation</p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {features.map((feature, index) => (
          <FeatureCard key={feature.title} {...feature} delay={1.2 + index * 0.1} />
        ))}
      </div>
    </section>
  );
}
