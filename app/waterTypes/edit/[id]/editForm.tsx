'use client'

import editWaterType from "@/app/auth/actions/waterTypes/editWaterTypes";
import { fetchWaterTypes } from "@/app/lib/data";
import { WaterType } from "@/app/lib/definitions";
import MyInput from "@/components/Reusables/MyInput";
import { Button } from "@/components/ui/button";
import { Session } from "@supabase/auth-helpers-nextjs";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { useFormState } from "react-dom";

const initialState = {
  message: null,
}


const EditWaterTypes: React.FC<{ id: string }> = ({ id }) => {
    const [message, setMessage] = useState<string>('');
    const [state, formAction] = useFormState(editWaterType, initialState)
    const [open, setOpen] = useState<boolean>(false);
    const [formData, setFormData] = useState<WaterType>({
        name:"",
        price: 0,
        id: "",
    });

    // async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    //     event.preventDefault();
    //     try { 
    //         const formData = new FormData(event.currentTarget);
    //         // formData.append("id", String(water_types.id));
    //         const res = await editWaterType(formData);
    //         setMessage(res.message);
    //         // const res = await editWaterType(new FormData(event.currentTarget));
    //         // setMessage(res.message)
    //         // console.log(formData, "formdata")

    //         setOpen(true);
            
    //     } catch (err) {
    //         console.error(err, "error");
    //         if (err instanceof Error) {
    //             setMessage(err.message);
    //         } else {
    //             setMessage("An error occurred");
    //         }
    //     }
    // }

    const getWaterStation = useCallback(async () => {
      try {
        // null or empty check before the fetch call
        if(!id) {
          throw new Error("Id cannot be null or empty.");
        }
        const water_station = await fetchWaterTypes(id);
        setFormData(water_station);
      } catch (error: Error | unknown) {
        console.error('getWaterStation error:', error);
        // generic error when caught error is not an instance of Error
        if (!(error instanceof Error)) {
          error = new Error('An error occurred while getting the water station.');
        }
        // setError(error as Error)
      }
    }, [id]);
  
    useEffect(() => {
      // getProfile(),
      getWaterStation()
    },[getWaterStation])
  

    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-3xl font-bold text-indigo-600 py-5">Editing Water Type Information</h1>
      <Link href="/waterTypes" className="text-indigo-500 font-semibold mb-4 hover:underline">
        ≼ Back
      </Link>


      <div className="flex justify-center w-full lg:w-3/4 xl:w-1/2">
        <form action={formAction} className="p-8 text-gray-600 w-full bg-white rounded-lg shadow-md">
          {id}
          <input type="hidden" 
            value={id} 
            name="id"
          />
          <MyInput
            id="name"
            label="Water Type Name"
            required
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            htmlFor={'WaterTypeName'}
            defaultValue={''}
          />
          <MyInput
            id="price"
            label="Price per Liter"
            required
            type="number"
            value={formData.price}
            onChange={(e) => setFormData({ ...formData, price: e.target.value })}
            htmlFor={'PricePerLiter'}
            defaultValue={''}
          />

          <div className="flex justify-center mt-4">
            <Button className="bg-cyan-600 hover:bg-cyan-700 text-white" type="submit">
              Save Changes
            </Button>
          </div>
          <p className="mt-4 text-green-500 flex justify-center">{state.message}</p>
        </form>
      </div>
    </div>

    );
}

export default EditWaterTypes;



// function editWaterTypeterType(state: { message: null; }): Promise<{ message: null; }> {
//   throw new Error("Function not implemented.");
// }

