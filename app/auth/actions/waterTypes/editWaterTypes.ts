// app/actions/editWaterTypes.ts
'use server'

// export const dynamic = 'force-dynamic';

import { createServerActionClient} from "@supabase/auth-helpers-nextjs";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers"


export default async function editWaterType(prevState: any, formData: FormData): Promise<{ message: string }> {    
    const cookieStore = cookies()
    const supabase = createServerActionClient({ cookies: () => cookieStore })

    try{    
      const name = formData.get('name')
      const price = formData.get('price')
      const idValue = formData.get('id');
  
        const {data, error} = await supabase.from('water_type')
            .update({
                name, price
            }).eq('id', idValue)

          console.log(data, "data")
          console.log(error, "error")
        
        if(error){
            return {message: `${error.message}  - Unable to save`}
        } 

        revalidatePath('/waterTypes')
        return { message: `Succesfully updated the data` }
    }catch(e){
        return {message: "Failed to submit the form."}
    }

}

// export async function editWaterType(formData: FormData) {
//   try {
//     const cookieStore = cookies()
//     const supabase = createServerActionClient({ cookies: () => cookieStore })
//     const {data: {user}} = await supabase.auth.getUser();
//     console.log(formData, "formData")
//     const name = formData.get('name')
//     const price = formData.get('price')
//     const idValue = formData.get('id');
//     console.log('ID value:', idValue);
//     const {data, error} = await supabase.from('water_type').update({name: name, price: price, user_id: user?.id}).eq('id', idValue)
//     console.log(data, "data water")
//     console.log(error, "error water type")

//     if(error) {
//       return {message: 'Unable to update'}
//     }

//     // await supabase.from('water_type').upsert({name: name, price: price}).eq('id', idValue)
//     revalidatePath('/waterTypes')
//     return { message: `You have successfully edited ${name}` }
//   } catch (e) {
//     return { message: 'There was an error.' }
//   }
// }

