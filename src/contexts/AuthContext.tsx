import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';

type User = any;
type Session = any;

interface AuthContextType {
  user: User | null;
  session: Session | null;
  role: 'user' | 'verifier' | null;
  loading: boolean;
  signUp: (email: string, password: string, role: 'user' | 'verifier') => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [role, setRole] = useState<'user' | 'verifier' | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setSession(session);
      setUser(session?.user ?? null);
      if (session?.user) {
        await fetchRole(session.user.id);
      }
      setLoading(false);
    };

    getSession();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        if (session?.user) {
          await fetchRole(session.user.id);
        } else {
          setRole(null);
        }
        setLoading(false);
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  const fetchRole = async (userId: string) => {
    const { data, error } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', userId)
      .single();

    if (error) {
      console.error('Error fetching role:', error);
      setRole(null);
    } else {
      setRole(data.role);
    }
  };

  const signUp = async (email: string, password: string, role: 'user' | 'verifier') => {
    console.log('AuthContext: signUp called with role:', role);
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      console.error('AuthContext: signUp auth error:', error);
      throw error;
    }

    if (data.user) {
      console.log('AuthContext: User created, ensuring profile has correct role:', role);

      // Check if profile already exists
      const { data: existingProfile } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', data.user.id)
        .single();

      console.log('Existing profile:', existingProfile);

      if (existingProfile) {
        console.log('Profile exists with role:', existingProfile.role, '- updating to:', role);
        // Update existing profile
        const { error: updateError } = await supabase
          .from('profiles')
          .update({ role })
          .eq('id', data.user.id);

        if (updateError) {
          console.error('AuthContext: Profile update error:', updateError);
          throw updateError;
        }
      } else {
        console.log('No existing profile, inserting new one with role:', role);
        // Insert new profile
        const { error: insertError } = await supabase
          .from('profiles')
          .insert({
            id: data.user.id,
            email,
            role
          });

        if (insertError) {
          console.error('AuthContext: Profile insert error:', insertError);
          throw insertError;
        }
      }

      console.log('AuthContext: Profile operation completed successfully');
    }
  };

  const signIn = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) throw error;
  };

  const signOut = async () => {
    console.log('AuthContext: Starting sign out...');
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        console.error('AuthContext: Sign out error:', error);
        // Don't throw error, just log it
      } else {
        console.log('AuthContext: Sign out successful');
      }
    } catch (error) {
      console.error('AuthContext: Sign out exception:', error);
      // Don't throw, just log
    }
  };

  const value = {
    user,
    session,
    role,
    loading,
    signUp,
    signIn,
    signOut,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};