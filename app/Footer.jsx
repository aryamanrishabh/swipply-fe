"use client";

import React from "react";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import { FiUser, FiGrid, FiMessageSquare } from "react-icons/fi";

import { CANDIDATE, COMPANY, RECRUITER } from "./constants";

const Footer = () => {
  const path = usePathname();
  const params = useParams();
  const isCandidate = path?.includes?.(CANDIDATE);
  const isRecruiter = path?.includes?.(COMPANY) || path?.includes?.(RECRUITER);

  const usertype = isCandidate ? CANDIDATE : RECRUITER;
  let matchesLink = `/${usertype}/matches`;

  if (isRecruiter && params && params.jobID) {
    matchesLink = `/${usertype}/dashboard/${params.jobID}/matches`
  }

  if (path?.includes?.("auth")) return null;

  return (
    <div className="h-16 min-h-16 flex items-center justify-center gap-x-28 bg-blue-500">
      <Link href={`/${usertype}/profile`}>
        <FiUser color="white" size="1.75rem" strokeWidth={2} />
      </Link>

      <Link href={`/${usertype}/dashboard`}>
        <FiGrid color="white" size="1.75rem" strokeWidth={2} />
      </Link>

      {(isCandidate || !!params?.jobID) && <Link href={matchesLink}>
        <FiMessageSquare color="white" size="1.75rem" strokeWidth={2} />
      </Link>}
    </div>
  );
};

export default Footer;
