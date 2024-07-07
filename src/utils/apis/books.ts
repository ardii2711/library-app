import { Pagination, Response } from "@/utils/types/api";
import { Books } from "@/utils/types/books";
import { bookSampleData } from "../datas/sample-data";

export const getBooks = () => {
  return new Promise<Response<Pagination<Books[]>>>((resolve, reject) => {
    setTimeout(() => {
      resolve({
        message: "Books Found",
        payload: {
          currentPage: 1,
          datas: bookSampleData,
          totalItems: 10,
          totalPages: 1,
        },
      });
      reject();
    }, 1000);
  });
};

// export const getDetailBook = () => {}
// export const postBook = () => {}
// export const editBook = () => {}
// export const deleteBook = () => {}
