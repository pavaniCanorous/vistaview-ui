import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Building2, Heart, ShoppingCart, Star, User, X } from 'lucide-react';

const menuItems = [
  { icon: Building2, label: "Professional's Portal", path: '/professional-portal' },
  { icon: Heart, label: 'My saved homes', path: '#' },
  { icon: ShoppingCart, label: 'My Orders', path: '#' },
  { icon: Star, label: 'My Subscriptions', path: '#' },
  { icon: User, label: 'My Account settings', path: '#' },
];

const socialIcons = [
  { label: 'Google', svg: 'G' },
  { label: 'Apple', svg: '' },
  { label: 'Facebook', svg: 'f' },
];

export default function SignIn() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 left-20 w-72 h-72 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute bottom-20 right-20 w-96 h-96 rounded-full bg-accent/20 blur-3xl" />
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="glass-card-strong w-full max-w-md rounded-3xl overflow-hidden relative"
      >
        {/* Close button */}
        <button
          onClick={() => navigate('/')}
          className="absolute top-4 right-4 z-10 w-8 h-8 flex items-center justify-center rounded-full bg-muted/50 text-foreground/60 hover:text-foreground transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Sign In Button */}
        <div className="p-6 pb-4">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full gold-gradient text-primary-foreground font-semibold py-4 rounded-xl text-lg font-sans glow"
          >
            Sign in
          </motion.button>
        </div>

        {/* OR Divider */}
        <div className="px-6 flex items-center gap-4 mb-4">
          <div className="flex-1 h-px bg-border/40" />
          <span className="text-muted-foreground text-xs font-sans tracking-widest uppercase">Or sign in with</span>
          <div className="flex-1 h-px bg-border/40" />
        </div>

        {/* Social Login */}
        <div className="flex justify-center gap-4 px-6 mb-4">
          {socialIcons.map((social) => (
            <motion.button
              key={social.label}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="w-12 h-12 rounded-full border-2 border-border/50 flex items-center justify-center text-foreground hover:border-primary/50 transition-colors"
            >
              <span className="font-bold text-lg font-sans">{social.svg || '🍎'}</span>
            </motion.button>
          ))}
        </div>

        {/* Create Account Link */}
        <div className="text-center px-6 mb-6">
          <a href="#" className="text-primary underline underline-offset-4 text-sm font-sans hover:text-gold-light transition-colors">
            Create an account
          </a>
        </div>

        {/* Menu Items */}
        <div className="border-t border-border/30">
          {menuItems.map((item, i) => (
            <motion.button
              key={item.label}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 + i * 0.1, duration: 0.4 }}
              onClick={() => item.path !== '#' ? navigate(item.path) : null}
              className="sign-in-option w-full text-left"
            >
              <item.icon className="w-5 h-5 text-primary flex-shrink-0" />
              <span className="text-foreground font-sans text-sm">{item.label}</span>
            </motion.button>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
