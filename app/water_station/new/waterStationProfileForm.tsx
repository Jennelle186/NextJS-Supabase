'use client'
import addWaterStation from "@/app/auth/actions/WaterStation/addWaterStation";
import React, { useEffect, useState} from "react";
import MyInput from "@/components/Reusables/MyInput";
import { useFormState, useFormStatus } from "react-dom";
import DropdownList from "@/components/Reusables/MyDropDownList";
import { barangay } from "./barangay";
import { WaterStationFormData } from "@/app/lib/definitions";
import { initialState } from "@/app/lib/data";
import SubmitButton from "@/components/Reusables/SubmitButton";


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
    <div className="container mx-auto p-4">
            
      <p aria-live="polite"  role="status">
        {state?.message}
      </p>

    <form action={formAction}>
    <MyInput
          id="name"
          label="Water Station Name"
          value={formValue.name}
          onChange={(event) => setFormValue({ ...formValue, [event.target.name]: event.target.value })}
          required
          type="text" htmlFor={"Water-Station-Name"} defaultValue={""}    
      /> 
      <MyInput
          id="buildingNumber"
          label="Building Number"
          value={formValue.buildingNumber}
          onChange={(event) => setFormValue({ ...formValue, [event.target.name]: event.target.value })}
          required={true}
          type="number" htmlFor={"Building Number"} defaultValue={""}        
      />
       <MyInput
          id="street"
          label="Street"
          value={formValue.street}
          onChange={(event) => setFormValue({ ...formValue, [event.target.name]: event.target.value })}
          required={true}
          type="text" htmlFor={"Street"} defaultValue={""}      />
      <MyInput
          id="zone"
          label="Zone"
          value={formValue.zone}
          onChange={(event) => setFormValue({ ...formValue, [event.target.name]: event.target.value })}
          required={true}
          type="text" htmlFor={"Zone"} defaultValue={""}      />

      <DropdownList
        options={barangay}
        value={formValue.barangay} 
        selected={selectedBarangay} 
        onSelect={handleBarangaySelection}
        required={true}
        placeholder="Please select a Barangay"
        title="Barangay"
      />
      <input type="hidden" name="barangay" value={selectedBarangay} /> 
      
      <MyInput
          id="landmark"
          label="Landmark"
          value={formValue.landmark}
          onChange={(event) => setFormValue({ ...formValue, [event.target.name]: event.target.value })}
          required={true}
          type="text" htmlFor={"Landmark"} defaultValue={""}      />
      <MyInput
          id="delivery_mode"
          label="Delivery Mode"
          value={formValue.delivery_mode}
          onChange={(event) => setFormValue({ ...formValue, [event.target.name]: event.target.value })}
          required={true}
          type="text" htmlFor={"Delivery Mode"} defaultValue={""}      />
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
          type="number" htmlFor={"Contact-Number"} defaultValue={""}      />
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
          type="number" htmlFor={"Telephone Number"} defaultValue={""}  
      />
       <MyInput
          id="remarks"
          label="Description or Remarks"
          value={formValue && formValue.remarks ? formValue.remarks.toString() : ''}
          onChange={(event) => setFormValue({ ...formValue, [event.target.name]: event.target.value })}
          type="text" htmlFor={"Remarks"} defaultValue={""}       
      />
      <SubmitButton pending={false}/>
    </form>
    </div>
  );
}
