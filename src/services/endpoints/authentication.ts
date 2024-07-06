import { AuthUser } from "../../contexts/authContext";
import axiosInstance from "../axios";

export const login = async (email: string, password: string) => {
  try {
    const response = await axiosInstance.post(
      "/auth/login",
      {
        email,
        password,
      },
      { withCredentials: true }
    );
    return response;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const getUser = async () => {
  try {
    const response = await axiosInstance.get("/auth");
    console.log(response);
    return response.data.user as AuthUser;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const logout = async () => {
  try {
    const response = await axiosInstance.post("/auth/logout");
    console.log(response);
    return response;
  } catch (error) {
    return Promise.reject(error);
  }
};
