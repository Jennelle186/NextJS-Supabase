'use client'
import { useState } from 'react';
import { addWaterType } from "@/app/auth/actions/waterTypes/addWaterType";
import MyInput from '@/components/Reusables/MyInput';
import SubmitButton from '@/components/Reusables/SubmitButton';

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
    <form onSubmit={onSubmit}>
      <MyInput
        id="name"
        label="Water Type Name"
        required
        type="text"
        value={formData.name}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })} 
        htmlFor={'Water Type Name'} defaultValue={''}      />
      <MyInput
        id="price"
        label="Price per Liter"
        required
        type="number"
        value={formData.price}
        onChange={(e) => setFormData({ ...formData, price: e.target.value })} 
        htmlFor={'Price Per Liter'} defaultValue={''}      />
      <SubmitButton pending={false}>Add Water</SubmitButton>
      <p>{message}</p>
    </form>
  );
}
