import axios from 'axios';

import { IResponse } from '@/utils/types/api';
import axiosWithConfig from './axios-with-config';
import { ILogin, LoginSchema, RegisterSchema } from '../types/auth';

export const userLogin = async (body: LoginSchema) => {
  try {
    const response = await axiosWithConfig.post('/login', body);
    return response.data as IResponse<ILogin>;
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

export const userRegister = async (body: RegisterSchema) => {
  try {
    const response = await axiosWithConfig.post('/register', body);

    return response.data as IResponse<undefined>;
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
