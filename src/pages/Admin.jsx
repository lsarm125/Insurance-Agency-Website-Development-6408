import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';
import { dbOperations } from '../config/supabase';
import { format } from 'date-fns';
import toast from 'react-hot-toast';
import ReactECharts from 'echarts-for-react';

const { FiUsers, FiFileText, FiTrendingUp, FiDollarSign, FiEdit, FiTrash2, FiPlus, FiDownload, FiMail, FiPhone } = FiIcons;

const Admin = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [clients, setClients] = useState([]);
  const [leads, setLeads] = useState([]);
  const [policies, setPolicies] = useState([]);
  const [claims, setClaims] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadAdminData();
  }, []);

  const loadAdminData = async () => {
    try {
      setLoading(true);
      const [allClients, allLeads, allPolicies, allClaims] = await Promise.all([
        dbOperations.getClients(),
        dbOperations.getLeads(),
        dbOperations.getPolicies(),
        dbOperations.getClaims()
      ]);

      setClients(allClients);
      setLeads(allLeads);
      setPolicies(allPolicies);
      setClaims(allClaims);
    } catch (error) {
      console.error('Error loading admin data:', error);
      toast.error('Failed to load admin data');
    } finally {
      setLoading(false);
    }
  };

  const updateLeadStatus = async (leadId, newStatus) => {
    try {
      await dbOperations.updateLead(leadId, { status: newStatus });
      toast.success('Lead status updated');
      loadAdminData();
    } catch (error) {
      console.error('Error updating lead:', error);
      toast.error('Failed to update lead status');
    }
  };

  const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: FiTrendingUp },
    { id: 'leads', label: 'Lead Management', icon: FiUsers },
    { id: 'clients', label: 'Client Management', icon: FiUsers },
    { id: 'policies', label: 'Policy Management', icon: FiFileText },
    { id: 'claims', label: 'Claims Management', icon: FiFileText }
  ];

  // Chart options for dashboard
  const leadFunnelOptions = {
    title: {
      text: 'Lead Funnel',
      left: 'center'
    },
    tooltip: {
      trigger: 'item'
    },
    legend: {
      orient: 'vertical',
      left: 'left'
    },
    series: [
      {
        name: 'Lead Status',
        type: 'pie',
        radius: '50%',
        data: [
          { value: leads.filter(l => l.status === 'New').length, name: 'New' },
          { value: leads.filter(l => l.status === 'Quoted').length, name: 'Quoted' },
          { value: leads.filter(l => l.status === 'Follow-Up').length, name: 'Follow-Up' },
          { value: leads.filter(l => l.status === 'Converted').length, name: 'Converted' }
        ],
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
      }
    ]
  };

  const monthlyStatsOptions = {
    title: {
      text: 'Monthly Performance',
      left: 'center'
    },
    tooltip: {
      trigger: 'axis'
    },
    legend: {
      data: ['New Leads', 'Policies Sold', 'Claims Processed']
    },
    xAxis: {
      type: 'category',
      data: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun']
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        name: 'New Leads',
        type: 'line',
        data: [12, 19, 23, 18, 25, 32]
      },
      {
        name: 'Policies Sold',
        type: 'line',
        data: [5, 8, 12, 9, 15, 18]
      },
      {
        name: 'Claims Processed',
        type: 'line',
        data: [3, 5, 7, 4, 8, 10]
      }
    ]
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading admin dashboard...</p>
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
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-gray-600 mt-2">Manage your insurance agency operations</p>
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
          {/* Dashboard Tab */}
          {activeTab === 'dashboard' && (
            <div className="space-y-8">
              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <div className="flex items-center">
                    <div className="p-2 bg-blue-100 rounded-lg">
                      <SafeIcon icon={FiUsers} className="w-6 h-6 text-blue-600" />
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600">Total Clients</p>
                      <p className="text-2xl font-bold text-gray-900">{clients.length}</p>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-lg shadow-sm p-6">
                  <div className="flex items-center">
                    <div className="p-2 bg-green-100 rounded-lg">
                      <SafeIcon icon={FiFileText} className="w-6 h-6 text-green-600" />
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600">Active Policies</p>
                      <p className="text-2xl font-bold text-gray-900">{policies.filter(p => p.status === 'Active').length}</p>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-lg shadow-sm p-6">
                  <div className="flex items-center">
                    <div className="p-2 bg-orange-100 rounded-lg">
                      <SafeIcon icon={FiTrendingUp} className="w-6 h-6 text-orange-600" />
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600">New Leads</p>
                      <p className="text-2xl font-bold text-gray-900">{leads.filter(l => l.status === 'New').length}</p>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-lg shadow-sm p-6">
                  <div className="flex items-center">
                    <div className="p-2 bg-purple-100 rounded-lg">
                      <SafeIcon icon={FiDollarSign} className="w-6 h-6 text-purple-600" />
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600">Pending Claims</p>
                      <p className="text-2xl font-bold text-gray-900">{claims.filter(c => c.status === 'Pending').length}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Charts */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <ReactECharts option={leadFunnelOptions} style={{ height: '400px' }} />
                </div>
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <ReactECharts option={monthlyStatsOptions} style={{ height: '400px' }} />
                </div>
              </div>

              {/* Recent Activity */}
              <div className="bg-white rounded-lg shadow-sm">
                <div className="px-6 py-4 border-b border-gray-200">
                  <h2 className="text-lg font-semibold text-gray-900">Recent Activity</h2>
                </div>
                <div className="p-6">
                  <div className="space-y-4">
                    {leads.slice(0, 5).map((lead) => (
                      <div key={lead.id} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-b-0">
                        <div className="flex items-center space-x-3">
                          <div className="p-2 bg-blue-100 rounded-lg">
                            <SafeIcon icon={FiUsers} className="w-4 h-4 text-blue-600" />
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-900">New lead: {lead.lead_name}</p>
                            <p className="text-xs text-gray-500">Interested in {lead.product_interested}</p>
                          </div>
                        </div>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          lead.status === 'New' ? 'bg-blue-100 text-blue-800' :
                          lead.status === 'Quoted' ? 'bg-yellow-100 text-yellow-800' :
                          lead.status === 'Converted' ? 'bg-green-100 text-green-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {lead.status}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Lead Management Tab */}
          {activeTab === 'leads' && (
            <div className="bg-white rounded-lg shadow-sm">
              <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
                <h2 className="text-lg font-semibold text-gray-900">Lead Management</h2>
                <button className="bg-primary-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-primary-700 transition-colors duration-200">
                  <SafeIcon icon={FiDownload} className="w-4 h-4 inline mr-2" />
                  Export CSV
                </button>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product Interest</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Source</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {leads.map((lead) => (
                      <tr key={lead.id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">{lead.lead_name}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{lead.email}</div>
                          <div className="text-sm text-gray-500">{lead.phone}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {lead.product_interested}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {lead.source}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <select
                            value={lead.status}
                            onChange={(e) => updateLeadStatus(lead.id, e.target.value)}
                            className={`text-xs font-medium px-2 py-1 rounded-full border-0 ${
                              lead.status === 'New' ? 'bg-blue-100 text-blue-800' :
                              lead.status === 'Quoted' ? 'bg-yellow-100 text-yellow-800' :
                              lead.status === 'Follow-Up' ? 'bg-orange-100 text-orange-800' :
                              'bg-green-100 text-green-800'
                            }`}
                          >
                            <option value="New">New</option>
                            <option value="Quoted">Quoted</option>
                            <option value="Follow-Up">Follow-Up</option>
                            <option value="Converted">Converted</option>
                          </select>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {format(new Date(lead.created_at), 'MMM dd, yyyy')}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                          <button className="text-primary-600 hover:text-primary-900">
                            <SafeIcon icon={FiMail} className="w-4 h-4" />
                          </button>
                          <button className="text-green-600 hover:text-green-900">
                            <SafeIcon icon={FiPhone} className="w-4 h-4" />
                          </button>
                          <button className="text-blue-600 hover:text-blue-900">
                            <SafeIcon icon={FiEdit} className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Client Management Tab */}
          {activeTab === 'clients' && (
            <div className="bg-white rounded-lg shadow-sm">
              <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
                <h2 className="text-lg font-semibold text-gray-900">Client Management</h2>
                <div className="flex space-x-2">
                  <button className="bg-primary-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-primary-700 transition-colors duration-200">
                    <SafeIcon icon={FiPlus} className="w-4 h-4 inline mr-2" />
                    Add Client
                  </button>
                  <button className="border border-gray-300 text-gray-700 px-4 py-2 rounded-lg text-sm font-semibold hover:bg-gray-50 transition-colors duration-200">
                    <SafeIcon icon={FiDownload} className="w-4 h-4 inline mr-2" />
                    Export
                  </button>
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Client</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Policies</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Contact</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {clients.map((client) => (
                      <tr key={client.id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">{client.full_name}</div>
                          <div className="text-sm text-gray-500">{client.address}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{client.email}</div>
                          <div className="text-sm text-gray-500">{client.mobile}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">
                            {policies.filter(p => p.client_id === client.id).length} policies
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {format(new Date(client.created_at), 'MMM dd, yyyy')}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                          <button className="text-primary-600 hover:text-primary-900">
                            <SafeIcon icon={FiEdit} className="w-4 h-4" />
                          </button>
                          <button className="text-green-600 hover:text-green-900">
                            <SafeIcon icon={FiMail} className="w-4 h-4" />
                          </button>
                          <button className="text-blue-600 hover:text-blue-900">
                            <SafeIcon icon={FiFileText} className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Policy Management Tab */}
          {activeTab === 'policies' && (
            <div className="bg-white rounded-lg shadow-sm">
              <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
                <h2 className="text-lg font-semibold text-gray-900">Policy Management</h2>
                <button className="bg-primary-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-primary-700 transition-colors duration-200">
                  <SafeIcon icon={FiPlus} className="w-4 h-4 inline mr-2" />
                  Add Policy
                </button>
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
                            <p className="text-gray-500">Client</p>
                            <p className="font-medium">
                              {clients.find(c => c.id === policy.client_id)?.full_name || 'Unknown'}
                            </p>
                          </div>
                          <div>
                            <p className="text-gray-500">Coverage</p>
                            <p className="font-medium">{policy.coverage_amount}</p>
                          </div>
                          <div>
                            <p className="text-gray-500">Premium</p>
                            <p className="font-medium">{policy.premium_amount}</p>
                          </div>
                          <div>
                            <p className="text-gray-500">End Date</p>
                            <p className="font-medium">{format(new Date(policy.end_date), 'MMM dd, yyyy')}</p>
                          </div>
                        </div>
                        <div className="mt-4 flex space-x-2">
                          <button className="text-primary-600 hover:text-primary-900 text-sm">
                            <SafeIcon icon={FiEdit} className="w-4 h-4 inline mr-1" />
                            Edit
                          </button>
                          <button className="text-green-600 hover:text-green-900 text-sm">
                            <SafeIcon icon={FiFileText} className="w-4 h-4 inline mr-1" />
                            View Details
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <SafeIcon icon={FiFileText} className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No policies found</h3>
                    <p className="text-gray-600 mb-6">Start by adding your first policy.</p>
                    <button className="bg-primary-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-700 transition-colors duration-200">
                      Add First Policy
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Claims Management Tab */}
          {activeTab === 'claims' && (
            <div className="bg-white rounded-lg shadow-sm">
              <div className="px-6 py-4 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-900">Claims Management</h2>
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
                            <p className="text-sm text-gray-500">
                              Client: {clients.find(c => c.id === claim.client_id)?.full_name || 'Unknown'}
                            </p>
                          </div>
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                            claim.status === 'Approved' ? 'bg-green-100 text-green-800' :
                            claim.status === 'Denied' ? 'bg-red-100 text-red-800' :
                            'bg-yellow-100 text-yellow-800'
                          }`}>
                            {claim.status}
                          </span>
                        </div>
                        <div className="mt-4 grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
                          <div>
                            <p className="text-gray-500">Claim Amount</p>
                            <p className="font-medium">{claim.claim_amount}</p>
                          </div>
                          <div>
                            <p className="text-gray-500">Policy Number</p>
                            <p className="font-medium">{claim.policy_number}</p>
                          </div>
                          <div>
                            <p className="text-gray-500">Date Filed</p>
                            <p className="font-medium">{format(new Date(claim.date_filed), 'MMM dd, yyyy')}</p>
                          </div>
                        </div>
                        <div className="mt-4 flex space-x-2">
                          <button className="bg-green-600 text-white px-3 py-1 rounded text-sm hover:bg-green-700">
                            Approve
                          </button>
                          <button className="bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700">
                            Deny
                          </button>
                          <button className="text-primary-600 hover:text-primary-900 text-sm">
                            <SafeIcon icon={FiEdit} className="w-4 h-4 inline mr-1" />
                            Review
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <SafeIcon icon={FiFileText} className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No claims found</h3>
                    <p className="text-gray-600">No insurance claims have been filed yet.</p>
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

export default Admin;