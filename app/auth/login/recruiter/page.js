"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { AuthenticationDetails, CognitoUser } from "amazon-cognito-identity-js";

import TextInput from "@Components/TextInput";
import { SolidButton } from "@Components/Buttons";

import { RECRUITER } from "@/constants";
import recruiterPool from "@/constants/recruiterPool";
import { login } from "@/redux/slices/authSlice";

const RecruiterLoginPage = () => {
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

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
      Pool: recruiterPool,
    });

    const authDetails = new AuthenticationDetails({
      Username: email,
      Password: password,
    });
    setLoading(true);
    user.authenticateUser(authDetails, {
      onSuccess: (data) => {
        setError(false);
        const idToken = data?.idToken;

        const usertype = RECRUITER;
        const uid = idToken?.payload?.sub;
        const accessToken = idToken?.jwtToken;
        const redirectLink = `/${usertype}/jobs`;

        dispatch(login({ uid, accessToken, usertype, redirectLink }));

        console.log("Success: ", data);
      },
      onFailure: (err) => {
        console.log("Failure: ", err);
        setError(true);
        setLoading(false);
      },
    });
  };

  return (
    <div className="flex flex-col gap-y-4">
      <div className="flex flex-col gap-y-12">
        <h1 className="text-2xl font-bold">Login</h1>

        <div className="flex flex-col gap-y-6">
          <div className="flex flex-col gap-y-2">
            <label className="label">Business Email *</label>
            <TextInput name="email" value={email} onChange={handleFormInput} />
          </div>
          <div className="flex flex-col gap-y-2">
            <label className="label">Password *</label>
            <TextInput
              type="password"
              name="password"
              value={password}
              onChange={handleFormInput}
            />
          </div>
        </div>

        <SolidButton onClick={handleSubmit} loading={loading}>
          Login
        </SolidButton>
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
        href="/auth/login/candidate"
        className="w-fit text-xs underline underline-offset-2 tracking-wider font-semibold text-cyan-600"
      >
        ARE YOU A CANDIDATE?
      </Link>
    </div>
  );
};

export default RecruiterLoginPage;
