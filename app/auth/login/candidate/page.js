"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { AuthenticationDetails, CognitoUser } from "amazon-cognito-identity-js";

import TextInput from "@Components/TextInput";
import { SolidButton } from "@Components/Buttons";

import { CANDIDATE } from "@/constants";
import candidatePool from "@/constants/candidatePool";

const CandidateLoginPage = () => {
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;

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
    const user = new CognitoUser({
      Username: email,
      Pool: candidatePool,
    });

    const authDetails = new AuthenticationDetails({
      Username: email,
      Password: password,
    });

    user.authenticateUser(authDetails, {
      onSuccess: (data) => {
        const idToken = data?.idToken;

        const usertype = CANDIDATE;
        const uid = idToken?.payload?.sub;
        const accessKey = idToken?.jwtToken;

        dispatch(login({ uid, accessKey, usertype }));

        console.log("Success: ", data);
      },
      onFailure: (err) => {
        console.log("Failure: ", err);
      },
    });
  };

  return (
    <div className="flex flex-col gap-y-4">
      <div className="flex flex-col gap-y-12">
        <h1 className="text-2xl font-bold">Login</h1>

        <div className="flex flex-col gap-y-6">
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

        <SolidButton onClick={handleSubmit}>Login</SolidButton>
      </div>

      <span className="text-sm">
        Don&apos;t have an account?{" "}
        <Link
          href="/auth/signup"
          className="text-xs underline underline-offset-2 tracking-wider font-semibold text-cyan-600"
        >
          REGISTER
        </Link>
      </span>

      <Link
        href="/auth/login/recruiter"
        className="text-xs underline underline-offset-2 tracking-wider font-semibold text-cyan-600"
      >
        ARE YOU A RECRUITER?
      </Link>
    </div>
  );
};

export default CandidateLoginPage;
