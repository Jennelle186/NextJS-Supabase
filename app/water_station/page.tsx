import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Link from "next/link";
import { WaterStationType } from "../lib/definitions";
import WaterStationInfo from "./waterStationInfo";
import { Button } from "@/components/ui/button";


export default async function WaterStationPage() {
  const supabase = createServerComponentClient({ cookies });
  const { data: { user } } = await supabase.auth.getUser();

  const { data: { session } } = await supabase.auth.getSession();

  if (!session) {
    return redirect('/login'); // Add return here
  }

  const response = await supabase.from("water_refilling_station").select().eq('user_id', user?.id);
  
  if (response.data) {
    const water_station: WaterStationType[] = response.data;
    
    return (
      <div>
        {water_station.length === 0 ? (
          <>
           <div className="space-y-12 py-10 mx-8">
            <div className="border-b border-gray-900/10 pb-12">
              <h1 className="text-base font-semibold leading-7 text-cyan-600">Welcome!</h1>
              <p className="mt-1 text-sm leading-6 text-gray-600">You need to set up information about your water station first.</p>
              <Link
                href="/water_station/new"
               >
               <Button>Set Up Your Water Station Profile Now</Button>
              </Link>
            </div>
          </div>
          </>
        ) : (

          <WaterStationInfo data={water_station}/>
        )}
      </div>
    );
  } else {
    return (
      <div>
           <div className="space-y-12 py-10 mx-8">
            <div className="border-b border-gray-900/10 pb-12">
              <h1 className="text-base font-semibold leading-7 text-cyan-600">Welcome!</h1>
              <p className="mt-1 text-sm leading-6 text-gray-600">You need to set up information about your water station first.</p>
              <Link
                href="/water_station/new"
               >
               <Button>Set Up Your Water Station Profile Now</Button>
              </Link>
            </div>
          </div>
      </div>
    );
  }
}
