import axios from "axios";
import Cookies from "universal-cookie";

let tokenHeaders;
const cookies = new Cookies();

export const tokenKey = "@Token:";

// @Token: {
//    access-token: tokenVal
// }

// Default Headers which needs to be sent in all requests.
const defaultHeaders = {
  common: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
};

// Axios Default configurations
const defaultConfig = {
  timeout: 30000,
  headers: { ...defaultHeaders.common },
};

export const getTokenHeaders = async () => {
  try {
    if (tokenHeaders && tokenHeaders["x-access-token"]) {
      return tokenHeaders;
    }

    const tokenFromLocalStorage = localStorage.getItem(tokenKey);
    return JSON.parse(tokenFromLocalStorage);
  } catch (err) {
    console.log(err);
    return null;
  }
};

export const setTokenHeaders = (headers) =>
  (tokenHeaders = { ...defaultHeaders.common, ...headers });

const storeAuthTokensToSecureStore = (tokenHash) => {
  try {
    if (tokenHash) {
      let stringifiedTokens = JSON.stringify(tokenHash);
      localStorage.setItem(tokenKey, stringifiedTokens);
    }
  } catch (err) {
    console.log(err);
  }
};

// Sets the authentication headers on each request.
// value would be taken if present in the local variable else will take from AsyncStorage
const setTokenHeadersOnRequest = async (config) => {
  let requestConfig = { ...config };
  let requestHeader = { ...config.headers };
  let authHeader = {};

  if (tokenHeaders) {
    authHeader = { ...tokenHeaders };
  } else {
    let storeAuthTokensString = localStorage.getItem(tokenKey);

    if (storeAuthTokensString) {
      let storeAuthTokens = JSON.parse(storeAuthTokensString);
      if (storeAuthTokens && storeAuthTokens["x-access-token"]) {
        const accessToken = storeAuthTokens["x-access-token"];
        authHeader = { Authorization: `Bearer ${accessToken}` };
      }
    }
  }

  if (authHeader) {
    requestHeader = { ...requestHeader, ...authHeader };
    requestConfig.headers = { ...requestHeader };
  }

  return requestConfig;
};

const requestInterceptorOnError = (error) => {
  return Promise.reject(error);
};

// Store the authentication headers in local variable and AsyncStorage in case the application closes
const storeTokenHeadersOnResponse = async (response) => {
  // enable Access-Control-Expose-Headers: true on server
  let responseHeader = { ...response.headers };
  if (responseHeader && responseHeader["x-access-token"]) {
    let accessToken = responseHeader["x-access-token"];

    if (accessToken) {
      tokenHeaders ||= {};
      tokenHeaders["x-access-token"] = accessToken;

      cookies.set("access-token", accessToken);
      storeAuthTokensToSecureStore(tokenHeaders);
    }
  }
  return response;
};

const responseInterceptorOnError = (error) => {
  return new Promise((_, reject) => {
    if (error.response && error.response.status === 403) {
      cookies.remove("access-token");
      localStorage.removeItem(tokenKey);

      if (!window?.location?.pathname?.includes("/login")) {
        localStorage.clear();

        window.location.href = "/login";
      }
    }

    reject(error);
  });
};

const axiosInstance = axios.create({ ...defaultConfig });

axiosInstance.interceptors.request.use(
  setTokenHeadersOnRequest,
  requestInterceptorOnError
);
axiosInstance.interceptors.response.use(
  storeTokenHeadersOnResponse,
  responseInterceptorOnError
);

export default axiosInstance;
