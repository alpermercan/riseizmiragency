import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

export default function BrandLogos({ logos }) {
  const [displayedLogos, setDisplayedLogos] = useState([]);

  useEffect(() => {
    // 12'den fazla logo varsa random seçim yap
    if (logos.length > 12) {
      const shuffleLogos = () => {
        const shuffled = [...logos].sort(() => Math.random() - 0.5);
        setDisplayedLogos(shuffled.slice(0, 12));
      };
      
      shuffleLogos();
      // Her 5 saniyede bir logoları karıştır
      const interval = setInterval(shuffleLogos, 5000);
      return () => clearInterval(interval);
    } else {
      setDisplayedLogos(logos);
    }
  }, [logos]);

  return (
    <section className="py-20 bg-dark-900">
      <div className="container mx-auto px-4">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-3xl font-bold text-center mb-16 text-white"
        >
          Referanslarımız
        </motion.h2>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 max-w-[1000px] mx-auto">
          {displayedLogos.map((logo, index) => (
            <motion.div
              key={`${logo.id}-${index}`}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="w-full aspect-[3/2] flex items-center justify-center p-6 bg-dark-800/50 backdrop-blur-sm rounded-xl border border-dark-700 hover:border-primary-500/30 transition-all duration-300 group"
            >
              <div className="relative w-full h-full grayscale hover:grayscale-0 transition-all duration-300">
                <Image
                  src={logo.imageUrl}
                  alt={logo.name}
                  fill
                  className="object-contain"
                  sizes="(max-width: 768px) 40vw, (max-width: 1024px) 30vw, 25vw"
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
} 