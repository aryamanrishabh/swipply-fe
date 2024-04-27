"use client";

import { FiUser } from "react-icons/fi";
import { useParams } from "next/navigation";

import TextArea from "@/Components/TextArea";
import TextInput from "@/Components/TextInput";

import { CANDIDATE, RECRUITER } from "@/constants";

const ProfilePage = () => {
  const params = useParams();
  const isRecruiter = params?.usertype === RECRUITER;
  const isCandidate = params?.usertype === CANDIDATE;

  return (
    <div className="flex flex-1 p-12 items-start justify-between max-h-full overflow-auto ">
      <div className="flex flex-col gap-y-16">
        <div className="flex items-center gap-x-12">
          <div className="flex flex-col gap-y-2">
            <label className="label">First Name</label>
            <TextInput />
          </div>

          <div className="flex flex-col gap-y-2">
            <label className="label">Last Name</label>
            <TextInput />
          </div>
        </div>

        <div className="flex items-center gap-x-12">
          <div className="flex flex-col gap-y-2">
            <label className="label">Email</label>
            <TextInput />
          </div>

          <div className="flex flex-col gap-y-2">
            <label className="label">Phone Number</label>
            <TextInput />
          </div>
        </div>

        <div className="flex items-center gap-x-12">
          <div className="flex flex-col gap-y-2">
            <label className="label">Gender</label>
            <TextInput />
          </div>

          {isCandidate && (
            <div className="flex flex-col gap-y-2">
              <label className="label">Date of Birth</label>
              <TextInput />
            </div>
          )}
        </div>

        {isCandidate && (
          <div className="flex items-center gap-x-12">
            <div className="flex flex-col gap-y-2">
              <label className="label">City</label>
              <TextInput />
            </div>

            <div className="flex flex-col gap-y-2">
              <label className="label">State</label>
              <TextInput />
            </div>
          </div>
        )}

        {isCandidate && (
          <div className="flex items-center gap-x-12">
            <div className="flex flex-col gap-y-2">
              <label className="label">Country</label>
              <TextInput />
            </div>

            <div className="flex flex-col gap-y-2">
              <label className="label">Zipcode</label>
              <TextInput />
            </div>
          </div>
        )}

        {isCandidate && (
          <div className="flex flex-col gap-y-2">
            <label className="label">About Me</label>
            <TextArea />
          </div>
        )}

        {isCandidate && (
          <div className="flex items-center gap-x-12">
            <div className="flex flex-col gap-y-2">
              <label className="label">Years of Experience</label>
              <TextInput />
            </div>

            <div className="flex flex-col gap-y-2">
              <label className="label">Type of Job you are looking for</label>
              <TextInput />
            </div>
          </div>
        )}

        {isCandidate && (
          <div className="flex items-center gap-x-12">
            <div className="flex flex-col gap-y-2">
              <label className="label">University</label>
              <TextInput />
            </div>

            <div className="flex flex-col gap-y-2">
              <label className="label">Degree</label>
              <TextInput />
            </div>
          </div>
        )}

        {isCandidate && (
          <div className="flex items-center gap-x-12">
            <div className="flex flex-col gap-y-2">
              <label className="label">Major</label>
              <TextInput />
            </div>

            <div className="flex flex-col gap-y-2">
              <label className="label">Graduation Date</label>
              <TextInput />
            </div>
          </div>
        )}

        {isCandidate && (
          <div className="flex items-center gap-x-12">
            <div className="flex flex-col gap-y-2">
              <label className="label">Current Organization</label>
              <TextInput />
            </div>

            <div className="flex flex-col gap-y-2">
              <label className="label">Current Role</label>
              <TextInput />
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
      </div>
      <div className="flex h-32 w-32 rounded-full bg-gray-500 items-center justify-center cursor-pointer relative overflow-hidden">
        <FiUser color="white" size="5rem" />
        <div className="flex opacity-0 transition w-full h-full absolute backdrop-brightness-50 hover:opacity-85 items-center justify-center">
          <span className="text-xl font-semibold text-white">
            Upload <br /> Picture
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
