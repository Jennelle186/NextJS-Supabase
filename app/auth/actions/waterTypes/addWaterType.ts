// app/actions/addWaterType.ts
'use server'
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers"

export async function addWaterType(formData: FormData) {
  try {
    const name = formData.get('name')
    const price = formData.get('price')
    const supabase = createServerComponentClient({ cookies })
    await supabase.from('water_type').insert({name, price}).select()
    revalidatePath('/waterTypes')
    return { message: 'Success!' }
  } catch (e) {
    return { message: 'There was an error.' }
  }
}