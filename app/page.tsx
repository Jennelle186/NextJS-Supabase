import { createServerActionClient, createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers";
import ViewAllWaterStation from "@/app/water_station/ViewAllWaterStation";
import Link from "next/link";
import { WaterStationType } from "./lib/definitions";

export default async function Home() {
  const cookieStore = cookies()
  const supabase = createServerComponentClient({ cookies: () => cookieStore })

  const {data: {session }} = await supabase.auth.getSession();

    //fetch ll of the water refilling station
    let { data} = await supabase
    .from('water_refilling_station')
    .select('*')

     // Ensure data is an array of WaterStationType
    const water_refilling_station = data as WaterStationType[]; 
  
    // Fetch all water types
    const { data: water_types, error } = await supabase.from('water_type').select('*');
  
    if (error) {
      console.error(error);
      return <div>Error loading data</div>;
    }

  return (
    <main className="overflow-hidden">
      {/* if logged in, this is what the user will be able to view */}
      {/* If logged in, water stations account do not need to see all of the list of the water stations */}
      {session ? (<> <h1 className="text-center underline"></h1> </>) 

        : 
      (<>
      {/* Shows all of the water stations for those unauthenticated users */}
      <Link href="/login">Login Here</Link>
      <ViewAllWaterStation water_refilling_station={water_refilling_station} water_types={water_types} />
      </>)}    
      </main>
  )
}
