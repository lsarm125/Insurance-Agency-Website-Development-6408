import React from 'react';
import { Link } from 'react-router-dom';
import SafeIcon from '../../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiShield, FiPhone, FiMail, FiMapPin, FiFacebook, FiTwitter, FiInstagram, FiLinkedin } = FiIcons;

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <SafeIcon icon={FiShield} className="w-8 h-8 text-primary-400" />
              <span className="text-xl font-bold">SecureGuard Insurance</span>
            </div>
            <p className="text-gray-300 mb-4 max-w-md">
              Protecting what matters most to you and your family. Comprehensive insurance solutions 
              from trusted partners FWD and Prudential Guarantee.
            </p>
            <div className="flex space-x-4">
              <SafeIcon icon={FiFacebook} className="w-6 h-6 text-gray-400 hover:text-primary-400 cursor-pointer" />
              <SafeIcon icon={FiTwitter} className="w-6 h-6 text-gray-400 hover:text-primary-400 cursor-pointer" />
              <SafeIcon icon={FiInstagram} className="w-6 h-6 text-gray-400 hover:text-primary-400 cursor-pointer" />
              <SafeIcon icon={FiLinkedin} className="w-6 h-6 text-gray-400 hover:text-primary-400 cursor-pointer" />
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/services" className="text-gray-300 hover:text-primary-400">Our Services</Link></li>
              <li><Link to="/about" className="text-gray-300 hover:text-primary-400">About Us</Link></li>
              <li><Link to="/faq" className="text-gray-300 hover:text-primary-400">FAQ</Link></li>
              <li><Link to="/contact" className="text-gray-300 hover:text-primary-400">Contact</Link></li>
              <li><Link to="/privacy" className="text-gray-300 hover:text-primary-400">Privacy Policy</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <SafeIcon icon={FiPhone} className="w-5 h-5 text-primary-400" />
                <span className="text-gray-300">+63 917 123 4567</span>
              </div>
              <div className="flex items-center space-x-2">
                <SafeIcon icon={FiMail} className="w-5 h-5 text-primary-400" />
                <span className="text-gray-300">info@secureguard.ph</span>
              </div>
              <div className="flex items-start space-x-2">
                <SafeIcon icon={FiMapPin} className="w-5 h-5 text-primary-400 mt-1" />
                <span className="text-gray-300">
                  123 Ayala Avenue,<br />
                  Makati City, Metro Manila<br />
                  Philippines 1226
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © 2024 SecureGuard Insurance. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link to="/terms" className="text-gray-400 hover:text-primary-400 text-sm">Terms of Service</Link>
              <Link to="/privacy" className="text-gray-400 hover:text-primary-400 text-sm">Privacy Policy</Link>
              <Link to="/compliance" className="text-gray-400 hover:text-primary-400 text-sm">Data Privacy Compliance</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;