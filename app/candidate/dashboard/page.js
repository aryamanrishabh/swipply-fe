"use client";

import { useState, useEffect } from "react";
import { FiLink } from "react-icons/fi";
import { useSelector } from "react-redux";
import { useParams } from "next/navigation";
import { FiX, FiCheck } from "react-icons/fi";
import { FaRegFilePdf, FaFilePdf } from "react-icons/fa";
import { IoLogoGithub, IoLogoLinkedin } from "react-icons/io";

import urls from "@/constants/urls";
import axiosInstance from "@/axiosInstance";

import { usePrevious } from "@/hooks/usePrevious";
import { LINKEDIN_BLUE } from "@/constants/colors";
import { LEFT, RIGHT } from "@/constants/swipeDirections";
import { CANDIDATE, IGNORE_JOB_IDS, RECRUITER } from "@/constants";

import { dummyJobs } from "@/dummyData/recommendedJobs";

const RecruiterHeader = ({ title, city, state }) => (
  <div className="flex flex-col gap-y-1">
    <h1 className="text-base tracking-normal font-medium">{title}</h1>
    <h2 className="text-sm tracking-wide text-gray-500">Google</h2>
    <span className="text-sm tracking-wide font-light">{`${city}, ${state}`}</span>
  </div>
);

const RecruiterBody = ({ about, qualifications, responsibilities }) => (
  <div className="flex flex-col gap-y-6">
    {!!about && (
      <div className="flex flex-col gap-y-4">
        <span className="text-xl font-semibold">About the Job</span>
        <p className="text-gray-600">{about}</p>
      </div>
    )}

    {!!responsibilities && (
      <div className="flex flex-col gap-y-1">
        <span className="font-semibold">Responsibilities</span>
        <p className="text-gray-600">{responsibilities}</p>
      </div>
    )}

    {!!qualifications && (
      <div className="flex flex-col gap-y-1">
        <span className="font-semibold">Qualifications</span>
        <p className="text-gray-600">{qualifications}</p>
      </div>
    )}
  </div>
);

const JobCard = ({ i, data }) => {
  const zIndex = 1000 - i;
  console.log(data);

  return (
    <div
      style={{ zIndex }}
      className="p-8 absolute top-0 left-0 flex flex-1 border-[1.66px] bg-white h-full w-full rounded-2xl"
    >
      <div className="flex flex-col w-full max-h-full overflow-auto gap-y-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-x-4">
            <div className="h-28 w-28 border-[1.5px] bg-gray-200 rounded-full"></div>
            <RecruiterHeader
              city={data?.city}
              state={data?.state}
              title={data?.title}
            />
          </div>
        </div>
        <RecruiterBody
          about={data?.about}
          qualifications={data?.qualifications}
          responsibilities={data?.responsibilities}
        />
      </div>
    </div>
  );
};

const DashboardPage = () => {
  const params = useParams();
  const user = useSelector((state) => state?.auth?.user);

  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(1);
  const [recommendedJobs, setRecommendedJobs] = useState([...dummyJobs]);

  const previousPage = usePrevious(page);
  const topRecommendation = recommendedJobs?.[0];

  useEffect(() => {
    if (previousPage !== page) getJobRecommendations();
  }, [page]);

  const handleSwipe = (id, direction) => {
    try {
      // add to local storage
      let ignoreIds = [];
      try {
        ignoreIds = JSON.parse(localStorage.getItem(IGNORE_JOB_IDS));
        ignoreIds ||= [];
      } catch (error) {}

      ignoreIds?.push(id);
      ignoreIds = [...new Set(ignoreIds)];
      ignoreIds = JSON.stringify(ignoreIds);
      localStorage.setItem(IGNORE_JOB_IDS, ignoreIds);

      // pop array
      const jobsCopy = structuredClone(recommendedJobs);
      jobsCopy?.shift();

      // handle pagination
      if (jobsCopy?.length === 3 && page < totalPages)
        setPage((prev) => prev + 1);

      setRecommendedJobs(jobsCopy);

      // api call if right swipe
      if (direction === RIGHT) {
        swipeRight(id);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const swipeRight = async (jobID) => {
    try {
      const user = { id: "6769" };
      if (!user?.id || !jobID) return;

      const matchReceiver = jobID;
      const matchInitiator = user?.id;

      await axiosInstance.post(
        `${urls.match}?matchInitiator=${matchInitiator}&matchReceiver=${matchReceiver}&initiatorType=candidate&receiverType=job`
      );
    } catch (error) {
      console.log(error);
    }
  };

  const getJobRecommendations = async () => {
    try {
      // if (!user?.id) return;
      const id = "6769";
      let ignoreIds = [];

      try {
        ignoreIds = JSON.parse(localStorage.getItem(IGNORE_JOB_IDS));
        ignoreIds ||= [];
      } catch (error) {}

      const payload = {
        id,
        page,
        limit: 10,
        ignoreIds,
      };

      const res = await axiosInstance.post(urls.getJobRecommendations, payload);
      const jobs = res?.data?.body?.jobs || [];
      const numPages = res?.data?.body?.totalPages || 1;
      console.log(res?.data?.body?.jobs);

      const existingJobs = recommendedJobs || [];
      const appendJobs = [...existingJobs, ...jobs];

      setTotalPages(numPages);
      setRecommendedJobs(appendJobs);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-1 max-h-full">
      <div className="flex w-1/4 h-full items-center justify-center">
        {!!recommendedJobs?.length && (
          <div
            onClick={() => handleSwipe(topRecommendation?.id, LEFT)}
            style={{
              background:
                "linear-gradient(135deg, #f85032 0%,#f16f5c 25%,#f6290c 51%,#f02f17 71%,#e73827 100%)",
            }}
            className="flex w-24 h-24 rounded-full items-center justify-center cursor-pointer transition hover:scale-105 hover:shadow-2xl"
          >
            <FiX color="white" size="3rem" strokeWidth={2.5} />
          </div>
        )}
      </div>

      <div className="flex w-1/2 h-full py-8 px-12 justify-center">
        <div className="flex relative w-full h-full max-w-[42rem] justify-center">
          {recommendedJobs?.map((job, i) => (
            <JobCard i={i} key={i} data={job} />
          ))}
        </div>
      </div>

      <div className="flex w-1/4 h-full items-center justify-center">
        {!!recommendedJobs?.length && (
          <div
            onClick={() => handleSwipe(topRecommendation?.id, RIGHT)}
            style={{
              background:
                "linear-gradient(135deg, #b4ddb4 0%,#83c783 25%,#2f9f2f 51%,#1d9b1d 71%,#0b8a0b 100%)",
            }}
            className="flex w-24 h-24 rounded-full items-center justify-center cursor-pointer transition hover:scale-105 hover:shadow-2xl"
          >
            <FiCheck color="white" size="3rem" strokeWidth={2.5} />
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardPage;
