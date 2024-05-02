import { apiURL } from "./variable";

const companyRoute = `${apiURL}/company`;
const candidateRoute = `${apiURL}/candidate`;
const recruiterRoute = `${apiURL}/recruiter`;

const urls = {
  companyFileUpload: `${companyRoute}/upload`,
  candidateFileUpload: `${candidateRoute}/upload`,
  candidateResumeUpload: `${apiURL}/uploadResume`,
  candidateProfile: `${candidateRoute}/profile`,
  updateCandidateProfile: `${candidateRoute}/profile/createOrUpdate`,
  recruiterProfile: `${recruiterRoute}/profile`,
  updateRecruiterProfile: `${recruiterRoute}/profile/createOrUpdate`,
  companyJobPostings: `${companyRoute}/jobs`,
  getAllCompanies: `${companyRoute}/list`,
  createUpdateJobPosting: `${companyRoute}/jobs/createOrUpdate`,
};

export default urls;
