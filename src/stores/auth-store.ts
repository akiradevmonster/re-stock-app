"use client";

import { StateCreator, create } from 'zustand';
import { persist } from 'zustand/middleware';

export type User = {
  id: string;
  name: string;
  picture?: string;
};

export type AuthState = {
  user: User | null;
  isAuthenticated: boolean;
  isAuthenticating: boolean;
  login: () => Promise<void>;
  logout: () => void;
};

export const createAuthStore: StateCreator<AuthState> = (set) => ({
  user: null,
  isAuthenticated: false,
  isAuthenticating: false,
  login: async () => {
    try {
      set({ isAuthenticating: true });
      
      if (!window.liff.isLoggedIn()) {
        window.liff.login();
        return;
      }
      
      const profile = await window.liff.getProfile();
      set({
        user: {
          id: profile.userId,
          name: profile.displayName,
          picture: profile.pictureUrl
        },
        isAuthenticated: true,
        isAuthenticating: false
      });
    } catch (error) {
      console.error('Login failed', error);
      set({ isAuthenticating: false });
    }
  },
  logout: () => {
    try {
      window.liff.logout();
      set({ user: null, isAuthenticated: false });
    } catch (error) {
      console.error('Logout failed', error);
    }
  }
});

export const useAuthStore = create<AuthState>()(
  persist(
    createAuthStore,
    { name: "auth-storage" }
  )
);