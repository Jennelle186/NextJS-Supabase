'use client'

import { editWaterType } from "@/app/auth/actions/waterTypes/editWaterTypes";
import { WaterType } from "@/app/lib/definitions";
import MyInput from "@/components/Reusables/MyInput";
import { Button } from "@/components/ui/button";
import { Session } from "@supabase/auth-helpers-nextjs";
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
            formData.append("id", String(water_types.id));
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
        <div>
            <h1>Edit page</h1>
            {water_types.id}
            <form onSubmit={onSubmit}>
            <MyInput
                id="name"
                label="Water Type Name"
                required
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })} 
                htmlFor={'Water Type Name'} defaultValue={''}   />
                <MyInput
                id="price"
                label="Price per Liter"
                required
                type="number"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })} 
                htmlFor={'Price Per Liter'} defaultValue={''}   />
              <Button>Submit</Button>
            </form>
        
        </div>
    );
}



