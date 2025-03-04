import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import Logo from './Logo';
import { siteConfig } from '../config/siteConfig';
import { 
  FaInstagram, 
  FaTwitter, 
  FaYoutube, 
  FaWhatsapp,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt
} from 'react-icons/fa';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  const menuVariants = {
    closed: {
      opacity: 0,
      scale: 0.95,
      transition: {
        duration: 0.3,
        ease: [0.4, 0, 0.2, 1]
      }
    },
    open: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.3,
        ease: [0.4, 0, 0.2, 1]
      }
    }
  };

  const backdropVariants = {
    closed: {
      opacity: 0,
      scale: 0.98,
      filter: "blur(0px)",
      transition: {
        duration: 0.3,
        ease: [0.4, 0, 0.2, 1]
      }
    },
    open: {
      opacity: 1,
      scale: 1,
      filter: "blur(24px)",
      transition: {
        duration: 0.3,
        ease: [0.4, 0, 0.2, 1]
      }
    }
  };

  const containerVariants = {
    closed: {
      transition: {
        staggerChildren: 0.05,
        staggerDirection: -1
      }
    },
    open: {
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    closed: {
      opacity: 0,
      y: 15,
      transition: {
        duration: 0.2,
        ease: [0.4, 0, 0.2, 1]
      }
    },
    open: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.2,
        ease: [0.4, 0, 0.2, 1]
      }
    }
  };

  const hamburgerLineVariants = {
    closed: (i) => ({
      rotate: 0,
      y: 0,
      transition: {
        duration: 0.2,
        ease: [0.4, 0, 0.2, 1]
      }
    }),
    open: (i) => ({
      rotate: i === 1 ? 45 : i === 2 ? -45 : 0,
      y: i === 1 ? 6 : i === 2 ? -6 : 0,
      opacity: i === 0 ? 0 : 1,
      transition: {
        duration: 0.2,
        ease: [0.4, 0, 0.2, 1]
      }
    })
  };

  const socialIcons = [
    { icon: FaInstagram, url: siteConfig.social.instagram.url, show: siteConfig.social.instagram.show },
    { icon: FaTwitter, url: siteConfig.social.twitter.url, show: siteConfig.social.twitter.show },
    { icon: FaYoutube, url: siteConfig.social.youtube.url, show: siteConfig.social.youtube.show },
    { icon: FaWhatsapp, url: siteConfig.social.whatsapp.url, show: siteConfig.social.whatsapp.show }
  ];

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="fixed w-full top-0 z-50"
      >
        <div className={`w-full transition-colors duration-300 ${
          isScrolled || isMobileMenuOpen ? 'bg-dark-900/95 backdrop-blur-md' : 'bg-transparent'
        }`}>
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between py-4">
              <Link href="/" className="flex items-center space-x-2">
                <Logo className="h-8 w-auto" />
              </Link>

              {/* Desktop Navigation */}
              <div className="hidden md:flex items-center space-x-8">
                <NavLink href="/">Ana Sayfa</NavLink>
                <NavLink href="/hizmetler">Hizmetler</NavLink>
                <NavLink href="/iletisim">İletişim</NavLink>
              </div>

              {/* Mobile Menu Button */}
              <button 
                className="md:hidden w-8 h-8 flex flex-col justify-center items-center space-y-1.5"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {[0, 1, 2].map((i) => (
                  <motion.span
                    key={i}
                    custom={i}
                    variants={hamburgerLineVariants}
                    animate={isMobileMenuOpen ? "open" : "closed"}
                    className="w-6 h-0.5 bg-white block origin-center"
                  />
                ))}
              </button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Animated Background Layer */}
            <motion.div
              initial="closed"
              animate="open"
              exit="closed"
              variants={backdropVariants}
              className="fixed inset-0 bg-dark-900/98 z-40 md:hidden"
              style={{ transformOrigin: "center center" }}
            />
            
            {/* Content Layer */}
            <motion.div
              initial="closed"
              animate="open"
              exit="closed"
              variants={menuVariants}
              className="fixed inset-0 z-40 md:hidden backdrop-blur-2xl"
            >
              <motion.div 
                className="h-full flex flex-col pt-24 px-6"
                variants={containerVariants}
              >
                {/* Navigation Links */}
                <div className="flex flex-col space-y-6">
                  <motion.div variants={itemVariants}>
                    <MobileNavLink href="/" onClick={() => setIsMobileMenuOpen(false)}>
                      Ana Sayfa
                    </MobileNavLink>
                  </motion.div>
                  <motion.div variants={itemVariants}>
                    <MobileNavLink href="/hizmetler" onClick={() => setIsMobileMenuOpen(false)}>
                      Hizmetler
                    </MobileNavLink>
                  </motion.div>
                  <motion.div variants={itemVariants}>
                    <MobileNavLink href="/iletisim" onClick={() => setIsMobileMenuOpen(false)}>
                      İletişim
                    </MobileNavLink>
                  </motion.div>
                </div>

                {/* Contact Info */}
                <motion.div 
                  className="mt-auto pb-12"
                  variants={containerVariants}
                >
                  <div className="flex flex-col space-y-4">
                    <motion.a 
                      variants={itemVariants}
                      href={siteConfig.contact.office.directions_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center text-gray-400 hover:text-primary-400 transition-colors"
                    >
                      <FaMapMarkerAlt className="w-5 h-5 mr-3 text-primary-400" />
                      <span className="text-sm">{siteConfig.contact.office.address}, {siteConfig.contact.office.city}</span>
                    </motion.a>
                    <motion.a 
                      variants={itemVariants}
                      href={`tel:${siteConfig.contact.phone.number.replace(/\s+/g, '')}`}
                      className="flex items-center text-gray-400 hover:text-primary-400 transition-colors"
                    >
                      <FaPhone className="w-5 h-5 mr-3 text-primary-400" />
                      <span className="text-sm">{siteConfig.contact.phone.number}</span>
                    </motion.a>
                    <motion.a 
                      variants={itemVariants}
                      href={`mailto:${siteConfig.contact.email.address}`}
                      className="flex items-center text-gray-400 hover:text-primary-400 transition-colors"
                    >
                      <FaEnvelope className="w-5 h-5 mr-3 text-primary-400" />
                      <span className="text-sm">{siteConfig.contact.email.address}</span>
                    </motion.a>
                  </div>

                  {/* Social Icons */}
                  <motion.div 
                    variants={itemVariants}
                    className="flex justify-start space-x-6 mt-8 pt-8 border-t border-dark-700/50"
                  >
                    {socialIcons.map((social, index) => (
                      social.show && (
                        <motion.a
                          key={index}
                          href={social.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-gray-400 hover:text-primary-400 transition-colors duration-300"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <social.icon className="w-6 h-6" />
                        </motion.a>
                      )
                    ))}
                  </motion.div>
                </motion.div>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

function NavLink({ href, children }) {
  return (
    <Link
      href={href}
      className="text-gray-300 hover:text-primary-400 transition-colors duration-300"
    >
      {children}
    </Link>
  );
}

function MobileNavLink({ href, children, onClick }) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className="text-gray-300 hover:text-primary-400 transition-colors duration-300 text-2xl font-medium"
    >
      {children}
    </Link>
  );
} 