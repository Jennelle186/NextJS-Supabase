import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import WaterTypeEditForm from "./editForm";
import { redirect } from "next/navigation";

const EditWaterTypes = async ({searchParams: water_types} : {searchParams: {
  name: string,
  price: number,
  id: number
}}) => {
  const supabase = createServerComponentClient({cookies})

  const {data: {session }} = await supabase.auth.getSession();

  if(!session){
    redirect('/login')
  }
  return <WaterTypeEditForm session={session} water_types={water_types}/>
}
 
export default EditWaterTypes;

// 'use client'
// import { editWaterType } from "@/app/auth/actions/waterTypes/editWaterTypes";
// import WaterTypeEditForm from "./editForm";
// import { useState } from "react";

// const EditWaterTypes = async ({searchParams: water_types} : {searchParams: {
//     name: string,
//     price: number,
//     id: number
// }}) => {

//   const [message, setMessage] = useState<String>('')
//   const [formData, setFormData] = useState({name: '',price: '', id: water_types.id })
//   console.log(water_types,"water types in the page.tsx")

//   async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
//     event.preventDefault(); // Prevent the default form submission behavior
//     console.log(formData,"formdata")

//     const res = await editWaterType(new FormData(event.currentTarget));
//     setMessage(res.message);


//     console.log(res,"res")
//   }

//     return (
//       <div>
//         {water_types.name}
//         {water_types.id}
//         <br/>  
//         <form onSubmit={onSubmit}>
//         <label htmlFor="name">Name</label>
//           <input 
//             type="text"
//             name="name"
//             placeholder={water_types.name}
//             value={formData.name}
//             onChange={(e) => setFormData({ ...formData, name: e.target.value })}
//           />
//           <label htmlFor="price">Price</label>
//           <input 
//             type="number"
//             name="price"
//             placeholder={water_types.price.toString()}
//             value={formData.price}
//             onChange={(e) => setFormData({ ...formData, price: e.target.value })}
//           />
//            <button type="submit">Edit</button>
//         </form>
//         <p>{message}</p>
//       </div>
//     )
// }
 
// export default EditWaterTypes;