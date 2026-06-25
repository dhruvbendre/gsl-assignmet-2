import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || import.meta.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || import.meta.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// Check if Supabase credentials are configured
const isConfigured = supabaseUrl && supabaseAnonKey;

// Create Supabase client if configured, otherwise use a mock client
export const supabase = isConfigured
  ? createClient(supabaseUrl, supabaseAnonKey, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: true,
      },
    })
  : null;

// Types for our auth system
export interface AuthSession {
  user: {
    id: string;
    email: string;
    user_metadata: Record<string, unknown>;
  };
}

export interface AuthResponse {
  data: { user?: AuthSession['user']; session?: AuthSession | null } | { user: AuthSession['user']; session: AuthSession };
  error: { message: string } | null;
}

// Mock auth implementation for development without Supabase
const mockAuth = {
  isMock: true,
  session: null as AuthSession | null,
  listeners: [] as Array<(event: string, session: AuthSession | null) => void>,

  async signIn(email: string, _password: string): Promise<AuthResponse> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Simple validation
    if (!email.includes('@')) {
      return { error: { message: 'Invalid email format' }, data: { user: undefined, session: null } };
    }
    
    this.session = {
      user: {
        id: 'mock-user-' + Date.now(),
        email: email,
        user_metadata: { name: email.split('@')[0] },
      },
    };
    
    this.listeners.forEach(cb => cb('SIGNED_IN', this.session));
    return { data: { user: this.session.user, session: this.session }, error: null };
  },

  async signUp(email: string, password: string): Promise<AuthResponse> {
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    if (!email.includes('@')) {
      return { error: { message: 'Invalid email format' }, data: { user: undefined, session: null } };
    }
    
    if (password.length < 6) {
      return { error: { message: 'Password must be at least 6 characters' }, data: { user: undefined, session: null } };
    }
    
    this.session = {
      user: {
        id: 'mock-user-' + Date.now(),
        email: email,
        user_metadata: { name: email.split('@')[0] },
      },
    };
    
    this.listeners.forEach(cb => cb('SIGNED_IN', this.session));
    return { data: { user: this.session.user, session: this.session }, error: null };
  },

  async signOut(): Promise<{ error: null }> {
    this.session = null;
    this.listeners.forEach(cb => cb('SIGNED_OUT', null));
    return { error: null };
  },

  getSession(): Promise<{ data: { session: AuthSession | null }; error: null }> {
    return Promise.resolve({ data: { session: this.session }, error: null });
  },

  onAuthStateChange(callback: (event: string, session: AuthSession | null) => void) {
    this.listeners.push(callback);
    return { data: { subscription: { unsubscribe: () => {
      this.listeners = this.listeners.filter(l => l !== callback);
    } } } };
  },
};

// Type-safe auth that works with or without Supabase
export const auth = {
  async signIn(email: string, password: string): Promise<AuthResponse> {
    if (supabase) {
      const result = await supabase.auth.signInWithPassword({ email, password });
      return {
        data: result.data as AuthResponse['data'],
        error: result.error as AuthResponse['error'],
      };
    }
    return mockAuth.signIn(email, password);
  },

  async signUp(email: string, password: string): Promise<AuthResponse> {
    if (supabase) {
      const result = await supabase.auth.signUp({ email, password });
      return {
        data: result.data as AuthResponse['data'],
        error: result.error as AuthResponse['error'],
      };
    }
    return mockAuth.signUp(email, password);
  },

  async signOut(): Promise<{ error: null }> {
    if (supabase) {
      await supabase.auth.signOut();
    } else {
      await mockAuth.signOut();
    }
    return { error: null };
  },

  async getSession(): Promise<{ data: { session: AuthSession | null }; error: null }> {
    if (supabase) {
      const result = await supabase.auth.getSession();
      return {
        data: { session: result.data.session as AuthSession | null },
        error: null,
      };
    }
    return mockAuth.getSession();
  },

  onAuthStateChange(callback: (event: string, session: AuthSession | null) => void) {
    if (supabase) {
      return supabase.auth.onAuthStateChange((event, session) => {
        callback(event, session as AuthSession | null);
      });
    }
    return mockAuth.onAuthStateChange(callback);
  },

  get isMock(): boolean {
    return !supabase;
  },
};

export { isConfigured };