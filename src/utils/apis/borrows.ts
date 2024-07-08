import axios from "axios";
import { IPagination, IResponse } from "../types/api";
import axiosWithConfig from "./axios-with-config";
import { IBorrow } from "../types/borrows";

export const getBorrows = async () => {
  try {
    const response = await axiosWithConfig.get("/borrows");

    return response.data as IResponse<IPagination<IBorrow[]>>;
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
