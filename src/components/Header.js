import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { siteConfig } from '../config/siteConfig';
import { marqueeTexts } from '../data/marqueeTexts';
import { BsLightningChargeFill, BsArrowRight } from 'react-icons/bs';

const images = [
  '/images/header/1.jpg',
  '/images/header/2.jpg',
  '/images/header/3.jpg',
  // Daha fazla görsel eklenebilir
];

export default function Header() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % images.length);
    }, 4000);

    return () => clearInterval(timer);
  }, []);

  const handleMouseMove = (e) => {
    const { clientX, clientY, currentTarget } = e;
    const { left, top, width, height } = currentTarget.getBoundingClientRect();
    
    const x = ((clientX - left) / width - 0.5) * 2;
    const y = ((clientY - top) / height - 0.5) * 2;
    
    setMousePosition({ x, y });
  };

  const slideVariants = {
    enter: {
      y: "100%",
      opacity: 1,
      scale: 1.1,
    },
    center: {
      y: 0,
      opacity: 1,
      scale: 1,
      transition: {
        y: { type: "spring", stiffness: 200, damping: 20 },
        scale: { duration: 0.8, ease: "easeOut" },
      },
    },
    exit: {
      y: "-100%",
      opacity: 1,
      transition: {
        y: { duration: 0.8, ease: [0.4, 0, 0.2, 1] },
      },
    },
  };

  const textVariants = {
    hidden: {
      opacity: 0,
      y: 20,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.4, 0, 0.2, 1],
      },
    },
  };

  return (
    <div 
      className="relative w-full h-screen overflow-hidden"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => {
        setIsHovering(false);
        setMousePosition({ x: 0, y: 0 });
      }}
    >
      {/* Background Images */}
      <div className="absolute inset-0">
        <AnimatePresence initial={false} mode="popLayout">
          <motion.div
            key={currentImageIndex}
            initial="enter"
            animate="center"
            exit="exit"
            variants={slideVariants}
            className="absolute inset-0"
            style={{
              transform: `perspective(1000px) rotateX(${mousePosition.y * 2}deg) rotateY(${mousePosition.x * 2}deg)`,
              transition: 'transform 0.3s ease-out',
            }}
          >
            <motion.div 
              className="relative w-full h-full"
              animate={{ 
                y: [-10, 0, -10],
                scale: [1, 1.1, 1]
              }}
              transition={{
                repeat: Infinity,
                duration: 15,
                ease: "easeInOut",
              }}
              style={{
                x: mousePosition.x * 20,
                y: mousePosition.y * 20,
                transition: 'all 0.3s ease-out',
              }}
            >
              <Image
                src={images[currentImageIndex]}
                alt="Header background"
                fill
                style={{ 
                  objectFit: 'cover',
                  scale: 1.1,
                }}
                priority={true}
                quality={100}
              />
              {/* Dark overlay with gradient */}
              <div className="absolute inset-0 bg-gradient-to-b from-dark-900/80 via-dark-900/60 to-dark-900/80 transition-opacity duration-300" />
              
              {/* Mouse interaction overlay */}
              <motion.div 
                className="absolute inset-0"
                animate={{
                  background: isHovering 
                    ? `radial-gradient(circle at ${(mousePosition.x / 2 + 0.5) * 100}% ${(mousePosition.y / 2 + 0.5) * 100}%, rgba(147,196,125,0.1), transparent 60%)`
                    : `radial-gradient(circle at ${(mousePosition.x / 2 + 0.5) * 100}% ${(mousePosition.y / 2 + 0.5) * 100}%, transparent, transparent)`,
                }}
                transition={{ duration: 0.3 }}
              />
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 h-full flex flex-col justify-center">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={textVariants}
          className="max-w-3xl"
        >
          <div className="relative group">
            <motion.h1 
              className="text-4xl md:text-6xl font-bold text-white mb-4 leading-[1.2] relative z-10"
              dangerouslySetInnerHTML={{ __html: siteConfig.header.title }}
            />
            <motion.div
              className="absolute -inset-x-4 -inset-y-2 origin-left"
              initial={{ scaleX: 0 }}
              whileHover={{ scaleX: 1 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              <div className="w-full h-full bg-gradient-to-r from-primary-500/20 to-transparent rounded-lg" />
            </motion.div>
            <motion.div
              className="absolute bottom-0 left-0 right-0 h-[2px] origin-left"
              initial={{ scaleX: 0 }}
              whileHover={{ scaleX: 1 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              <div className="w-full h-full bg-gradient-to-r from-primary-500 to-primary-400" />
            </motion.div>
          </div>

          <div className="relative group mt-4">
            <motion.p 
              className="text-lg md:text-xl text-gray-300 leading-[1.4] relative z-10"
              dangerouslySetInnerHTML={{ __html: siteConfig.header.subtitle }}
            />
            <motion.div
              className="absolute -inset-x-2 -inset-y-1 origin-left"
              initial={{ scaleX: 0 }}
              whileHover={{ scaleX: 1 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              <div className="w-full h-full bg-gradient-to-r from-primary-500/10 to-transparent rounded-lg" />
            </motion.div>
          </div>

          {/* Portfolio Button */}
          <motion.a
            href={siteConfig.header.portfolio_url || "/portfolio"}
            target="_blank"
            rel="noopener noreferrer"
            className="relative inline-flex items-center gap-2 mt-8 px-8 py-4 bg-primary-500 text-white rounded-full overflow-hidden group"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover="hover"
            whileTap="tap"
          >
            <motion.div
              className="absolute inset-0 bg-primary-600"
              initial={{ scale: 0, opacity: 0 }}
              variants={{
                hover: { scale: 1, opacity: 1 },
                tap: { scale: 0.95 },
              }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
              style={{ originX: 0 }}
            />
            <motion.span 
              className="relative z-10 text-lg font-medium flex items-center gap-2"
              variants={{
                hover: { x: 5 },
                tap: { scale: 0.95 },
              }}
            >
              <span>Portföyümüzü İncele</span>
              <motion.span
                variants={{
                  hover: { x: 5, scale: 1.2 },
                  tap: { scale: 0.9 },
                }}
              >
                <BsArrowRight className="w-5 h-5" />
              </motion.span>
            </motion.span>
          </motion.a>
        </motion.div>
      </div>

      {/* Marquee Text */}
      <motion.div 
        className="absolute bottom-0 left-0 right-0 z-20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <div className="relative">
          {/* Gradient overlays for smooth edges */}
          <div className="absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-dark-900 to-transparent z-10" />
          <div className="absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-dark-900 to-transparent z-10" />
          
          {/* Marquee content */}
          <div className="py-6 bg-primary-900/20 backdrop-blur-sm overflow-hidden">
            <div className="marquee-container">
              <div className="marquee-content">
                {[...marqueeTexts, ...marqueeTexts, ...marqueeTexts].map((text, index) => (
                  <span key={index} className="marquee-item">
                    <span className="flex items-center justify-center gap-3">
                      {text}
                      <BsLightningChargeFill className="text-primary-400 text-lg" />
                    </span>
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
} 