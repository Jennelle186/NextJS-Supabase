'use client'
import UpdateWaterStation from "@/app/auth/actions/WaterStation/updateWaterStation";
import { fetchWaterStation, initialState } from "@/app/lib/data";
import { WaterStationType } from "@/app/lib/definitions";
import DropdownList from "@/components/Reusables/MyDropDownList";
import MyInput from "@/components/Reusables/MyInput";
import SubmitButton from "@/components/Reusables/SubmitButton";
import { useCallback, useEffect, useState } from "react";
import { useFormState } from "react-dom";
import { barangay } from "../../new/barangay";
import Link from "next/link";

const EditWaterStationInformation: React.FC<{ id: string }> = ({ id }) => {
  // const supabase = createClientComponentClient()
  const [error, setError] = useState<Error | undefined>(undefined);
  const [state, formAction] = useFormState(UpdateWaterStation, initialState)
  const [formValue, setFormValue] = useState<WaterStationType>({
    id: "",
    station_name: "",
    address: "",
    barangay: "",
    remarks: null,
    contact_no: null,
    tel_no: null,
    delivery_mode: "",
    landmark: "",
    user_id: "",  
    created_at: "",
  });

  const [selectedBarangay, setSelectedBarangay] = useState<string>(''); // for the barangay selection

  const handleBarangaySelection = (value: string) => {
    setSelectedBarangay(value); //get the selected barangay
  }

  const getWaterStation = useCallback(async () => {
    try {
      // null or empty check before the fetch call
      if(!id) {
        throw new Error("Id cannot be null or empty.");
      }
      const water_station = await fetchWaterStation(id);
      setFormValue(water_station);
    } catch (error: Error | unknown) {
      console.error('getWaterStation error:', error);
      // generic error when caught error is not an instance of Error
      if (!(error instanceof Error)) {
        error = new Error('An error occurred while getting the water station.');
      }
      setError(error as Error)
    }
  }, [id]);

  useEffect(() => {
    // getProfile(),
    getWaterStation()
  },[getWaterStation])

  useEffect(() => {
    setFormValue(prevFormValue => ({
      ...prevFormValue,
      barangay: selectedBarangay
    }))
  },[selectedBarangay])

  console.log(state, "state")

  
  return (
    <div className="container mx-auto p-4">
      <Link href="/water_station">
        Back
      </Link>
      {error && (
      <p aria-live="assertive" role="status" style={{ color: 'red' }}>
        Error: {error.message}
      </p>
    )}
      <p aria-live="polite"  role="status">
        {state?.message}
      </p>
      <form action={formAction}>
      <input type="hidden" name="station_id" value={id} /> 
        <MyInput
          id="station_name"
          label="Station Name"
          value={formValue.station_name}
          onChange={(event) => setFormValue({ ...formValue, [event.target.name]: event.target.value })}
          type="text" htmlFor={"Station_Name"} defaultValue={""}        
        />
        <MyInput
          id="address"
          label="Building No, Street, Zone"
          value={formValue.address}
          onChange={(event) => setFormValue({ ...formValue, [event.target.name]: event.target.value })}
          type="text" htmlFor={"Address"} defaultValue={""}        />

        <DropdownList
          options={barangay}
          value={formValue.barangay} 
          selected={formValue.barangay} 
          onSelect={handleBarangaySelection}
          required={false}
          placeholder="Please select a Barangay"
          title="Barangay"
        />
    
      <input
        type="hidden"
        name="barangay"
        value={formValue.barangay || selectedBarangay} 
      />
      
        <MyInput
          id="landmark"
          label="Landmark"
          value={formValue.landmark || ''}
          onChange={(event) => setFormValue({ ...formValue, [event.target.name]: event.target.value })}
          type="text" htmlFor={"Landmark"} defaultValue={""}         
        />
        <MyInput
          id="delivery_mode"
          label="Delivery Mode"
          value={formValue.delivery_mode}
          onChange={(event) => setFormValue({ ...formValue, [event.target.name]: event.target.value })}
          type="text" htmlFor={"Delivery-Mode"} defaultValue={""}        />
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
          type="number" htmlFor={"Contact-No"} defaultValue={""}        />
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
          type="number" htmlFor={"Telephone-Number"} defaultValue={""}        />
         <MyInput
          id="remarks"
          label="Description or Remarks"
          value={formValue && formValue.remarks ? formValue.remarks.toString() : ''}
          onChange={(event) => setFormValue({ ...formValue, [event.target.name]: event.target.value })}
          type="text" htmlFor={"Description"} defaultValue={""}        />
      <SubmitButton pending={false}/>
      </form>
     
    </div>
  );
}

export default EditWaterStationInformation;
