import axios from "axios";
import { toast } from "react-toastify";
// axios.defaults.baseURL = process.env.REACT_APP_ENDPOINT;
import Cookies from "universal-cookie";

const cookies = new Cookies();
const instance = axios.create({
  // baseURL: process.env.REACT_APP_ENDPOINT,
  headers: { "refresh-token": "foobar" },
});
console.log("process.env.REACT_APP_ENDPOINT=", process.env.REACT_APP_ENDPOINT);
// axios.defaults.headers.common["x-auth-token"] = "token";

// Add a request interceptor
instance.defaults.withCredentials = true;
instance.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (success) => {
    console.log("success - ", success);
    return success;
  },

  (error) => {
    console.log("Log Error = ", error);
    if (error?.response?.data?.message)
      toast.error(error?.response?.data?.message);
    else toast.error(error.message);

    return Promise.reject(error);
  }
);
export default instance;
