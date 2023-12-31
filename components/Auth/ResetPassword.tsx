'use client'

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import React, { useState, ChangeEvent, FormEvent } from "react";

const ResetPasswordComponent: React.FC = () => {
    const supabase = createClientComponentClient();
    const [errorMsg, setErrorMsg] = useState<string | null>(null);
    const [successMsg, setSuccessMsg] = useState<string | null>(null);
    const [email, setEmail] = useState<string>('');

    const resetPassword = async (e: FormEvent) => {
        e.preventDefault();
        const { error } = await supabase.auth.resetPasswordForEmail(email, {
          // redirectTo: `${window.location.origin}/auth/update-password`,
          redirectTo: `${window.location.origin}/auth/update-password`,
        });
    
        if (error) {
          setErrorMsg(error.message);
        } else {
          setSuccessMsg('Password reset instructions sent.');
        }
    }

    

    return (
        <div>
          <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            className="mx-auto h-10 w-auto"
            src="https://www.cdnlogo.com/logos/s/71/supergiant.svg"
            alt="Your Company"
          />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Reset Password
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" action="#" method="POST" onSubmit={resetPassword}>
            <div>
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                Email address
              </label>
              <div className="mt-2">
                <input
                  value={email}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-cyan-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-cyan-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-cyan-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-600"
              >
                Sign in
              </button>
            </div>
          </form>
        </div>
      </div>
            {errorMsg && <div className="text-center text-red-600">{errorMsg}</div>}
            {successMsg && <div className="text-center text-black">{successMsg}</div>}
        </div>
    );
}

export default ResetPasswordComponent;