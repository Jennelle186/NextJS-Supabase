import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers";
import ViewAllWaterStation from "@/app/water_station/ViewAllWaterStation";
import Link from "next/link";
import { UserWaterStationView } from "./lib/definitions";
import ViewOrdersByWaterStation from "@/app/Orders/ViewOrderByWaterStation";


export default async function Home() {
  const cookieStore = cookies()
  const supabase = createServerComponentClient({ cookies: () => cookieStore })

    const {data: {session }} = await supabase.auth.getSession();


    const {data : view, error: viewError} = await supabase.from('water_station_view').select('*');
    const dataView = view as UserWaterStationView[];


  return (
    <main className="overflow-hidden">
      
      {/* if logged in, this is what the user will be able to view */}
      {/* If logged in, water stations account do not need to see all of the list of the water stations */}
      {session ? (<> <h1 className="text-center">Welcome to the dashboard <ViewOrdersByWaterStation/></h1> </>) 

        : 
      (<>
      {/* Shows all of the water stations for those unauthenticated users */}
      <Link href="/login">Login Here</Link>
      <ViewAllWaterStation data={dataView}/>
      </>)}    
      </main>
  )
}
