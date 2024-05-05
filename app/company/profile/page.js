"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { GoOrganization } from "react-icons/go";

import TextArea from "@/Components/TextArea";
import TextInput from "@/Components/TextInput";
import SelectDropdown from "@/Components/SelectDropdown";
import { industrySectors } from "@/constants/industrySectors";
import { OutlineButton, SolidButton } from "@/Components/Buttons";

import urls from "@/constants/urls";
import axiosInstance from "@/axiosInstance";

const CompanyPage = () => {
  const router = useRouter();

  const [companyData, setCompanyData] = useState({
    id: null,
    name: "",
    about: "",
    website: "",
    createdAt: null,
    imageS3Key: "",
    contactName: "",
    contactEmail: "",
    contactPhone: "",
    industrySector: null,
    contactCountryCode: "",
  });

  const {
    id,
    name,
    about,
    website,
    imageS3Key,
    contactName,
    contactEmail,
    contactPhone,
    industrySector,
    contactCountryCode,
  } = companyData;

  const saveDisabled =
    !name ||
    !website ||
    !contactEmail ||
    !contactName ||
    !contactPhone ||
    !industrySector;

  useEffect(() => {
    getCompanyData();
  }, []);

  const handleBack = () => router.back();

  const handleFormInput = (e) => {
    try {
      const { name, value } = e.target;

      setCompanyData((prev) => ({ ...prev, [name]: value }));
    } catch (error) {
      console.log(error);
    }
  };

  const getCompanyData = async () => {
    try {
      if (!id) return;

      const res = await axiosInstance.get(`${urls.companyProfile}/${id}`);
      const data = res?.data || {};

      if (data?.industrySector) {
        industryVal = industrySectors?.find(
          ({ value }) => value === data?.industrySector
        );
        data.industrySector = industryVal;
      }

      setCompanyData(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async () => {
    try {
      const payload = { ...companyData };

      if (payload?.industrySector)
        payload.industrySector = payload?.industrySector?.value;

      const res = await axiosInstance.post(urls.updateCompanyProfile, payload);
      const companyId = res?.data?.body?.id;

      router.push(`/recruiter/profile?companyId=${companyId}`);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex flex-1 p-12 items-start justify-between max-h-full overflow-auto">
      <div className="flex flex-col gap-y-12 w-2/5">
        <div className="flex flex-col gap-y-2">
          <label className="label">Company Name *</label>
          <TextInput
            name="name"
            value={name}
            className="max-w-40"
            onChange={handleFormInput}
          />
        </div>

        <div className="flex flex-col gap-y-2">
          <label className="label">Company Website URL *</label>
          <TextInput
            name="website"
            value={website}
            className="max-w-40"
            onChange={handleFormInput}
          />
        </div>

        <div className="flex flex-col gap-y-2 w-80">
          <label className="label">Industry Sector *</label>

          <SelectDropdown
            value={industrySector}
            options={industrySectors}
            onChange={(e) =>
              setCompanyData((prev) => ({ ...prev, industrySector: e }))
            }
          />
        </div>

        <div className="flex flex-col gap-y-2">
          <label className="label">About</label>
          <TextArea name="about" value={about} onChange={handleFormInput} />
        </div>

        <div className="flex flex-col gap-y-4">
          <h2 className="text-xl font-semibold">Contact Person Details:</h2>

          <div className="flex flex-col gap-y-2">
            <label className="label">Name *</label>
            <TextInput
              name="contactName"
              value={contactName}
              className="max-w-40"
              onChange={handleFormInput}
            />
          </div>

          <div className="flex items-center gap-x-12">
            <div className="flex flex-col gap-y-2">
              <label className="label">Email *</label>
              <TextInput
                name="contactEmail"
                value={contactEmail}
                className="max-w-40"
                onChange={handleFormInput}
              />
            </div>

            <div className="flex flex-col gap-y-2">
              <label className="label">Phone Number *</label>
              <TextInput
                name="contactPhone"
                value={contactPhone}
                className="max-w-40"
                onChange={handleFormInput}
              />
            </div>
          </div>
        </div>

        <div className="flex items-center gap-x-8">
          <OutlineButton onClick={handleBack}>CANCEL</OutlineButton>
          <SolidButton disabled={saveDisabled} onClick={handleSubmit}>
            SAVE
          </SolidButton>
        </div>
      </div>

      <div className="flex h-32 w-32 rounded-full bg-gray-500 items-center justify-center cursor-pointer relative overflow-hidden">
        <GoOrganization color="white" size="4.5rem" />
        <div className="flex opacity-0 transition w-full h-full absolute backdrop-brightness-50 hover:opacity-85 items-center justify-center">
          <span className="text-xl font-semibold text-white">
            Upload <br /> Picture
          </span>
        </div>
      </div>
    </div>
  );
};

export default CompanyPage;
