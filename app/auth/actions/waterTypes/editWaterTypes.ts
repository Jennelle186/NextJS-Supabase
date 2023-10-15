// app/actions/editWaterTypes.ts
'use server'
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers"
import { redirect } from "next/navigation";

export async function editWaterType(formData: FormData) {
  try {
    const name = formData.get('name')
    const price = formData.get('price')
    const id = Number(formData.get('id'))
    const supabase = createServerComponentClient({ cookies })
    await supabase.from('water_type').update({name: name, price: price}).eq('id', id)
    revalidatePath('/waterTypes')
    return { message: 'Success!' }
  } catch (e) {
    return { message: 'There was an error.' }
  }
}