import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import AddWaterForm from "./addWaterForm";
import { redirect } from "next/navigation";

export default async function AddWaterType () {
  const supabase = createServerComponentClient({cookies})

  const {data: {session }} = await supabase.auth.getSession();

  if(!session){
    redirect('/login')
  }

  return <AddWaterForm/>
}