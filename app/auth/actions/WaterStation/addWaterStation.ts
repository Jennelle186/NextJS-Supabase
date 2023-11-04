'use server'

import { createServerActionClient, createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers"


export default async function addWaterStation(prevState: any, formData: FormData): Promise<{ message: string }> {    
    const cookieStore = cookies()
    const supabase = createServerActionClient({ cookies: () => cookieStore })
    const {data: {user}} = await supabase.auth.getUser();
    const formDataAddress = `${formData.get('buildingNumber')}, ${formData.get('street')}, ${formData.get('zone')}`

    try{
        const station_name = formData.get('name')
        const user_id = user?.id
        const address = formDataAddress
        const landmark = formData.get('landmark')
        const barangay = formData.get('barangay')
        const delivery_mode = formData.get("delivery_mode")
        // const contact_no = formData.get("contact_no")
        // const tel_no = formData.get("tel_no")

        //FormData values are of String data type
        const contact_no_string = formData.get("contact_no") as string
        const tel_no_string = formData.get("tel_no") as string

        //parsing contact no and tel_no to null if the values are blank
        const contact_no = contact_no_string ? parseInt(contact_no_string) : null;
        const tel_no = tel_no_string ? parseInt(tel_no_string) : null;


        const remarks = formData.get("remarks")
        const created_at = new Date()

        // RegExp to validate a string that it contains exactly 10 digits.
        var regExp = /^[0-9]{10}$/;

        // Perform the validation
        if(!regExp.test(contact_no_string)) {
        return {message: "Contact number is not valid. It must be exactly 10 digits."};
}
        
        const {data, error} = await supabase.from('water_refilling_station')
            .insert({
                station_name,
                created_at,
                user_id,
                landmark,
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
        return { message: `Succesfully added the data` }
    }catch(e){
        return {message: "Failed to submit the form."}
    }

}