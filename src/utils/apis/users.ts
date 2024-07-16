import axios from "axios";

import { checkProperty, valueFormatData } from "../functions";
import { ProfileSchema, ProfileType } from "../types/users";
import axiosWithConfig from "./axios-with-config";
import { IResponse } from "../types/api";

export const getProfile = async () => {
  try {
    const response = await axiosWithConfig.get("/users");
    return response.data as IResponse<ProfileType>;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      if (error.response && error.response.data) {
        const message = (error.response.data as { message: string }).message;
        throw new Error(message);
      }
    }
    throw new Error("An unexpected error occurred");
  }
};

export const updateProfile = async (body: ProfileSchema) => {
  try {
    const formData = new FormData();
    let key: keyof typeof body;

    for (key in body) {
      if (checkProperty(body[key])) {
        formData.append(key, valueFormatData(body[key]));
      }
    }

    const response = await axiosWithConfig.put("/users", formData);
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
    return response.data as IResponse<undefined>;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      if (error.response && error.response.data) {
        const message = (error.response.data as { message: string }).message;
        throw new Error(message);
      }
    }
    throw new Error("An unexpected error occurred");
  }
};
