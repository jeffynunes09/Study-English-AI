import { create } from 'zustand';
import { AuthService, User } from '../services/auth.service';

interface AuthState {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  isHydrated: boolean;

  hydrate: () => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  token: null,
  isLoading: false,
  isHydrated: false,

  hydrate: async () => {
    const session = await AuthService.loadSession();
    set({ user: session?.user ?? null, token: session?.token ?? null, isHydrated: true });
  },

  login: async (email, password) => {
    set({ isLoading: true });
    try {
      const result = await AuthService.login(email, password);
      set({ user: result.user, token: result.token });
    } finally {
      set({ isLoading: false });
    }
  },

  register: async (name, email, password) => {
    set({ isLoading: true });
    try {
      const result = await AuthService.register(name, email, password);
      set({ user: result.user, token: result.token });
      {}
    }catch (error) {
      console.error('Registration error:', error);
    }
     finally {
      set({ isLoading: false });
    }
  },

  logout: async () => {
    await AuthService.logout();
    set({ user: null, token: null });
  },
}));
