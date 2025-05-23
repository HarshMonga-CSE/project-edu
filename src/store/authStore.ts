import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { AuthState, User } from '../types';

// Mock user data for demonstration
const mockUsers: Record<string, { user: Omit<User, 'id'> & { id: string; password: string }; }> = {};

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      
      signup: (userData) => {
        const id = crypto.randomUUID();
        const newUser = {
          id,
          name: userData.name,
          email: userData.email,
          phone: userData.phone,
          company: userData.company,
          bio: 'I am a new user of this amazing platform. Looking forward to connecting with everyone!',
          imageUrl: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
          password: userData.password,
        };
        
        // Store in our mock database
        mockUsers[userData.email] = { user: newUser };
        
        // Don't automatically log them in - they need to go to the login page
      },
      
      login: (email, password) => {
        const userRecord = mockUsers[email];
        
        if (userRecord && userRecord.user.password === password) {
          const { password: _, ...userWithoutPassword } = userRecord.user;
          set({ 
            user: userWithoutPassword, 
            isAuthenticated: true 
          });
          return true;
        }
        
        return false;
      },
      
      logout: () => {
        set({ 
          user: null, 
          isAuthenticated: false 
        });
      },
      
      updateUser: (userData) => {
        set((state) => {
          if (!state.user) return state;
          
          const updatedUser = { ...state.user, ...userData };
          return { user: updatedUser };
        });
      },
    }),
    {
      name: 'auth-storage',
    }
  )
);