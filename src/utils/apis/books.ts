import axios from 'axios';

import { IPagination, IResponse } from '@/utils/types/api';
import { AddBookSchema, IBook } from '@/utils/types/books';
import axiosWithConfig from './axios-with-config';
import { checkProperty, valueFormatData } from '../functions';

export const getBooks = async () => {
  try {
    const response = await axiosWithConfig.get('/books');
    return response.data as IResponse<IPagination<IBook[]>>;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response && error.response.data) {
        const message = (error.response.data as { message: string }).message;
        throw new Error(message);
      }
    }
    throw new Error('An unexpected error occurred');
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
    throw new Error('An unexpected error occurred');
  }
};

export const addBook = async (body: AddBookSchema) => {
  try {
    const formData = new FormData();
    let key: keyof typeof body;

    for (key in body) {
      if (checkProperty(body[key])) {
        formData.append(key, valueFormatData(body[key]));
      }
    }

    const response = await axiosWithConfig.post('/books', formData);

    return response.data as IResponse<IBook>;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response && error.response.data) {
        const message = (error.response.data as { message: string }).message;
        throw new Error(message);
      }
    }
    throw new Error('An unexpected error occurred');
  }
};

// export const editBook = () => {};
// export const deleteBook = () => {};
