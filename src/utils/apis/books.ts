import axios from 'axios';

import { AddBookSchema, EditBookSchema, IBook } from '@/utils/types/books';
import { checkProperty, valueFormatData } from '../functions';
import { IPagination, IResponse } from '@/utils/types/api';
import axiosWithConfig from './axios-with-config';

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

export const updateBook = async (id_book: number, body: EditBookSchema) => {
  try {
    const formData = new FormData();
    let key: keyof typeof body;

    for (key in body) {
      if (checkProperty(body[key])) {
        formData.append(key, valueFormatData(body[key]));
      }
    }

    const response = await axiosWithConfig.put(`/books/${id_book}`, formData);
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

export const deleteBook = async (id_book: number) => {
  try {
    const response = await axiosWithConfig.delete(`/books/${id_book}`);
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
