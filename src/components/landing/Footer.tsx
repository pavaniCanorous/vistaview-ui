import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Mail, Phone, MapPin } from 'lucide-react';

const footerLinks = [
  {
    title: 'Platform',
    links: ['Real Estate', 'Interior Design', 'Product Catalogue', 'AI Search'],
  },
  {
    title: 'Company',
    links: ['About Us', 'Careers', 'Press', 'Blog'],
  },
  {
    title: 'Support',
    links: ['Help Center', 'Privacy Policy', 'Terms of Service', 'Contact Us'],
  },
];

const socials = ['Twitter', 'LinkedIn', 'Instagram', 'YouTube'];

export default function Footer() {
  return (
    <footer className="relative border-t border-border/15 pt-20 pb-8 px-4 overflow-hidden">
      {/* Ambient glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[200px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse, hsl(43 72% 55% / 0.03), transparent 70%)',
          filter: 'blur(60px)',
        }}
      />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-16">
          {/* Brand column */}
          <div className="md:col-span-4">
            <motion.div
              className="flex items-center gap-3 mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div className="w-11 h-11 gold-gradient rounded-lg flex items-center justify-center glow relative overflow-hidden group">
                <span className="text-primary-foreground font-bold font-display text-lg relative z-10">V</span>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
              </div>
              <span className="font-display text-2xl font-bold text-foreground">
                Vista<span className="gold-text">View</span>
              </span>
            </motion.div>

            <motion.p
              className="text-muted-foreground text-sm font-sans leading-relaxed mb-6 max-w-xs"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              The world&apos;s most advanced real estate intelligence platform.
              Discover, design, and build your dream space.
            </motion.p>

            {/* Contact info */}
            <div className="space-y-3">
              {[
                { icon: Mail, text: 'hello@vistaview.ai' },
                { icon: Phone, text: '+1 (800) 555-0199' },
                { icon: MapPin, text: 'San Francisco, CA' },
              ].map((item, i) => (
                <motion.div
                  key={item.text}
                  className="flex items-center gap-2.5 text-muted-foreground hover:text-foreground transition-colors cursor-pointer group"
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 + i * 0.05 }}
                >
                  <item.icon className="w-3.5 h-3.5 text-primary/50 group-hover:text-primary transition-colors" />
                  <span className="text-sm font-sans">{item.text}</span>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {footerLinks.map((col, colIdx) => (
            <div key={col.title} className="md:col-span-2">
              <motion.h4
                className="text-foreground font-sans font-semibold text-sm mb-5 tracking-wide"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: colIdx * 0.1 }}
              >
                {col.title}
              </motion.h4>
              <ul className="space-y-3">
                {col.links.map((link, i) => (
                  <motion.li
                    key={link}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 + colIdx * 0.1 + i * 0.04 }}
                  >
                    <a
                      href="#"
                      className="text-muted-foreground hover:text-primary text-sm font-sans transition-colors duration-300 inline-flex items-center gap-1 group"
                    >
                      {link}
                      <ArrowUpRight className="w-3 h-3 opacity-0 -translate-y-0.5 translate-x-0.5 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all duration-200" />
                    </a>
                  </motion.li>
                ))}
              </ul>
            </div>
          ))}

          {/* Newsletter */}
          <div className="md:col-span-2">
            <motion.h4
              className="text-foreground font-sans font-semibold text-sm mb-5 tracking-wide"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              Stay Updated
            </motion.h4>
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              <p className="text-muted-foreground text-xs font-sans mb-4">
                Get the latest in real estate tech delivered to your inbox.
              </p>
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="Email"
                  className="flex-1 min-w-0 bg-card/40 border border-border/30 rounded-lg px-3 py-2 text-xs font-sans text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary/40 transition-colors"
                />
                <motion.button
                  className="gold-gradient text-primary-foreground px-3 py-2 rounded-lg text-xs font-sans font-semibold shrink-0"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Join
                </motion.button>
              </div>
            </motion.div>

            {/* Socials */}
            <div className="flex gap-2 mt-6">
              {socials.map((social, i) => (
                <motion.a
                  key={social}
                  href="#"
                  className="w-8 h-8 rounded-lg border border-border/20 flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/30 transition-all duration-300"
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 + i * 0.05 }}
                  whileHover={{ y: -2 }}
                >
                  <span className="text-[10px] font-sans font-semibold">{social[0]}</span>
                </motion.a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <motion.div
          className="border-t border-border/15 pt-6 flex flex-col sm:flex-row justify-between items-center gap-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
        >
          <p className="text-muted-foreground/60 text-xs font-sans">
            © 2026 Vista View Realty Services. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            {['Privacy', 'Terms', 'Cookies'].map((link) => (
              <a
                key={link}
                href="#"
                className="text-muted-foreground/50 hover:text-muted-foreground text-xs font-sans transition-colors"
              >
                {link}
              </a>
            ))}
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
