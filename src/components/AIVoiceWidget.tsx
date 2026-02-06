import { useState, useCallback, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mic, MicOff, X, Volume2, Sparkles } from 'lucide-react';

export default function AIVoiceWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [pulseLevel, setPulseLevel] = useState(0);
  const animFrameRef = useRef<number>(0);

  // Simulate audio visualization levels when "listening"
  useEffect(() => {
    if (!isListening) {
      setPulseLevel(0);
      return;
    }

    const animate = () => {
      setPulseLevel(Math.random() * 0.7 + 0.3);
      animFrameRef.current = requestAnimationFrame(animate);
    };
    animate();

    return () => cancelAnimationFrame(animFrameRef.current);
  }, [isListening]);

  const toggleListening = useCallback(() => {
    setIsListening((prev) => !prev);
  }, []);

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            className="absolute bottom-20 right-0 w-72 glass-panel rounded-2xl overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-border/30">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-primary" />
                <span className="text-sm font-semibold font-sans text-foreground">
                  AI Voice Assistant
                </span>
              </div>
              <button
                onClick={() => { setIsOpen(false); setIsListening(false); }}
                className="text-foreground/50 hover:text-foreground transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Body */}
            <div className="p-5 flex flex-col items-center gap-4">
              {/* Voice visualizer */}
              <div className="relative w-24 h-24 flex items-center justify-center">
                {/* Ripple rings */}
                {isListening && (
                  <>
                    <motion.div
                      className="absolute inset-0 rounded-full border border-primary/20"
                      animate={{ scale: [1, 1.5, 1], opacity: [0.4, 0, 0.4] }}
                      transition={{ duration: 2, repeat: Infinity, ease: 'easeOut' }}
                    />
                    <motion.div
                      className="absolute inset-0 rounded-full border border-primary/15"
                      animate={{ scale: [1, 1.8, 1], opacity: [0.3, 0, 0.3] }}
                      transition={{ duration: 2.5, repeat: Infinity, ease: 'easeOut', delay: 0.3 }}
                    />
                    <motion.div
                      className="absolute inset-0 rounded-full border border-primary/10"
                      animate={{ scale: [1, 2.2, 1], opacity: [0.2, 0, 0.2] }}
                      transition={{ duration: 3, repeat: Infinity, ease: 'easeOut', delay: 0.6 }}
                    />
                  </>
                )}

                {/* Center button */}
                <motion.button
                  onClick={toggleListening}
                  className={`relative z-10 w-16 h-16 rounded-full flex items-center justify-center transition-colors duration-300 ${
                    isListening
                      ? 'gold-gradient'
                      : 'bg-primary/15 border border-primary/30 hover:border-primary/50'
                  }`}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  animate={isListening ? {
                    boxShadow: [
                      '0 0 20px hsl(43 72% 55% / 0.2)',
                      `0 0 ${30 + pulseLevel * 30}px hsl(43 72% 55% / ${0.3 + pulseLevel * 0.2})`,
                      '0 0 20px hsl(43 72% 55% / 0.2)',
                    ],
                  } : {}}
                  transition={isListening ? { duration: 0.3 } : {}}
                >
                  {isListening ? (
                    <Volume2 className="w-6 h-6 text-primary-foreground" />
                  ) : (
                    <Mic className="w-6 h-6 text-primary" />
                  )}
                </motion.button>
              </div>

              {/* Audio level bars */}
              {isListening && (
                <motion.div
                  className="flex items-end gap-1 h-8"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  {Array.from({ length: 9 }).map((_, i) => (
                    <motion.div
                      key={i}
                      className="w-1 rounded-full bg-primary"
                      animate={{
                        height: `${8 + Math.random() * 24}px`,
                        opacity: 0.4 + Math.random() * 0.6,
                      }}
                      transition={{
                        duration: 0.15,
                        repeat: Infinity,
                        repeatType: 'reverse',
                        delay: i * 0.05,
                      }}
                    />
                  ))}
                </motion.div>
              )}

              {/* Status text */}
              <p className="text-xs text-muted-foreground font-sans text-center">
                {isListening
                  ? 'Listening... Speak your query'
                  : 'Tap the mic to start speaking'}
              </p>

              {/* Quick prompts */}
              {!isListening && (
                <div className="flex flex-wrap gap-2 justify-center">
                  {['Find properties', 'Interior ideas', 'Market trends'].map((prompt) => (
                    <button
                      key={prompt}
                      className="text-[10px] px-3 py-1.5 rounded-full border border-border/40 text-foreground/60 hover:border-primary/40 hover:text-primary transition-all duration-300 font-sans"
                    >
                      {prompt}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating trigger button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="relative w-14 h-14 rounded-full gold-gradient flex items-center justify-center glow-strong group"
        whileHover={{ scale: 1.1, boxShadow: '0 0 50px hsl(43 72% 55% / 0.4)' }}
        whileTap={{ scale: 0.95 }}
      >
        {/* Pulse ring behind button */}
        <motion.div
          className="absolute inset-0 rounded-full gold-gradient"
          animate={{ scale: [1, 1.3, 1], opacity: [0.4, 0, 0.4] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        />

        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <X className="w-6 h-6 text-primary-foreground relative z-10" />
            </motion.div>
          ) : (
            <motion.div
              key="mic"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <Mic className="w-6 h-6 text-primary-foreground relative z-10" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>
    </div>
  );
}
