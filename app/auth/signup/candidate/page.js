"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { AuthenticationDetails, CognitoUser } from "amazon-cognito-identity-js";

import TextInput from "@Components/TextInput";
import { SolidButton } from "@Components/Buttons";

import candidatePool from "@/constants/candidatePool";
import { CANDIDATE } from "@/constants";
import { login } from "@/redux/slices/authSlice";

const CandidateSignupPage = () => {
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    lastname: "",
    firstname: "",
  });
  const [error, setError] = useState(false);

  const { email, firstname, lastname, password } = formData;

  const saveDisabled = !email || !firstname || !lastname || !password;

  const handleFormInput = (e) => {
    try {
      const { name, value } = e.target;

      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    } catch (error) {
      console.log(error);
    }
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
        if (err) {
          setError(true);
          console.log(err, "error");
        } else {
          setError(false);
          handleLogin();
        }
      }
    );
  };

  const handleLogin = () => {
    try {
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
          setError(false);
          const idToken = data?.idToken;

          const usertype = CANDIDATE;
          const uid = idToken?.payload?.sub;
          const accessToken = idToken?.jwtToken;
          const redirectLink = `/${usertype}/profile`;

          dispatch(login({ uid, accessToken, usertype, redirectLink }));

          console.log("Success: ", data);
        },
        onFailure: (err) => {
          console.log("Failure: ", err);
          setError(true);
        },
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col gap-y-4">
      <div className="flex flex-col gap-y-12">
        <h1 className="text-2xl font-bold">Sign Up</h1>

        <div className="flex flex-col gap-y-6">
          <div className="flex flex-col gap-y-2">
            <label className="label">First Name *</label>
            <TextInput
              name="firstname"
              value={firstname}
              onChange={handleFormInput}
            />
          </div>

          <div className="flex flex-col gap-y-2">
            <label className="label">Last Name *</label>
            <TextInput
              name="lastname"
              value={lastname}
              onChange={handleFormInput}
            />
          </div>

          <div className="flex flex-col gap-y-2">
            <label className="label">Email *</label>
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

        <SolidButton disabled={saveDisabled} onClick={handleSubmit}>
          Sign Up
        </SolidButton>
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
