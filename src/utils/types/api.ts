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
