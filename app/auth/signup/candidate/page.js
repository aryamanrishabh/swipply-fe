import React from "react";
import Link from "next/link";

import TextInput from "@Components/TextInput";
import { SolidButton } from "@Components/Buttons";

const CandidateSignupPage = () => {
  return (
    <div className="flex flex-col gap-y-4">
      <div className="flex flex-col gap-y-12">
        <h1 className="text-2xl font-bold">Sign Up</h1>

        <div className="flex flex-col gap-y-6">
          <div className="flex flex-col gap-y-2">
            <label className="label">First Name</label>
            <TextInput />
          </div>

          <div className="flex flex-col gap-y-2">
            <label className="label">Last Name</label>
            <TextInput />
          </div>

          <div className="flex flex-col gap-y-2">
            <label className="label">Email</label>
            <TextInput />
          </div>

          <div className="flex flex-col gap-y-2">
            <label className="label">Password</label>
            <TextInput />
          </div>
        </div>

        <SolidButton disabled>Sign Up</SolidButton>
      </div>

      <span className="text-sm">
        Already have an account?{" "}
        <Link
          href="/auth/login"
          className="text-xs underline underline-offset-1 tracking-wider font-semibold text-cyan-600"
        >
          LOGIN
        </Link>
      </span>
    </div>
  );
};

export default CandidateSignupPage;
