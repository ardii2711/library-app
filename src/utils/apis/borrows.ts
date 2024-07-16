import axios from "axios";

import { BorrowPayload, BorrowSchema, IBorrow } from "../types/borrows";
import { IPagination, IResponse } from "../types/api";
import axiosWithConfig from "./axios-with-config";

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

export const postBorrow = async (body: BorrowSchema) => {
  try {
    const response = await axiosWithConfig.post("/borrows", body);

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

export const getBorrowById = async (id_borrow: number) => {
  try {
    const response = await axiosWithConfig.get(`/borrows/${id_borrow}`);
    return response.data as IResponse<IBorrow>;
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

export const updateBorrow = async (id_borrow: number, body: BorrowPayload) => {
  try {
    const response = await axiosWithConfig.put(`/borrows/${id_borrow}`, body);
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

export const deleteBorrow = async (id_borrow: number) => {
  try {
    const response = await axiosWithConfig.delete(`/borrows/${id_borrow}`);
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
