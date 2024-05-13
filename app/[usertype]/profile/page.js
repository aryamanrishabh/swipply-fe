"use client";

import { useEffect, useRef, useState } from "react";
import dayjs from "dayjs";
import Image from "next/image";
import utc from "dayjs/plugin/utc";
import { FiUser } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { FaLink, FaGithub, FaLinkedin } from "react-icons/fa";
import { useParams, useRouter, useSearchParams } from "next/navigation";

import TextArea from "@/Components/TextArea";
import TextInput from "@/Components/TextInput";
import DatePicker from "@/Components/DatePicker";
import { OutlineButton, SolidButton } from "@/Components/Buttons";
import SelectDropdown from "@/Components/SelectDropdown";

import urls from "@/constants/urls";
import axiosInstance from "@/axiosInstance";

import {
  userPictureS3Bucket,
  candidateResumeS3Bucket,
} from "@/constants/variable";
import { genders } from "@/constants/genders";
import { jobTypes } from "@/constants/jobTypes";
import { CANDIDATE, RECRUITER } from "@/constants";
import { LINKEDIN_BLUE } from "@/constants/colors";
import { setUserData } from "@/redux/slices/authSlice";
import { locationTypes } from "@/constants/locationTypes";
import ResumeModal from "./ResumeModal";
import Loader from "@/Components/Loader";

dayjs.extend(utc);

const CREATE_ORG = "create-organization";
const createOrgEntry = Object.freeze({
  label: "+ Add Organization",
  value: CREATE_ORG,
});

