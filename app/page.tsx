import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import LoginPage from "./login/page";

export default async function Home() {
  const supabase = createServerComponentClient({ cookies });

  const {data: {session }} = await supabase.auth.getSession();

  if(!session){
    redirect('/login')
  }
  
  return (
    <main className="overflow-hidden">
      {session ? (<> <h1 className="text-center underline">This is the HOMEPAGE or the DASHBOARD</h1> </>) : (<><LoginPage/></>)}
     
    </main>
  )
}
