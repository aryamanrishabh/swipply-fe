import React from "react";
import Link from "next/link";
import { FiChevronRight } from "react-icons/fi";

import { SolidButton } from "@Components/Buttons";

const SignupPage = () => {
  return (
    <div className="flex flex-col gap-y-4">
      <div className="flex flex-col gap-y-12">
        <h1 className="text-2xl font-bold">
          How do you plan on using Swipply?
        </h1>

        <Link href="/auth/signup/candidate">
          <div className="flex w-80 h-20 py-4 px-6 items-center justify-between cursor-pointer rounded-sm bg-slate-200">
            <span className="font-medium tracking-wide">Candidate</span>
            <FiChevronRight size="1.5rem" />
          </div>
        </Link>

        <Link href="/auth/signup/recruiter">
          <div className="flex w-80 h-20 py-4 px-6 items-center justify-between cursor-pointer rounded-sm bg-slate-200">
            <span className="font-medium tracking-wide">Recruiter</span>
            <FiChevronRight size="1.5rem" />
          </div>
        </Link>
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

export default SignupPage;
