import Link from "next/link";
import GoogleSignIn from "../auth/AuthButton/AuthButtonGoogle";

// export default async function LoginPage() {
//   // const supabase  = createServerComponentClient({ cookies})
//   // const {data : {session}} = await supabase.auth.getSession();

//   // if(session) {
//   //   redirect('/')
//   // }

//   return (
//     <>
//       <form action="/auth/login" method="post">
//       <label htmlFor="email">Email</label>
//       <input name="email" />
//       <label htmlFor="password">Password</label>
//       <input type="password" name="password" />
//       <button>Sign In</button>
//       <GoogleSignIn/>
//     </form>
//     </>
//   )
// }

const LoginPage = () => {
  return (
    <div className="flex justify-center items-center h-screen pt-8">
    <div className="w-1/2 h-screen hidden lg:block">
    <img className="w-full h-full object-cover" src="https://img.freepik.com/free-photo/landscape-river_181624-33366.jpg?w=740&t=st=1702426920~exp=1702427520~hmac=03fef7c37effb24b54ffc1412a8491eb0c17c8bff9ce14099da58fca8352b0c3" alt="Landscape"></img>
    </div>
    <div className="lg:p-36 md:p-52 sm:20 p-8 w-full lg:w-1/2">
      <h1 className="text-2xl font-semibold mb-4">Log in with Gmail</h1>
      <form action="#" method="POST">
        <div className="mb-4">
          <label htmlFor="username" className="block text-gray-600">The Water Refiling Station System</label>
       </div>
        <div className="mb-4">
          <label htmlFor="password" className="block text-gray-600">Requires a Gmail Log for security purposes</label>
       </div>
        <GoogleSignIn/>
      </form>
    </div>
    </div>
  );
};

export default LoginPage;
