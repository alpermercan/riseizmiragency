import { useRouter } from 'next/router';
import Head from 'next/head';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { getServiceById, getAllServiceIds } from '../../data/services';
import Navbar from '../../components/Navbar';
import Loader from '../../components/Loader';

export default function ServicePage({ service }) {
  const router = useRouter();
  const [imageLoading, setImageLoading] = useState(true);

  if (router.isFallback) {
    return <Loader />;
  }

  return (
    <>
      <Head>
        <title>{service.title} - Rise Digital Agency</title>
        <meta name="description" content={service.metaDescription} />
        <meta property="og:title" content={`${service.title} - Rise Digital Agency`} />
        <meta property="og:description" content={service.metaDescription} />
        <meta property="og:image" content={service.heroImage} />
      </Head>

      <AnimatePresence mode="wait">
        {imageLoading && <Loader key="loader" />}
        
        <motion.main
          key="main"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-dark-800 min-h-screen"
        >
          <Navbar />
          
          {/* Hero Section */}
          <section className="relative h-[60vh] min-h-[500px] overflow-hidden">
            {/* Hero Image */}
            <div className="absolute inset-0">
              <div className="absolute inset-0 bg-dark-900/60 z-10" />
              <Image
                src={service.heroImage}
                alt={service.title}
                fill
                className="object-cover"
                priority
                onLoadingComplete={() => setImageLoading(false)}
              />
            </div>

            {/* Hero Content */}
            <div className="relative z-20 container mx-auto h-full flex items-center px-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="max-w-3xl"
              >
                <h1 className="text-5xl font-bold text-white mb-6">{service.title}</h1>
                <p className="text-xl text-gray-200">{service.shortDescription}</p>
              </motion.div>
            </div>
          </section>

          {/* Content Section */}
          <section className="py-20">
            <div className="container mx-auto px-4">
              <div className="max-w-3xl mx-auto">
                {/* Introduction */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  className="prose prose-invert prose-lg mb-16"
                >
                  <p className="text-gray-300 text-xl leading-relaxed">
                    {service.content.intro}
                  </p>
                </motion.div>

                {/* Services */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  className="grid gap-8 mb-16"
                >
                  <h2 className="text-3xl font-bold text-white mb-8">Hizmet Detayları</h2>
                  {service.content.services.map((item, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                      className="bg-dark-700 rounded-xl p-6 hover:bg-dark-600 transition-colors duration-300 hover:shadow-lg hover:shadow-primary-500/10"
                    >
                      <h3 className="text-xl font-semibold text-primary-400 mb-3">
                        {item.title}
                      </h3>
                      <p className="text-gray-300">
                        {item.description}
                      </p>
                    </motion.div>
                  ))}
                </motion.div>

                {/* Benefits */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                >
                  <h2 className="text-3xl font-bold text-white mb-8">Avantajlar</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {service.content.benefits.map((benefit, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: index * 0.1 }}
                        className="flex items-center space-x-3 bg-dark-700/50 p-4 rounded-lg hover:bg-dark-600/50 transition-colors duration-300"
                      >
                        <svg
                          className="w-5 h-5 text-primary-400 flex-shrink-0"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                        <span className="text-gray-300">{benefit}</span>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>

                {/* CTA */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  className="mt-16 text-center"
                >
                  <h2 className="text-3xl font-bold text-white mb-6">
                    Projeleriniz için bizimle iletişime geçin
                  </h2>
                  <button className="bg-primary-500 text-dark-900 px-8 py-4 rounded-full font-medium hover:bg-primary-400 transition-colors duration-300 hover:shadow-lg hover:shadow-primary-500/20">
                    İLETİŞİME GEÇİN
                  </button>
                </motion.div>
              </div>
            </div>
          </section>
        </motion.main>
      </AnimatePresence>
    </>
  );
}

export async function getStaticPaths() {
  const paths = getAllServiceIds().map(id => ({
    params: { id }
  }));

  return {
    paths,
    fallback: true // Change to true to enable fallback loading states
  };
}

export async function getStaticProps({ params }) {
  const service = getServiceById(params.id);

  if (!service) {
    return {
      notFound: true
    };
  }

  return {
    props: {
      service
    },
    revalidate: 60 // Enable ISR with a 60-second revalidation period
  };
} 