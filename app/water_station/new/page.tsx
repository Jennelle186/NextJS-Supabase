import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import WaterStationProfileForm from "./waterStationProfileForm";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function AddWaterStationInfo() {
  const cookieStore = cookies();
  const supabase = createServerComponentClient({ cookies: () => cookieStore });

  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    // Handle the case where the user is not authenticated
    return redirect('/login');
  }

  // Get the water_station information of the user id
  const response = await supabase.from("water_refilling_station").select().eq('user_id', user.id);

  if (response.data && response.data.length > 0) {
    // Data already exists, redirect to another page
    return redirect('/water_station');
  } else {
    // No data exists, render the WaterStationProfileForm
    return (
      <div>
        <h1>Add Water Station Information</h1>
        <WaterStationProfileForm />
      </div>
    );
  }
}
