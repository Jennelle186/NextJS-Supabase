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
        name="name"
        value={formValue.name}
        onChange={(event) => setFormValue({ ...formValue, [event.target.name]: event.target.value })}
        required 
        type="text" 
        errors={state.errors}
      /> 
      <MyInput
        id="buildingNumber"
        label="Building Number"
        name="buildingNumber"
        value={formValue.buildingNumber}
        onChange={(event) => setFormValue({ ...formValue, [event.target.name]: event.target.value })}
        required={true}
        type="number"
        errors={state.errors}
      />
       <MyInput
        id="street"
        label="Street"
        name="street"
        value={formValue.street}
        onChange={(event) => setFormValue({ ...formValue, [event.target.name]: event.target.value })}
        required={true}
        type="text"
        errors={state.errors}
      />
      <MyInput
        id="zone"
        label="Zone"
        name="zone"
        value={formValue.zone}
        onChange={(event) => setFormValue({ ...formValue, [event.target.name]: event.target.value })}
        required={true}
        type="text"
        errors={state.errors}
      />

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
        name="landmark"
        value={formValue.landmark}
        onChange={(event) => setFormValue({ ...formValue, [event.target.name]: event.target.value })}
        required={true}
        type="text"
        errors={state.errors}
      />
      <MyInput
        id="delivery_mode"
        label="Delivery Mode"
        name="delivery_mode"
        value={formValue.delivery_mode}
        onChange={(event) => setFormValue({ ...formValue, [event.target.name]: event.target.value })}
        required={true}
        type="text"
        errors={state.errors}
      />
      <MyInput
        id="contact_no"
        label="Contact Number"
        name="contact_no"
        value={formValue && formValue.contact_no 
          ? formValue.contact_no.toString() 
          : ''}
          onChange={(event) =>
            setFormValue({
              ...formValue,
              contact_no : event.target.value ? parseInt(event.target.value, 10) : null
            })
          }
        type="number"
        errors={state.errors}
      />
       <MyInput
        id="tel_no"
        label="Telephone Number"
        name="tel_no"
        value={formValue && formValue.tel_no
          ? formValue.tel_no.toString() 
          : ''}
        onChange={(event) =>
            setFormValue({
              ...formValue,
              tel_no : event.target.value ? parseInt(event.target.value, 10) : null
            })
          }
        type="number"
        errors={state.errors}
      />
       <MyInput
        id="remarks"
        label="Description or Remarks"
        name="remarks"
        value={formValue && formValue.remarks ? formValue.remarks.toString() : ''}
        onChange={(event) => setFormValue({ ...formValue, [event.target.name]: event.target.value })}
        type="text"
        errors={state.errors}
      />
      <SubmitButton />
    </form>
    </div>
  );
}
