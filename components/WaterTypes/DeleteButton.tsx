'use client'

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import DialogComponent from "../Reusables/Modal";
import { Button } from "../ui/button";

interface DeleteWaterTypeButtonProps {
  water_id: String;
  water_name: String;
}

export const dynamic = 'force-dynamic'

const DeleteWaterTypeButton: React.FC<DeleteWaterTypeButtonProps> = ({
  water_id,
  water_name,
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [message, setMessage] = useState<string | null>(null);
  const supabase = createClientComponentClient();
  const router = useRouter();

  const cancelButtonRef = useRef(null)

  const toggleOpen = () => {
    setIsOpen((prevIsOpen) => !prevIsOpen);
  };

  const toggleClose = () => {
    setIsOpen(false);
    setMessage(null);
  };
 
  async function handleDeleteButton() {
    console.log('cliked')
    try {
      console.log(water_id,"water id inside the handleDeleteButton")
      const { error } = await supabase
        .from('water_type')
        .delete()
        .eq('id', water_id)
        .single()
        if (error) throw error;
        return setMessage('Succesfully deleted!'), router.refresh(), toggleClose()

    } catch (error: any) {
      // if(error.code == 'PGRST116') return 'Row not found';
      return setMessage(error.message)
      // console.error("Error deleting record:", error);
      // setErrorMessage("An error occurred while deleting the record.");
    }
  };

  return (
    <div>

      <Button className="font-bold py-2 px-4 rounded" onClick={toggleOpen} variant="destructive">
        Delete
      </Button>
      <DialogComponent isOpen={isOpen} onClose={toggleClose}>
         <h3 className="text-base font-semibold leading-6 text-gray-900" id="modal-title">Delete</h3>

         <div className="mt-2">
            <p className="text-sm text-gray-500">
                Are you sure you want to delete  {`${water_name}`}? This action cannot be undone.   
            </p>
          </div>

          <div className="px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                  <Button
                    type="button"
                    className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
                    onClick={() => handleDeleteButton()}
                  >
                    Delete
                  </Button>
                  <Button
                    type="button"
                    className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                    onClick={() => setIsOpen(false)}
                    ref={cancelButtonRef}
                  >
                    Cancel
                  </Button>    
          </div>

          {message && <p className="text-red-500">{message}</p>}
      </DialogComponent>
    </div>
  );
};

export default DeleteWaterTypeButton;
