import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Home, 
  FileQuestion, 
  FileText, 
  BookOpen, 
  Keyboard, 
  Moon, 
  Sun, 
  LogOut, 
  Menu, 
  X,
  User
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { useTheme } from '@/contexts/ThemeContext';

const navLinks = [
  { to: '/dashboard', icon: Home, label: 'Home' },
  { to: '/mcq', icon: FileQuestion, label: 'MCQ' },
  { to: '/subjective', icon: FileText, label: 'Subjective' },
  { to: '/syllabus', icon: BookOpen, label: 'Syllabus' },
  { to: '/typing', icon: Keyboard, label: 'Typing' },
];

export function Navbar() {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <nav className="glass-strong mx-4 mt-4 rounded-2xl px-4 md:px-6 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/dashboard" className="flex items-center gap-3">
            <div className="relative">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-purple-500 flex items-center justify-center shadow-lg">
                <span className="text-primary-foreground font-bold text-lg">L</span>
              </div>
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-accent rounded-full animate-pulse" />
            </div>
            <div className="hidden sm:block">
              <h1 className="font-bold text-lg text-foreground">LOKSEWA CO</h1>
              <p className="text-[10px] text-muted-foreground -mt-1">Dashboard • By Dhiaj Shahi</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.to;
              return (
                <Link key={link.to} to={link.to}>
                  <Button
                    variant={isActive ? 'secondary' : 'ghost'}
                    size="sm"
                    className={`gap-2 ${isActive ? 'bg-primary/10 text-primary' : ''}`}
                  >
                    <link.icon className="w-4 h-4" />
                    {link.label}
                  </Button>
                </Link>
              );
            })}
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-2">
            {/* Theme Toggle */}
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className="rounded-xl"
            >
              <AnimatePresence mode="wait">
                {theme === 'dark' ? (
                  <motion.div
                    key="sun"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Sun className="w-5 h-5 text-yellow-500" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="moon"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Moon className="w-5 h-5 text-primary" />
                  </motion.div>
                )}
              </AnimatePresence>
            </Button>

            {/* User Avatar */}
            <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-secondary/50">
              <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-primary to-purple-500 flex items-center justify-center">
                <User className="w-4 h-4 text-primary-foreground" />
              </div>
              <span className="text-sm font-medium text-foreground max-w-24 truncate">
                {user?.name || 'User'}
              </span>
            </div>

            {/* Logout */}
            <Button
              variant="ghost"
              size="icon"
              onClick={logout}
              className="rounded-xl text-muted-foreground hover:text-destructive"
            >
              <LogOut className="w-5 h-5" />
            </Button>

            {/* Mobile Menu Toggle */}
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden rounded-xl"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="lg:hidden overflow-hidden"
            >
              <div className="pt-4 pb-2 flex flex-col gap-1">
                {navLinks.map((link) => {
                  const isActive = location.pathname === link.to;
                  return (
                    <Link 
                      key={link.to} 
                      to={link.to}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <Button
                        variant={isActive ? 'secondary' : 'ghost'}
                        className={`w-full justify-start gap-3 ${isActive ? 'bg-primary/10 text-primary' : ''}`}
                      >
                        <link.icon className="w-5 h-5" />
                        {link.label}
                      </Button>
                    </Link>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
}
