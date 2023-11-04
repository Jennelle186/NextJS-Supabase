// app/actions/addWaterType.ts
'use server'
import { createServerActionClient} from "@supabase/auth-helpers-nextjs";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers"

export async function addWaterType(formData: FormData) {
  const cookieStore = cookies()
  const supabase = createServerActionClient({ cookies: () => cookieStore })
  const {data: {user}} = await supabase.auth.getUser();
  try {
    const name = formData.get('name')
    const price = formData.get('price')
    const user_id = user?.id
    await supabase.from('water_type').insert  ({name, price, user_id}).select()
    revalidatePath('/waterTypes')
    return { message: 'Success!' }
  } catch (e) {
    return { message: 'There was an error.' }
  }
}