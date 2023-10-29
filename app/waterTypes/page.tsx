import DeleteWaterTypeButton from "@/components/WaterTypes/DeleteButton";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";

export const revalidate = 0;

const WaterTypes = async () => {
    const supabase = createServerComponentClient({ cookies });
    const {data: {session}} = await supabase.auth.getSession();
    const {data: {user}} = await supabase.auth.getUser();

    if(!session){
      redirect('/login')
    }

    const {data: water_types} = await supabase.from("water_type").select().eq('user_id', user?.id)
    console.log(user?.id, "user id on the list of waters")

    if(!water_types){
      return (
        <>
        No Water Types Found
        <Link href='/waterTypes/new'>
            + New Water Types
        </Link>
        </>
      )
    }

    return (
      <div>
        <h1>List of Water Types</h1>
        <Link href='/waterTypes/new'>
            + New Water Types
        </Link>
        {water_types?.map((water) => (
          <ul key={water.id}>
            <li>ID: {water.id}</li>
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

        <DeleteWaterTypeButton water_id ={water.id} water_name={water.name}/>

          </ul>
        ))}
      </div>

    )
}
export default WaterTypes;