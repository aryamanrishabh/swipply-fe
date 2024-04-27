import React from "react";
import Link from "next/link";

import TextInput from "@Components/TextInput";
import { OutlineButton, SolidButton } from "@Components/Buttons";

const LoginPage = () => {
  return (
    <div className="flex flex-col gap-y-4">
      <div className="flex flex-col gap-y-12">
        <h1 className="text-2xl font-bold">Login</h1>

        <div className="flex flex-col gap-y-6">
          <div className="flex flex-col gap-y-2">
            <label className="label">Email</label>
            <TextInput />
          </div>
          <div className="flex flex-col gap-y-2">
            <label className="label">Password</label>
            <TextInput />
          </div>
        </div>

        <SolidButton>Hello</SolidButton>
        {/* <OutlineButton>HI</OutlineButton> */}
      </div>
      <span className="text-sm">
        Don&apos;t have an account?{" "}
        <Link
          href="/auth/signup"
          className="text-xs underline underline-offset-1 tracking-wider font-semibold text-cyan-600"
        >
          REGISTER
        </Link>
      </span>
    </div>
  );
};

export default LoginPage;
