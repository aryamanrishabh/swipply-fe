"use client";

import React, { useState } from "react";
import Link from "next/link";

import TextInput from "@Components/TextInput";
import { SolidButton } from "@Components/Buttons";

import candidatePool from "@/constants/candidatePool";

const CandidateSignupPage = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    lastname: "",
    firstname: "",
  });

  const { email, firstname, lastname, password } = formData;

  const handleFormInput = (e) => {
    try {
      const { name, value } = e.target;

      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    } catch (error) {}
  };

  const handleSubmit = () => {
    candidatePool.signUp(
      email,
      password,
      [
        { Name: "given_name", Value: firstname },
        { Name: "family_name", Value: lastname },
      ],
      null,
      (err, data) => {
        if (err) console.log(err, "error");
        console.log(data, "data");
      }
    );
  };

  return (
    <div className="flex flex-col gap-y-4">
      <div className="flex flex-col gap-y-12">
        <h1 className="text-2xl font-bold">Sign Up</h1>

        <div className="flex flex-col gap-y-6">
          <div className="flex flex-col gap-y-2">
            <label className="label">First Name</label>
            <TextInput
              name="firstname"
              value={firstname}
              onChange={handleFormInput}
            />
          </div>

          <div className="flex flex-col gap-y-2">
            <label className="label">Last Name</label>
            <TextInput
              name="lastname"
              value={lastname}
              onChange={handleFormInput}
            />
          </div>

          <div className="flex flex-col gap-y-2">
            <label className="label">Email</label>
            <TextInput name="email" value={email} onChange={handleFormInput} />
          </div>

          <div className="flex flex-col gap-y-2">
            <label className="label">Password</label>
            <TextInput
              name="password"
              value={password}
              onChange={handleFormInput}
            />
          </div>
        </div>

        <SolidButton onClick={handleSubmit}>Sign Up</SolidButton>
      </div>

      <span className="text-sm">
        Already have an account?{" "}
        <Link
          href="/auth/login/candidate"
          className="text-xs underline underline-offset-2 tracking-wider font-semibold text-cyan-600"
        >
          LOGIN
        </Link>
      </span>
    </div>
  );
};

export default CandidateSignupPage;
