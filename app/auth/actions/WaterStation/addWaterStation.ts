'use server'

import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers"


export default async function addWaterStation(formData: FormData): Promise<{ message: string }> {
    const supabase =createServerComponentClient({cookies})
    const {data: {user}} = await supabase.auth.getUser();
    const formDataAddress = `${formData.get('buildingNumber')}, ${formData.get('street')}, ${formData.get('zone')}`;

    console.log(formDataAddress, "address in the add water station ts")


    try{
        const station_name = formData.get('name')
        const user_id = user?.id
        const address = formDataAddress
        const landmark = formData.get('landmark')
        const barangay = formData.get('barangay')
        const delivery_mode = formData.get("delivery_mode")
        const contact_no = formData.get("contact_no")
        const tel_no = formData.get("tel_no")
        const remarks = formData.get("remarks")
        const created_at = new Date()
        
        const {data, error} = await supabase.from('water_refilling_station')
            .insert({
                created_at,
                user_id,
                landmark,
                station_name,
                address,
                barangay,
                remarks,
                contact_no,
                tel_no,
                delivery_mode,
            }).select()
        
        if(error){
            return {message: `${error.message}  - unable to save`}
        } 

        revalidatePath('/water_station')
        return{message: 'success'}

    }catch(e){
        return {message: "Failed to submit the form."}
    }

}