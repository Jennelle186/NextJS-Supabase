import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers";
import ViewAllWaterStation from "@/app/water_station/ViewAllWaterStation";
import Link from "next/link";
import { UserWaterStationView } from "./lib/definitions";


export default async function Home() {
  const cookieStore = cookies()
  const supabase = createServerComponentClient({ cookies: () => cookieStore })

  const {data: {session }} = await supabase.auth.getSession();


    const {data : view, error: viewError} = await supabase.from('water_station_view').select('*');
    const dataView = view as UserWaterStationView[];
    // const {data, error} = await supabase  
    // .from('profiles')
    // .select(`
    //   id,
    //   water_type(
    //     id, name, price
    //   ),
    //   water_refilling_station(
    //     id, station_name, address, contact_no, tel_no, landmark, remarks
    //   )
    // `)
    // console.log(JSON.stringify(data, null, 2), "all of the water station")
    // console.log(JSON.stringify(data, null, 2), "2nd try")


    // console.log(view, "water station view...")

  return (
    <main className="overflow-hidden">
      
      {/* if logged in, this is what the user will be able to view */}
      {/* If logged in, water stations account do not need to see all of the list of the water stations */}
      {session ? (<> <h1 className="text-center underline"></h1> </>) 

        : 
      (<>
      {/* Shows all of the water stations for those unauthenticated users */}
      <Link href="/login">Login Here</Link>
      <ViewAllWaterStation data={dataView}/>
      </>)}    
      </main>
  )
}
