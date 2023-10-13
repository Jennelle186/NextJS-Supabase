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
            <h2>Reset Password Component</h2>
            <form onSubmit={resetPassword}>
                <label>Email:</label>
                <input
                    type="email"
                    value={email}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                />
                <button type="submit">Submit</button>
            </form>
            {errorMsg && <div className="text-center text-red-600">{errorMsg}</div>}
            {successMsg && <div className="text-center text-black">{successMsg}</div>}
        </div>
    );
}

export default ResetPasswordComponent;
