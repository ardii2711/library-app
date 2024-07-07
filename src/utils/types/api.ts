export interface Response<T> {
  message: string;
  payload: T;
}

export interface Pagination<T> {
  totalItems: number;
  datas: T;
  totalPages: number;
  currentPage: number;
}
