import axios from "axios";
import { IResponse } from "../types/api";
import { IUser, ProfileSchema } from "../types/users";
import axiosWithConfig from "./axios-with-config"

export const getProfile = async () => {
  try {
    const response = await axiosWithConfig.get("/users");
    return response.data as IResponse<IUser>
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      if (error.response && error.response.data) {
        const message = (error.response.data as { message: string }).message;
        throw new Error(message);
      }
    }
    throw new Error("An unexpected error occurred");
  }
}

export const updateProfile = async (body: ProfileSchema) => {
  try {
    const response = await axiosWithConfig.put("/users", body);
    return response.data as IResponse<undefined>;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response && error.response.data) {
        const message = (error.response.data as { message: string }).message;
        throw new Error(message);
      }
    }
    throw new Error("An unexpected error occurred");
  }
};

export const deleteProfile = async () => {
  try {
    const response = await axiosWithConfig.delete("/users");
    return response.data as IResponse<undefined>
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      if (error.response && error.response.data) {
        const message = (error.response.data as { message: string }).message;
        throw new Error(message);
      }
    }
    throw new Error("An unexpected error occurred");
  }
}