'use client'

import { editWaterType } from "@/app/auth/actions/waterTypes/editWaterTypes";
import { WaterType } from "@/app/lib/definitions";
import MyInput from "@/components/Reusables/MyInput";
import { Button } from "@/components/ui/button";
import { Session } from "@supabase/auth-helpers-nextjs";
import Link from "next/link";
import { useState } from "react";


export default function WaterTypeEditForm({ session, water_types }: { session: Session | null; water_types: WaterType }) {
    const [message, setMessage] = useState<string>('');
    const [open, setOpen] = useState<boolean>(false);
    const [formData, setFormData] = useState<WaterType>({
        name: water_types.name,
        price: water_types.price,
        id: water_types.id,
    });

    async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        try { 
            const formData = new FormData(event.currentTarget);
            // formData.append("id", String(water_types.id));
            const res = await editWaterType(formData);
            setMessage(res.message);
            // const res = await editWaterType(new FormData(event.currentTarget));
            // setMessage(res.message)
            // console.log(formData, "formdata")

            setOpen(true);
            
        } catch (err) {
            console.error(err, "error");
            if (err instanceof Error) {
                setMessage(err.message);
            } else {
                setMessage("An error occurred");
            }
        }
    }

    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-3xl font-bold text-indigo-600 py-5">Editing Water Type Information</h1>
      <Link href="/waterTypes" className="text-indigo-500 font-semibold mb-4 hover:underline">
        ≼ Back
      </Link>

      <div className="flex justify-center w-full lg:w-3/4 xl:w-1/2">
        <form onSubmit={onSubmit} className="p-8 text-gray-600 w-full bg-white rounded-lg shadow-md">
          <input type="hidden" value={water_types.id} name="id"/>
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
          <p className="mt-4 text-green-500 flex justify-center">{message}</p>
        </form>
      </div>
    </div>

    );
}



