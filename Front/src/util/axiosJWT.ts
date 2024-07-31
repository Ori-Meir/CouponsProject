import axios from "axios";
import { myStore } from "../redux/Store";
import { updateTokenAction } from "../redux/authReducer";

const axiosJWT = axios.create();

axiosJWT.interceptors.request.use(
  (request) => {
    const token = myStore.getState().auth.token;
    console.log("Request Token:", token);
    if (token) {
      request.headers.Authorization = `${token}`;
    } else {
      console.error("No token found");
    }
    return request;
  },
  (error) => {
    console.error("Request Error:", error);
    return Promise.reject(error);
  }
);

axiosJWT.interceptors.response.use(
  (response) => {
    const token = response.headers.authorization;
    console.log("Response Token:", token);
    if (token) {
      myStore.dispatch(updateTokenAction(token));
      sessionStorage.setItem("jwt", token);
    } else {
      console.error("No token found.");
    }
    return response;
  },
  (error) => {
    console.error("Response Error:", error);
    return Promise.reject(error);
  }
);

export default axiosJWT;