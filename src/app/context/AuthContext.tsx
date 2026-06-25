import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import { auth, type AuthSession } from '../lib/supabase';
import { storage } from '../lib/storage';

interface AuthContextType {
  user: AuthSession['user'] | null;
  session: AuthSession | null;
  userId: string | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  signIn: (email: string, password: string) => Promise<{ error: string | null }>;
  signUp: (email: string, password: string) => Promise<{ error: string | null }>;
  signOut: () => Promise<void>;
  refreshSession: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<AuthSession['user'] | null>(null);
  const [session, setSession] = useState<AuthSession | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Get the user ID from the session
  const userId = user?.id || null;

  const refreshSession = useCallback(async () => {
    try {
      const { data } = await auth.getSession();
      if (data.session) {
        setUser(data.session.user);
        setSession(data.session);
        // Sync with local storage (user-specific)
        storage.saveUsername(data.session.user.user_metadata?.name as string || data.session.user.email, data.session.user.id);
      } else {
        setUser(null);
        setSession(null);
      }
    } catch (error) {
      console.error('Failed to refresh session:', error);
      setUser(null);
      setSession(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    // Initial session load
    refreshSession();

    // Subscribe to auth changes
    const { data: subscription } = auth.onAuthStateChange(async (event, newSession) => {
      if (event === 'SIGNED_IN' && newSession) {
        setUser((newSession as AuthSession).user);
        setSession(newSession as AuthSession);
        storage.saveUsername((newSession as AuthSession).user.user_metadata?.name as string || (newSession as AuthSession).user.email, (newSession as AuthSession).user.id);
      } else if (event === 'SIGNED_OUT') {
        setUser(null);
        setSession(null);
        storage.clear();
      }
    });

    return () => {
      subscription?.subscription?.unsubscribe();
    };
  }, [refreshSession]);

  const signIn = useCallback(async (email: string, password: string): Promise<{ error: string | null }> => {
    try {
      const result = await auth.signIn(email, password);
      if (result.error) {
        return { error: result.error.message };
      }
      return { error: null };
    } catch (error) {
      return { error: 'An unexpected error occurred' };
    }
  }, []);

  const signUp = useCallback(async (email: string, password: string): Promise<{ error: string | null }> => {
    try {
      const result = await auth.signUp(email, password);
      if (result.error) {
        return { error: result.error.message };
      }
      return { error: null };
    } catch (error) {
      return { error: 'An unexpected error occurred' };
    }
  }, []);

  const signOut = useCallback(async (): Promise<void> => {
    const currentUserId = user?.id;
    await auth.signOut();
    // Clear only the current user's data
    storage.clear(currentUserId);
    setUser(null);
    setSession(null);
  }, [user]);

  const value: AuthContextType = {
    user,
    session,
    userId,
    isLoading,
    isAuthenticated: !!user,
    signIn,
    signUp,
    signOut,
    refreshSession,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}