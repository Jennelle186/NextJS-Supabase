import DeleteWaterTypeButton from "@/components/WaterTypes/DeleteButton";
import { cookies } from "next/headers";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import Link from "next/link";
import { redirect } from "next/navigation";
import { fetchWaterStationOfUSer } from "../lib/data";
import SubmitButton from "@/components/Reusables/SubmitButton";

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
    console.log(user?.id, "user id on the list of waters")
    
    //check if the user has a water station
    // let waterStation; 
    // if(user){
    //   const userId = user?.id ? user.id : null;
    //   console.log(user.id, "user_id from the water types")
    //   if(userId != null){
    //     waterStation = await fetchWaterStationOfUSer(userId)
    //   } else {
    //     //handle the situation when userId is null
    //     console.log('user id is null')
    //   }
    // } else{
    //   // handle the situation when user is not defined
    //   console.log('user is not defined')
    // } 

    //if there's no water station, then fill up the water station form first. 
    if(!water_types){
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
            <Link href="/water_station" className="justify-center rounded-md bg-cyan-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-cyan-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-600">
              Go to this link
            </Link>
            </div>
          </main>
        </>
      )
    }

    //if there is no water types available yet and the water station has already been filled up
    //show this link to let the user add water types
    if(!water_types){
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
        <h1>List of Water Types</h1>
        <Link href='/waterTypes/new'>
           <SubmitButton pending={false}>Add New Water Type</SubmitButton>
        </Link>
        {water_types?.map((water) => (
          <ul key={water.id}>
            <li>ID: {water.id}</li>
            <li>Type of Water: {water.name}</li>
        <li>Price: {water.price}</li>

        <Link
          href={{
            pathname: `/waterTypes/edit/${water.id}`,
            query: water // the data
          }}
        >
          <SubmitButton pending={false}>Edit </SubmitButton>
        </Link>

          <DeleteWaterTypeButton water_id ={water.id} water_name={water.name}/>

          </ul>
        ))}
      </div>

    )
}
export default WaterTypes;