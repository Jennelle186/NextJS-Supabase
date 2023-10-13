'use client'

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import React, { useState, ChangeEvent, FormEvent } from "react";

const UpdatePasswordComponent: React.FC = () => {
  const supabase = createClientComponentClient();
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [password, setPassword] = useState<string>('');
  const router = useRouter();

  async function resetPassword(e: FormEvent<HTMLFormElement>): Promise<void> {
    e.preventDefault();
    const { error } = await supabase.auth.updateUser({
      password: password,
    });

    if (error) {
      setErrorMsg(error.message);
    } else {
      setSuccessMsg('Password updated successfully');
      router.replace('/')
    }
  }

  console.log(password, "update password page");

  return (
    <div>
      <h1>Reset Password Component</h1>
      <form onSubmit={resetPassword}>
        <input
          type="password" // Change the input type to password for password input
          value={password}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
        />
        <button type="submit">
          Submit
        </button>
      </form>

      {errorMsg && <div className="text-center text-red-600">{errorMsg}</div>}
      {successMsg && <div className="text-center text-black">{successMsg}</div>}
    </div>
  );
}

export default UpdatePasswordComponent;
