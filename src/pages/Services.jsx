import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiHeart, FiHome, FiCar, FiPlane, FiBriefcase, FiArrowRight, FiDollarSign, FiClock, FiShield } = FiIcons;

const Services = () => {
  const serviceCategories = [
    {
      id: 'life',
      icon: FiHeart,
      title: 'Life Insurance',
      subtitle: 'Protect Your Family\'s Future',
      description: 'Comprehensive life insurance solutions to ensure your loved ones are financially secure.',
      color: 'bg-red-500',
      products: [
        'Term Life Insurance',
        'Whole Life Insurance',
        'Universal Life Insurance',
        'Variable Life Insurance',
        'Group Life Insurance'
      ],
      benefits: [
        'Death benefit protection',
        'Cash value accumulation',
        'Tax advantages',
        'Flexible premium options',
        'Loan and withdrawal options'
      ],
      startingPrice: '₱500/month'
    },
    {
      id: 'health',
      icon: FiHeart,
      title: 'Health Insurance',
      subtitle: 'Your Health, Our Priority',
      description: 'Comprehensive medical coverage for individuals and families.',
      color: 'bg-pink-500',
      products: [
        'Individual Health Plans',
        'Family Health Plans',
        'Critical Illness Coverage',
        'Hospital Income Insurance',
        'Outpatient Coverage'
      ],
      benefits: [
        'Hospitalization coverage',
        'Outpatient benefits',
        'Emergency care',
        'Prescription drug coverage',
        'Preventive care'
      ],
      startingPrice: '₱1,200/month'
    },
    {
      id: 'property',
      icon: FiHome,
      title: 'Property Insurance',
      subtitle: 'Protect Your Most Valuable Assets',
      description: 'Comprehensive coverage for your home, condo, or rental property.',
      color: 'bg-blue-500',
      products: [
        'Homeowners Insurance',
        'Condo Insurance',
        'Renters Insurance',
        'Fire Insurance',
        'Flood Insurance'
      ],
      benefits: [
        'Dwelling protection',
        'Personal property coverage',
        'Liability protection',
        'Additional living expenses',
        'Natural disaster coverage'
      ],
      startingPrice: '₱800/month'
    },
    {
      id: 'vehicle',
      icon: FiCar,
      title: 'Vehicle Insurance',
      subtitle: 'Complete Auto Protection',
      description: 'Full coverage for cars, motorcycles, and commercial vehicles.',
      color: 'bg-green-500',
      products: [
        'Comprehensive Auto Insurance',
        'Third Party Liability',
        'Motorcycle Insurance',
        'Commercial Vehicle Insurance',
        'Fleet Insurance'
      ],
      benefits: [
        'Collision coverage',
        'Comprehensive coverage',
        'Liability protection',
        '24/7 roadside assistance',
        'Rental car coverage'
      ],
      startingPrice: '₱3,000/year'
    },
    {
      id: 'aviation',
      icon: FiPlane,
      title: 'Aviation Insurance',
      subtitle: 'Specialized Aircraft Coverage',
      description: 'Professional aviation insurance for aircraft owners and operators.',
      color: 'bg-purple-500',
      products: [
        'Aircraft Hull Insurance',
        'Aviation Liability',
        'Hangar Insurance',
        'Pilot Insurance',
        'Airport Liability'
      ],
      benefits: [
        'Aircraft damage protection',
        'Liability coverage',
        'Passenger protection',
        'Ground risk coverage',
        'International coverage'
      ],
      startingPrice: 'Custom Quote'
    },
    {
      id: 'business',
      icon: FiBriefcase,
      title: 'Business Insurance',
      subtitle: 'Comprehensive Business Protection',
      description: 'Protect your business with comprehensive commercial insurance solutions.',
      color: 'bg-orange-500',
      products: [
        'General Liability',
        'Professional Liability',
        'Property Insurance',
        'Workers Compensation',
        'Cyber Liability'
      ],
      benefits: [
        'Liability protection',
        'Property coverage',
        'Business interruption',
        'Employee protection',
        'Cyber security coverage'
      ],
      startingPrice: '₱2,500/month'
    }
  ];

  return (
    <div className="min-h-screen py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Our Insurance Services
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Comprehensive insurance solutions tailored to protect what matters most to you. 
            From life and health to property and business coverage, we've got you covered.
          </p>
        </motion.div>

        {/* Service Categories */}
        <div className="space-y-16">
          {serviceCategories.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl shadow-xl overflow-hidden"
            >
              <div className="grid grid-cols-1 lg:grid-cols-2">
                {/* Content */}
                <div className="p-8 lg:p-12">
                  <div className="flex items-center space-x-4 mb-6">
                    <div className={`${service.color} w-16 h-16 rounded-xl flex items-center justify-center`}>
                      <SafeIcon icon={service.icon} className="w-8 h-8 text-white" />
                    </div>
                    <div>
                      <h2 className="text-2xl lg:text-3xl font-bold text-gray-900">{service.title}</h2>
                      <p className="text-lg text-gray-600">{service.subtitle}</p>
                    </div>
                  </div>

                  <p className="text-gray-700 mb-8 text-lg">{service.description}</p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                    {/* Products */}
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">Coverage Options</h3>
                      <ul className="space-y-2">
                        {service.products.map((product, idx) => (
                          <li key={idx} className="flex items-center space-x-2">
                            <SafeIcon icon={FiShield} className="w-4 h-4 text-primary-600" />
                            <span className="text-gray-700">{product}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Benefits */}
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">Key Benefits</h3>
                      <ul className="space-y-2">
                        {service.benefits.map((benefit, idx) => (
                          <li key={idx} className="flex items-center space-x-2">
                            <SafeIcon icon={FiShield} className="w-4 h-4 text-green-500" />
                            <span className="text-gray-700">{benefit}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-4 sm:space-y-0">
                    <div className="flex items-center space-x-2 text-primary-600">
                      <SafeIcon icon={FiDollarSign} className="w-5 h-5" />
                      <span className="text-lg font-semibold">Starting at {service.startingPrice}</span>
                    </div>
                    <div className="flex space-x-4">
                      <Link
                        to={`/quote?service=${service.id}`}
                        className="bg-primary-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-700 transition-colors duration-200"
                      >
                        Get Quote
                      </Link>
                      <Link
                        to={`/services/${service.id}`}
                        className="border border-primary-600 text-primary-600 px-6 py-3 rounded-lg font-semibold hover:bg-primary-50 transition-colors duration-200 inline-flex items-center"
                      >
                        Learn More
                        <SafeIcon icon={FiArrowRight} className="w-4 h-4 ml-2" />
                      </Link>
                    </div>
                  </div>
                </div>

                {/* Image/Visual */}
                <div className={`${service.color} relative overflow-hidden`}>
                  <div className="absolute inset-0 bg-black/20"></div>
                  <div className="relative h-64 lg:h-full flex items-center justify-center">
                    <SafeIcon icon={service.icon} className="w-32 h-32 text-white/80" />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-primary-600 to-primary-700 rounded-2xl p-8 lg:p-12 text-center mt-16"
        >
          <h2 className="text-3xl font-bold text-white mb-4">
            Need Help Choosing the Right Coverage?
          </h2>
          <p className="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
            Our licensed insurance agents are here to help you find the perfect coverage 
            for your unique needs and budget.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/contact"
              className="bg-white text-primary-600 px-8 py-4 rounded-lg font-semibold hover:bg-primary-50 transition-colors duration-200"
            >
              Schedule Consultation
            </Link>
            <Link
              to="/quote"
              className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-primary-600 transition-colors duration-200"
            >
              Get Free Quote
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Services;