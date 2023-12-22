import DeleteWaterTypeButton from "@/components/WaterTypes/DeleteButton";
import { cookies } from "next/headers";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import Link from "next/link";
import { redirect } from "next/navigation";
import { fetchWaterStationOfUSer } from "../lib/data";
import SubmitButton from "@/components/Reusables/SubmitButton";
import { DataTable } from "./data-table";
import { columns } from "./columns";
import { Button } from "@/components/ui/button";

export const revalidate = 0;
export const dynamic = 'force-dynamic'

const WaterTypes = async () => {
    const cookieStore = cookies()
    const supabase = createServerComponentClient({ cookies: () => cookieStore })
    const {data: {session}} = await supabase.auth.getSession();
    const {data: {user}} = await supabase.auth.getUser();

    if(!session){
      redirect('/login')
    }

    const {data: water_types} = await supabase.from("water_type").select().eq('user_id', user?.id)
       //check if the user has a water station
    let waterStation; 
    if(user){
      const userId = user?.id ? user.id : null;
      if(userId != null){
        waterStation = await fetchWaterStationOfUSer(userId)
      } else {
        //handle the situation when userId is null
        console.log('user id is null')
      }
    } else{
      // handle the situation when user is not defined
      console.log('user is not defined')
    } 
    
    if(!waterStation){
      return(
        <>
          <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            You must fill up your water station information first. 
            </h2>
            </div>
          </div>
          <main className="grid min-h-full place-items-center bg-white">
          <div className="text-center">
            <Link href="/water_station/new">
              <Button>
                Go to this link
              </Button>
            </Link>
            </div>
          </main>
        </>
      )
    }

    //if there is no water types available yet and the water station has already been filled up
    //show this link to let the user add water types
    if(!water_types && waterStation){
      return (
        <>
        No Water Types Found
        <Link href='/waterTypes/new'>
            <SubmitButton pending={false} >Add New Water Type</SubmitButton>
        </Link>
        </>
      )
    }

    return (
      <div>
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold dark:text-indigo-400 py-10">List of Water Types</h1>
          <Link href='/waterTypes/new'>
            <SubmitButton pending={false}>+ Add New Water Type</SubmitButton>
          </Link>
        </div>
      
        <DataTable columns={columns} data={water_types ?? []}/>
      </div>

    )
}
export default WaterTypes;