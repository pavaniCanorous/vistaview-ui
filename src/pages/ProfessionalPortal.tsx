import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowLeft, Building, Home, Package, Briefcase, Mic, AudioLines, MessageCircle } from 'lucide-react';

type Step = 'select-role' | 'login-form';

const roles = [
  { icon: Home, label: 'Real Estate Agent', value: 'agent' },
  { icon: Building, label: 'Builder', value: 'builder' },
  { icon: Package, label: 'Product Vendor', value: 'vendor' },
  { icon: Briefcase, label: 'Other Professionals', value: 'other' },
];

const aiFlows = [
  { icon: Mic, label: 'Talkative', color: 'text-primary' },
  { icon: AudioLines, label: 'Interactive', color: 'text-primary' },
  { icon: MessageCircle, label: 'Text chat', color: 'text-primary' },
];

export default function ProfessionalPortal() {
  const navigate = useNavigate();
  const [step, setStep] = useState<Step>('select-role');
  const [selectedRole, setSelectedRole] = useState('');
  const [phone, setPhone] = useState('');
  const [keepSignedIn, setKeepSignedIn] = useState(false);

  const handleRoleSelect = (role: string) => {
    setSelectedRole(role);
    setStep('login-form');
  };

  const handleSignIn = () => {
    navigate('/builder-dashboard');
  };

  const getRoleLabel = () => {
    const role = roles.find(r => r.value === selectedRole);
    return role ? `Real Estate ${role.label === 'Builder' ? 'Builder / Developer' : role.label}` : '';
  };

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
        className="glass-card-strong w-full max-w-lg rounded-3xl overflow-hidden relative"
      >
        {/* Close button */}
        <button
          onClick={() => navigate('/signin')}
          className="absolute top-4 right-4 z-10 w-8 h-8 flex items-center justify-center rounded-full bg-muted/50 text-foreground/60 hover:text-foreground transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="p-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h2 className="font-display text-3xl font-bold text-foreground mb-2">
              Hello, Login as professional
            </h2>
            <p className="text-muted-foreground font-sans text-sm mb-1">
              Connect at ease with Vistaview as a seller
            </p>
            <p className="text-muted-foreground font-sans text-sm mb-6">
              Don&apos;t have an account?{' '}
              <a href="#" className="text-primary underline underline-offset-4 hover:text-gold-light transition-colors">
                Create a new account
              </a>
            </p>
          </motion.div>

          {/* Divider */}
          <div className="h-px bg-gradient-to-r from-transparent via-border/60 to-transparent mb-6" />

          <AnimatePresence mode="wait">
            {step === 'select-role' ? (
              <motion.div
                key="select-role"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <h3 className="text-foreground font-semibold text-sm tracking-widest uppercase mb-6 font-sans">
                  Sign in with mobile number
                </h3>

                {/* Role Cards */}
                <div className="grid grid-cols-2 gap-4 mb-8">
                  {roles.map((role, i) => (
                    <motion.button
                      key={role.value}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.1, duration: 0.4 }}
                      onClick={() => handleRoleSelect(role.value)}
                      className="role-card"
                    >
                      <div className="w-12 h-12 rounded-lg gold-gradient flex items-center justify-center">
                        <role.icon className="w-6 h-6 text-primary-foreground" />
                      </div>
                      <span className="text-foreground font-sans text-sm font-medium">{role.label}</span>
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="login-form"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <h3 className="text-foreground font-semibold text-sm tracking-widest uppercase mb-4 font-sans">
                  Sign in with mobile number
                </h3>

                {/* Back button */}
                <button
                  onClick={() => setStep('select-role')}
                  className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-6 font-sans text-sm"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Back to selection
                </button>

                {/* Role Selector */}
                <div className="mb-4">
                  <div className="glass-card px-4 py-3 rounded-xl flex items-center justify-between cursor-pointer">
                    <span className="text-foreground font-sans text-sm">{getRoleLabel()}</span>
                    <svg className="w-4 h-4 text-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>

                {/* Phone Input */}
                <div className="flex gap-3 mb-4">
                  <div className="glass-card px-3 py-3 rounded-xl flex items-center gap-2 flex-shrink-0">
                    <span className="text-lg">🇮🇳</span>
                    <span className="text-foreground font-sans text-sm">+91</span>
                    <svg className="w-3 h-3 text-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                  <input
                    type="tel"
                    placeholder="Mobile Number"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="flex-1 glass-card px-4 py-3 rounded-xl bg-transparent text-foreground placeholder:text-muted-foreground font-sans text-sm outline-none focus:border-primary/50 transition-colors border border-transparent"
                  />
                </div>

                {/* Keep me signed in */}
                <label className="flex items-center gap-3 mb-6 cursor-pointer">
                  <div
                    onClick={() => setKeepSignedIn(!keepSignedIn)}
                    className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${
                      keepSignedIn ? 'bg-primary border-primary' : 'border-border/50'
                    }`}
                  >
                    {keepSignedIn && (
                      <svg className="w-3 h-3 text-primary-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </div>
                  <span className="text-foreground font-sans text-sm">Keep Me Signed In</span>
                </label>

                {/* Sign In Button */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleSignIn}
                  className="w-full py-4 rounded-xl font-semibold text-lg font-sans transition-all duration-300"
                  style={{
                    background: 'linear-gradient(135deg, hsl(160 50% 30%), hsl(160 40% 40%))',
                    color: 'hsl(45 30% 90%)',
                  }}
                >
                  Sign in
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>

          {/* AI Agentic Flow */}
          <div className="mt-8">
            <p className="text-center text-muted-foreground font-sans text-sm mb-4">
              Go with below AI Agentic flow for ease of use
            </p>
            <div className="flex justify-center gap-4">
              {aiFlows.map((flow, i) => (
                <motion.button
                  key={flow.label}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + i * 0.1, duration: 0.4 }}
                  className="ai-flow-card"
                >
                  <div className="w-10 h-10 rounded-full gold-gradient flex items-center justify-center">
                    <flow.icon className="w-5 h-5 text-primary-foreground" />
                  </div>
                  <span className="text-foreground font-sans text-xs font-medium">{flow.label}</span>
                </motion.button>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
