import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiShield, FiHeart, FiHome, FiCar, FiPlane, FiBriefcase, FiCheck, FiArrowRight, FiUsers, FiAward, FiClock } = FiIcons;

const Home = () => {
  const services = [
    {
      icon: FiHeart,
      title: 'Life Insurance',
      description: 'Protect your family\'s financial future with comprehensive life insurance coverage.',
      color: 'bg-red-500'
    },
    {
      icon: FiHome,
      title: 'Property Insurance',
      description: 'Safeguard your home and belongings against unexpected damages and losses.',
      color: 'bg-blue-500'
    },
    {
      icon: FiCar,
      title: 'Vehicle Insurance',
      description: 'Complete auto insurance coverage for cars, motorcycles, and commercial vehicles.',
      color: 'bg-green-500'
    },
    {
      icon: FiPlane,
      title: 'Aviation Insurance',
      description: 'Specialized coverage for aircraft and aviation-related risks.',
      color: 'bg-purple-500'
    },
    {
      icon: FiHeart,
      title: 'Health Insurance',
      description: 'Comprehensive medical coverage for you and your family\'s health needs.',
      color: 'bg-pink-500'
    },
    {
      icon: FiBriefcase,
      title: 'Business Insurance',
      description: 'Protect your business with liability, property, and commercial coverage.',
      color: 'bg-orange-500'
    }
  ];

  const features = [
    {
      icon: FiUsers,
      title: 'Expert Agents',
      description: 'Licensed professionals with years of experience in the insurance industry.'
    },
    {
      icon: FiAward,
      title: 'Trusted Partners',
      description: 'Working with leading insurers FWD and Prudential Guarantee for reliable coverage.'
    },
    {
      icon: FiClock,
      title: '24/7 Support',
      description: 'Round-the-clock customer service and claims support when you need it most.'
    }
  ];

  const benefits = [
    'Comprehensive coverage options',
    'Competitive premium rates',
    'Fast claims processing',
    'Online policy management',
    'Mobile-friendly platform',
    'Personalized service'
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
                Protect What Matters.
                <br />
                <span className="text-primary-200">Life & Non-Life Insurance Simplified.</span>
              </h1>
              <p className="text-xl mb-8 text-primary-100">
                Comprehensive insurance solutions from trusted partners FWD and Prudential Guarantee. 
                Secure your future with our expert guidance and personalized service.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/quote"
                  className="bg-white text-primary-600 px-8 py-4 rounded-lg font-semibold hover:bg-primary-50 transition-colors duration-200 text-center"
                >
                  Get a Quote
                </Link>
                <Link
                  to="/login"
                  className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-primary-600 transition-colors duration-200 text-center"
                >
                  Client Login
                </Link>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8">
                <SafeIcon icon={FiShield} className="w-32 h-32 text-primary-200 mx-auto mb-6" />
                <h3 className="text-2xl font-bold text-center mb-4">Your Security is Our Priority</h3>
                <p className="text-primary-100 text-center">
                  Over 10,000 satisfied clients trust us with their insurance needs across the Philippines.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Insurance Services
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive coverage options to protect every aspect of your life and business
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow duration-300"
              >
                <div className={`${service.color} w-16 h-16 rounded-lg flex items-center justify-center mb-6`}>
                  <SafeIcon icon={service.icon} className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">{service.title}</h3>
                <p className="text-gray-600 mb-6">{service.description}</p>
                <Link
                  to={`/services/${service.title.toLowerCase().replace(' ', '-')}`}
                  className="inline-flex items-center text-primary-600 hover:text-primary-700 font-medium"
                >
                  Learn More
                  <SafeIcon icon={FiArrowRight} className="w-4 h-4 ml-2" />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Why Choose SecureGuard Insurance?
              </h2>
              <p className="text-xl text-gray-600 mb-8">
                We combine industry expertise with personalized service to deliver 
                the best insurance solutions for your unique needs.
              </p>
              
              <div className="grid grid-cols-1 gap-4">
                {benefits.map((benefit, index) => (
                  <motion.div
                    key={benefit}
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="flex items-center space-x-3"
                  >
                    <SafeIcon icon={FiCheck} className="w-6 h-6 text-green-500" />
                    <span className="text-gray-700">{benefit}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="grid grid-cols-1 gap-6"
            >
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-gray-50 rounded-xl p-6"
                >
                  <div className="flex items-start space-x-4">
                    <div className="bg-primary-100 p-3 rounded-lg">
                      <SafeIcon icon={feature.icon} className="w-6 h-6 text-primary-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
                      <p className="text-gray-600">{feature.description}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Ready to Secure Your Future?
            </h2>
            <p className="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
              Get a personalized quote in minutes or speak with one of our licensed agents today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/quote"
                className="bg-white text-primary-600 px-8 py-4 rounded-lg font-semibold hover:bg-primary-50 transition-colors duration-200"
              >
                Get Free Quote
              </Link>
              <Link
                to="/contact"
                className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-primary-600 transition-colors duration-200"
              >
                Contact an Agent
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;