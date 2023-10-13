import { NavBar } from "@/components";
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
  
  const {data: water_types} = await supabase.from("water_type").select()
  
  return (
    <div className="overflow-hidden">
      {session ? (<> <NavBar/>
      <h1>This is the HOMEPAGE or the DASHBOARD</h1>
      <pre>{JSON.stringify(water_types, null, 2)}</pre></>) : (<><LoginPage/></>)}
     
    </div>
  )
}
