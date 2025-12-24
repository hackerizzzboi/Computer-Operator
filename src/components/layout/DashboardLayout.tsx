import React from 'react';
import { Outlet } from 'react-router-dom';
import { Navbar } from './Navbar';
import { Footer } from './Footer';

export function DashboardLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-background bg-hero-pattern">
      <Navbar />
      <main className="flex-1 pt-24 pb-8">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
