import React from 'react';
import { HeroSection } from '@/components/dashboard/HeroSection';
import { StatsPanel } from '@/components/dashboard/StatsPanel';
import { FeatureCards } from '@/components/dashboard/FeatureCards';

export default function Dashboard() {
  return (
    <div className="relative overflow-hidden">
      <HeroSection />
      <StatsPanel />
      <FeatureCards />
    </div>
  );
}
