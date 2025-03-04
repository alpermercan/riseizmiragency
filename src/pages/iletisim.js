import Head from 'next/head';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { HiOutlineLocationMarker, HiOutlineMail, HiOutlinePhone } from 'react-icons/hi';
import { siteConfig } from '../config/siteConfig';
import { useState } from 'react';
import InputMask from 'react-input-mask';
import toast, { Toaster } from 'react-hot-toast';

export default function Contact() {
  const { office, email, phone } = siteConfig.contact;
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Google Maps URL'sini güvenli bir şekilde oluşturalım
  const getGoogleMapsUrl = () => {
    const baseUrl = "https://www.google.com/maps/embed";
    const query = encodeURIComponent("İzmir, Türkiye"); // veya siteConfig'den gelen adres
    return `${baseUrl}?q=${query}&z=13`;
  };

  // Telefon numarası için validation
  const validatePhone = (phone) => {
    // Sadece rakamları al
    const numbers = phone.replace(/\D/g, '');
    return numbers.length === 10; // 10 haneli telefon numarası kontrolü
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const phone = e.target.phone.value;
    
    if (phone && !validatePhone(phone)) {
      toast.error('Lütfen geçerli bir telefon numarası girin', {
        duration: 3000,
        position: 'top-center',
        style: {
          background: '#1F2937',
          color: '#fff',
          border: '1px solid #374151'
        }
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const formData = new FormData(e.target);
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: JSON.stringify({
          access_key: 'YOUR_ACCESS_KEY_HERE',
          name: formData.get('name'),
          email: formData.get('email'),
          phone: formData.get('phone'),
          subject: formData.get('subject'),
          message: formData.get('message'),
          from_page: window.location.href
        }),
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json'
        }
      });

      const data = await response.json();
      
      if (data.success) {
        // Başarılı toast mesajı
        toast.custom((t) => (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className={`${
              t.visible ? 'animate-enter' : 'animate-leave'
            } max-w-md w-full bg-dark-800 shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}
          >
            <div className="flex-1 w-0 p-4">
              <div className="flex items-start">
                <div className="flex-shrink-0 pt-0.5">
                  <div className="h-10 w-10 rounded-full bg-primary-500 flex items-center justify-center">
                    <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                </div>
                <div className="ml-3 flex-1">
                  <p className="text-sm font-medium text-white">
                    Mesajınız Gönderildi!
                  </p>
                  <p className="mt-1 text-sm text-gray-400">
                    En kısa sürede size dönüş yapacağız.
                  </p>
                </div>
              </div>
            </div>
            <div className="flex border-l border-dark-700">
              <button
                onClick={() => toast.dismiss(t.id)}
                className="w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium text-gray-400 hover:text-white focus:outline-none"
              >
                Kapat
              </button>
            </div>
          </motion.div>
        ), {
          duration: 5000,
          position: 'top-center'
        });

        e.target.reset();
      } else {
        throw new Error('Form submission failed');
      }
    } catch (error) {
      toast.error('Bir hata oluştu. Lütfen tekrar deneyin.', {
        duration: 3000,
        position: 'top-center',
        style: {
          background: '#1F2937',
          color: '#fff',
          border: '1px solid #374151'
        }
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Head>
        <title>İletişim - Rise Digital Agency</title>
        <meta name="description" content="Rise Digital Agency ile iletişime geçin" />
      </Head>

      <main className="bg-dark-900 min-h-screen">
        <Toaster />
        <Navbar />
        
        {/* Hero Section */}
        <section className="relative py-20 bg-dark-900">
          <div className="absolute inset-0 bg-gradient-to-b from-primary-900/20 to-dark-900/20" />
          <div className="container mx-auto px-4 relative">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-6xl font-bold text-center mb-8"
            >
              İletişim
            </motion.h1>
          </div>
        </section>

        {/* Contact Cards */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Ofis */}
              {office.show && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  className="bg-dark-800 p-8 rounded-lg hover:bg-dark-700 transition-colors duration-300"
                >
                  <div className="flex flex-col items-center text-center">
                    <div className="w-12 h-12 bg-primary-900/30 rounded-full flex items-center justify-center mb-4">
                      <HiOutlineLocationMarker className="w-6 h-6 text-primary-400" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">Ofis</h3>
                    <p className="text-gray-400">
                      {office.address}<br />
                      {office.city}
                    </p>
                    <a href={office.directions_url} target="_blank" rel="noopener noreferrer" className="mt-4 text-primary-400 hover:text-primary-300 transition-colors inline-flex items-center">
                      YOL TARİFİ
                      <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </a>
                  </div>
                </motion.div>
              )}

              {/* Mail */}
              {email.show && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="bg-dark-800 p-8 rounded-lg hover:bg-dark-700 transition-colors duration-300"
                >
                  <div className="flex flex-col items-center text-center">
                    <div className="w-12 h-12 bg-primary-900/30 rounded-full flex items-center justify-center mb-4">
                      <HiOutlineMail className="w-6 h-6 text-primary-400" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">Mail Adresimiz</h3>
                    <p className="text-gray-400">{email.address}</p>
                    <a href={`mailto:${email.address}`} className="mt-4 text-primary-400 hover:text-primary-300 transition-colors inline-flex items-center">
                      MAİL GÖNDER
                      <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </a>
                  </div>
                </motion.div>
              )}

              {/* Telefon */}
              {phone.show && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  className="bg-dark-800 p-8 rounded-lg hover:bg-dark-700 transition-colors duration-300"
                >
                  <div className="flex flex-col items-center text-center">
                    <div className="w-12 h-12 bg-primary-900/30 rounded-full flex items-center justify-center mb-4">
                      <HiOutlinePhone className="w-6 h-6 text-primary-400" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">Telefon</h3>
                    <p className="text-gray-400">{phone.number}</p>
                    <a href={`tel:${phone.number.replace(/\s+/g, '')}`} className="mt-4 text-primary-400 hover:text-primary-300 transition-colors inline-flex items-center">
                      BİZİ ARAYIN
                      <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </a>
                  </div>
                </motion.div>
              )}
            </div>
          </div>
        </section>

        {/* Contact Form */}
        <section className="py-16 bg-dark-800">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="bg-dark-900 p-8 rounded-lg"
              >
                <h2 className="text-3xl font-bold mb-8 text-center">Bir markanız mı var?</h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-400 mb-2">Ad Soyad*</label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        className="w-full bg-dark-800 border border-dark-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary-500 transition-colors"
                        required
                        placeholder="İsminizi girin"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-400 mb-2">Mail*</label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        className="w-full bg-dark-800 border border-dark-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary-500 transition-colors"
                        required
                        placeholder="E-posta adresinizi girin"
                      />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-300 mb-2">
                      Telefon
                    </label>
                    <InputMask
                      mask="(999) 999 99 99"
                      maskChar={null}
                      type="tel"
                      name="phone"
                      id="phone"
                      className={`w-full px-4 py-3 bg-dark-700/50 border border-dark-600 rounded-lg 
                        focus:ring-2 focus:ring-primary-500 focus:border-transparent 
                        transition-all duration-300 text-white`}
                      placeholder="(5XX) XXX XX XX"
                    />
                  </div>
                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-400 mb-2">Konu*</label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      className="w-full bg-dark-800 border border-dark-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary-500 transition-colors"
                      required
                      placeholder="Konu başlığını girin"
                    />
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-400 mb-2">Nasıl yardımcı olabiliriz?*</label>
                    <textarea
                      id="message"
                      name="message"
                      rows="4"
                      className="w-full bg-dark-800 border border-dark-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary-500 transition-colors"
                      required
                      placeholder="Mesajınızı girin"
                    ></textarea>
                  </div>
                  <div className="flex justify-center">
                    <motion.button
                      type="submit"
                      disabled={isSubmitting}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className={`bg-primary-500 text-dark-900 px-8 py-4 rounded-full font-medium hover:bg-primary-400 transition-colors duration-300
                        ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                      {isSubmitting ? (
                        <span className="flex items-center">
                          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Gönderiliyor...
                        </span>
                      ) : (
                        'Gönder'
                      )}
                    </motion.button>
                  </div>
                </form>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Map Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="h-[400px] rounded-lg overflow-hidden shadow-xl">
              <iframe
                src={siteConfig.contact.office.maps_url}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full"
              />
            </div>
          </div>
        </section>

        <Footer />
      </main>
    </>
  );
} 