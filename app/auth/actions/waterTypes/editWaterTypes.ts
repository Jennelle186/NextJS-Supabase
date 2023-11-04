// app/actions/editWaterTypes.ts
'use server'
import { createServerActionClient} from "@supabase/auth-helpers-nextjs";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers"

export async function editWaterType(formData: FormData) {
  try {
    const name = formData.get('name')
    const price = formData.get('price')
    // const id = Number(formData.get('id'))
    const idValue = formData.get('id');
    console.log('ID value:', idValue);
    const cookieStore = cookies()
    const supabase = createServerActionClient({ cookies: () => cookieStore })
    await supabase.from('water_type').update({name: name, price: price}).eq('id', idValue)
    revalidatePath('/waterTypes')
    return { message: 'Success!' }
  } catch (e) {
    return { message: 'There was an error.' }
  }
}