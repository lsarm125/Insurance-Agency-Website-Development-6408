import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiChevronDown, FiChevronUp, FiSearch, FiHeart, FiCar, FiHome, FiBriefcase } = FiIcons;

const FAQ = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [openItems, setOpenItems] = useState(new Set());

  const categories = [
    { id: 'all', label: 'All Questions', icon: FiSearch },
    { id: 'life', label: 'Life Insurance', icon: FiHeart },
    { id: 'auto', label: 'Auto Insurance', icon: FiCar },
    { id: 'home', label: 'Home Insurance', icon: FiHome },
    { id: 'business', label: 'Business Insurance', icon: FiBriefcase },
    { id: 'claims', label: 'Claims & Payments', icon: FiSearch }
  ];

  const faqs = [
    {
      id: 1,
      category: 'life',
      question: 'What is the difference between term life and whole life insurance?',
      answer: 'Term life insurance provides coverage for a specific period (10, 20, or 30 years) and is generally less expensive. Whole life insurance provides permanent coverage with a cash value component that grows over time. Term life is ideal for temporary needs like mortgage protection, while whole life offers lifelong protection and investment benefits.'
    },
    {
      id: 2,
      category: 'life',
      question: 'How much life insurance coverage do I need?',
      answer: 'A general rule is 10-12 times your annual income, but this varies based on your debts, family size, and financial goals. Consider your mortgage, children\'s education costs, daily living expenses, and any outstanding debts. Our agents can help you calculate the right amount based on your specific situation.'
    },
    {
      id: 3,
      category: 'auto',
      question: 'What does comprehensive auto insurance cover?',
      answer: 'Comprehensive auto insurance covers damage to your vehicle from non-collision events such as theft, vandalism, fire, natural disasters, falling objects, and animal collisions. It also covers glass damage and is typically required if you have a car loan or lease.'
    },
    {
      id: 4,
      category: 'auto',
      question: 'How can I lower my auto insurance premiums?',
      answer: 'You can reduce premiums by maintaining a clean driving record, bundling policies, choosing higher deductibles, installing safety features, completing defensive driving courses, and qualifying for discounts like good student, military, or professional organization discounts.'
    },
    {
      id: 5,
      category: 'home',
      question: 'What is the difference between replacement cost and actual cash value?',
      answer: 'Replacement cost coverage pays the full cost to replace damaged items with new ones of similar kind and quality, without deducting for depreciation. Actual cash value pays the replacement cost minus depreciation. Replacement cost coverage typically costs more but provides better protection.'
    },
    {
      id: 6,
      category: 'home',
      question: 'Does homeowners insurance cover flood damage?',
      answer: 'Standard homeowners insurance does not cover flood damage. You need separate flood insurance, which is available through the National Flood Insurance Program (NFIP) or private insurers. Flood insurance typically has a 30-day waiting period before coverage begins.'
    },
    {
      id: 7,
      category: 'business',
      question: 'What is professional liability insurance?',
      answer: 'Professional liability insurance (also called errors and omissions insurance) protects businesses against claims of negligence, errors, or omissions in the professional services they provide. It\'s essential for consultants, lawyers, doctors, accountants, and other service professionals.'
    },
    {
      id: 8,
      category: 'business',
      question: 'Do I need workers\' compensation insurance?',
      answer: 'Workers\' compensation insurance is required by law in most states for businesses with employees. It covers medical expenses and lost wages for employees injured on the job, and protects employers from lawsuits related to workplace injuries. Requirements vary by state and business type.'
    },
    {
      id: 9,
      category: 'claims',
      question: 'How do I file an insurance claim?',
      answer: 'To file a claim: 1) Contact your insurance company immediately, 2) Document the damage with photos, 3) Keep receipts for temporary repairs, 4) Cooperate with the adjuster, 5) Keep detailed records of all communications. You can file claims online, by phone, or through our mobile app 24/7.'
    },
    {
      id: 10,
      category: 'claims',
      question: 'How long does it take to process a claim?',
      answer: 'Simple claims can be processed within a few days, while complex claims may take several weeks or months. Factors affecting processing time include claim complexity, required investigations, documentation completeness, and cooperation from all parties involved. We\'ll keep you updated throughout the process.'
    },
    {
      id: 11,
      category: 'claims',
      question: 'What payment methods do you accept for premiums?',
      answer: 'We accept various payment methods including automatic bank transfers, credit/debit cards, online payments, phone payments, and check payments. You can set up automatic payments to ensure you never miss a premium due date and may qualify for payment discounts.'
    },
    {
      id: 12,
      category: 'life',
      question: 'Can I change my life insurance beneficiary?',
      answer: 'Yes, you can typically change your beneficiary at any time by completing a beneficiary change form. Some exceptions apply if you\'ve named an irrevocable beneficiary. It\'s important to keep beneficiary information updated after major life events like marriage, divorce, or the birth of children.'
    }
  ];

  const filteredFAQs = faqs.filter(faq => {
    const matchesCategory = selectedCategory === 'all' || faq.category === selectedCategory;
    const matchesSearch = faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const toggleItem = (id) => {
    const newOpenItems = new Set(openItems);
    if (newOpenItems.has(id)) {
      newOpenItems.delete(id);
    } else {
      newOpenItems.add(id);
    }
    setOpenItems(newOpenItems);
  };

  return (
    <div className="min-h-screen py-20 bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Frequently Asked Questions
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Find answers to common questions about our insurance products and services. 
            Can't find what you're looking for? Contact our support team.
          </p>
        </motion.div>

        {/* Search and Filter */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="bg-white rounded-lg shadow-sm p-6 mb-8"
        >
          {/* Search Bar */}
          <div className="relative mb-6">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <SafeIcon icon={FiSearch} className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              placeholder="Search for answers..."
            />
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
                  selectedCategory === category.id
                    ? 'bg-primary-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <SafeIcon icon={category.icon} className="w-4 h-4" />
                <span>{category.label}</span>
              </button>
            ))}
          </div>
        </motion.div>

        {/* FAQ List */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="space-y-4"
        >
          {filteredFAQs.length > 0 ? (
            filteredFAQs.map((faq, index) => (
              <motion.div
                key={faq.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                className="bg-white rounded-lg shadow-sm border border-gray-200"
              >
                <button
                  onClick={() => toggleItem(faq.id)}
                  className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50 focus:outline-none focus:bg-gray-50 transition-colors duration-200"
                >
                  <h3 className="text-lg font-semibold text-gray-900 pr-4">
                    {faq.question}
                  </h3>
                  <SafeIcon
                    icon={openItems.has(faq.id) ? FiChevronUp : FiChevronDown}
                    className="w-5 h-5 text-gray-500 flex-shrink-0"
                  />
                </button>
                
                <AnimatePresence>
                  {openItems.has(faq.id) && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-4">
                        <div className="border-t border-gray-200 pt-4">
                          <p className="text-gray-700 leading-relaxed">
                            {faq.answer}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))
          ) : (
            <div className="text-center py-12 bg-white rounded-lg shadow-sm">
              <SafeIcon icon={FiSearch} className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No results found</h3>
              <p className="text-gray-600 mb-6">
                Try adjusting your search terms or browse different categories.
              </p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('all');
                }}
                className="text-primary-600 hover:text-primary-700 font-medium"
              >
                Clear filters
              </button>
            </div>
          )}
        </motion.div>

        {/* Contact Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="bg-primary-600 rounded-lg p-8 text-center mt-12"
        >
          <h2 className="text-2xl font-bold text-white mb-4">
            Still have questions?
          </h2>
          <p className="text-primary-100 mb-6">
            Our insurance experts are here to help you find the right coverage for your needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/contact"
              className="bg-white text-primary-600 px-6 py-3 rounded-lg font-semibold hover:bg-primary-50 transition-colors duration-200"
            >
              Contact an Agent
            </a>
            <a
              href="tel:+639171234567"
              className="border-2 border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-primary-600 transition-colors duration-200"
            >
              Call +63 917 123 4567
            </a>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default FAQ;