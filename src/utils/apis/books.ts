import { IPagination, IResponse } from "@/utils/types/api";
import { IBook } from "@/utils/types/books";
import axiosWithConfig from "./axios-with-config";
import axios from "axios";

export const getBooks = async () => {
  try {
    const response = await axiosWithConfig.get("/books");
    return response.data as IResponse<IPagination<IBook[]>>;
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

export const getDetailBook = async (id_book: number) => {
  try {
    const response = await axiosWithConfig.get(`/books/${id_book}`);
    return response.data as IResponse<IBook>;
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
// export const postBook = () => {};
// export const editBook = () => {};
// export const deleteBook = () => {};
