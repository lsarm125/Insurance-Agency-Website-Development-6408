import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SafeIcon from '../../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiMessageCircle, FiX, FiSend, FiUser, FiBot } = FiIcons;

const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'bot',
      message: 'Hello! I\'m your insurance assistant. How can I help you today?',
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage = {
      id: Date.now(),
      type: 'user',
      message: inputMessage,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const botResponse = getBotResponse(inputMessage);
      const botMessage = {
        id: Date.now() + 1,
        type: 'bot',
        message: botResponse,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const getBotResponse = (userInput) => {
    const input = userInput.toLowerCase();
    
    // Insurance FAQ responses
    if (input.includes('life insurance') || input.includes('life coverage')) {
      return 'Life insurance provides financial protection for your beneficiaries when you pass away. We offer term life, whole life, and universal life policies through FWD and Prudential Guarantee. Would you like to know more about any specific type?';
    }
    
    if (input.includes('car insurance') || input.includes('auto insurance') || input.includes('vehicle')) {
      return 'Our auto insurance covers liability, collision, comprehensive, and personal injury protection. We can provide quotes from multiple carriers to find the best rate for your vehicle. What type of vehicle do you need coverage for?';
    }
    
    if (input.includes('health insurance') || input.includes('medical')) {
      return 'Health insurance helps cover medical expenses, hospital stays, and prescription medications. We offer individual and family plans with various coverage levels. Are you looking for individual or family coverage?';
    }
    
    if (input.includes('home insurance') || input.includes('property insurance') || input.includes('house')) {
      return 'Home insurance protects your property and belongings from damage, theft, and liability claims. Coverage includes dwelling, personal property, and liability protection. Do you own or rent your home?';
    }
    
    if (input.includes('claim') || input.includes('file claim')) {
      return 'To file a claim, you can log into your client portal or call our 24/7 claims hotline at +63 917 123 4567. You\'ll need your policy number and details about the incident. Would you like me to guide you through the process?';
    }
    
    if (input.includes('quote') || input.includes('price') || input.includes('cost')) {
      return 'I can help you get a personalized quote! Please click on "Get Quote" or visit our services page to fill out a quick form. Quotes are free and only take a few minutes. What type of insurance are you interested in?';
    }
    
    if (input.includes('payment') || input.includes('pay') || input.includes('bill')) {
      return 'You can pay your premiums online through your client portal, by phone, or through automatic bank transfer. We accept credit cards, debit cards, and bank transfers. Would you like help setting up automatic payments?';
    }
    
    if (input.includes('cancel') || input.includes('cancellation')) {
      return 'Policy cancellations must be submitted in writing or through your client portal. Depending on your policy type, you may be eligible for a refund of unused premiums. Would you like me to connect you with an agent to discuss your options?';
    }
    
    if (input.includes('agent') || input.includes('speak to someone') || input.includes('human')) {
      return 'I\'d be happy to connect you with one of our licensed agents! You can schedule an appointment through our booking page, call us at +63 917 123 4567, or use our contact form. Our agents are available Monday-Friday 8AM-6PM, Saturday 9AM-1PM.';
    }
    
    if (input.includes('business insurance') || input.includes('commercial')) {
      return 'We offer comprehensive business insurance including general liability, professional liability, property, workers\' compensation, and cyber liability coverage. Business insurance protects your company from various risks. What type of business do you operate?';
    }
    
    if (input.includes('travel insurance')) {
      return 'Travel insurance covers trip cancellations, medical emergencies abroad, lost luggage, and travel delays. We offer single-trip and annual policies for domestic and international travel. Are you planning a specific trip?';
    }
    
    // General responses
    if (input.includes('hello') || input.includes('hi') || input.includes('hey')) {
      return 'Hello! Welcome to SecureGuard Insurance. I\'m here to help you with questions about our insurance products, claims, payments, or to connect you with an agent. What can I assist you with today?';
    }
    
    if (input.includes('thank you') || input.includes('thanks')) {
      return 'You\'re very welcome! Is there anything else I can help you with regarding your insurance needs?';
    }
    
    // Default response
    return 'I\'m here to help with insurance questions! I can assist with information about life, auto, health, home, and business insurance, as well as claims, payments, and connecting you with our agents. Could you please rephrase your question or let me know what specific insurance topic you\'d like to discuss?';
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <>
      {/* Chat Toggle Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 bg-primary-600 text-white p-4 rounded-full shadow-lg hover:bg-primary-700 transition-colors duration-200 z-50"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <SafeIcon icon={isOpen ? FiX : FiMessageCircle} className="w-6 h-6" />
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-24 right-6 w-80 h-96 bg-white rounded-lg shadow-2xl border border-gray-200 z-50 flex flex-col"
          >
            {/* Chat Header */}
            <div className="bg-primary-600 text-white p-4 rounded-t-lg">
              <div className="flex items-center space-x-2">
                <SafeIcon icon={FiBot} className="w-6 h-6" />
                <div>
                  <h3 className="font-semibold">Insurance Assistant</h3>
                  <p className="text-xs text-primary-100">Online now</p>
                </div>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-xs px-3 py-2 rounded-lg ${
                      msg.type === 'user'
                        ? 'bg-primary-600 text-white'
                        : 'bg-gray-100 text-gray-800'
                    }`}
                  >
                    <div className="flex items-start space-x-2">
                      {msg.type === 'bot' && (
                        <SafeIcon icon={FiBot} className="w-4 h-4 mt-1 text-primary-600" />
                      )}
                      <p className="text-sm">{msg.message}</p>
                    </div>
                  </div>
                </div>
              ))}
              
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-gray-100 px-3 py-2 rounded-lg">
                    <div className="flex items-center space-x-2">
                      <SafeIcon icon={FiBot} className="w-4 h-4 text-primary-600" />
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-4 border-t border-gray-200">
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Type your message..."
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
                <button
                  onClick={handleSendMessage}
                  disabled={!inputMessage.trim()}
                  className="bg-primary-600 text-white p-2 rounded-lg hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <SafeIcon icon={FiSend} className="w-5 h-5" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ChatWidget;