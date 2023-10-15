'use client';

import { Session, createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function AuthButtonClient({ session } : {session: Session | null}) {
  const supabase = createClientComponentClient();
  const router = useRouter();

  const handleSignOut = async () => {
    const { error } = await supabase.auth.signOut();
    router.refresh();

    if (error) {
      // eslint-disable-next-line no-console
      console.error('ERROR:', error);
    }
  }


  return session ? ( 
    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full" type="button" onClick={handleSignOut} >
      Sign Out
    </button>
  ) : (
    <Link href="/login">
      
      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full" type="button" onClick={handleSignOut} >
        Login
    </button>
    
    </Link>
  )
  
}
