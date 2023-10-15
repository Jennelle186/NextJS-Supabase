//not using this

// import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
// import { NextApiRequest, NextApiResponse } from "next";
// import { cookies } from "next/headers";

// export default async function DELETE(req: NextApiRequest, res: NextApiResponse) {
//   if (req.method === "DELETE") {
//     const { water_id } = req.body as { water_id: String }; // You can pass the water_id in the request body

//     try {
//       // Use the water_id to specify which record to delete
//       const supabase = createServerComponentClient({ cookies });
//       const { data, error } = await supabase
//         .from("water_type") // Replace with your table name
//         .delete()
//         .eq("id", water_id);

//       if (error) {
//         return res.status(500).json({ error: "Error deleting record" });
//       }

//       console.log("Response data:", data); // Changed "res" to "data" to log the correct variable
//       return res.status(200).json({ message: "Record deleted successfully" });
//     } catch (error) {
//       return res.status(500).json({ error: "Error deleting record" });
//     }
//   } else {
//     return res.status(405).json({ error: "Method not allowed" });
//   }
// }
