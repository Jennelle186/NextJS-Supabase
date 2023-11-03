import DeleteWaterTypeButton from "@/components/WaterTypes/DeleteButton";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";
import { fetchWaterStationOfUSer } from "../lib/data";

export const revalidate = 0;

const WaterTypes = async () => {
    const supabase = createServerComponentClient({ cookies });
    const {data: {session}} = await supabase.auth.getSession();
    const {data: {user}} = await supabase.auth.getUser();

    if(!session){
      redirect('/login')
    }

    const {data: water_types} = await supabase.from("water_type").select().eq('user_id', user?.id)
    console.log(user?.id, "user id on the list of waters")
    
    //check if the user has a water station
    let waterStation; 
    if(user){
      const userId = user?.id ? user.id : null;
      console.log(user.id, "user_id from the water types")
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

    //if there's no water station, then fill up the water station form first. 
    if(!waterStation){
      return(
        <>
          <div>
            You must fill up your water station information first. 
            <Link href="/water_station">
              Go to this link
            </Link>
          </div>
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
            + New Water Types
        </Link>
        </>
      )
    }

    return (
      <div>
        <h1>List of Water Types</h1>
        <Link href='/waterTypes/new'>
            + New Water Types
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
          Edit  
        </Link>

          <DeleteWaterTypeButton water_id ={water.id} water_name={water.name}/>

          </ul>
        ))}
      </div>

    )
}
export default WaterTypes;