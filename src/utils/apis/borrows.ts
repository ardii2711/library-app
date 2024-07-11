import axios from 'axios';

import { BorrowSchema, IBorrow } from '../types/borrows';
import { IPagination, IResponse } from '../types/api';
import axiosWithConfig from './axios-with-config';

export const getBorrows = async () => {
  try {
    const response = await axiosWithConfig.get('/borrows');

    return response.data as IResponse<IPagination<IBorrow[]>>;
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

export const postBorrow = async (body: BorrowSchema) => {
  try {
    const response = await axiosWithConfig.post('/borrows', body);

    return response.data as IResponse<undefined>;
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
