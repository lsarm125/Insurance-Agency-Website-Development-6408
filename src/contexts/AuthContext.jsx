import React, { createContext, useContext, useState, useEffect } from 'react';
import { dbOperations } from '../config/supabase';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for existing session
    const checkAuth = async () => {
      try {
        const token = localStorage.getItem('auth_token');
        const userData = localStorage.getItem('user_data');
        
        if (token && userData) {
          setUser(JSON.parse(userData));
        }
      } catch (error) {
        console.error('Auth check error:', error);
        localStorage.removeItem('auth_token');
        localStorage.removeItem('user_data');
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = async (email, password, userType = 'client') => {
    try {
      setLoading(true);
      
      // Mock authentication - in production, this would validate against a real backend
      if (userType === 'admin' && email === 'admin@insurance.com' && password === 'admin123') {
        const adminUser = {
          id: 'admin-1',
          email: 'admin@insurance.com',
          name: 'Admin User',
          type: 'admin'
        };
        
        localStorage.setItem('auth_token', 'mock-admin-token');
        localStorage.setItem('user_data', JSON.stringify(adminUser));
        setUser(adminUser);
        return { success: true, user: adminUser };
      }
      
      // Check for client login
      const clients = await dbOperations.getClients();
      const client = clients.find(c => c.email === email);
      
      if (client) {
        // In production, verify password hash
        const clientUser = {
          id: client.id,
          email: client.email,
          name: client.full_name,
          type: 'client'
        };
        
        localStorage.setItem('auth_token', `mock-client-token-${client.id}`);
        localStorage.setItem('user_data', JSON.stringify(clientUser));
        setUser(clientUser);
        return { success: true, user: clientUser };
      }
      
      throw new Error('Invalid credentials');
    } catch (error) {
      console.error('Login error:', error);
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  };

  const register = async (userData) => {
    try {
      setLoading(true);
      
      // Create new client
      const newClient = await dbOperations.createClient({
        full_name: userData.fullName,
        email: userData.email,
        mobile: userData.mobile,
        birthday: userData.birthday,
        address: userData.address,
        contact_person: userData.contactPerson || '',
        notes: ''
      });
      
      const clientUser = {
        id: newClient.id,
        email: newClient.email,
        name: newClient.full_name,
        type: 'client'
      };
      
      localStorage.setItem('auth_token', `mock-client-token-${newClient.id}`);
      localStorage.setItem('user_data', JSON.stringify(clientUser));
      setUser(clientUser);
      
      return { success: true, user: clientUser };
    } catch (error) {
      console.error('Registration error:', error);
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user_data');
    setUser(null);
  };

  const value = {
    user,
    login,
    register,
    logout,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};