import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { 
  Share2, 
  Video, 
  Camera, 
  BarChart2, 
  Users, 
  Globe, 
  ShoppingCart, 
  Mail 
} from 'lucide-react';

const services = [
  {
    id: "sosyal-medya-yonetimi",
    title: "Sosyal Medya Yönetimi",
    description: "Markanızın sosyal medya varlığını güçlendiriyor, etkileşimi artırıyor ve hedef kitlenizle bağ kuruyoruz.",
    icon: Share2
  },
  {
    id: "video-drone-cekimi",
    title: "Video & Drone Çekimi",
    description: "Profesyonel ekipman ve yaratıcı yaklaşımla markanızı en etkileyici şekilde görselleştiriyoruz.",
    icon: Video
  },
  {
    id: "fotograf-cekimi",
    title: "Fotoğraf Çekimi",
    description: "Ürün ve etkinlik fotoğraflarıyla markanızın görsel kimliğini güçlendiriyoruz.",
    icon: Camera
  },
  {
    id: "dijital-pazarlama",
    title: "Dijital Pazarlama",
    description: "SEO, SEM ve sosyal medya reklamlarıyla markanızın online görünürlüğünü artırıyoruz.",
    icon: BarChart2
  },
  {
    id: "icerik-uretimi",
    title: "İçerik Üretimi",
    description: "Özgün ve etkileyici içeriklerle markanızın hikayesini anlatıyoruz.",
    icon: Users
  },
  {
    id: "web-tasarim",
    title: "Web Tasarım",
    description: "Modern ve kullanıcı dostu web siteleriyle dijital varlığınızı güçlendiriyoruz.",
    icon: Globe
  },
  {
    id: "e-ticaret-cozumleri",
    title: "E-Ticaret Çözümleri",
    description: "Online satış kanallarınızı optimize ederek satışlarınızı artırıyoruz.",
    icon: ShoppingCart
  },
  {
    id: "e-posta-pazarlama",
    title: "E-posta Pazarlama",
    description: "Etkili e-posta kampanyalarıyla müşteri ilişkilerinizi güçlendiriyoruz.",
    icon: Mail
  }
];

export default function Services() {
  return (
    <section className="py-20 bg-dark-800 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(147,196,125,0.05),transparent_50%)]" />
      
      <div className="container mx-auto px-4 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-white mb-4">Hizmetlerimiz</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Dijital dünyada markanızı yükseltmek için ihtiyacınız olan tüm hizmetler
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group relative"
            >
              <Link href={`/hizmetler/${service.id}`} className="block">
                <div className="relative h-full bg-dark-700 rounded-2xl p-6 overflow-hidden transition-all duration-300 hover:scale-[1.02] hover:shadow-xl hover:shadow-primary-500/20">
                  {/* Gradient Background - Only visible on hover */}
                  <div className="absolute inset-0 bg-gradient-to-br from-primary-500/0 to-primary-600/0 group-hover:from-primary-500/10 group-hover:to-primary-600/10 transition-all duration-300" />
                  
                  {/* Content */}
                  <div className="relative z-10">
                    <div className="w-12 h-12 bg-dark-600 rounded-xl flex items-center justify-center mb-4 group-hover:bg-primary-500/20 transition-all duration-300">
                      <service.icon className="w-6 h-6 text-primary-400 group-hover:text-primary-300 transition-colors duration-300" />
                    </div>
                    
                    <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-primary-400 transition-colors duration-300">
                      {service.title}
                    </h3>
                    
                    <p className="text-gray-400 text-sm leading-relaxed group-hover:text-gray-300 transition-colors duration-300">
                      {service.description}
                    </p>

                    {/* Hidden "Detaylı Bilgi" text that appears on hover */}
                    <div className="mt-4 opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                      <span className="text-primary-400 text-sm font-medium flex items-center">
                        DETAYLI BİLGİ
                        <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </span>
                    </div>
                  </div>

                  {/* Subtle border that becomes more visible on hover */}
                  <div className="absolute inset-0 border border-dark-600 group-hover:border-primary-500/20 rounded-2xl transition-colors duration-300" />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
} 