import Link from 'next/link';
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
import { motion } from 'framer-motion';

export default function Footer() {
  const socialIcons = [
    { icon: FaInstagram, url: siteConfig.social.instagram.url, show: siteConfig.social.instagram.show },
    { icon: FaTwitter, url: siteConfig.social.twitter.url, show: siteConfig.social.twitter.show },
    { icon: FaYoutube, url: siteConfig.social.youtube.url, show: siteConfig.social.youtube.show },
    { icon: FaWhatsapp, url: siteConfig.social.whatsapp.url, show: siteConfig.social.whatsapp.show },
    { icon: FaEnvelope, url: `mailto:${siteConfig.contact.email.address}`, show: siteConfig.contact.email.show },
    { icon: FaPhone, url: `tel:${siteConfig.contact.phone.number}`, show: siteConfig.contact.phone.show }
  ];

  return (
    <footer className="py-12 bg-dark-800">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-2xl font-bold mb-4 text-white">markanızı<br />yükseltelim.</h3>
            {/* Social Icons */}
            <div className="flex space-x-6">
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
            </div>
          </div>
          <div>
            <h4 className="font-medium mb-4 text-primary-300">Menü</h4>
            <ul className="space-y-2 text-gray-400">
              <li><Link href="/" className="hover:text-primary-400 transition-colors">ANA SAYFA</Link></li>
              <li><Link href="/hizmetler" className="hover:text-primary-400 transition-colors">HİZMETLER</Link></li>
              <li><Link href="/iletisim" className="hover:text-primary-400 transition-colors">İLETİŞİM</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium mb-4 text-primary-300">İletişim</h4>
            <div className="space-y-4">
              <a 
                href={`mailto:${siteConfig.contact.email.address}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center text-gray-400 hover:text-primary-400 transition-colors"
              >
                <FaEnvelope className="w-5 h-5 mr-3" />
                <span>{siteConfig.contact.email.address}</span>
              </a>
              
              <a 
                href={`tel:${siteConfig.contact.phone.number.replace(/\s+/g, '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center text-gray-400 hover:text-primary-400 transition-colors"
              >
                <FaPhone className="w-5 h-5 mr-3" />
                <span>{siteConfig.contact.phone.number}</span>
              </a>
              
              <a 
                href={siteConfig.contact.office.directions_url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center text-gray-400 hover:text-primary-400 transition-colors"
              >
                <FaMapMarkerAlt className="w-5 h-5 mr-3" />
                <span>{siteConfig.contact.office.address}, {siteConfig.contact.office.city}</span>
              </a>
            </div>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-dark-700">
          <p className="text-sm text-gray-500">Copyright © 2024 Rise Digital Agency</p>
        </div>
      </div>
    </footer>
  );
} 