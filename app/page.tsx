import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers";
import ViewAllWaterStation from "@/app/water-station-list/ViewAllWaterStation";
import Link from "next/link";
import { UserWaterStationView } from "./lib/definitions";
import ViewOrdersByWaterStation from "@/app/OrdersByStation/ViewOrderByWaterStation";
import LandingPage from "@/components/Pages/landingPage";
import Footer from "@/components/Pages/footer";


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
      {session ? (
        <section className="my-5">
          <div className="container">
            <h1 className="text-3xl font-bold">All Orders</h1>
            <ViewOrdersByWaterStation/>
          </div>
        </section>
      ) 

        : 
      (<>
      {/* Show the landing page */}
      <LandingPage/>
      </>)}    
      </main>
  )
}
