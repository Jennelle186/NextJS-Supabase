'use client'
import addWaterStation from "@/app/auth/actions/WaterStation/addWaterStation";
import React, { useState, FormEvent } from "react";

interface FormData {
  name: string;
  buildingNumber: string;
  street: string;
  zone: string;
  landmark: string;
  barangay: string;
  delivery_mode: string;
  contact_no: number | null;
  tel_no: number | null;
  remarks: string;
}

export default function WaterStationProfileForm() {
  const [message, setMessage] = useState<string>('');
  const [formData, setFormData] = useState<FormData>({
    name: "",
    buildingNumber: "",
    street: "",
    zone: "",
    landmark: "",
    barangay: "",
    delivery_mode: "",
    contact_no: 0,
    tel_no: 0,
    remarks: "",
  });

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); // Prevent the default form submission behavior

   
    const res = await addWaterStation(new FormData(event.currentTarget))
    setMessage(res.message);
  }

  return (
    <form onSubmit={onSubmit}>
      <label>
       Water Refilling Station Name
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        />
      </label>
      <br />
      <label>
        Building Number:
        <input
          type="text"
          name="buildingNumber"
          value={formData.buildingNumber}
          onChange={(e) => setFormData({ ...formData, buildingNumber: e.target.value })}
        />
      </label>
      <br />
      <label>
        Street:
        <input
          type="text"
          name="street"
          value={formData.street}
          onChange={(e) => setFormData({ ...formData, street: e.target.value })}
        />
      </label>
      <br />
      <label>
        Zone:
        <input
          type="text"
          name="zone"
          value={formData.zone}
          onChange={(e) => setFormData({ ...formData, zone: e.target.value })}
        />
      </label>
      <br />
      <label>
        Landmark:
        <input
          type="text"
          name="landmark"
          value={formData.landmark}
          onChange={(e) => setFormData({ ...formData, landmark: e.target.value })}
        />
      </label>
      <br />
      <label>
        Barangay:
        <input
          type="text"
          name="barangay"
          value={formData.barangay}
          onChange={(e) => setFormData({ ...formData, barangay: e.target.value })}
        />
      </label>
      <br />
      <label>
        Delivery Mode:
        <input
          type="text"
          name="delivery_mode"
          value={formData.delivery_mode}
          onChange={(e) => setFormData({ ...formData, delivery_mode: e.target.value })}
        />
      </label>
      <br />
      <label>
        Contact Number:
        <input
          type="number"
          name="contact_no"
          value={formData.contact_no !== null ? formData.contact_no.toString() : ''}
          onChange={(e) => setFormData({ ...formData, contact_no: parseInt(e.target.value) })}
        
        />
      </label>
      <br />
      <label>
        Telephone Number:
        <input
          type="number"
          name="tel_no"
          value={formData.tel_no !== null ? formData.tel_no.toString() : ''}
          onChange={(e) => setFormData({ ...formData, tel_no: parseInt(e.target.value) })}
        />
      </label>
      <br />
      <label>
       Description or Remarks:
        <input
          type="text"
          name="remarks"
          value={formData.remarks}
          onChange={(e) => setFormData({ ...formData, remarks: e.target.value })}
        />
      </label>
      <br />
      <button type="submit">Submit</button>
      <p>{message}</p>
    </form>
  );
}
