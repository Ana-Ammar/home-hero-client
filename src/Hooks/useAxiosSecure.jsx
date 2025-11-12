import axios from "axios";
import { useContext, useEffect } from "react";
import { AuthContext } from "../AuthProvider/AuthContext";

const axiosInstanceSecure = axios.create({
  baseURL: "https://home-hero-server-nu.vercel.app",
});

const useAxiosSecure = () => {
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const requestInterceptor = axiosInstanceSecure.interceptors.request.use(
      (config) => {
        if (user?.accessToken) {
          config.headers.authorization = `Bearer ${user.accessToken}`;
        }
        return config;
      }
    );

    const responseInterceptor = axiosInstanceSecure.interceptors.response.use(
      (res) => {
        return res;
      },
      (err) => {
        // console.log(err)
      }
    );

    return () => {
      axiosInstanceSecure.interceptors.request.eject(requestInterceptor);
      axiosInstanceSecure.interceptors.response.eject(responseInterceptor)
    };
  }, [user]);
  return axiosInstanceSecure;
};

export default useAxiosSecure;
