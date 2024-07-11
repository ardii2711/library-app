export interface IRequest {
  path?: string;
  query?: string;
  sort?: "new" | "popular";
  filter?: string;
  limit?: string | number;
  page?: string | number;
}

export interface IResponse<T> {
  message: string;
  payload: T;
}

export interface IPagination<T> {
  totalItems: number;
  datas: T;
  totalPages: number;
  currentPage: number;
}

export interface IMeta {
  currentPage: number;
  totalItems: number;
  totalPages: number;
}
