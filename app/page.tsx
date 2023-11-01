import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers";
import ViewAllWaterStation from "@/app/water_station/ViewAllWaterStation";
import Link from "next/link";

export default async function Home() {
  const supabase = createServerComponentClient({ cookies });

  const {data: {session }} = await supabase.auth.getSession();

  // if(!session){
  //   redirect('/login')
  // }
  return (
    <main className="overflow-hidden">
      {/* if logged in, this is what the user will be able to view */}
      {/* If logged in, water stations account do not need to see all of the list of the water stations */}
      {session ? (<> <h1 className="text-center underline"></h1> </>) 

        : 
      (<>
      {/* Shows all of the water stations for those unauthenticated users */}
      <Link href="/login">Login Here</Link>
      <ViewAllWaterStation/> 
      </>)}    
      </main>
  )
}
