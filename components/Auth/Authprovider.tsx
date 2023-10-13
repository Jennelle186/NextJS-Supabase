//NOT USING THISs

'use client'
import { createContext, useEffect, ReactNode } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useRouter } from 'next/navigation';

export const AuthContext = createContext<any>(null);

interface AuthProviderProps {
  accessToken: string | null;
  children: ReactNode;
}

const AuthProvider: React.FC<AuthProviderProps> = ({ accessToken, children }) => {
  const supabase = createClientComponentClient();
  const router = useRouter();
  useEffect(() => {
    const {
      data: { subscription: authListener },
    } = supabase.auth.onAuthStateChange((event, session) => {
      if (session?.access_token !== accessToken) {
        router.refresh()
      }
    });

    return () => {
      authListener?.unsubscribe();
    };
  }, [accessToken, supabase, router]);

  return <AuthContext.Provider value={null}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
