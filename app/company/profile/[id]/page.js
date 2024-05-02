"use client";

import React, { useEffect } from "react";
import { useParams } from "next/navigation";

const CompanyProfilePage = () => {
  const params = useParams();
  const companyID = params?.id;

  useEffect(() => {}, [companyID]);

  const getCompanyProfile = async () => {
    try {
      if (!companyID) return;
    } catch (error) {
      console.log(error);
    }
  };

  return <div>abvpage</div>;
};

export default CompanyProfilePage;
