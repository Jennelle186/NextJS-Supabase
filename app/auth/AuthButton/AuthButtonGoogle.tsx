'use client'

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"

export default function GoogleSignIn() {

    const handleSignInWithGoogle = async () => {
        const supabase = createClientComponentClient();
        console.log("clicked")

        try{

            const { data, error } = await supabase.auth.signInWithOAuth({
                provider: 'google',
                options: {
                  queryParams: {
                    access_type: 'offline',
                    prompt: 'consent',
                  },
                },
              })
              
             if(error){
                console.log(error, "error in google sign inside the if statement")
             } 
        }catch(err){
            console.log(err, "error in google sign in")
        }
    }
    
    return <button onClick={handleSignInWithGoogle}>Sign In With Google</button>
}