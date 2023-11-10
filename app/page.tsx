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
<<<<<<< Updated upstream
      <Link href="/login">Login Here</Link>
      <ViewAllWaterStation/> 
=======
      <Link href="/login" className="flex w-96 justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >Login Here</Link>
      <ViewAllWaterStation data={dataView}/>
>>>>>>> Stashed changes
      </>)}    
      </main>
  )
}
