"use client";

import { useState, useEffect } from "react";
import { FiLink } from "react-icons/fi";
import { useParams } from "next/navigation";
import { FiX, FiCheck } from "react-icons/fi";
import { FaRegFilePdf, FaFilePdf } from "react-icons/fa";
import { IoLogoGithub, IoLogoLinkedin } from "react-icons/io";

import urls from "@/constants/urls";
import axiosInstance from "@/axiosInstance";

import { usePrevious } from "@/hooks/usePrevious";
import { LINKEDIN_BLUE } from "@/constants/colors";
import { candidateResumeS3Bucket } from "@/constants/variable";
import { CANDIDATE, IGNORE_CANDIDATE_IDS, RECRUITER } from "@/constants";

const CandidateHeader = ({ city, state, firstname, lastname, university }) => (
  <div className="flex flex-col gap-y-1">
    <h1 className="text-base tracking-normal font-medium">{`${firstname} ${
      lastname || ""
    }`}</h1>

    {!!university && (
      <h2 className="text-sm tracking-wide text-gray-500">{university}</h2>
    )}

    {!!city && !!state && (
      <span className="text-xs tracking-wide text-gray-500">
        {`${city}, ${state}`}
      </span>
    )}
  </div>
);

const CandidateBody = ({
  about,
  major,
  degree,
  github,
  linkedin,
  portfolio,
  resumeKey,
  university,
  graduationDate,
}) => (
  <div className="flex flex-col gap-y-6">
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-x-4">
        <IoLogoLinkedin
          size="1.75rem"
          color={LINKEDIN_BLUE}
          className="cursor-pointer"
        />
        <IoLogoGithub size="1.5rem" className="cursor-pointer" />
        <FiLink size="1.25rem" className="cursor-pointer" strokeWidth={2.5} />
      </div>

      {!!resumeKey && (
        <a
          target="_blank"
          rel="noreferrer"
          href={`https://${candidateResumeS3Bucket}.s3.amazonaws.com/${encodeURIComponent(
            resumeKey
          )}`}
        >
          <div className="flex flex-col items-center cursor-pointer gap-y-1">
            <FaRegFilePdf size="1.5rem" className="text-gray-700" />
            <span className="text-sm text-gray-700">Resume</span>
          </div>
        </a>
      )}
    </div>

    <div className="flex flex-col gap-y-4">
      <span className="text-xl font-semibold">About</span>
      <p className="text-gray-600">{about}</p>
    </div>

    <div className="flex flex-col gap-y-4">
      <span className="text-xl font-semibold">Education</span>

      <div className="flex flex-col gap-y-1">
        {!!university && (
          <h3 className="text-lg text-gray-600 font-semibold">{university}</h3>
        )}

        {!!degree && !!major && (
          <span className="text-sm text-gray-600">{`${degree}, ${major}`}</span>
        )}

        {!!graduationDate && (
          <span className="text-sm text-gray-600">{`Graduation ${graduationDate}`}</span>
        )}
      </div>
    </div>
  </div>
);

const CandidateCard = ({ i, data }) => {
  const zIndex = 1000 - i;

  return (
    <div
      style={{ zIndex }}
      className="p-8 absolute top-0 left-0 flex flex-1 border-[1.66px] bg-white h-full w-full rounded-2xl"
    >
      <div className="flex flex-col w-full max-h-full overflow-auto gap-y-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-x-4">
            <div className="h-28 w-28 border-[1.5px] bg-gray-200 rounded-full"></div>
            <CandidateHeader
              city={data?.city}
              state={data?.state}
              lastname={data?.lastname}
              firstname={data?.firstname}
              university={data?.university}
            />
          </div>
        </div>
        <CandidateBody
          about={data?.about}
          major={data?.major}
          degree={data?.degree}
          github={data?.github}
          linkedin={data?.linkedin}
          portfolio={data?.portfolio}
          resumeKey={data?.resumeS3Key}
          university={data?.university}
          graduationDate={data?.graduationDate}
        />
      </div>
    </div>
  );
};

const CandidateRecommendationsPage = () => {
  const params = useParams();
  const jobID = params?.jobID;

  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(1);
  const [recommendedCandidates, setRecommendedCandidates] = useState();

  const previousPage = usePrevious(page);
  const topRecommendation = recommendedCandidates?.[0];

  useEffect(() => {
    if (previousPage !== page) getCandidateRecommendations();
  }, [page]);

  const handleSwipe = (id, direction) => {
    try {
      // add to local storage
      let ignoreIds = [];
      try {
        ignoreIds = JSON.parse(localStorage.getItem(IGNORE_CANDIDATE_IDS));
        ignoreIds ||= [];
      } catch (error) {}

      ignoreIds?.push(id);
      ignoreIds = [...new Set(ignoreIds)];
      ignoreIds = JSON.stringify(ignoreIds);
      localStorage.setItem(IGNORE_CANDIDATE_IDS, ignoreIds);

      // pop array
      const candidatesCopy = structuredClone(recommendedCandidates);
      candidatesCopy?.shift();

      // handle pagination
      if (candidatesCopy?.length === 3 && page < totalPages)
        setPage((prev) => prev + 1);

      setRecommendedCandidates(candidatesCopy);

      // api call if right swipe
      if (direction === RIGHT) {
        swipeRight(id);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const swipeRight = async (candidateID) => {
    try {
      if (!jobID || !candidateID) return;

      const matchInitiator = jobID;
      const matchReceiver = candidateID;

      await axiosInstance.post(
        `${urls.match}?matchInitiator=${matchInitiator}&matchReceiver=${matchReceiver}&initiatorType=job&receiverType=candidate`
      );
    } catch (error) {
      console.log(error);
    }
  };

  const getCandidateRecommendations = async () => {
    try {
      if (!jobID) return;

      let ignoreIds = [];

      try {
        ignoreIds = JSON.parse(localStorage.getItem(IGNORE_CANDIDATE_IDS));
        ignoreIds ||= [];
      } catch (error) {}

      const payload = {
        page,
        id: jobID,
        limit: 10,
        ignoreIds,
      };

      const res = await axiosInstance.post(
        urls.getCandidateRecommendations,
        payload
      );
      const candidates = res?.data?.body?.candidates || [];
      const numPages = res?.data?.body?.totalPages || 1;
      console.log(res?.data?.body);

      const existingCandidates = recommendedCandidates || [];
      const appendCandidates = [...existingCandidates, ...candidates];

      setTotalPages(numPages);
      setRecommendedCandidates(appendCandidates);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  console.log(recommendedCandidates);

  return (
    <div className="flex flex-1 max-h-full">
      <div className="flex w-1/4 h-full items-center justify-center">
        {!!recommendedCandidates?.length && (
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
          {recommendedCandidates?.map((candidate, i) => (
            <CandidateCard i={i} key={i} data={candidate} />
          ))}
        </div>
      </div>

      <div className="flex w-1/4 h-full items-center justify-center">
        {!!recommendedCandidates?.length && (
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

export default CandidateRecommendationsPage;
