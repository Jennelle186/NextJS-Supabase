'use client'
import MyInput from "@/components/Reusables/MyInput";
import { Button } from "@/components/ui/button";
import { FormEvent, ChangeEvent, useState } from "react";
import { WaterStationType } from "../lib/definitions";

interface YourFormComponentProps {
    handleFormSubmit: (e: FormEvent<HTMLFormElement>) => void;
    handleInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
    user: {
      firstName: string;
      lastName: string;
      contact_no: number;
      email: string;
      address: string;
      delivery_mode: string;
      remarks: string;
    };
    refillingStation: WaterStationType | null;
    cart: any[]; // Change this type according to your actual cart items type
  }
  
  const CustomerInfoComponent: React.FC<YourFormComponentProps> = ({
    handleFormSubmit,
    handleInputChange,
    user,
    refillingStation,
    cart,
  }) => {
    const [router] = useState<any>(null); // Change the type accordingly
  
    return (
      <form onSubmit={handleFormSubmit}>
        <div className="justify-center space-y-12">
          {/* Hidden input fields */}
          <input type="hidden" name="refilling_station_name" value={refillingStation?.station_name} />
          <input type="hidden" name="refilling_station_id" value={refillingStation?.id} />
          <input type="hidden" name="refilling_station_user_id" value={refillingStation?.user_id} />
  
          <div className="border-b border-gray-900/10 pb-12">
          <h2 className="text-base font-semibold leading-7 text-gray-900">Personal Information</h2>
          <p className="mt-1 text-sm leading-6 text-gray-600">Use an active email address and contact number so we can inform and send the invoice of your orders.</p>

          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-3">
            <MyInput
              id="firstName"
              label="First Name"
              value={user.firstName}
              onChange={handleInputChange}
              required
              type="text" htmlFor={"First Name"} defaultValue={''} /> 
            </div>

            <div className="sm:col-span-3">
            <MyInput
                id="lastName"
                label="Last Name"
                value={user.lastName}
                onChange={handleInputChange}
                required
                type="text" htmlFor={'First Name'} defaultValue={''}/> 
            </div>

            <div className="sm:col-span-3">
            <MyInput
                id="contact_no"
                label="Contact No"
                value={user.contact_no}
                onChange={handleInputChange}
                required
                type="number" htmlFor={'First Name'} defaultValue={''}/> 
            </div>

            <div className="sm:col-span-3">
            <MyInput
                id="email"
                label="Email"
                value={user.email}
                onChange={handleInputChange}
                required
                type="email"
                htmlFor={'Email'} defaultValue={''} /> 
            </div>
            <div className="col-span-full">
              <MyInput
                id="address"
                label="Bldg No, Zone, Street, Barangay"
                value={user.address}
                onChange={handleInputChange}
                required
                type="text" htmlFor={'Address'} defaultValue={''} />
            </div>

            <div className="col-span-full">
              <MyInput
                id="delivery_mode"
                label={`Available Delivery Mode: ${refillingStation?.delivery_mode}`}
                value={user.delivery_mode}
                onChange={handleInputChange}
                required
                placeholder='Enter the chosen delivery mode if there is any. Else, you may enter your additional instructions for deliveries or pick-up'
                type="text" htmlFor={'Delivery-Mode'} defaultValue={''}/> 
            </div>

            <div className='col-span-full'>
            <MyInput
                id="remarks"
                label="Remarks or Instructions you would like to add"
                value={user.remarks}
                onChange={handleInputChange}
                type="text" htmlFor={'Remarks'} defaultValue={''} />
            </div>
            
              {cart.length !== 0 ? (
                <>
                <div className="mt-6 flex gap-x-5 ml-auto">
                  <Button type="button" variant="outline" onClick={() => router.back()}>
                    Cancel
                  </Button>
                  <Button type="submit">
                    Place an Order
                  </Button>
                </div>
                <p className="mt-4 text-gray-500 col-span-full">
                  Please ensure that all details are accurate before submitting the form. Once submitted, the owner of the station will contact you regarding your order.
                  You may also contact them for updates. Thank you!
                </p>

                </>
              
              ) : (
                <p className="mt-4 text-red-500 col-span-full">
                  You must add water first before you can place an order. 
              </p>
              )}

          </div>
        </div>
        </div>
      </form>
    );
  };
  
  export default CustomerInfoComponent;