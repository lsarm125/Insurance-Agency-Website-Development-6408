import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';
import { dbOperations } from '../config/supabase';
import { format, addDays, isWeekend } from 'date-fns';

const { FiCalendar, FiClock, FiUser, FiMail, FiPhone, FiMessageSquare, FiCheck } = FiIcons;

const Booking = () => {
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [appointmentType, setAppointmentType] = useState('consultation');
  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  // Generate available dates (next 30 days, excluding weekends)
  const generateAvailableDates = () => {
    const dates = [];
    let currentDate = new Date();
    let count = 0;
    
    while (dates.length < 20) {
      currentDate = addDays(currentDate, 1);
      if (!isWeekend(currentDate)) {
        dates.push({
          value: format(currentDate, 'yyyy-MM-dd'),
          label: format(currentDate, 'EEEE, MMMM dd, yyyy')
        });
      }
    }
    
    return dates;
  };

  const availableDates = generateAvailableDates();

  const timeSlots = [
    { value: '09:00', label: '9:00 AM' },
    { value: '10:00', label: '10:00 AM' },
    { value: '11:00', label: '11:00 AM' },
    { value: '13:00', label: '1:00 PM' },
    { value: '14:00', label: '2:00 PM' },
    { value: '15:00', label: '3:00 PM' },
    { value: '16:00', label: '4:00 PM' },
    { value: '17:00', label: '5:00 PM' }
  ];

  const appointmentTypes = [
    {
      value: 'consultation',
      label: 'Insurance Consultation',
      description: 'Discuss your insurance needs with our expert agents',
      duration: '30 minutes'
    },
    {
      value: 'policy_review',
      label: 'Policy Review',
      description: 'Review your existing policies and coverage',
      duration: '45 minutes'
    },
    {
      value: 'claim_assistance',
      label: 'Claims Assistance',
      description: 'Get help with filing or tracking your insurance claims',
      duration: '30 minutes'
    },
    {
      value: 'renewal',
      label: 'Policy Renewal',
      description: 'Renew or update your existing insurance policies',
      duration: '20 minutes'
    }
  ];

  const onSubmit = async (data) => {
    if (!selectedDate || !selectedTime) {
      toast.error('Please select both date and time for your appointment');
      return;
    }

    try {
      const appointmentDateTime = new Date(`${selectedDate}T${selectedTime}:00`);
      
      await dbOperations.createAppointment({
        client_name: data.name,
        email: data.email,
        phone: data.phone,
        preferred_date: appointmentDateTime.toISOString(),
        appointment_type: appointmentType,
        notes: data.notes || '',
        status: 'Scheduled',
        meeting_link: 'https://meet.google.com/abc-defg-hij' // Mock meeting link
      });

      toast.success('Appointment scheduled successfully! You will receive a confirmation email shortly.');
      reset();
      setSelectedDate('');
      setSelectedTime('');
      setAppointmentType('consultation');
    } catch (error) {
      console.error('Booking error:', error);
      toast.error('Failed to schedule appointment. Please try again.');
    }
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
            Schedule an Appointment
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Book a consultation with our insurance experts. We're here to help you 
            find the right coverage for your needs.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Appointment Form */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-2 bg-white rounded-2xl shadow-xl p-8"
          >
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* Appointment Type Selection */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">What can we help you with?</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {appointmentTypes.map((type) => (
                    <label
                      key={type.value}
                      className="relative cursor-pointer"
                    >
                      <input
                        type="radio"
                        value={type.value}
                        checked={appointmentType === type.value}
                        onChange={(e) => setAppointmentType(e.target.value)}
                        className="sr-only"
                      />
                      <div className={`p-4 rounded-lg border-2 transition-all duration-200 ${
                        appointmentType === type.value
                          ? 'border-primary-600 bg-primary-50'
                          : 'border-gray-200 hover:border-primary-300'
                      }`}>
                        <h4 className="font-semibold text-gray-900 mb-1">{type.label}</h4>
                        <p className="text-sm text-gray-600 mb-2">{type.description}</p>
                        <span className="text-xs text-primary-600 font-medium">{type.duration}</span>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              {/* Date and Time Selection */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <SafeIcon icon={FiCalendar} className="w-4 h-4 inline mr-2" />
                    Preferred Date
                  </label>
                  <select
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    required
                  >
                    <option value="">Select a date</option>
                    {availableDates.map((date) => (
                      <option key={date.value} value={date.value}>
                        {date.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <SafeIcon icon={FiClock} className="w-4 h-4 inline mr-2" />
                    Preferred Time
                  </label>
                  <select
                    value={selectedTime}
                    onChange={(e) => setSelectedTime(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    required
                  >
                    <option value="">Select a time</option>
                    {timeSlots.map((time) => (
                      <option key={time.value} value={time.value}>
                        {time.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Personal Information */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Your Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <SafeIcon icon={FiUser} className="w-4 h-4 inline mr-2" />
                      Full Name
                    </label>
                    <input
                      type="text"
                      {...register('name', { required: 'Name is required' })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      placeholder="Enter your full name"
                    />
                    {errors.name && (
                      <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
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
                      <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
                    )}
                  </div>
                </div>

                <div className="mt-6">
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
                    <p className="mt-1 text-sm text-red-600">{errors.phone.message}</p>
                  )}
                </div>
              </div>

              {/* Additional Notes */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <SafeIcon icon={FiMessageSquare} className="w-4 h-4 inline mr-2" />
                  Additional Notes (Optional)
                </label>
                <textarea
                  {...register('notes')}
                  rows={3}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="Any specific topics you'd like to discuss or questions you have..."
                />
              </div>

              <button
                type="submit"
                className="w-full bg-primary-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-primary-700 transition-colors duration-200 flex items-center justify-center space-x-2"
              >
                <SafeIcon icon={FiCheck} className="w-5 h-5" />
                <span>Schedule Appointment</span>
              </button>
            </form>
          </motion.div>

          {/* Sidebar Information */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-6"
          >
            {/* What to Expect */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">What to Expect</h3>
              <div className="space-y-3">
                <div className="flex items-start space-x-3">
                  <SafeIcon icon={FiCheck} className="w-5 h-5 text-green-500 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">Expert Consultation</p>
                    <p className="text-xs text-gray-600">Licensed agents with years of experience</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <SafeIcon icon={FiCheck} className="w-5 h-5 text-green-500 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">Personalized Recommendations</p>
                    <p className="text-xs text-gray-600">Coverage tailored to your specific needs</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <SafeIcon icon={FiCheck} className="w-5 h-5 text-green-500 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">No Obligation</p>
                    <p className="text-xs text-gray-600">Free consultation with no pressure to buy</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <SafeIcon icon={FiCheck} className="w-5 h-5 text-green-500 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">Instant Quotes</p>
                    <p className="text-xs text-gray-600">Get competitive quotes during your session</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Options */}
            <div className="bg-primary-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Prefer to Talk Now?</h3>
              <div className="space-y-3">
                <a
                  href="tel:+639171234567"
                  className="flex items-center space-x-3 text-primary-600 hover:text-primary-700"
                >
                  <SafeIcon icon={FiPhone} className="w-5 h-5" />
                  <span className="font-medium">+63 917 123 4567</span>
                </a>
                <a
                  href="mailto:info@secureguard.ph"
                  className="flex items-center space-x-3 text-primary-600 hover:text-primary-700"
                >
                  <SafeIcon icon={FiMail} className="w-5 h-5" />
                  <span className="font-medium">info@secureguard.ph</span>
                </a>
              </div>
              <p className="text-xs text-gray-600 mt-3">
                Available Monday-Friday 8AM-6PM, Saturday 9AM-1PM
              </p>
            </div>

            {/* Office Hours */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Office Hours</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Monday - Friday</span>
                  <span className="font-medium">8:00 AM - 6:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Saturday</span>
                  <span className="font-medium">9:00 AM - 1:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Sunday</span>
                  <span className="font-medium">Closed</span>
                </div>
              </div>
              <p className="text-xs text-gray-600 mt-3">
                Emergency claims support available 24/7
              </p>
            </div>

            {/* Calendly Integration Note */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h4 className="text-sm font-semibold text-blue-900 mb-2">Alternative Booking</h4>
              <p className="text-xs text-blue-700 mb-3">
                You can also use our Calendly integration for real-time availability.
              </p>
              <a
                href="https://calendly.com/secureguard-insurance"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-700 text-sm font-medium"
              >
                Book via Calendly →
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Booking;