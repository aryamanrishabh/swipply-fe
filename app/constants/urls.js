import { apiURL } from "./variable";

const companyRoute = `${apiURL}/company`;
const candidateRoute = `${apiURL}/candidate`;
const recruiterRoute = `${apiURL}/recruiter`;

const urls = {
  match: `${apiURL}/match`,
  companyFileUpload: `${companyRoute}/upload`,
  candidateFileUpload: `${candidateRoute}/upload`,
  candidateResumeUpload: `${apiURL}/uploadResume`,
  uploadProfilePicture: `${apiURL}/uploadProfilePicture`,
  candidateProfile: `${candidateRoute}/profile`,
  updateCandidateProfile: `${candidateRoute}/profile/createOrUpdate`,
  recruiterProfile: `${recruiterRoute}/profile`,
  updateRecruiterProfile: `${recruiterRoute}/profile/createOrUpdate`,
  companyJobPostings: `${companyRoute}/jobs`,
  getAllCompanies: `${companyRoute}/list`,
  createUpdateJobPosting: `${companyRoute}/jobs/createOrUpdate`,
  companyProfile: `${companyRoute}/profile`,
  updateCompanyProfile: `${companyRoute}/profile/createOrUpdate`,
  getJobRecommendations: `${apiURL}/recommend/jobs`,
  getCandidateRecommendations: `${apiURL}/recommend/candidates`,
  getMessages: `${apiURL}/getMessages`,
};

export default urls;
