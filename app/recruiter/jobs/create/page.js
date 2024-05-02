"use client";

import { FiPlus } from "react-icons/fi";
import React, { useEffect, useState } from "react";

import TextArea from "@/Components/TextArea";
import TextInput from "@/Components/TextInput";
import { OutlineButton, SolidButton } from "@/Components/Buttons";

import urls from "@/constants/urls";
import axiosInstance from "@/axiosInstance";
import SelectDropdown from "@/Components/SelectDropdown";

const weights = Object.freeze([
  { label: "1", value: 1 },
  { label: "2", value: 2 },
  { label: "3", value: 3 },
  { label: "4", value: 4 },
  { label: "5", value: 5 },
]);

const skillEntry = Object.freeze({
  label: "",
  weight: "",
});

const CreateJobPage = () => {
  const [jobData, setJobData] = useState({
    id: null,
    companyId: null,
    recruiterId: null,
    city: "",
    state: "",
    title: "",
    about: "",
    country: "",
    zipcode: "",
    createdAt: "",
    updatedAt: "",
    isActive: true,
    locationType: "",
    employmentType: "",
    qualifications: "",
    responsibilities: "",
    skills: [{ ...skillEntry }],
    minimumYearsOfExperience: "",
  });

  const {
    city,
    about,
    state,
    title,
    skills,
    country,
    zipcode,
    isActive,
    locationType,
    employmentType,
    qualifications,
    responsibilities,
    minimumYearsOfExperience,
  } = jobData;

  // TODO remove
  const id = "test-job-id";

  useEffect(() => {
    getPostingData();
  }, []);

  const handleInput = (e) => {
    try {
      const { name, value } = e.target;

      setJobData((prev) => ({ ...prev, [name]: value }));
    } catch (error) {
      console.log(error);
    }
  };

  const addSkill = () =>
    setJobData((prev) => ({
      ...prev,
      skills: [...prev.skills, skillEntry],
    }));

  const handleSelectInput = (i, field, value) => {
    try {
      let skillsCopy = structuredClone(skills);
      skillsCopy[i][field] = value;

      setJobData((prev) => ({ ...prev, skills: skillsCopy }));
    } catch (error) {
      console.log(error);
    }
  };

  const getPostingData = async () => {
    try {
      if (!id) return;

      const response = await axiosInstance.get(
        `${urls.companyJobPostings}/${id}`
      );

      const postingData = response?.data;

      if (!postingData?.skills?.length) {
        postingData.skills = [];
      }
      setJobData((prev) => ({ ...prev, ...postingData }));
    } catch (error) {}
  };

  const handleSubmit = async () => {
    try {
      let payload = { ...jobData };
      payload.id = id;
      payload.companyId = "company-id";
      payload.recruiterId = "recruiter-id";
      payload.createdAt = "dummy time val";

      console.log(payload);

      await axiosInstance.post(urls.createUpdateJobPosting, payload);
    } catch (error) {
      console.log(error);
    }
  };

  console.log(skills);

  return (
    <div className="flex py-8 w-full h-full justify-center">
      <div className="flex flex-col max-h-full overflow-auto gap-y-6 w-3/4 max-w-5xl">
        <h1 className="font-bold text-2xl">Create Job Posting</h1>

        <div className="flex flex-col gap-y-4 max-w-xl">
          <h2 className="text-lg font-semibold">Title</h2>
          <TextInput name="title" value={title} onChange={handleInput} />
        </div>

        <div className="flex flex-col gap-y-4">
          <h2 className="text-xl font-semibold">Job Location</h2>

          <div className="flex items-center gap-x-14">
            <div className="flex flex-col gap-y-4">
              <h2 className="text-lg font-semibold">City</h2>
              <TextInput name="city" value={city} onChange={handleInput} />
            </div>

            <div className="flex flex-col gap-y-4">
              <h2 className="text-lg font-semibold">State</h2>
              <TextInput name="state" value={state} onChange={handleInput} />
            </div>
          </div>

          <div className="flex items-center gap-x-14">
            <div className="flex flex-col gap-y-4">
              <h2 className="text-lg font-semibold">Country</h2>
              <TextInput
                name="country"
                value={country}
                onChange={handleInput}
              />
            </div>

            <div className="flex flex-col gap-y-4">
              <h2 className="text-lg font-semibold">Zipcode</h2>
              <TextInput
                name="zipcode"
                value={zipcode}
                onChange={handleInput}
              />
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-y-4">
          <h2 className="text-lg font-semibold">Employment Type</h2>
          <TextInput
            className="max-w-40"
            name="employmentType"
            value={employmentType}
            onChange={handleInput}
          />
        </div>

        <div className="flex items-center gap-x-14">
          <div className="flex flex-col gap-y-4">
            <h2 className="text-lg font-semibold">Location Type</h2>
            <TextInput
              name="locationType"
              value={locationType}
              onChange={handleInput}
            />
          </div>

          <div className="flex flex-col gap-y-4">
            <h2 className="text-lg font-semibold">
              Years of Experience Desired
            </h2>
            <TextInput
              onChange={handleInput}
              name="minimumYearsOfExperience"
              value={minimumYearsOfExperience}
            />
          </div>
        </div>

        <div className="flex flex-col gap-y-4">
          <h2 className="text-lg font-semibold">Skills Required</h2>

          {skills?.map(({ label, weight }, i) => {
            let valObject = null;

            if (weight) valObject = { label: weight.toString(), value: weight };

            return (
              <div key={"skill" + i} className="flex items-center gap-x-14">
                <TextInput
                  name="label"
                  value={label}
                  placeholder="Skill name"
                  onChange={(e) =>
                    handleSelectInput(i, "label", e.target.value)
                  }
                />

                <div className="w-52">
                  <SelectDropdown
                    name="weight"
                    options={weights}
                    value={valObject}
                    placeholder="Weight of importance"
                    onChange={(e) => handleSelectInput(i, "weight", e.value)}
                  />
                </div>
              </div>
            );
          })}

          <div
            onClick={addSkill}
            className="flex w-8 h-8 items-center justify-center bg-gray-400 rounded-md cursor-pointer"
          >
            <FiPlus size="1.125rem" color="white" strokeWidth={2.5} />
          </div>
        </div>

        <div className="flex flex-col gap-y-4">
          <h2 className="text-lg font-semibold">About the Job</h2>
          <TextArea name="about" value={about} onChange={handleInput} />
        </div>

        <div className="flex flex-col gap-y-4">
          <h2 className="text-lg font-semibold">Responsibilities</h2>
          <TextArea
            name="responsibilities"
            value={responsibilities}
            onChange={handleInput}
          />
        </div>

        <div className="flex flex-col gap-y-4">
          <h2 className="text-lg font-semibold">Qualifications</h2>
          <TextArea
            name="qualifications"
            value={qualifications}
            onChange={handleInput}
          />
        </div>

        <div className="flex items-center gap-x-8">
          <OutlineButton>CANCEL</OutlineButton>
          <SolidButton onClick={handleSubmit}>PUBLISH</SolidButton>
        </div>
      </div>
    </div>
  );
};

export default CreateJobPage;
