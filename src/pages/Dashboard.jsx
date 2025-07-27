import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';
import { useAuth } from '../contexts/AuthContext';
import { dbOperations } from '../config/supabase';
import { format } from 'date-fns';
import toast from 'react-hot-toast';

const { FiUser, FiFileText, FiClock, FiDollarSign, FiUpload, FiDownload, FiEdit, FiPlus, FiCheck, FiX, FiAlertCircle } = FiIcons;

const Dashboard = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');
  const [policies, setPolicies] = useState([]);
  const [claims, setClaims] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadUserData();
  }, [user]);

  const loadUserData = async () => {
    if (!user) return;
    
    try {
      setLoading(true);
      const [userPolicies, userClaims, userAppointments, userFiles] = await Promise.all([
        dbOperations.getPolicies(user.id),
        dbOperations.getClaims(user.id),
        dbOperations.getAppointments(user.id),
        dbOperations.getFiles(user.id)
      ]);

      setPolicies(userPolicies);
      setClaims(userClaims);
      setAppointments(userAppointments);
      setFiles(userFiles);
    } catch (error) {
      console.error('Error loading user data:', error);
      toast.error('Failed to load dashboard data');
    } finally {
      setLoading(false);
    }
  };

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    if (file.size > 10 * 1024 * 1024) { // 10MB limit
      toast.error('File size must be less than 10MB');
      return;
    }

    try {
      // Simulate file upload
      const fileData = {
        client_id: user.id,
        filename: file.name,
        file_type: file.type,
        file_size: file.size,
        upload_date: new Date().toISOString(),
        status: 'uploaded'
      };

      await dbOperations.createFile(fileData);
      toast.success('File uploaded successfully');
      loadUserData();
    } catch (error) {
      console.error('File upload error:', error);
      toast.error('Failed to upload file');
    }
  };

  const tabs = [
    { id: 'overview', label: 'Overview', icon: FiUser },
    { id: 'policies', label: 'My Policies', icon: FiFileText },
    { id: 'claims', label: 'Claims', icon: FiAlertCircle },
    { id: 'appointments', label: 'Appointments', icon: FiClock },
    { id: 'documents', label: 'Documents', icon: FiUpload }
  ];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-gray-900">Welcome back, {user?.name}!</h1>
          <p className="text-gray-600 mt-2">Manage your insurance policies and track your claims</p>
        </motion.div>

        {/* Navigation Tabs */}
        <div className="bg-white rounded-lg shadow-sm mb-8">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6" aria-label="Tabs">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 ${
                    activeTab === tab.id
                      ? 'border-primary-500 text-primary-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <SafeIcon icon={tab.icon} className="w-5 h-5" />
                  <span>{tab.label}</span>
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Tab Content */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <div className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <div className="flex items-center">
                    <div className="p-2 bg-blue-100 rounded-lg">
                      <SafeIcon icon={FiFileText} className="w-6 h-6 text-blue-600" />
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600">Active Policies</p>
                      <p className="text-2xl font-bold text-gray-900">{policies.filter(p => p.status === 'Active').length}</p>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-lg shadow-sm p-6">
                  <div className="flex items-center">
                    <div className="p-2 bg-green-100 rounded-lg">
                      <SafeIcon icon={FiCheck} className="w-6 h-6 text-green-600" />
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600">Claims Processed</p>
                      <p className="text-2xl font-bold text-gray-900">{claims.filter(c => c.status === 'Approved').length}</p>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-lg shadow-sm p-6">
                  <div className="flex items-center">
                    <div className="p-2 bg-orange-100 rounded-lg">
                      <SafeIcon icon={FiClock} className="w-6 h-6 text-orange-600" />
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600">Pending Claims</p>
                      <p className="text-2xl font-bold text-gray-900">{claims.filter(c => c.status === 'Pending').length}</p>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-lg shadow-sm p-6">
                  <div className="flex items-center">
                    <div className="p-2 bg-purple-100 rounded-lg">
                      <SafeIcon icon={FiUpload} className="w-6 h-6 text-purple-600" />
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600">Documents</p>
                      <p className="text-2xl font-bold text-gray-900">{files.length}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Recent Activity */}
              <div className="bg-white rounded-lg shadow-sm">
                <div className="px-6 py-4 border-b border-gray-200">
                  <h2 className="text-lg font-semibold text-gray-900">Recent Activity</h2>
                </div>
                <div className="p-6">
                  <div className="space-y-4">
                    {appointments.slice(0, 3).map((appointment) => (
                      <div key={appointment.id} className="flex items-center space-x-3">
                        <div className="p-2 bg-blue-100 rounded-lg">
                          <SafeIcon icon={FiClock} className="w-4 h-4 text-blue-600" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-900">
                            Upcoming appointment
                          </p>
                          <p className="text-xs text-gray-500">
                            {format(new Date(appointment.preferred_date), 'MMM dd, yyyy at h:mm a')}
                          </p>
                        </div>
                      </div>
                    ))}
                    {claims.slice(0, 2).map((claim) => (
                      <div key={claim.id} className="flex items-center space-x-3">
                        <div className="p-2 bg-orange-100 rounded-lg">
                          <SafeIcon icon={FiAlertCircle} className="w-4 h-4 text-orange-600" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-900">
                            Claim #{claim.id} - {claim.status}
                          </p>
                          <p className="text-xs text-gray-500">
                            Filed on {format(new Date(claim.created_at), 'MMM dd, yyyy')}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Policies Tab */}
          {activeTab === 'policies' && (
            <div className="bg-white rounded-lg shadow-sm">
              <div className="px-6 py-4 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-900">My Insurance Policies</h2>
              </div>
              <div className="p-6">
                {policies.length > 0 ? (
                  <div className="space-y-4">
                    {policies.map((policy) => (
                      <div key={policy.id} className="border border-gray-200 rounded-lg p-6">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="text-lg font-semibold text-gray-900">{policy.policy_type}</h3>
                            <p className="text-gray-600">{policy.insurance_company}</p>
                            <p className="text-sm text-gray-500">Policy #: {policy.policy_number}</p>
                          </div>
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                            policy.status === 'Active' ? 'bg-green-100 text-green-800' :
                            policy.status === 'Expired' ? 'bg-red-100 text-red-800' :
                            'bg-yellow-100 text-yellow-800'
                          }`}>
                            {policy.status}
                          </span>
                        </div>
                        <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                          <div>
                            <p className="text-gray-500">Coverage Amount</p>
                            <p className="font-medium">{policy.coverage_amount}</p>
                          </div>
                          <div>
                            <p className="text-gray-500">Premium</p>
                            <p className="font-medium">{policy.premium_amount}</p>
                          </div>
                          <div>
                            <p className="text-gray-500">Start Date</p>
                            <p className="font-medium">{format(new Date(policy.start_date), 'MMM dd, yyyy')}</p>
                          </div>
                          <div>
                            <p className="text-gray-500">End Date</p>
                            <p className="font-medium">{format(new Date(policy.end_date), 'MMM dd, yyyy')}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <SafeIcon icon={FiFileText} className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No policies found</h3>
                    <p className="text-gray-600 mb-6">You don't have any insurance policies yet.</p>
                    <a
                      href="/quote"
                      className="bg-primary-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-700 transition-colors duration-200"
                    >
                      Get a Quote
                    </a>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Claims Tab */}
          {activeTab === 'claims' && (
            <div className="bg-white rounded-lg shadow-sm">
              <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
                <h2 className="text-lg font-semibold text-gray-900">My Claims</h2>
                <button className="bg-primary-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-primary-700 transition-colors duration-200">
                  File New Claim
                </button>
              </div>
              <div className="p-6">
                {claims.length > 0 ? (
                  <div className="space-y-4">
                    {claims.map((claim) => (
                      <div key={claim.id} className="border border-gray-200 rounded-lg p-6">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="text-lg font-semibold text-gray-900">Claim #{claim.id}</h3>
                            <p className="text-gray-600">{claim.description}</p>
                            <p className="text-sm text-gray-500">Filed: {format(new Date(claim.date_filed), 'MMM dd, yyyy')}</p>
                          </div>
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                            claim.status === 'Approved' ? 'bg-green-100 text-green-800' :
                            claim.status === 'Denied' ? 'bg-red-100 text-red-800' :
                            'bg-yellow-100 text-yellow-800'
                          }`}>
                            {claim.status}
                          </span>
                        </div>
                        <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <p className="text-gray-500">Claim Amount</p>
                            <p className="font-medium">{claim.claim_amount}</p>
                          </div>
                          <div>
                            <p className="text-gray-500">Policy Number</p>
                            <p className="font-medium">{claim.policy_number}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <SafeIcon icon={FiAlertCircle} className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No claims found</h3>
                    <p className="text-gray-600 mb-6">You haven't filed any claims yet.</p>
                    <button className="bg-primary-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-700 transition-colors duration-200">
                      File Your First Claim
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Appointments Tab */}
          {activeTab === 'appointments' && (
            <div className="bg-white rounded-lg shadow-sm">
              <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
                <h2 className="text-lg font-semibold text-gray-900">My Appointments</h2>
                <a
                  href="/booking"
                  className="bg-primary-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-primary-700 transition-colors duration-200"
                >
                  Schedule New
                </a>
              </div>
              <div className="p-6">
                {appointments.length > 0 ? (
                  <div className="space-y-4">
                    {appointments.map((appointment) => (
                      <div key={appointment.id} className="border border-gray-200 rounded-lg p-6">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="text-lg font-semibold text-gray-900">
                              Consultation with Agent
                            </h3>
                            <p className="text-gray-600">{appointment.client_name}</p>
                            <p className="text-sm text-gray-500">
                              {format(new Date(appointment.preferred_date), 'EEEE, MMMM dd, yyyy at h:mm a')}
                            </p>
                          </div>
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                            appointment.status === 'Confirmed' ? 'bg-green-100 text-green-800' :
                            appointment.status === 'Rescheduled' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-blue-100 text-blue-800'
                          }`}>
                            {appointment.status}
                          </span>
                        </div>
                        {appointment.meeting_link && (
                          <div className="mt-4">
                            <a
                              href={appointment.meeting_link}
                              className="text-primary-600 hover:text-primary-700 text-sm font-medium"
                            >
                              Join Meeting →
                            </a>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <SafeIcon icon={FiClock} className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No appointments scheduled</h3>
                    <p className="text-gray-600 mb-6">Schedule a consultation with our insurance experts.</p>
                    <a
                      href="/booking"
                      className="bg-primary-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-700 transition-colors duration-200"
                    >
                      Schedule Appointment
                    </a>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Documents Tab */}
          {activeTab === 'documents' && (
            <div className="bg-white rounded-lg shadow-sm">
              <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
                <h2 className="text-lg font-semibold text-gray-900">My Documents</h2>
                <label className="bg-primary-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-primary-700 transition-colors duration-200 cursor-pointer">
                  <SafeIcon icon={FiUpload} className="w-4 h-4 inline mr-2" />
                  Upload Document
                  <input
                    type="file"
                    onChange={handleFileUpload}
                    className="hidden"
                    accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                  />
                </label>
              </div>
              <div className="p-6">
                {files.length > 0 ? (
                  <div className="space-y-4">
                    {files.map((file) => (
                      <div key={file.id} className="border border-gray-200 rounded-lg p-4">
                        <div className="flex justify-between items-center">
                          <div className="flex items-center space-x-3">
                            <div className="p-2 bg-gray-100 rounded-lg">
                              <SafeIcon icon={FiFileText} className="w-5 h-5 text-gray-600" />
                            </div>
                            <div>
                              <h3 className="text-sm font-semibold text-gray-900">{file.filename}</h3>
                              <p className="text-xs text-gray-500">
                                Uploaded {format(new Date(file.upload_date), 'MMM dd, yyyy')} • {(file.file_size / 1024 / 1024).toFixed(2)} MB
                              </p>
                            </div>
                          </div>
                          <button className="text-primary-600 hover:text-primary-700">
                            <SafeIcon icon={FiDownload} className="w-5 h-5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <SafeIcon icon={FiUpload} className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No documents uploaded</h3>
                    <p className="text-gray-600 mb-6">Upload your insurance documents for easy access.</p>
                    <label className="bg-primary-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-700 transition-colors duration-200 cursor-pointer">
                      Upload Your First Document
                      <input
                        type="file"
                        onChange={handleFileUpload}
                        className="hidden"
                        accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                      />
                    </label>
                  </div>
                )}
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;