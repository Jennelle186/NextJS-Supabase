import Link from "next/link";

export default function LoginPage() {
  return (
    <>
      <form action="/auth/login" method="post">
      <label htmlFor="email">Email</label>
      <input name="email" />
      <label htmlFor="password">Password</label>
      <input type="password" name="password" />
      <button>Sign In</button>
    </form>

    <Link href="/reset-password">Reset Password</Link>
    </>
  )
}