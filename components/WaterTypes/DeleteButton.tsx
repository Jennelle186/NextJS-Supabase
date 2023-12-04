'use client'

import supabase from "@/utils/supabase";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import { useState } from "react";
import SubmitButton from "../Reusables/SubmitButton";

interface DeleteWaterTypeButtonProps {
  water_id: String;
  water_name: String;
}

const DeleteWaterTypeButton: React.FC<DeleteWaterTypeButtonProps> = ({
  water_id,
  water_name,
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [message, setMessage] = useState<string | null>(null);
  const supabase = createClientComponentClient();
  const router = useRouter();

  const toggleOpen = () => {
    setIsOpen((prevIsOpen) => !prevIsOpen);
  };

  const toggleClose = () => {
    setIsOpen(false);
    setMessage(null);
  };
 
  async function handleDeleteButton() {
    try {
      console.log(water_id,"water id inside the handleDeleteButton")
      const { error } = await supabase
        .from('water_type')
        .delete()
        .eq('id', water_id)
        .single()
        if (error) throw error;
        return setMessage('Succesfully deleted!'), router.refresh()
  
      // const response = await fetch("/waterTypes/api", {
      //   method: "DELETE",
      //   body: JSON.stringify({ water_id }),
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      // });

      // console.log(response,"response")

      // if (response.status === 200) {
      //   console.log(`Deleted record with ID: ${water_id}`);
      //   setErrorMessage(null);
      // } else {
      //   const errorResponse = await response.json();
      //   setErrorMessage(errorResponse.error);
      // }

      // toggleClose();
    } catch (error: any) {
      if(error.code == 'PGRST116') return 'Row not found';
      return setMessage(error.message)
      // console.error("Error deleting record:", error);
      // setErrorMessage("An error occurred while deleting the record.");
    }
  };

  return (
    <div>

      <button className="font-bold py-2 px-4 rounded" onClick={toggleOpen}>
        Delete Water Type
      </button>
      <div>
        {isOpen ? (
          <>
            <p>ID: {water_id}</p>
            <p>Are you sure you want to delete {water_name}?</p>
            {message && <p className="text-red-500">{message}</p>}
            <button onClick={handleDeleteButton}>Yes</button>
            <button onClick={toggleClose}>No</button>
          </>
        ) : (
          <p>Closed</p>
        )}
        
      </div>
      
    </div>
  );
};

export default DeleteWaterTypeButton;


//if ever I need the API
// import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
// import { NextApiRequest, NextApiResponse } from "next";
// import { cookies } from "next/headers";

// export async function DELETE(req: NextApiRequest, res: NextApiResponse) {
//     const { water_id } = req.body as { water_id: number }; // You can pass the water_id in the request body

//     try {
//       // Use the water_id to specify which record to delete
//       const supabase = createServerComponentClient({ cookies });
//       const { data, error } = await supabase
//         .from("water_type") // Replace with your table name
//         .delete()
//         .eq("id", Number(water_id));
    
//      // Send the data in the response as JSON
//       return res.json({ dataWater: data });

//     } catch (error) {
//     console.log(error,"error in route.ts")
//       return res.status(500).json({ error: "Error deleting record" });
//     }
// }


