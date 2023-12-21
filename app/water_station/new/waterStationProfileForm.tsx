'use client'
import addWaterStation from "@/app/auth/actions/WaterStation/addWaterStation";
import React, { useEffect, useState} from "react";
import MyInput from "@/components/Reusables/MyInput";
import { useFormState, useFormStatus } from "react-dom";
import DropdownList from "@/components/Reusables/MyDropDownList";
import { barangay } from "./barangay";
import { WaterStationFormData } from "@/app/lib/definitions";
import SubmitButton from "@/components/Reusables/SubmitButton";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import * as Label from '@radix-ui/react-label';


const initialState = {
  message: null,
}

export default function WaterStationProfileForm() {
  const [state, formAction] = useFormState(addWaterStation, initialState)
  const [selectedBarangay, setSelectedBarangay] = useState<string>(''); // for the barangay selection

  const handleBarangaySelection = (value: string) => {
    setSelectedBarangay(value); //get the selected barangay
  }

  const [formValue, setFormValue] = useState<WaterStationFormData>({
    name: "",
    buildingNumber: "",
    street: "",
    zone: "",
    landmark: "",
    barangay: "",
    delivery_mode: "",
    contact_no: null,
    tel_no: null,
    remarks: null,
  });
 

  useEffect(() => {
    setFormValue(prevFormValue => ({
      ...prevFormValue,
      barangay: selectedBarangay
    }))
  },[selectedBarangay])

  console.log(formValue, "form value")


  return (
    <div>
    <form action={formAction}>
    <div className="space-y-12 py-10 mx-8">
      <div className="border-b border-gray-900/10 pb-5"/>

      <div className="border-b border-gray-900/10 pb-12">
        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
          <div className="col-span-full">
              <MyInput
              id="name"
              label="Water Station Name"
              value={formValue.name}
              onChange={(event) => setFormValue({ ...formValue, [event.target.name]: event.target.value })}
              required
              type="text" htmlFor={"Water-Station-Name"} defaultValue={""}    
          /> 
          </div>

          <div className="sm:col-span-3">
            <MyInput
                id="contact_no"
                label="Contact Number"
                value={formValue && formValue.contact_no
                  ? formValue.contact_no.toString()
                  : ''}
                onChange={(event) => {
                  const input = event.target.value.replace(/\D/g, ''); // Remove non-digit characters
                  const limitedInput = input.slice(0, 10); // Limit to 10 digits
                  setFormValue({
                    ...formValue,
                    contact_no: limitedInput ? parseInt(limitedInput, 10) : null,
                  });
                } }
                type="number" htmlFor={"Contact-No"} defaultValue={""}        
              />
          </div>

          <div className="sm:col-span-3">
          <MyInput
                id="tel_no"
                label="Telephone Number"
                value={formValue && formValue.tel_no
                  ? formValue.tel_no.toString()
                  : ''}
                onChange={(event) => setFormValue({
                  ...formValue,
                  tel_no: event.target.value ? parseInt(event.target.value, 10) : null
                })}
                type="number" htmlFor={"Telephone-Number"} defaultValue={""}        
              />
          </div>

          <div className="sm:col-span-2 sm:col-start-1">
              <MyInput
              id="buildingNumber"
              label="Building Number"
              value={formValue.buildingNumber}
              onChange={(event) => setFormValue({ ...formValue, [event.target.name]: event.target.value })}
              required={true}
              type="number" htmlFor={"Building Number"} defaultValue={""}        
          />
          </div>

          <div className="sm:col-span-2">
            <MyInput
            id="street"
            label="Street"
            value={formValue.street}
            onChange={(event) => setFormValue({ ...formValue, [event.target.name]: event.target.value })}
            required={true}
            type="text" htmlFor={"Street"} defaultValue={""}      
            />
          </div>

          <div className="sm:col-span-2">
            <MyInput
            id="zone"
            label="Zone"
            value={formValue.zone}
            onChange={(event) => setFormValue({ ...formValue, [event.target.name]: event.target.value })}
            required={true}
            type="text" htmlFor={"Zone"} defaultValue={""}      
            />
          </div>

          <div className="sm:col-span-3">
            <DropdownList
                options={barangay}
                value={formValue.barangay} 
                selected={formValue.barangay} 
                onSelect={handleBarangaySelection}
                required={false}
                placeholder="Please select a Barangay"
                title="Barangay"
              />
          </div>

          <div className="sm:col-span-3">
          <MyInput
              id="landmark"
              label="Landmark"
              value={formValue.landmark || ''}
              onChange={(event) => setFormValue({ ...formValue, [event.target.name]: event.target.value })}
              type="text" htmlFor={"Landmark"} defaultValue={""}         
            />
          </div>

          <div className="sm:col-span-3">
            <MyInput
            id="delivery_mode"
            label="Delivery Mode"
            value={formValue.delivery_mode}
            onChange={(event) => setFormValue({ ...formValue, [event.target.name]: event.target.value })}
            type="text" htmlFor={"Delivery-Mode"} defaultValue={""}        />          
          </div>

          <div className="col-span-full">
              <Label.Root htmlFor="Remarks" className="block text-sm font-medium leading-6 text-cyan-600">Remarks</Label.Root>
              <Textarea placeholder="Type your message here." 
                id="remarks"
                name="remarks"
                value={formValue && formValue.remarks ? formValue.remarks.toString() : ''}
                onChange={(event) => setFormValue({ ...formValue, [event.target.name]: event.target.value })}
              />
          </div>
        </div>
      </div>
    </div>

      <div className="mt-6 flex items-center justify-center gap-x-6">
      <Link href="/water_station">
          <Button variant="destructive">
              Cancel
          </Button>
        </Link>
      <Button variant="default">
          Save
      </Button>
      {/* Hidden inputs */}
        <input
            type="hidden"
            name="barangay"
            value={formValue.barangay || selectedBarangay} 
          />      
    </div>
  </form>
  <p className="mt-4 text-green-500 flex justify-center">{state.message}</p>
  </div>
  );
}
