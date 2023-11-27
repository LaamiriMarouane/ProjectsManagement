import axios from "axios";
import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router-dom";

const usAxios = () => {
  const user = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : {};
  const axiosInstance = axios.create({
    baseURL: "http://localhost:8080/api/v2",
    headers: {
      Authorization: `Bearer ${user?.accessToken}`,
    },
  });

  axiosInstance.interceptors.request.use(async (req, res) => {
    // const user = jwt_decode(auth?.accessToken);
    // const isExpired = dayjs.unix(user?.exp).diff(dayjs()) < 1;
    //to remove
    return req;
    // if (!isExpired) {
    //   return req;
    // }
    //
    //   try {
    //     const response = await axios.get("/api/users/refresh", {
    //       refreshToken:auth?.refreshToken,
    //     });
    //     localStorage.setItem(
    //       "user",
    //       JSON.stringify({
    //         ...response?.data,
    //       })
    //     );
    //     req.headers.Authorization = `Bearer ${response?.data?.accessToken}`;
    //     return req;
    //   } catch (error) {
    //     console.log(error);
    //
    // }
  });
  return axiosInstance;
};
export default usAxios;
