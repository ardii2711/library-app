import { z } from "zod";

import { IBook } from "./books";
import { ProfileType } from "./users";

export const borrowSchema = z.object({
  bookId: z
    .number({
      required_error: "Book ID is required",
    })
    .array(),
  borrow_date: z.string({
    required_error: "Borrow date is required",
  }),
});

export const borrowPayload = z.object({
  borrow_date: z.date({
    required_error: "Borrow date is required",
  }),
  due_date: z.date({
    required_error: "Due date is required",
  }),
  return_date: z.date().optional(),
});

export type BorrowSchema = z.infer<typeof borrowSchema>;
export type BorrowPayload = z.infer<typeof borrowPayload>;

export interface IBorrow {
  id: number;
  borrow_date: string;
  due_date: string;
  return_date: string | null;
  book: Pick<IBook, "id" | "title" | "cover_image">;
  user: ProfileType;
}
