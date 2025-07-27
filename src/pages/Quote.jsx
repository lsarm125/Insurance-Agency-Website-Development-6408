import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';
import { dbOperations } from '../config/supabase';

const { FiUser, FiMail, FiPhone, FiCalendar, FiMapPin, FiDollarSign, FiFileText, FiSend } = FiIcons;

const Quote = () => {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { register, handleSubmit, watch, formState: { errors }, reset } = useForm();

  const selectedService = watch('serviceType');

  const serviceTypes = [
    { value: 'life', label: 'Life Insurance', icon: FiUser },
    { value: 'health', label: 'Health Insurance', icon: FiUser },
    { value: 'property', label: 'Property Insurance', icon: FiMapPin },
    { value: 'vehicle', label: 'Vehicle Insurance', icon: FiMapPin },
    { value: 'aviation', label: 'Aviation Insurance', icon: FiMapPin },
    { value: 'business', label: 'Business Insurance', icon: FiFileText }
  ];

  const coverageAmounts = {
    life: ['₱500,000', '₱1,000,000', '₱2,000,000', '₱5,000,000', '₱10,000,000+'],
    health: ['₱100,000', '₱300,000', '₱500,000', '₱1,000,000', '₱2,000,000+'],
    property: ['₱1,000,000', '₱3,000,000', '₱5,000,000', '₱10,000,000', '₱20,000,000+'],
    vehicle: ['₱100,000', '₱300,000', '₱500,000', '₱1,000,000', '₱2,000,000+'],
    aviation: ['₱5,000,000', '₱10,000,000', '₱25,000,000', '₱50,000,000', '₱100,000,000+'],
    business: ['₱500,000', '₱1,000,000', '₱5,000,000', '₱10,000,000', '₱25,000,000+']
  };

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      // Create lead in database
      const leadData = {
        lead_name: data.fullName,
        email: data.email,
        phone: data.phone,
        product_interested: data.serviceType,
        coverage_amount: data.coverageAmount,
        source: 'Website Quote Form',
        notes: `Age: ${data.age}, Location: ${data.location}, Additional Info: ${data.additionalInfo || 'None'}`
      };

      await dbOperations.createLead(leadData);

      toast.success('Quote request submitted successfully! We\'ll contact you within 24 hours.');
      reset();
      setStep(1);
    } catch (error) {
      console.error('Quote submission error:', error);
      toast.error('Failed to submit quote request. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

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
            Get Your Free Quote
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Tell us about your insurance needs and we'll provide you with a personalized quote 
            from our trusted partners.
          </p>
        </motion.div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-center space-x-4">
            {[1, 2, 3].map((stepNumber) => (
              <div key={stepNumber} className="flex items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold ${
                    step >= stepNumber
                      ? 'bg-primary-600 text-white'
                      : 'bg-gray-200 text-gray-600'
                  }`}
                >
                  {stepNumber}
                </div>
                {stepNumber < 3 && (
                  <div
                    className={`w-16 h-1 mx-2 ${
                      step > stepNumber ? 'bg-primary-600' : 'bg-gray-200'
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
          <div className="flex justify-center mt-4">
            <div className="text-sm text-gray-600">
              Step {step} of 3: {
                step === 1 ? 'Service Selection' :
                step === 2 ? 'Coverage Details' :
                'Personal Information'
              }
            </div>
          </div>
        </div>

        {/* Quote Form */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="bg-white rounded-2xl shadow-xl p-8"
        >
          <form onSubmit={handleSubmit(onSubmit)}>
            {/* Step 1: Service Selection */}
            {step === 1 && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  What type of insurance are you looking for?
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {serviceTypes.map((service) => (
                    <label
                      key={service.value}
                      className="relative cursor-pointer"
                    >
                      <input
                        type="radio"
                        value={service.value}
                        {...register('serviceType', { required: 'Please select a service type' })}
                        className="sr-only"
                      />
                      <div className={`p-6 rounded-lg border-2 transition-all duration-200 ${
                        selectedService === service.value
                          ? 'border-primary-600 bg-primary-50'
                          : 'border-gray-200 hover:border-primary-300'
                      }`}>
                        <div className="flex items-center space-x-4">
                          <SafeIcon 
                            icon={service.icon} 
                            className={`w-8 h-8 ${
                              selectedService === service.value ? 'text-primary-600' : 'text-gray-400'
                            }`} 
                          />
                          <span className="text-lg font-semibold text-gray-900">
                            {service.label}
                          </span>
                        </div>
                      </div>
                    </label>
                  ))}
                </div>
                
                {errors.serviceType && (
                  <p className="text-red-600 text-sm">{errors.serviceType.message}</p>
                )}

                <div className="flex justify-end">
                  <button
                    type="button"
                    onClick={nextStep}
                    disabled={!selectedService}
                    className="bg-primary-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
                  >
                    Next Step
                  </button>
                </div>
              </div>
            )}

            {/* Step 2: Coverage Details */}
            {step === 2 && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  Coverage Details
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Desired Coverage Amount
                    </label>
                    <select
                      {...register('coverageAmount', { required: 'Please select coverage amount' })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    >
                      <option value="">Select amount</option>
                      {selectedService && coverageAmounts[selectedService]?.map((amount) => (
                        <option key={amount} value={amount}>{amount}</option>
                      ))}
                    </select>
                    {errors.coverageAmount && (
                      <p className="text-red-600 text-sm mt-1">{errors.coverageAmount.message}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Your Age
                    </label>
                    <input
                      type="number"
                      min="18"
                      max="100"
                      {...register('age', { 
                        required: 'Age is required',
                        min: { value: 18, message: 'Must be at least 18 years old' },
                        max: { value: 100, message: 'Age must be under 100' }
                      })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      placeholder="Enter your age"
                    />
                    {errors.age && (
                      <p className="text-red-600 text-sm mt-1">{errors.age.message}</p>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Location (City/Province)
                  </label>
                  <input
                    type="text"
                    {...register('location', { required: 'Location is required' })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="e.g., Makati City, Metro Manila"
                  />
                  {errors.location && (
                    <p className="text-red-600 text-sm mt-1">{errors.location.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Additional Information (Optional)
                  </label>
                  <textarea
                    {...register('additionalInfo')}
                    rows={3}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="Any specific requirements or questions..."
                  />
                </div>

                <div className="flex justify-between">
                  <button
                    type="button"
                    onClick={prevStep}
                    className="border border-gray-300 text-gray-700 px-8 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors duration-200"
                  >
                    Previous
                  </button>
                  <button
                    type="button"
                    onClick={nextStep}
                    className="bg-primary-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-primary-700 transition-colors duration-200"
                  >
                    Next Step
                  </button>
                </div>
              </div>
            )}

            {/* Step 3: Personal Information */}
            {step === 3 && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  Contact Information
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <SafeIcon icon={FiUser} className="w-4 h-4 inline mr-2" />
                      Full Name
                    </label>
                    <input
                      type="text"
                      {...register('fullName', { required: 'Full name is required' })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      placeholder="Enter your full name"
                    />
                    {errors.fullName && (
                      <p className="text-red-600 text-sm mt-1">{errors.fullName.message}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <SafeIcon icon={FiMail} className="w-4 h-4 inline mr-2" />
                      Email Address
                    </label>
                    <input
                      type="email"
                      {...register('email', { 
                        required: 'Email is required',
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                          message: 'Invalid email address'
                        }
                      })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      placeholder="Enter your email"
                    />
                    {errors.email && (
                      <p className="text-red-600 text-sm mt-1">{errors.email.message}</p>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <SafeIcon icon={FiPhone} className="w-4 h-4 inline mr-2" />
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    {...register('phone', { required: 'Phone number is required' })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="+63 917 123 4567"
                  />
                  {errors.phone && (
                    <p className="text-red-600 text-sm mt-1">{errors.phone.message}</p>
                  )}
                </div>

                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Quote Summary</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Service Type:</span>
                      <span className="font-medium">
                        {serviceTypes.find(s => s.value === selectedService)?.label}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Coverage Amount:</span>
                      <span className="font-medium">{watch('coverageAmount')}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Age:</span>
                      <span className="font-medium">{watch('age')}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Location:</span>
                      <span className="font-medium">{watch('location')}</span>
                    </div>
                  </div>
                </div>

                <div className="flex justify-between">
                  <button
                    type="button"
                    onClick={prevStep}
                    className="border border-gray-300 text-gray-700 px-8 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors duration-200"
                  >
                    Previous
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-primary-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 flex items-center space-x-2"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        <span>Submitting...</span>
                      </>
                    ) : (
                      <>
                        <SafeIcon icon={FiSend} className="w-5 h-5" />
                        <span>Get My Quote</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            )}
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default Quote;