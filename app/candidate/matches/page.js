"use client";

import React, { useEffect, useState } from "react";

import TextInput from "@/Components/TextInput";
import axiosInstance from "@/axiosInstance";
import urls from "@/constants/urls";
import { CANDIDATE, CANDIDATE_TABLE, JOB_TABLE } from "@/constants";
import { useSelector } from "react-redux";
import { usePathname } from "next/navigation";
import { userPictureS3Bucket } from "@/constants/variable";
import useWebSocket from "react-use-websocket";
import Image from "next/image";

const MatchCard = (props) => {
  return (
    <div
      className="flex items-center w-full py-4 px-6 gap-x-4 border-b-2 cursor-pointer hover:bg-gray-100"
      onClick={() => props.loadChat(props?.match?.receiver?.id)} // bug: multiple positions in same company
    >
      <div className="flex h-20 w-20 rounded-full overflow-hidden bg-gray-200">
        <Image
          src={`https://${userPictureS3Bucket}.s3.amazonaws.com/${encodeURIComponent(
            props?.match?.receiver?.company?.imageS3Key
          )}`}
          alt="Profile picture"
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
  const [socketUrl, setSocketUrl] = useState(
    "wss://68m6yysrab.execute-api.us-east-1.amazonaws.com/dev"
  );
  const { sendJsonMessage, lastMessage } = useWebSocket(socketUrl);

  useEffect(() => {
    if (lastMessage !== null) {
      props.setMessages((prev) =>
        prev.concat({ message: lastMessage.data, sender: props.receiver })
      );
    }
  }, [lastMessage]);

  useEffect(() => {
    if (props.receiver) {
      setSocketUrl(
        `wss://68m6yysrab.execute-api.us-east-1.amazonaws.com/dev?owner=${props.userId}&receiver=${props.receiver}`
      );
    }
  }, [socketUrl, props.userId, props.receiver]);

  const handleClickSendMessage = (e) => {
    e.preventDefault();
    if (e.target[0].value && e.target[0].value.length > 0) {
      sendJsonMessage({
        action: "sendMessage",
        message: e.target[0].value,
        owner: props.userId,
        receiver: props.receiver,
      });
      props.setMessages((prev) =>
        prev.concat({ message: e.target[0].value, sender: props.userId })
      );
    }
  };

  // if (!props.messages) {
  //   return <></>;
  // }

  return (
    <div className="flex flex-col w-full h-full">
      <div
        style={{ maxHeight: "calc(100% - 58px)" }}
        className="flex flex-col flex-1 overflow-auto pb-6"
      >
        {props?.messages?.map((message) => (
          <div
            key={message?.id}
            className={
              props?.userId === message?.sender
                ? "flex w-full justify-end"
                : "flex w-full justify-start"
            }
          >
            <p
              className={
                props?.userId === message?.sender
                  ? "py-2 px-3 rounded-lg rounded-br-none justify-end bg-gray-200 tracking-wide"
                  : "py-2 px-3 rounded-lg rounded-bl-none justify-end bg-gray-200 tracking-wide"
              }
            >
              {message?.message || ""}
            </p>
          </div>
        ))}
      </div>
      <form onSubmit={handleClickSendMessage}>
        <label htmlFor="chat" className="sr-only">
          Your message
        </label>
        <div className="flex items-center py-2 px-3 bg-white-50 rounded-lg dark:bg-white-700 h-[58px]">
          <textarea
            id="chat"
            rows="1"
            className="block mx-4 p-2.5 w-full text-sm text-white-900 bg-white rounded-lg border border-white-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-white-800 dark:border-white-600 dark:placeholder-white-400 dark:text-gray dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Your message..."
          ></textarea>
          <button
            type="submit"
            className="inline-flex justify-center p-2 text-blue-600 rounded-full cursor-pointer hover:bg-blue-100 dark:text-blue-500 dark:hover:bg-white-600"
          >
            <svg
              className="w-6 h-6 rotate-90"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"></path>
            </svg>
          </button>
        </div>
      </form>
    </div>
  );
};

const CandidateMatchesPage = () => {
  const user = useSelector((state) => state?.auth?.user);
  const router = usePathname();
  const [matches, setMatches] = useState([]);
  const [messages, setMessages] = useState();
  const [receiver, setReceiver] = useState();

  useEffect(() => {
    getAllMatches();
  }, []);

  const getAllMatches = async () => {
    try {
      if (!user?.id) return;

      const res = await axiosInstance.get(
        `${urls.match}?userId=${user.id}&type=${
          router.toLowerCase().includes(CANDIDATE) ? CANDIDATE_TABLE : JOB_TABLE
        }`
      );
      setMatches(res?.data || []);
    } catch (error) {
      console.err(error);
    }
  };

  const loadChat = async (receiver) => {
    try {
      setReceiver(receiver);
      const res = await axiosInstance.get(
        `${urls.getMessages}?owner=${user.id}&receiver=${receiver}`
      );
      setMessages(res?.data?.Items);
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
          {matches
            ?.filter((match) => match?.fulfilled == "1")
            ?.map((match, index) => (
              <MatchCard key={index} match={match} loadChat={loadChat} />
            ))}
        </div>
      </div>
      <div className="flex flex-1 flex-col gap-y-16 p-8 max-h-full overflow-auto">
        <Chat
          messages={messages}
          userId={user.id}
          receiver={receiver}
          setMessages={setMessages}
        />
      </div>
    </div>
  );
};

export default CandidateMatchesPage;
