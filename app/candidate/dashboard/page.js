"use client";

import { FiLink } from "react-icons/fi";
import { useParams } from "next/navigation";
import { FaRegFilePdf, FaFilePdf } from "react-icons/fa";
import { IoLogoGithub, IoLogoLinkedin } from "react-icons/io";

import { CANDIDATE, RECRUITER } from "@/constants";
import { LINKEDIN_BLUE } from "@/constants/colors";

const RecruiterHeader = () => (
  <div className="flex flex-col gap-y-1">
    <h1 className="text-base tracking-normal font-medium">
      Software Engineer Intern
    </h1>
    <h2 className="text-sm tracking-wide text-gray-500">Google</h2>
    <span className="text-sm tracking-wide font-light">Seattle, WA</span>
  </div>
);

const CandidateHeader = () => (
  <div className="flex flex-col gap-y-1">
    <h1 className="text-base tracking-normal font-medium">Candidate Name</h1>
    <h2 className="text-sm tracking-wide text-gray-500">
      University/Organization Name
    </h2>
    <span className="text-xs tracking-wide text-gray-500">
      New York, NY, USA
    </span>
  </div>
);

const RecruiterBody = () => (
  <div className="flex flex-col gap-y-6">
    <div className="flex flex-col gap-y-4">
      <span className="text-xl font-semibold">About the Job</span>
      <p className="text-gray-600">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime
        mollitia, molestiae quas vel sint commodi repudiandae consequuntur
        voluptatum laborum numquam blanditiis harum quisquam eius sed odit
        fugiat iusto fuga praesentium optio, eaque rerum! Provident similique
        accusantium nemo autem. Veritatis obcaecati tenetur iure eius earum ut
        molestias architecto voluptate aliquam nihil, eveniet aliquid culpa
        officia aut!
      </p>
    </div>

    <div className="flex flex-col gap-y-1">
      <span className="font-semibold">Responsibilities</span>
      <p className="text-gray-600">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime
        mollitia, molestiae quas vel sint commodi repudiandae consequuntur
        voluptatum laborum numquam blanditiis harum quisquam eius sed odit
        fugiat iusto fuga praesentium optio, eaque rerum! Provident similique
        accusantium nemo autem. Veritatis obcaecati tenetur iure eius earum ut
        molestias architecto voluptate aliquam nihil, eveniet aliquid culpa
        officia aut!
      </p>
    </div>

    <div className="flex flex-col gap-y-1">
      <span className="font-semibold">Qualifications</span>
      <p className="text-gray-600">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime
        mollitia, molestiae quas vel sint commodi repudiandae consequuntur
        voluptatum laborum numquam blanditiis harum quisquam eius sed odit
        fugiat iusto fuga praesentium optio, eaque rerum! Provident similique
        accusantium nemo autem. Veritatis obcaecati tenetur iure eius earum ut
        molestias architecto voluptate aliquam nihil, eveniet aliquid culpa
        officia aut!
      </p>
    </div>
  </div>
);

const CandidateBody = () => (
  <div className="flex flex-col gap-y-6">
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-x-2">
        <IoLogoLinkedin
          size="1.75rem"
          color={LINKEDIN_BLUE}
          className="cursor-pointer"
        />
        <IoLogoGithub size="1.5rem" className="cursor-pointer" />
        <FiLink size="1.25rem" className="cursor-pointer" strokeWidth={2.5} />
      </div>

      <div className="flex flex-col items-center cursor-pointer gap-y-1">
        <FaRegFilePdf size="1.5rem" className="text-gray-700" />
        <span className="text-sm text-gray-700">Resume</span>
      </div>
    </div>

    <div className="flex flex-col gap-y-4">
      <span className="text-xl font-semibold">About</span>
      <p className="text-gray-600">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime
        mollitia, molestiae quas vel sint commodi repudiandae consequuntur
        voluptatum laborum numquam blanditiis harum quisquam eius sed odit
        fugiat iusto fuga praesentium optio, eaque rerum! Provident similique
        accusantium nemo autem. Veritatis obcaecati tenetur iure eius earum ut
        molestias architecto voluptate aliquam nihil, eveniet aliquid culpa
        officia aut!
      </p>
    </div>

    <div className="flex flex-col gap-y-4">
      <span className="text-xl font-semibold">Education</span>

      <div className="flex flex-col gap-y-1">
        <h3 className="text-lg text-gray-600 font-semibold">
          New York University
        </h3>
        <span className="text-sm text-gray-600">
          Master&apos;s of Science, Computer Science
        </span>
        <span className="text-sm text-gray-600">Graduation May 2025</span>
      </div>
    </div>
  </div>
);

const DashboardPage = () => {
  const params = useParams();
  const isCandidate = params?.usertype === CANDIDATE;
  const isRecruiter = params?.usertype === RECRUITER;

  return (
    <div className="flex flex-col max-h-full overflow-auto gap-y-8">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-x-4">
          <div className="h-28 w-28 border-[1.5px] bg-gray-200 rounded-full"></div>
          {isCandidate ? <CandidateHeader /> : <RecruiterHeader />}
        </div>
      </div>

      {isCandidate ? <CandidateBody /> : <RecruiterBody />}
    </div>
  );
};

export default DashboardPage;
