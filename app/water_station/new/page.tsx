import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import WaterStationProfileForm from "./waterStationProfileForm";

export default async function AddWaterStationInfo() {
  const supabase = createServerComponentClient({cookies})

  const {data: {session }} = await supabase.auth.getSession();

  if(!session){
    redirect('/login')
  }

  return <WaterStationProfileForm/>
}