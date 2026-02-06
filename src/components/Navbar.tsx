import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

const navLinks = [
  { label: 'About us', href: '#' },
  { label: 'How it works', href: '#' },
  { label: 'Our Partners', href: '#' },
  { label: 'Lend with us', href: '#' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50">
      <div className="glass-card-strong border-b border-border/20 border-t-0 border-x-0 rounded-none">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3">
              <div className="w-10 h-10 gold-gradient rounded-lg flex items-center justify-center">
                <span className="text-primary-foreground font-bold font-display text-lg">V</span>
              </div>
              <span className="font-display text-xl font-bold text-foreground hidden sm:block">Vista View</span>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="text-foreground/70 hover:text-primary transition-colors duration-300 font-sans text-sm tracking-wide"
                >
                  {link.label}
                </a>
              ))}
            </div>

            {/* Sign In Button */}
            <div className="flex items-center gap-4">
              <button
                onClick={() => navigate('/signin')}
                className="gold-gradient text-primary-foreground font-semibold px-6 py-2.5 rounded-lg text-sm hover:scale-105 transition-transform duration-300 font-sans"
              >
                Sign in
              </button>
              <button
                className="md:hidden text-foreground"
                onClick={() => setIsOpen(!isOpen)}
              >
                {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden glass-card-strong rounded-none border-t-0"
          >
            <div className="px-4 py-4 space-y-3">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="block text-foreground/70 hover:text-primary transition-colors py-2 font-sans"
                  onClick={() => setIsOpen(false)}
                >
                  {link.label}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
