import { motion, AnimatePresence } from 'framer-motion';

export default function Loader() {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
        className="fixed inset-0 bg-dark-900 flex items-center justify-center z-50"
      >
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.3 }}
          className="flex flex-col items-center justify-center"
        >
          {/* 3D Cube Animation */}
          <div className="relative w-24 h-24 transform-gpu">
            <motion.div
              className="absolute inset-0 border-2 border-primary-500/30 rounded-lg"
              animate={{
                rotateX: [0, 360],
                rotateY: [0, 360],
                scale: [1, 1.2, 1]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            <motion.div
              className="absolute inset-0 border-2 border-primary-400/50 rounded-lg"
              animate={{
                rotateX: [360, 0],
                rotateY: [0, 360],
                scale: [1.2, 1, 1.2]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.2
              }}
            />
            <motion.div
              className="absolute inset-0 border-2 border-primary-300 rounded-lg"
              animate={{
                rotateX: [0, 360],
                rotateY: [360, 0],
                scale: [1, 1.2, 1]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.4
              }}
            />
          </div>

          {/* Loading Text */}
          <motion.div
            className="mt-12 text-center relative z-10"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <motion.h3
              className="text-3xl font-semibold text-primary-400 mb-3"
              animate={{
                opacity: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              Yükleniyor
            </motion.h3>
            <p className="text-gray-400 text-lg">Lütfen bekleyin...</p>
          </motion.div>

          {/* Glow Effect */}
          <div className="absolute inset-0 blur-3xl bg-primary-500/10 -z-10">
            <motion.div
              className="w-full h-full bg-primary-500/5"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.5, 0.8, 0.5]
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
} 