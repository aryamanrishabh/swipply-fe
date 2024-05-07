"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useSelector } from "react-redux";
import { IoMdAddCircleOutline } from "react-icons/io";

import TextInput from "@/Components/TextInput";
import axiosInstance from "@/axiosInstance";
import urls from "@/constants/urls";

const JobPosting = ({ title, city, state, onClick }) => (
  <div
    onClick={onClick}
    className="flex flex-col w-full gap-y-1 px-6 py-4 pb-8 border-b-2 cursor-pointer hover:bg-gray-100"
  >
    <h2 className="text-lg font-semibold">{title}</h2>
    <span className="text-sm text-gray-500">{`${city}, ${state}`}</span>
  </div>
);

const JobsPage = () => {
  const user = useSelector((state) => state?.auth?.user);
  const companyId = user?.companyId;

  const [loading, setLoading] = useState(false);
  const [jobPostings, setJobPostings] = useState(null);
  const [selectedJobPosting, setSelectedJobPosting] = useState(null);

  const selectedJobData = jobPostings?.[selectedJobPosting];

  useEffect(() => {
    getJobPostings();
  }, []);

  const getJobPostings = async () => {
    try {
      if (!companyId) return;

      const res = await axiosInstance.get(
        `${urls.companyJobPostings}?companyId=${companyId}`
      );
      const data = res?.data || [];

      setJobPostings(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex w-full h-full">
      <div className="flex flex-col w-1/3 border-r-2">
        <div className="flex flex-col w-full h-40 px-6 py-8 gap-y-8 border-b-2">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-bold tracking-wide">Jobs Posted</h1>
            <Link href="/recruiter/jobs/create">
              <IoMdAddCircleOutline
                size="1.75rem"
                strokeWidth={3}
                className="cursor-pointer"
              />
            </Link>
          </div>

          <TextInput placeholder="Search" />
        </div>

        <div className="flex flex-col overflow-auto max-h-[calc(100% - 10rem)]">
          {jobPostings?.map(({ title, city, state }, i) => {
            const selectJob = () => setSelectedJobPosting(i);

            return (
              <JobPosting
                key={i}
                city={city}
                state={state}
                title={title}
                onClick={selectJob}
              />
            );
          })}
        </div>
      </div>

      {selectedJobData && (
        <div className="flex flex-1 flex-col gap-y-16 p-8 max-h-full overflow-auto">
          <div className="flex flex-col gap-y-4">
            <div className="flex flex-col gap-y-1">
              <h2 className="text-2xl font-bold tracking-wide">
                {selectedJobData?.title}
              </h2>
              <span className="text-gray-500">{`${selectedJobData?.city}, ${selectedJobData?.state}`}</span>
            </div>

            {!!selectedJobData?.id && (
              <Link href={`/recruiter/dashboard/${selectedJobData?.id}`}>
                <span className="text-sm tracking-wider underline underline-offset-2 font-bold cursor-pointer w-fit text-cyan-600">
                  VIEW RECOMMENDED CANDIDATES
                </span>
              </Link>
            )}
          </div>

          <div className="flex flex-1 flex-col gap-y-16 max-w-4xl">
            <div className="flex flex-col gap-y-4">
              <h3 className="text-xl font-semibold">About the Job</h3>
              <p className="text-gray-600">{selectedJobData?.about}</p>
            </div>

            <div className="flex flex-col gap-y-1">
              <span className="font-semibold">Responsibilities</span>
              <p className="text-gray-600">
                {selectedJobData?.responsibilities}
              </p>
            </div>

            <div className="flex flex-col gap-y-1">
              <span className="font-semibold">Qualifications</span>
              <p className="text-gray-600">{selectedJobData?.qualifications}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default JobsPage;
