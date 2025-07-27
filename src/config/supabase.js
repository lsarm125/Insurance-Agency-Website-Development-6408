import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://xyzcompany.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh5emNvbXBhbnkiLCJyb2xlIjoiYW5vbiIsImlhdCI6MTY0MDk5NTIwMCwiZXhwIjoxOTU2NTcxMjAwfQ.rZNKA5OgLcYKz_r1VKM4_T8y6v7YzSvP5e7ZjP5zT_s';

export const supabase = createClient(supabaseUrl, supabaseKey);

// Database initialization - creates tables if they don't exist
export const initializeDatabase = async () => {
  try {
    // Create clients table
    await supabase.rpc('create_clients_table', {});
    
    // Create policies table
    await supabase.rpc('create_policies_table', {});
    
    // Create leads table
    await supabase.rpc('create_leads_table', {});
    
    // Create claims table
    await supabase.rpc('create_claims_table', {});
    
    // Create appointments table
    await supabase.rpc('create_appointments_table', {});
    
    // Create messages table
    await supabase.rpc('create_messages_table', {});
    
    // Create files table
    await supabase.rpc('create_files_table', {});
    
    console.log('Database initialized successfully');
  } catch (error) {
    console.error('Database initialization error:', error);
  }
};

// Mock database operations for development
const mockData = {
  clients: [],
  policies: [],
  leads: [],
  claims: [],
  appointments: [],
  messages: [],
  files: []
};

// Database operations with localStorage fallback
export const dbOperations = {
  // Client operations
  async getClients() {
    try {
      const stored = localStorage.getItem('insurance_clients');
      return stored ? JSON.parse(stored) : [];
    } catch (error) {
      console.error('Error getting clients:', error);
      return [];
    }
  },

  async createClient(clientData) {
    try {
      const clients = await this.getClients();
      const newClient = {
        id: Date.now().toString(),
        ...clientData,
        created_at: new Date().toISOString()
      };
      clients.push(newClient);
      localStorage.setItem('insurance_clients', JSON.stringify(clients));
      return newClient;
    } catch (error) {
      console.error('Error creating client:', error);
      throw error;
    }
  },

  async updateClient(id, updates) {
    try {
      const clients = await this.getClients();
      const index = clients.findIndex(c => c.id === id);
      if (index !== -1) {
        clients[index] = { ...clients[index], ...updates };
        localStorage.setItem('insurance_clients', JSON.stringify(clients));
        return clients[index];
      }
      throw new Error('Client not found');
    } catch (error) {
      console.error('Error updating client:', error);
      throw error;
    }
  },

  // Policy operations
  async getPolicies(clientId = null) {
    try {
      const stored = localStorage.getItem('insurance_policies');
      const policies = stored ? JSON.parse(stored) : [];
      return clientId ? policies.filter(p => p.client_id === clientId) : policies;
    } catch (error) {
      console.error('Error getting policies:', error);
      return [];
    }
  },

  async createPolicy(policyData) {
    try {
      const policies = await this.getPolicies();
      const newPolicy = {
        id: Date.now().toString(),
        ...policyData,
        created_at: new Date().toISOString()
      };
      policies.push(newPolicy);
      localStorage.setItem('insurance_policies', JSON.stringify(policies));
      return newPolicy;
    } catch (error) {
      console.error('Error creating policy:', error);
      throw error;
    }
  },

  // Lead operations
  async getLeads() {
    try {
      const stored = localStorage.getItem('insurance_leads');
      return stored ? JSON.parse(stored) : [];
    } catch (error) {
      console.error('Error getting leads:', error);
      return [];
    }
  },

  async createLead(leadData) {
    try {
      const leads = await this.getLeads();
      const newLead = {
        id: Date.now().toString(),
        ...leadData,
        status: 'New',
        created_at: new Date().toISOString()
      };
      leads.push(newLead);
      localStorage.setItem('insurance_leads', JSON.stringify(leads));
      return newLead;
    } catch (error) {
      console.error('Error creating lead:', error);
      throw error;
    }
  },

  async updateLead(id, updates) {
    try {
      const leads = await this.getLeads();
      const index = leads.findIndex(l => l.id === id);
      if (index !== -1) {
        leads[index] = { ...leads[index], ...updates };
        localStorage.setItem('insurance_leads', JSON.stringify(leads));
        return leads[index];
      }
      throw new Error('Lead not found');
    } catch (error) {
      console.error('Error updating lead:', error);
      throw error;
    }
  },

  // Claims operations
  async getClaims(clientId = null) {
    try {
      const stored = localStorage.getItem('insurance_claims');
      const claims = stored ? JSON.parse(stored) : [];
      return clientId ? claims.filter(c => c.client_id === clientId) : claims;
    } catch (error) {
      console.error('Error getting claims:', error);
      return [];
    }
  },

  async createClaim(claimData) {
    try {
      const claims = await this.getClaims();
      const newClaim = {
        id: Date.now().toString(),
        ...claimData,
        status: 'Pending',
        created_at: new Date().toISOString()
      };
      claims.push(newClaim);
      localStorage.setItem('insurance_claims', JSON.stringify(claims));
      return newClaim;
    } catch (error) {
      console.error('Error creating claim:', error);
      throw error;
    }
  },

  // Appointment operations
  async getAppointments(clientId = null) {
    try {
      const stored = localStorage.getItem('insurance_appointments');
      const appointments = stored ? JSON.parse(stored) : [];
      return clientId ? appointments.filter(a => a.client_id === clientId) : appointments;
    } catch (error) {
      console.error('Error getting appointments:', error);
      return [];
    }
  },

  async createAppointment(appointmentData) {
    try {
      const appointments = await this.getAppointments();
      const newAppointment = {
        id: Date.now().toString(),
        ...appointmentData,
        status: 'Scheduled',
        created_at: new Date().toISOString()
      };
      appointments.push(newAppointment);
      localStorage.setItem('insurance_appointments', JSON.stringify(appointments));
      return newAppointment;
    } catch (error) {
      console.error('Error creating appointment:', error);
      throw error;
    }
  },

  // Message operations
  async getMessages(clientId = null) {
    try {
      const stored = localStorage.getItem('insurance_messages');
      const messages = stored ? JSON.parse(stored) : [];
      return clientId ? messages.filter(m => m.client_id === clientId) : messages;
    } catch (error) {
      console.error('Error getting messages:', error);
      return [];
    }
  },

  async createMessage(messageData) {
    try {
      const messages = await this.getMessages();
      const newMessage = {
        id: Date.now().toString(),
        ...messageData,
        created_at: new Date().toISOString()
      };
      messages.push(newMessage);
      localStorage.setItem('insurance_messages', JSON.stringify(messages));
      return newMessage;
    } catch (error) {
      console.error('Error creating message:', error);
      throw error;
    }
  },

  // File operations
  async getFiles(clientId = null) {
    try {
      const stored = localStorage.getItem('insurance_files');
      const files = stored ? JSON.parse(stored) : [];
      return clientId ? files.filter(f => f.client_id === clientId) : files;
    } catch (error) {
      console.error('Error getting files:', error);
      return [];
    }
  },

  async createFile(fileData) {
    try {
      const files = await this.getFiles();
      const newFile = {
        id: Date.now().toString(),
        ...fileData,
        created_at: new Date().toISOString()
      };
      files.push(newFile);
      localStorage.setItem('insurance_files', JSON.stringify(files));
      return newFile;
    } catch (error) {
      console.error('Error creating file:', error);
      throw error;
    }
  }
};