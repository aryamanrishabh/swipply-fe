"use client";

import React, { useEffect, useState } from "react";

import TextInput from "@/Components/TextInput";
import axiosInstance from "@/axiosInstance";
import urls from "@/constants/urls";
import { CANDIDATE, CANDIDATE_TABLE, JOB_TABLE } from "@/constants";
import { useSelector } from "react-redux";
import { usePathname } from "next/navigation";
import { userPictureS3Bucket } from "@/constants/variable";

const MatchCard = (props) => {
  console.log(
    `https://${userPictureS3Bucket}.s3.amazonaws.com/${props?.match?.receiver?.company?.imageS3Key}`
  );
  return (
    <div
      className="flex items-center w-full py-4 px-6 gap-x-4 border-b-2 cursor-pointer hover:bg-gray-100"
      onClick={() => props.loadChat(props?.match?.receiver?.companyId)}
    >
      <div className="flex h-20 w-20 rounded-full overflow-hidden bg-gray-200">
        <img
          src={`https://${userPictureS3Bucket}.s3.amazonaws.com/${props?.match?.receiver?.company?.imageS3Key}`}
          alt=""
          width={100}
          height={100}
        />
      </div>

      <div className="flex flex-col gap-y-1">
        <h2 className="text-lg font-semibold">
          {props?.match?.receiver?.company?.name || `Unknown`}
        </h2>
        {/* <span className="text-sm text-gray-500">
          Congratulations on getting
        </span> */}
      </div>
    </div>
  );
};

const Chat = (props) => {
  if (!props.messages || !props.messages.data || !props.messages.data.Items) {
    return <></>;
  }

  return props.messages?.data?.Items.map((message, index) => (
    <p
      key={index}
      className={
        props.userId === message?.sender
          ? "flex flex-1 justify-end"
          : "flex flex-1 justify-start"
      }
    >
      {message?.message || ""}
    </p>
  ));
};

const CandidateMatchesPage = () => {
  const user = useSelector((state) => state?.auth?.user);
  const router = usePathname();
  const id = "6769";
  const [matches, setMatches] = useState([]);
  const [messages, setMessages] = useState();

  useEffect(() => {
    getAllMatches();
  }, []);

  const getAllMatches = async () => {
    try {
      // if(!user?.id) return;

      const res = await axiosInstance.get(
        `${urls.match}?userId=${id}&type=${
          router.toLowerCase().includes(CANDIDATE) ? CANDIDATE_TABLE : JOB_TABLE
        }`
      );
      setMatches(res?.data || []);
    } catch (error) {
      console.log(err);
    }
  };

  const loadChat = async (receiver) => {
    try {
      const res = await axiosInstance.get(
        `${urls.getMessages}?owner=${id}&receiver=${receiver}`
      );
      console.log("messages", res);
      setMessages(res);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="flex w-full h-full">
      <div className="flex flex-col w-1/3 border-r-2">
        <div className="flex flex-col w-full h-40 px-6 py-8 gap-y-6 border-b-2">
          <h1 className="text-xl font-bold tracking-wide">Matches</h1>

          <TextInput placeholder="Search" />
        </div>

        <div className="flex flex-col overflow-auto max-h-[calc(100% - 10rem)]">
          {matches?.map((match, index) => (
            <MatchCard key={index} match={match} loadChat={loadChat} />
          ))}
        </div>
      </div>
      <div className="flex flex-1 flex-col gap-y-16 p-8 max-h-full overflow-auto">
        <Chat messages={messages} userId={id} />
      </div>
    </div>
  );
};

export default CandidateMatchesPage;
