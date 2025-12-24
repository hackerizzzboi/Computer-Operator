import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FileQuestion, Clock, FileText, TrendingUp } from 'lucide-react';
import { useUserData } from '@/contexts/UserDataContext';

interface StatCardProps {
  icon: React.ReactNode;
  label: string;
  value: number;
  target: number;
  unit: string;
  color: string;
  delay: number;
}

function AnimatedCounter({ value, duration = 1 }: { value: number; duration?: number }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const end = value;
    if (start === end) return;

    const totalMilSecDur = duration * 1000;
    const incrementTime = totalMilSecDur / end || 50;

    const timer = setInterval(() => {
      start += 1;
      setCount(start);
      if (start >= end) clearInterval(timer);
    }, incrementTime);

    return () => clearInterval(timer);
  }, [value, duration]);

  return <span>{count}</span>;
}

function StatCard({ icon, label, value, target, unit, color, delay }: StatCardProps) {
  const percentage = Math.min((value / target) * 100, 100);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.4 }}
      className="glass rounded-2xl p-5 hover-lift"
    >
      <div className="flex items-start justify-between mb-4">
        <div className={`p-2.5 rounded-xl ${color}`}>
          {icon}
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold text-foreground">
            <AnimatedCounter value={value} />
            <span className="text-muted-foreground text-lg font-normal"> / {target}</span>
          </div>
          <p className="text-xs text-muted-foreground">{unit}</p>
        </div>
      </div>
      <p className="text-sm font-medium text-foreground mb-2">{label}</p>
      <div className="h-2 bg-secondary rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ delay: delay + 0.2, duration: 0.6, ease: 'easeOut' }}
          className={`h-full rounded-full ${color.replace('bg-', 'bg-').replace('/20', '')}`}
        />
      </div>
    </motion.div>
  );
}

export function StatsPanel() {
  const { stats } = useUserData();

  const statCards = [
    {
      icon: <FileQuestion className="w-5 h-5 text-primary" />,
      label: 'MCQ Sets Completed',
      value: stats.mcqCompleted,
      target: 3,
      unit: 'sets today',
      color: 'bg-primary/20',
    },
    {
      icon: <Clock className="w-5 h-5 text-accent" />,
      label: 'Typing Practice',
      value: stats.typingMinutes,
      target: 60,
      unit: 'minutes',
      color: 'bg-accent/20',
    },
    {
      icon: <FileText className="w-5 h-5 text-purple-500" />,
      label: 'Subjective Answers',
      value: stats.subjectiveAnswers,
      target: 2,
      unit: 'answers written',
      color: 'bg-purple-500/20',
    },
    {
      icon: <TrendingUp className="w-5 h-5 text-orange-500" />,
      label: 'Overall Progress',
      value: Math.round(((stats.mcqCompleted / 3 + stats.typingMinutes / 60 + stats.subjectiveAnswers / 2) / 3) * 100),
      target: 100,
      unit: 'percent',
      color: 'bg-orange-500/20',
    },
  ];

  return (
    <section className="container max-w-6xl mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="mb-6"
      >
        <h2 className="text-xl font-semibold text-foreground">Today's Progress</h2>
        <p className="text-sm text-muted-foreground">Track your daily preparation goals</p>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((stat, index) => (
          <StatCard key={stat.label} {...stat} delay={0.7 + index * 0.1} />
        ))}
      </div>
    </section>
  );
}