const ProfilePage = () => {
  const router = useRouter();
  const params = useParams();
  const inputRef = useRef(null);
  const dispatch = useDispatch();
  const today = dayjs().toDate();
  const resumeInput = useRef(null);
  const usertype = params?.usertype;
  const searchParams = useSearchParams();
  const queryCompanyId = searchParams?.get("companyId");
  const user = useSelector((state) => state?.auth?.user);

  const [mandatoryData, setMandatoryData] = useState({
    id: null,
    email: "",
    phone: "",
    lastname: "",
    gender: null,
    firstname: "",
    countrycode: "",
    createdAt: null,
  });
  const [conditionalData, setConditionalData] = useState({
    city: "",
    state: "",
    about: "",
    dob: null,
    major: "",
    github: "",
    degree: "",
    country: "",
    zipcode: "",
    linkedin: "",
    portfolio: "",
    university: "",
    resumeS3Key: "",
    currentRole: "",
    graduationDate: null,
    lookingForTitle: "",
    yearsOfExperience: "",
    minCompensation: null,
    maxCompensation: null,
    lookingForJobType: null,
    currentOrganization: "",
    preferredLocationType: null,
    profilePictureS3Key: "",
  });
  const [companies, setCompanies] = useState(null);
  const [showDobPicker, setShowDobPicker] = useState(false);
  const [companyLoading, setCompanyLoading] = useState(true);
  const [showGradDatePicker, setShowGradDatePicker] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);

  const isRecruiter = usertype === RECRUITER;
  const isCandidate = usertype === CANDIDATE;

  const {
    dob,
    city,
    state,
    about,
    major,
    degree,
    github,
    country,
    zipcode,
    linkedin,
    portfolio,
    university,
    currentRole,
    resumeS3Key,
    graduationDate,
    minCompensation,
    maxCompensation,
    lookingForTitle,
    yearsOfExperience,
    lookingForJobType,
    currentOrganization,
    preferredLocationType,
    profilePictureS3Key,
  } = conditionalData;
  const { email, phone, gender, lastname, firstname, countrycode, companyId } =
    mandatoryData;

  useEffect(() => {
    getProfile();
  }, [user, companies]);

  useEffect(() => {
    getCompanies();
  }, []);

  useEffect(() => {
    if (!!queryCompanyId && !!companies?.length) {
      const companyVal = companies?.find(
        ({ value }) => value === queryCompanyId
      );
      setMandatoryData((prev) => ({ ...prev, companyId: companyVal }));
      setCompanyLoading(false);
    }
  }, [companies, queryCompanyId]);

  const getProfile = async () => {
    try {
      if (!user?.id) return;

      setLoading(true);
      const url = isRecruiter ? urls.recruiterProfile : urls.candidateProfile;
      const res = await axiosInstance.get(`${url}/${user?.id}`);
      const profile = res?.data || {};

      const data = structuredClone(profile) || {};
      if (data?.gender) {
        const genderVal = genders?.find(({ value }) => value === data?.gender);
        data.gender = genderVal;
      }
      if (data?.lookingForJobType) {
        const jobTypeVal = jobTypes?.find(
          ({ value }) => value === data?.lookingForJobType
        );
        data.lookingForJobType = jobTypeVal;
      }
      if (data?.preferredLocationType) {
        const locationTypeVal = locationTypes?.find(
          ({ value }) => value === data?.preferredLocationType
        );
        data.preferredLocationType = locationTypeVal;
      }

      const mandatoryDataCopy = {};
      Object?.keys(mandatoryData)?.forEach((key) => {
        mandatoryDataCopy[key] = data?.[key] || "";
      });
      mandatoryDataCopy.id = data?.id || null;
      mandatoryDataCopy.createdAt = data?.createdAt || null;

      if (isRecruiter && data?.companyId) {
        const companyVal = companies?.find(
          ({ value }) => value === data?.companyId
        );
        mandatoryDataCopy.companyId = companyVal;
      }

      const conditionalDataCopy = {};
      Object?.keys(conditionalData)?.forEach((key) => {
        conditionalDataCopy[key] = data?.[key] || "";
      });
      conditionalDataCopy.dob = data?.dob || null;
      conditionalDataCopy.graduationDate = data?.graduationDate || null;
      conditionalDataCopy.lookingForJobType = data?.lookingForJobType || null;
      conditionalDataCopy.preferredLocationType =
        data?.preferredLocationType || null;

      setMandatoryData(mandatoryDataCopy);
      setConditionalData(conditionalDataCopy);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const getCompanies = async () => {
    try {
      if (isCandidate || !!companyId) return;

      setCompanyLoading(true);

      const res = await axiosInstance.get(urls.getAllCompanies);
      const data = res?.data?.body || [];

      const companyOptions = data?.map(({ id, name }) => ({
        label: name,
        value: id,
      }));

      const entries = [{ ...createOrgEntry }, ...companyOptions];

      setCompanies(entries);
    } catch (error) {
      console.log(error);
    } finally {
      setCompanyLoading(false);
    }
  };

  const handleMandatoryInput = (e) => {
    try {
      const { name, value } = e.target;

      setMandatoryData((prev) => ({ ...prev, [name]: value }));
    } catch (error) {}
  };

  const handleFormInput = (e) => {
    const { name, value } = e.target;

    setConditionalData((prev) => ({ ...prev, [name]: value }));
  };

  const toggleDobPicker = () => setShowDobPicker((prev) => !prev);
  const toggleGradDatePicker = () => setShowGradDatePicker((prev) => !prev);

  const selectDob = (date) =>
    setConditionalData((prev) => ({ ...prev, dob: date }));

  const selectGradDate = (date) =>
    setConditionalData((prev) => ({ ...prev, graduationDate: date }));

  const handleProfilePictureUpload = async (e) => {
    try {
      if (!user?.id) return;

      const file = e.target?.files?.[0];

      if (!file) return;

      await axiosInstance.post(
        `${urls.uploadProfilePicture}?userId=${user?.id}&type=${usertype}s`,
        file,
        {
          headers: { "Content-Type": file?.type },
        }
      );
      const res = await axiosInstance.get(
        `${urls.uploadProfilePicture}?userId=${user?.id}&type=${usertype}s`
      );
      const profilePictureS3Key = res?.data;
      setConditionalData((prev) => ({ ...prev, profilePictureS3Key }));
    } catch (error) {
      console.log(error);
    }
  };

  const handleResumeUpload = async (e, redirect = false) => {
    try {
      if (!user?.id) return;
      setUploading(true);
      const file = e.target?.files?.[0];

      if (!file) return;

      await axiosInstance.post(
        `${urls.candidateResumeUpload}?userId=${user?.id}`,
        file,
        {
          headers: { "Content-Type": file?.type },
        }
      );
      const res = await axiosInstance.get(
        `${urls.candidateResumeUpload}?userId=${user?.id}`
      );
      const resumeS3Key = res?.data;

      setConditionalData((prev) => ({ ...prev, resumeS3Key }));

      if (redirect) {
        let redirectLink = `/${usertype}/dashboard`;
        if (isRecruiter) redirectLink = `/${usertype}/jobs`;

        router.push(redirectLink);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async () => {
    try {
      if (!user?.id || !user?.createdAt) return;

      setSaving(true);
      const url = isRecruiter
        ? urls.updateRecruiterProfile
        : urls.updateCandidateProfile;

      let payload = { ...mandatoryData };
      payload.id = user?.id;
      payload.createdAt = user?.createdAt;

      if (payload?.gender) {
        payload.gender = payload?.gender?.value;
      }

      if (isRecruiter && companyId) {
        payload.companyId = companyId?.value;
      }

      if (isCandidate) {
        payload = { ...payload, ...conditionalData };

        if (payload?.dob) payload.dob = dayjs(payload?.dob)?.utc()?.format();

        if (payload?.lookingForJobType)
          payload.lookingForJobType = payload?.lookingForJobType?.value;

        if (payload?.preferredLocationType)
          payload.preferredLocationType = payload?.preferredLocationType?.value;
      }

      const res = await axiosInstance.post(url, payload);
      const profile = res?.data?.body || {};

      dispatch(setUserData(profile));

      if (searchParams?.get("from") !== "signup" || isRecruiter) {
        let redirectLink = `/${usertype}/dashboard`;
        if (isRecruiter) redirectLink = `/${usertype}/jobs`;

        router.push(redirectLink);
      } else {
        setSaving(false);
        setShowModal(true);
      }
    } catch (error) {
      setSaving(false);
      console.log(error);
    }
  };

  const handleBack = () => router.back();

  const saveDisabled = !firstname || !lastname || !email || !phone || !gender;

  if (usertype !== CANDIDATE && usertype !== RECRUITER) return <div>404</div>;

  if (loading) {
    return (
      <div className="flex h-full w-full items-center justify-center">
        <Loader />
      </div>
    );
  }

  return (
    <>
      {showModal && (
        <ResumeModal>
          <div className="flex flex-col w-full items-center gap-y-2">
            <h3 className="text-lg tracking-wider font-semibold mb-4">
              Please upload your Resume to move forward
            </h3>
            {!!uploading && (
              <div>
                <Loader />
              </div>
            )}
            {!!resumeS3Key && (
              <a
                target="_blank"
                rel="noreferrer"
                href={`https://${candidateResumeS3Bucket}.s3.amazonaws.com/${encodeURIComponent(
                  resumeS3Key
                )}`}
                className="w-fit"
              >
                <span className="text-sm underline underline-offset-1 font-bold tracking-widest text-cyan-600">
                  PREVIEW
                </span>
              </a>
            )}
            <OutlineButton
              className="!rounded-full"
              onClick={() => resumeInput?.current?.click()}
            >
              Upload Resume
            </OutlineButton>
            <input
              hidden
              type="file"
              ref={resumeInput}
              accept="application/pdf"
              onChange={(e) => handleResumeUpload(e, true)}
            />
            <span className="text-xs tracking-wider text-gray-500">
              PDF (4MB)
            </span>
          </div>
        </ResumeModal>
      )}

      <div className="flex flex-1 p-12 items-start justify-between max-h-full overflow-auto">
        <div className="flex flex-col gap-y-16">
          <div className="flex items-center gap-x-12">
            <div className="flex flex-col gap-y-2">
              <label className="label">First Name *</label>
              <TextInput
                disabled
                name="firstname"
                value={firstname}
                onChange={handleMandatoryInput}
              />
            </div>

            <div className="flex flex-col gap-y-2">
              <label className="label">Last Name *</label>
              <TextInput
                disabled
                name="lastname"
                value={lastname}
                onChange={handleMandatoryInput}
              />
            </div>
          </div>

          <div className="flex items-center gap-x-12">
            <div className="flex flex-col gap-y-2">
              <label className="label">Email *</label>
              <TextInput
                disabled
                name="email"
                value={email}
                onChange={handleMandatoryInput}
              />
            </div>

            <div className="flex flex-col gap-y-2">
              <label className="label">Phone Number *</label>
              <TextInput
                name="phone"
                value={phone}
                onChange={handleMandatoryInput}
              />
            </div>
          </div>

          <div className="flex items-center gap-x-12">
            <div className="flex flex-col gap-y-2 w-80">
              <label className="label">Gender *</label>
              <SelectDropdown
                value={gender}
                options={genders}
                onChange={(e) =>
                  setMandatoryData((prev) => ({ ...prev, gender: e }))
                }
              />
            </div>

            {isCandidate && (
              <div className="flex flex-col gap-y-2 w-80">
                <label className="label">Date of Birth</label>
                <DatePicker
                  date={dob}
                  max={today}
                  setDate={selectDob}
                  open={showDobPicker}
                  toggleCalendar={toggleDobPicker}
                />
              </div>
            )}
          </div>

          {isRecruiter && (
            <div className="flex flex-col gap-y-2 w-80">
              <label className="label">Current Organization *</label>
              <SelectDropdown
                value={companyId}
                options={companies}
                isLoading={companyLoading}
                isDisabled={!companies || !!user?.companyId}
                onChange={(e) => {
                  if (e?.value === CREATE_ORG) {
                    router.push("/company/profile");
                  } else {
                    setMandatoryData((prev) => ({ ...prev, companyId: e }));
                  }
                }}
              />
            </div>
          )}

          {isCandidate && (
            <>
              <div className="flex items-center gap-x-12">
                <div className="flex flex-col gap-y-2">
                  <label className="label">City</label>
                  <TextInput
                    name="city"
                    value={city}
                    onChange={handleFormInput}
                  />
                </div>

                <div className="flex flex-col gap-y-2">
                  <label className="label">State</label>
                  <TextInput
                    name="state"
                    value={state}
                    onChange={handleFormInput}
                  />
                </div>
              </div>

              <div className="flex items-center gap-x-12">
                <div className="flex flex-col gap-y-2">
                  <label className="label">Country</label>
                  <TextInput
                    name="country"
                    value={country}
                    onChange={handleFormInput}
                  />
                </div>

                <div className="flex flex-col gap-y-2">
                  <label className="label">Zipcode</label>
                  <TextInput
                    name="zipcode"
                    value={zipcode}
                    onChange={handleFormInput}
                  />
                </div>
              </div>

              {searchParams?.get("from") !== "signup" && (
                <div className="flex flex-col gap-y-2">
                  {!!uploading && (
                    <div className="ml-16">
                      <Loader />
                    </div>
                  )}
                  {!!resumeS3Key && (
                    <a
                      target="_blank"
                      rel="noreferrer"
                      href={`https://${candidateResumeS3Bucket}.s3.amazonaws.com/${encodeURIComponent(
                        resumeS3Key
                      )}`}
                      className="w-fit ml-2"
                    >
                      <span className="text-sm underline underline-offset-1 font-bold tracking-widest text-cyan-600">
                        PREVIEW
                      </span>
                    </a>
                  )}
                  <OutlineButton
                    className="!rounded-full"
                    onClick={() => resumeInput?.current?.click()}
                  >
                    Upload Resume
                  </OutlineButton>
                  <input
                    hidden
                    type="file"
                    ref={resumeInput}
                    accept="application/pdf"
                    onChange={(e) => handleResumeUpload(e)}
                  />
                  <span className="text-xs tracking-wider text-gray-500 ml-4">
                    PDF (4MB)
                  </span>
                </div>
              )}

              <div className="flex flex-col gap-y-2">
                <label className="label">About Me</label>
                <TextArea
                  name="about"
                  value={about}
                  onChange={handleFormInput}
                />
              </div>

              <div className="flex items-center gap-x-12">
                <div className="flex flex-col gap-y-2">
                  <label className="label">Years of Experience</label>
                  <TextInput
                    name="yearsOfExperience"
                    value={yearsOfExperience}
                    onChange={handleFormInput}
                  />
                </div>

                <div className="flex flex-col gap-y-2 w-80">
                  <label className="label">
                    Type of Job you are looking for
                  </label>

                  <SelectDropdown
                    options={jobTypes}
                    value={lookingForJobType}
                    onChange={(e) =>
                      setConditionalData((prev) => ({
                        ...prev,
                        lookingForJobType: e,
                      }))
                    }
                  />
                </div>
              </div>

              <div className="flex flex-col gap-y-2 w-80">
                <label className="label">Preferred Job Location</label>

                <SelectDropdown
                  options={locationTypes}
                  value={preferredLocationType}
                  onChange={(e) =>
                    setConditionalData((prev) => ({
                      ...prev,
                      preferredLocationType: e,
                    }))
                  }
                />
              </div>

              <div className="flex items-center gap-x-12">
                <div className="flex flex-col gap-y-2">
                  <label className="label">Job Title Preferences</label>
                  <TextInput
                    onChange={handleFormInput}
                    name="lookingForTitle"
                    value={lookingForTitle}
                  />
                </div>

                <div className="flex flex-col gap-y-2 w-80">
                  <label className="label">Desired Compensation</label>

                  <div className="flex item-center gap-x-8 w-40">
                    <TextInput
                      type="number"
                      placeholder="Min"
                      className="w-36"
                      name="minCompensation"
                      value={minCompensation}
                      onChange={handleFormInput}
                      style={{ minWidth: "unset" }}
                    />
                    <TextInput
                      type="number"
                      placeholder="Max"
                      className="w-36"
                      name="maxCompensation"
                      value={maxCompensation}
                      onChange={handleFormInput}
                      style={{ minWidth: "unset" }}
                    />
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-y-8">
                <h3 className="text-2xl font-semibold tracking-wide">
                  Most Recent Graduation Details
                </h3>

                <div className="flex flex-col gap-y-16">
                  <div className="flex items-center gap-x-12">
                    <div className="flex flex-col gap-y-2">
                      <label className="label">University</label>
                      <TextInput
                        name="university"
                        value={university}
                        onChange={handleFormInput}
                      />
                    </div>

                    <div className="flex flex-col gap-y-2">
                      <label className="label">Degree</label>
                      <TextInput
                        name="degree"
                        value={degree}
                        onChange={handleFormInput}
                      />
                    </div>
                  </div>

                  <div className="flex items-center gap-x-12">
                    <div className="flex flex-col gap-y-2">
                      <label className="label">Major</label>
                      <TextInput
                        name="major"
                        value={major}
                        onChange={handleFormInput}
                      />
                    </div>

                    <div className="flex flex-col gap-y-2 w-80">
                      <label className="label">Graduation Date</label>
                      <DatePicker
                        increaseMaxYear
                        date={graduationDate}
                        setDate={selectGradDate}
                        open={showGradDatePicker}
                        toggleCalendar={toggleGradDatePicker}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-x-12">
                <div className="flex flex-col gap-y-2">
                  <label className="label">Current Organization</label>
                  <TextInput
                    onChange={handleFormInput}
                    name="currentOrganization"
                    value={currentOrganization}
                  />
                </div>

                <div className="flex flex-col gap-y-2">
                  <label className="label">Current Role</label>
                  <TextInput
                    name="currentRole"
                    value={currentRole}
                    onChange={handleFormInput}
                  />
                </div>
              </div>

              <div className="flex flex-col gap-y-8 w-80">
                <h3 className="text-2xl font-semibold tracking-wide">Links</h3>
                <div className="flex items-center gap-x-8">
                  <FaLinkedin
                    color={LINKEDIN_BLUE}
                    className="min-w-6 min-h-6"
                  />
                  <TextInput
                    name="linkedin"
                    value={linkedin}
                    onChange={handleFormInput}
                    placeholder="LinkedIn link"
                  />
                </div>

                <div className="flex items-center gap-x-8">
                  <FaLink className="min-w-6 min-h-6" />
                  <TextInput
                    name="portfolio"
                    value={portfolio}
                    onChange={handleFormInput}
                    placeholder="Portfolio/Website link"
                  />
                </div>

                <div className="flex items-center gap-x-8">
                  <FaGithub className="min-w-6 min-h-6" />
                  <TextInput
                    name="github"
                    value={github}
                    onChange={handleFormInput}
                    placeholder="GitHub link"
                  />
                </div>
              </div>
            </>
          )}

          <div className="flex items-center gap-x-8">
            <OutlineButton onClick={handleBack}>CANCEL</OutlineButton>
            <SolidButton
              disabled={saveDisabled}
              loading={saving}
              onClick={handleSubmit}
            >
              SAVE
            </SolidButton>
          </div>
        </div>
        <div className="flex flex-col gap-y-8 items-center">
          <div
            onClick={() => inputRef?.current?.click()}
            className="flex h-32 w-32 rounded-full bg-gray-500 items-center justify-center cursor-pointer relative overflow-hidden"
          >
            {conditionalData?.profilePictureS3Key ? (
              <Image
                alt="Profile picture"
                src={`https://${userPictureS3Bucket}.s3.amazonaws.com/${encodeURIComponent(
                  conditionalData?.profilePictureS3Key
                )}`}
                width={128}
                height={128}
                objectFit="contain"
                className="min-w-full min-h-full"
              />
            ) : (
              <FiUser color="white" size="5rem" />
            )}
            <div className="flex opacity-0 transition w-full h-full absolute backdrop-brightness-50 hover:opacity-85 items-center justify-center">
              <span className="text-xl font-semibold text-white">
                Upload <br /> Picture
              </span>
            </div>
            <input
              hidden
              type="file"
              ref={inputRef}
              accept="image/jpeg, image/jpg"
              onChange={handleProfilePictureUpload}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfilePage;
