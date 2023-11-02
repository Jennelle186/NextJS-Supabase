import { createClientComponentClient, createServerComponentClient} from "@supabase/auth-helpers-nextjs";

export const supabase = createClientComponentClient()

export const initialState = {
    message: null,
}

//fetch water station by id
export async function fetchWaterStation(id: number){
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
        console.error('Database error', error);
        throw new Error('Failed to fetch water refilling station data')
    }
}