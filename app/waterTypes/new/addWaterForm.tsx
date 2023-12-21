'use client'
import { useState } from 'react';
import { addWaterType } from "@/app/auth/actions/waterTypes/addWaterType";
import MyInput from '@/components/Reusables/MyInput';
import SubmitButton from '@/components/Reusables/SubmitButton';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function AddWaterForm() {
  const [message, setMessage] = useState<string>('');
  const [formData, setFormData] = useState({ name: '', price: '' });

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault(); // Prevent the default form submission behavior

    const res = await addWaterType(new FormData(event.currentTarget));
    setMessage(res.message);

    // Clear the form input fields by resetting the state
    setFormData({ name: '', price: '' });
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
    <h1 className="text-3xl font-bold text-indigo-600 py-5">Add New Water</h1>
    <Link href="/waterTypes" className="text-indigo-500 font-semibold mb-4 hover:underline">
      ≼ Back
    </Link>

    <div className="flex justify-center w-full lg:w-3/4 xl:w-1/2">
      <form onSubmit={onSubmit} className="p-8 text-gray-600 w-full bg-white rounded-lg shadow-md">
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
