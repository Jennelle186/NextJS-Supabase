'use client'

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { userAgent } from "next/server"


export default function GoogleSignIn() {
  const supabase = createClientComponentClient();

    const updateUserData = async (uid: any, email: any, name:any) =>{
      const updates ={
        id: uid,
        email: email,
        full_name: name
      }
      let { error } = await supabase.from("profiles").upsert(updates)
      console.error(error, "Error in saving the user data on the profiles table")
    }

    const handleSignInWithGoogle = async () => {

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


              if(!error){
                const {data} = await supabase.auth.getSession()
                const session = data.session
                updateUserData(session?.user.id, session?.user.email, session?.user.user_metadata.full_name)
              }
              
             if(error){
                console.log(error, "error in google sign inside the if statement")
             } 
        }catch(err){
            console.log(err, "error in google sign in")
        }
    }
    
    return <button onClick={handleSignInWithGoogle}>Sign In With Google</button>
}