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
        <h2 className="mt-10 text-center text-2xl text-cyan-700 font-bold leading-9 tracking-tigh">
          Add Water Station Information
        </h2>
        <p className="mt-1 text-sm text-center leading-6 text-gray-600">Use correct information so customers can find you.</p>
        <WaterStationProfileForm />
      </div>
    );
  }
}
