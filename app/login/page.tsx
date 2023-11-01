import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";
import GoogleSignIn from "../auth/AuthButton/AuthButtonGoogle";

export default async function LoginPage() {
  // const supabase  = createServerComponentClient({ cookies})
  // const {data : {session}} = await supabase.auth.getSession();

  // if(session) {
  //   redirect('/')
  // }

  return (
    <>
      <Link href="/">Click me to view all of the water refilling stations</Link>
      <form action="/auth/login" method="post">
      <label htmlFor="email">Email</label>
      <input name="email" />
      <label htmlFor="password">Password</label>
      <input type="password" name="password" />
      <button>Sign In</button>
    </form>

      <GoogleSignIn/>
      <br/>
      <Link href="/reset-password">Reset Password</Link>
    </>
  )
}