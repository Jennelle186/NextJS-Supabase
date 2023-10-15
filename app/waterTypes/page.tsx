import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";

export const revalidate = 0;

const WaterTypes = async () => {
    const supabase = createServerComponentClient({ cookies });
    const {data: {session }} = await supabase.auth.getSession();

    if(!session){
      redirect('/login')
    }

    const {data: water_types} = await supabase.from("water_type").select()

    if(!water_types){
      return <p>No Water Types Found</p>
    }

    return (
      <div>
        <h1>List of Water Types</h1>
        <Link href='/waterTypes/new'>
            + New bike
        </Link>
        {water_types?.map((water) => (
          <ul key={water.id}>
            <li>Type of Water: {water.name}</li>
        <li>Price: {water.price}</li>

        <Link
          href={{
            pathname: `/waterTypes/edit/${water.id}`,
            query: water // the data
          }}
        >
          Edit  
        </Link>

        <button>
          Delete
        </button>

          </ul>
        ))}
      </div>

    )
}
export default WaterTypes;