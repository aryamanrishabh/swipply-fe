"use client";

import { useEffect, useRef, useState } from "react";
import { FiUser } from "react-icons/fi";
import { useParams } from "next/navigation";

import TextArea from "@/Components/TextArea";
import TextInput from "@/Components/TextInput";
import { SolidButton } from "@/Components/Buttons";

import urls from "@/constants/urls";
import axiosInstance from "@/axiosInstance";

import {
  userPictureS3Bucket,
  candidateResumeS3Bucket,
} from "@/constants/variable";
import { CANDIDATE, RECRUITER } from "@/constants";

const ProfilePage = () => {
  const params = useParams();
  const inputRef = useRef(null);
  const usertype = params?.usertype;

  const [file, setFile] = useState(null);

  const [userData, setUserData] = useState({
    dob: "",
    city: "",
    state: "",
    about: "",
    major: "",
    github: "",
    degree: "",
    country: "",
    zipcode: "",
    linkedin: "",
    portfolio: "",
    university: "",
    resumeS3Key: "",
    currentRole: "",
    graduationDate: "",
    yearsOfExperience: "",
    lookingForJobType: "",
    currentOrganization: "",
  });
  const [recruiterOnlyData, setRecruiterOnlyData] = useState({
    email: "",
    phone: "",
    gender: "",
    lastname: "",
    firstname: "",
    countrycode: "",
  });

  const isRecruiter = usertype === RECRUITER;
  const isCandidate = usertype === CANDIDATE;

  const {
    dob,
    city,
    state,
    about,
    major,
    degree,
    github,
    country,
    zipcode,
    linkedin,
    portfolio,
    university,
    currentRole,
    resumeS3Key,
    graduationDate,
    yearsOfExperience,
    lookingForJobType,
    currentOrganization,
  } = userData;
  const { email, phone, gender, lastname, firstname, countrycode } =
    recruiterOnlyData;

  useEffect(() => {
    // getProfile();
  }, []);

  const getProfile = async () => {
    try {
      const id = "6769";
      const url = isRecruiter ? urls.recruiterProfile : urls.candidateProfile;
      await axiosInstance.get(`${url}/${id}`);
    } catch (error) {
      console.log(error);
    }
  };

  const handleRecruiterOnlyInput = (e) => {
    try {
      const { name, value } = e.target;

      setRecruiterOnlyData((prev) => ({ ...prev, [name]: value }));
    } catch (error) {}
  };

  const handleFormInput = (e) => {
    const { name, value } = e.target;

    setUserData((prev) => ({ ...prev, [name]: value }));
  };

  const uploadFile = async () => {
    try {
      if (!file?.name) return;

      const blob = new Blob([file]);
      const fileName = file?.name;
      const folderName = usertype + "s";

      await axiosInstance.put(
        `${urls.candidateFileUpload}/${userPictureS3Bucket}/${folderName}%2f${fileName}`,
        file,
        {
          headers: { Accept: "*/*", "Content-Type": file?.type },
          maxBodyLength: Infinity,
          maxContentLength: Infinity,
          responseType: "json",
        }
      );
    } catch (error) {
      console.log(error);
    }
  };

  function toBase64(blob) {
    const reader = new FileReader();
    return new Promise((res, rej) => {
      reader.readAsDataURL(blob);
      reader.onload = function () {
        res(reader.result);
      };
    });
  }

  const uploadResume = async () => {
    try {
      if (!file?.name) return;

      const currentBlob = new Blob([file]);
      const fileName = file?.name;

      // const blob = await toBase64(currentBlob);
      // await axiosInstance.put(
      //   `${urls.candidateResumeUpload}/${candidateResumeS3Bucket}/${fileName}`,
      //   blob,
      //   {
      //     headers: {
      //       "Content-Type": "application/pdf",
      //     },
      //   }
      // );

      await axiosInstance.put(`${urls.candidateResumeUpload}?userId=1`, file, {
        headers: { "Content-Type": file?.type },
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async () => {
    try {
      const id = "test-" + usertype + "id";
      const url = isRecruiter
        ? urls.updateRecruiterProfile
        : urls.updateCandidateProfile;

      let payload = { ...recruiterOnlyData };
      payload.id = id;
      payload.createdAt = "dummy time val";

      if (isCandidate) payload = { ...payload, ...userData };
      console.log(payload);

      const res = await axiosInstance.post(url, payload);
      console.log(res?.data?.body);
    } catch (error) {
      console.log(error);
    }
  };

  if (usertype !== CANDIDATE && usertype !== RECRUITER) return <div>404</div>;

  return (
    <div className="flex flex-1 p-12 items-start justify-between max-h-full overflow-auto">
      <div className="flex flex-col gap-y-16">
        <div className="flex items-center gap-x-12">
          <div className="flex flex-col gap-y-2">
            <label className="label">First Name</label>
            <TextInput
              name="firstname"
              value={firstname}
              onChange={handleRecruiterOnlyInput}
            />
          </div>

          <div className="flex flex-col gap-y-2">
            <label className="label">Last Name</label>
            <TextInput
              name="lastname"
              value={lastname}
              onChange={handleRecruiterOnlyInput}
            />
          </div>
        </div>

        <div className="flex items-center gap-x-12">
          <div className="flex flex-col gap-y-2">
            <label className="label">Email</label>
            <TextInput
              name="email"
              value={email}
              onChange={handleRecruiterOnlyInput}
            />
          </div>

          <div className="flex flex-col gap-y-2">
            <label className="label">Phone Number</label>
            <TextInput
              name="phone"
              value={phone}
              onChange={handleRecruiterOnlyInput}
            />
          </div>
        </div>

        <div className="flex items-center gap-x-12">
          <div className="flex flex-col gap-y-2">
            <label className="label">Gender</label>
            <TextInput
              name="gender"
              value={gender}
              onChange={handleRecruiterOnlyInput}
            />
          </div>

          {isCandidate && (
            <div className="flex flex-col gap-y-2">
              <label className="label">Date of Birth</label>
              <TextInput name="dob" value={dob} onChange={handleFormInput} />
            </div>
          )}
        </div>

        {isCandidate && (
          <div className="flex items-center gap-x-12">
            <div className="flex flex-col gap-y-2">
              <label className="label">City</label>
              <TextInput name="city" value={city} onChange={handleFormInput} />
            </div>

            <div className="flex flex-col gap-y-2">
              <label className="label">State</label>
              <TextInput
                name="state"
                value={state}
                onChange={handleFormInput}
              />
            </div>
          </div>
        )}

        {isCandidate && (
          <div className="flex items-center gap-x-12">
            <div className="flex flex-col gap-y-2">
              <label className="label">Country</label>
              <TextInput
                name="country"
                value={country}
                onChange={handleFormInput}
              />
            </div>

            <div className="flex flex-col gap-y-2">
              <label className="label">Zipcode</label>
              <TextInput
                name="zipcode"
                value={zipcode}
                onChange={handleFormInput}
              />
            </div>
          </div>
        )}

        {isCandidate && (
          <div className="flex flex-col gap-y-2">
            <label className="label">About Me</label>
            <TextArea name="about" value={about} onChange={handleFormInput} />
          </div>
        )}

        {isCandidate && (
          <div className="flex items-center gap-x-12">
            <div className="flex flex-col gap-y-2">
              <label className="label">Years of Experience</label>
              <TextInput
                name="yearsOfExperience"
                value={yearsOfExperience}
                onChange={handleFormInput}
              />
            </div>

            <div className="flex flex-col gap-y-2">
              <label className="label">Type of Job you are looking for</label>
              <TextInput
                name="lookingForJobType"
                value={lookingForJobType}
                onChange={handleFormInput}
              />
            </div>
          </div>
        )}

        {isCandidate && (
          <div className="flex flex-col gap-y-8">
            <h3 className="text-2xl font-semibold tracking-wide">
              Most Recent Graduation Details
            </h3>

            <div className="flex flex-col gap-y-16">
              <div className="flex items-center gap-x-12">
                <div className="flex flex-col gap-y-2">
                  <label className="label">University</label>
                  <TextInput
                    name="university"
                    value={university}
                    onChange={handleFormInput}
                  />
                </div>

                <div className="flex flex-col gap-y-2">
                  <label className="label">Degree</label>
                  <TextInput
                    name="degree"
                    value={degree}
                    onChange={handleFormInput}
                  />
                </div>
              </div>

              <div className="flex items-center gap-x-12">
                <div className="flex flex-col gap-y-2">
                  <label className="label">Major</label>
                  <TextInput
                    name="major"
                    value={major}
                    onChange={handleFormInput}
                  />
                </div>

                <div className="flex flex-col gap-y-2">
                  <label className="label">Graduation Date</label>
                  <TextInput
                    name="graduationDate"
                    value={graduationDate}
                    onChange={handleFormInput}
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {isCandidate && (
          <div className="flex items-center gap-x-12">
            <div className="flex flex-col gap-y-2">
              <label className="label">Current Organization</label>
              <TextInput
                name="currentOrganization"
                value={currentOrganization}
                onChange={handleFormInput}
              />
            </div>

            <div className="flex flex-col gap-y-2">
              <label className="label">Current Role</label>
              <TextInput
                name="currentRole"
                value={currentRole}
                onChange={handleFormInput}
              />
            </div>
          </div>
        )}

        {isCandidate && (
          <div className="flex flex-col gap-y-2 max-w-40">
            <label className="label">Links</label>
            {/* TODO: type + input */}
            <TextInput />
          </div>
        )}

        <div className="flex">
          <SolidButton onClick={handleSubmit}>SAVE</SolidButton>
        </div>
      </div>
      <div className="flex flex-col gap-y-8 items-center">
        <div
          onClick={() => inputRef?.current?.click()}
          className="flex h-32 w-32 rounded-full bg-gray-500 items-center justify-center cursor-pointer relative overflow-hidden"
        >
          <FiUser color="white" size="5rem" />
          <div className="flex opacity-0 transition w-full h-full absolute backdrop-brightness-50 hover:opacity-85 items-center justify-center">
            <span className="text-xl font-semibold text-white">
              Upload <br /> Picture
            </span>
          </div>
          <input
            hidden
            type="file"
            ref={inputRef}
            onChange={(e) => setFile(e.target?.files?.[0])}
          />
        </div>
        {file?.name}
        <SolidButton onClick={uploadResume}>upload</SolidButton>
      </div>
    </div>
  );
};

export default ProfilePage;
