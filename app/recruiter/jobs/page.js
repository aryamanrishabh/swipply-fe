import React from "react";
import Link from "next/link";
import { IoMdAddCircleOutline } from "react-icons/io";

import TextInput from "@/Components/TextInput";

const JobPosting = () => (
  <div className="flex flex-col w-full gap-y-1 px-6 py-4 pb-8 border-b-2 cursor-pointer hover:bg-gray-100">
    <h2 className="text-lg font-semibold">Software Engineer Intern</h2>
    <span className="text-sm text-gray-500">Seattle, WA</span>
  </div>
);

const JobsPage = () => {
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
          <JobPosting />
          <JobPosting />
          <JobPosting />
          <JobPosting />
          <JobPosting />
          <JobPosting />
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-y-16 p-8 max-h-full overflow-auto">
        <div className="flex flex-col gap-y-4">
          <div className="flex flex-col gap-y-1">
            <h2 className="text-2xl font-bold tracking-wide">
              Software Engineer Intern
            </h2>
            <span className="text-gray-500">Seattle, WA</span>
          </div>

          <span className="text-sm tracking-wider underline underline-offset-2 font-bold cursor-pointer w-fit text-cyan-600">
            VIEW RECOMMENDED CANDIDATES
          </span>
        </div>

        <div className="flex flex-1 flex-col gap-y-16 max-w-4xl">
          <div className="flex flex-col gap-y-4">
            <h3 className="text-xl font-semibold">About the Job</h3>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime
              mollitia, molestiae quas vel sint commodi repudiandae consequuntur
              voluptatum laborum numquam blanditiis harum quisquam eius sed odit
              fugiat iusto fuga praesentium optio, eaque rerum! Provident
              similique accusantium nemo autem. Veritatis obcaecati tenetur iure
              eius earum ut molestias architecto voluptate aliquam nihil,
              eveniet aliquid culpa officia aut!
            </p>
          </div>

          <div className="flex flex-col gap-y-1">
            <span className="font-semibold">Responsibilities</span>
            <p className="text-gray-600">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime
              mollitia, molestiae quas vel sint commodi repudiandae consequuntur
              voluptatum laborum numquam blanditiis harum quisquam eius sed odit
              fugiat iusto fuga praesentium optio, eaque rerum! Provident
              similique accusantium nemo autem. Veritatis obcaecati tenetur iure
              eius earum ut molestias architecto voluptate aliquam nihil,
              eveniet aliquid culpa officia aut!
            </p>
          </div>

          <div className="flex flex-col gap-y-1">
            <span className="font-semibold">Qualifications</span>
            <p className="text-gray-600">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime
              mollitia, molestiae quas vel sint commodi repudiandae consequuntur
              voluptatum laborum numquam blanditiis harum quisquam eius sed odit
              fugiat iusto fuga praesentium optio, eaque rerum! Provident
              similique accusantium nemo autem. Veritatis obcaecati tenetur iure
              eius earum ut molestias architecto voluptate aliquam nihil,
              eveniet aliquid culpa officia aut!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobsPage;
