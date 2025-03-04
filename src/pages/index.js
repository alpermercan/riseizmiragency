import { useState, useEffect } from 'react'
import Head from 'next/head'
import { motion, AnimatePresence } from 'framer-motion'
import Services from '../components/Services'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Image from 'next/image'
import Loader from '../components/Loader'
import Header from '../components/Header'
import BrandLogos from '../components/BrandLogos'
import { brandLogos } from '../data/brandLogos'
import { siteConfig } from '../config/siteConfig'

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <Head>
        <title>{siteConfig.site.title}</title>
        <meta name="description" content={siteConfig.site.description} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <AnimatePresence mode="wait">
        {isLoading ? (
          <Loader key="loader" />
        ) : (
          <motion.main
            key="main"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-dark-900"
          >
            <Navbar />
            <Header />
            <Services />
            <BrandLogos logos={brandLogos} />
            <Footer />
          </motion.main>
        )}
      </AnimatePresence>
    </>
  )
} 