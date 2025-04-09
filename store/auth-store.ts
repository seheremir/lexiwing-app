import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface User {
  id: string;
  username: string;
  email: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  error: string | null;
  
  // Actions
  login: (email: string, password: string) => Promise<void>;
  register: (username: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  resetPassword: (email: string) => Promise<void>;
  clearError: () => void;
}

// This is a mock implementation. In a real app, you would connect to your backend API.
export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isLoading: false,
      error: null,
      
      login: async (email, password) => {
        set({ isLoading: true, error: null });
        
        try {
          // Simulate API call
          await new Promise(resolve => setTimeout(resolve, 1000));
          
          // Mock validation
          if (email === 'test@example.com' && password === 'Password123') {
            set({
              user: {
                id: '1',
                username: 'testuser',
                email: 'test@example.com',
              },
              token: 'mock-jwt-token',
              isLoading: false,
            });
          } else {
            set({
              isLoading: false,
              error: 'Invalid email or password',
            });
          }
        } catch (error) {
          set({
            isLoading: false,
            error: 'An error occurred during login',
          });
        }
      },
      
      register: async (username, email, password) => {
        set({ isLoading: true, error: null });
        
        try {
          // Simulate API call
          await new Promise(resolve => setTimeout(resolve, 1000));
          
          // In a real app, you would send this data to your API
          set({
            user: {
              id: '2',
              username,
              email,
            },
            token: 'mock-jwt-token',
            isLoading: false,
          });
        } catch (error) {
          set({
            isLoading: false,
            error: 'An error occurred during registration',
          });
        }
      },
      
      logout: () => {
        set({
          user: null,
          token: null,
        });
      },
      
      resetPassword: async (email) => {
        set({ isLoading: true, error: null });
        
        try {
          // Simulate API call
          await new Promise(resolve => setTimeout(resolve, 1000));
          
          // In a real app, this would trigger a password reset email
          set({ isLoading: false });
        } catch (error) {
          set({
            isLoading: false,
            error: 'An error occurred while requesting password reset',
          });
        }
      },
      
      clearError: () => {
        set({ error: null });
      },
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);