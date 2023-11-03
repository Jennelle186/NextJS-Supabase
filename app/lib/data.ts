import { createClientComponentClient, createServerComponentClient} from "@supabase/auth-helpers-nextjs";

export const supabase = createClientComponentClient()


export const initialState = {
    message: null,
}

export async function fetchUser() {
    try{

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
        const {data, error, status} = await supabase
            .from('water_refilling_station')
            .select()
            .eq('id', id)
        
        if(error && status !== 406){
            throw error
        }
        const water_station = data?.map((station) => ({
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