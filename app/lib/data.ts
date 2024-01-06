'use server'

import { createClientComponentClient, createServerActionClient, createServerComponentClient} from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";



export async function fetchUser() {
    try{

    const cookieStore = cookies()
    const supabase : any = createServerActionClient({ cookies: () => cookieStore })

        const {data: {user}} = await supabase.auth.getUser();

        return user

    }catch(error){
        console.error('Database error', error);
        throw new Error('Failed to fetch user data')
    }
}


export async function fetchWaterStation(id: string){
    // null or empty check before the fetch call
    if(!id) {
      throw new Error("Id cannot be null or empty.");
    }
    try{
        const cookieStore = cookies()
        const supabase : any = createServerActionClient({ cookies: () => cookieStore })

        const {data, error, status} = await supabase
            .from('water_refilling_station')
            .select()
            .eq('id', id)
        
        if(error && status !== 406){
            throw error
        }
        const water_station = data?.map((station : any) => ({
            ...station
        }))
        
        return water_station?.[0]
    }catch(error){
        // generic error message with specific error.
        console.error('Failed to fetch water refilling station data: ', error);
        throw new Error(`Failed to fetch water refilling station data - ${error}`)
    }
}

//checks if water_station is found for the user
export async function fetchWaterStationOfUSer(user_id: string) {

    try {
        const cookieStore = cookies()
        const supabase : any = createServerActionClient({ cookies: () => cookieStore })

        console.log(user_id, "user id from the data.ts")
        const { data, error, status } = await supabase
        .from('water_refilling_station')
        .select()
        .eq('user_id', user_id);
  
      if (error && status !== 406) {
        throw error;
      }
  
      // Check if a water station was found for the user
      const water_station = data && data.length > 0 ? data[0] : null;
  
      return water_station;
    } catch (error) {
      console.error('Database error', error);
      throw new Error('Failed to fetch water refilling station data');
    }
  }

  //get waterType
  export async function fetchWaterTypes(id: string){
    // null or empty check before the fetch call
    if(!id) {
      throw new Error("Id cannot be null or empty.");
    }
    try{
        const cookieStore = cookies()
        const supabase : any = createServerActionClient({ cookies: () => cookieStore })

        const {data, error, status} = await supabase
            .from('water_type')
            .select()
            .eq('id', id)
        
        if(error && status !== 406){
            throw error
        }
        const water_station = data?.map((station : any) => ({
            ...station
        }))
        
        return water_station?.[0]
    }catch(error){
        // generic error message with specific error.
        console.error('Failed to fetch water refilling station data: ', error);
        throw new Error(`Failed to fetch water refilling station data - ${error}`)
    }
}