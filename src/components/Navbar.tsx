import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { Menu, X, Globe } from 'lucide-react';

const navLinks = [
  { label: 'About us', href: '#' },
  { label: 'How it works', href: '#' },
  { label: 'Our Partners', href: '#' },
  { label: 'Lend with us', href: '#' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.nav
      className="fixed top-0 left-0 right-0 z-50"
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
    >
      <motion.div
        className="border-b border-border/20 rounded-none transition-all duration-500"
        animate={{
          backgroundColor: scrolled ? 'hsl(160 35% 8% / 0.95)' : 'hsl(160 35% 8% / 0.6)',
          backdropFilter: scrolled ? 'blur(20px) saturate(1.8)' : 'blur(12px) saturate(1.4)',
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3 group">
              <motion.div
                className="w-10 h-10 gold-gradient rounded-lg flex items-center justify-center relative overflow-hidden"
                whileHover={{ rotate: [0, -5, 5, 0], scale: 1.1 }}
                transition={{ duration: 0.5 }}
              >
                <span className="text-primary-foreground font-bold font-display text-lg relative z-10">V</span>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
              </motion.div>
              <motion.span
                className="font-display text-xl font-bold text-foreground hidden sm:block"
                whileHover={{ scale: 1.02 }}
              >
                Vista<span className="gold-text">View</span>
              </motion.span>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-1">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  className="relative text-foreground/60 hover:text-foreground transition-colors duration-300 font-sans text-sm tracking-wide px-4 py-2 rounded-lg group"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + i * 0.08 }}
                  whileHover={{ y: -1 }}
                >
                  {link.label}
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-px bg-primary group-hover:w-3/4 transition-all duration-300" />
                </motion.a>
              ))}
            </div>

            {/* Right side */}
            <div className="flex items-center gap-3">
              {/* Country badge */}
              <motion.div
                className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-border/30 text-xs font-sans text-foreground/60"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7 }}
              >
                <Globe className="w-3.5 h-3.5 text-primary/70" />
                <span>USA</span>
              </motion.div>

              <motion.button
                onClick={() => navigate('/signin')}
                className="gold-gradient text-primary-foreground font-semibold px-6 py-2.5 rounded-lg text-sm font-sans relative overflow-hidden group"
                whileHover={{ scale: 1.05, boxShadow: '0 0 30px hsl(43 72% 55% / 0.3)' }}
                whileTap={{ scale: 0.97 }}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5 }}
              >
                <span className="relative z-10">Sign in</span>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-600" />
              </motion.button>
              <button
                className="md:hidden text-foreground"
                onClick={() => setIsOpen(!isOpen)}
              >
                {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0, y: -10 }}
            animate={{ opacity: 1, height: 'auto', y: 0 }}
            exit={{ opacity: 0, height: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="md:hidden glass-card-strong rounded-none border-t-0 overflow-hidden"
          >
            <div className="px-4 py-4 space-y-1">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  className="block text-foreground/70 hover:text-primary hover:bg-primary/5 transition-all py-3 px-3 rounded-lg font-sans"
                  onClick={() => setIsOpen(false)}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  {link.label}
                </motion.a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
