import { motion } from 'framer-motion';

export default function Footer() {
  return (
    <footer className="relative border-t border-border/20 py-12 px-4">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
        <motion.div
          className="flex items-center gap-3"
          whileHover={{ scale: 1.03 }}
          transition={{ type: 'spring', stiffness: 300 }}
        >
          <div className="w-10 h-10 gold-gradient rounded-lg flex items-center justify-center glow">
            <span className="text-primary-foreground font-bold font-display text-lg">V</span>
          </div>
          <span className="font-display text-xl font-bold text-foreground">Vista View</span>
        </motion.div>
        <p className="text-muted-foreground text-sm font-sans">
          © 2026 Vista View Realty Services. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
