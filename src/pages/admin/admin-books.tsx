import { FaPencilAlt, FaSearch, FaTrash } from 'react-icons/fa';
import { useState, useEffect } from 'react';
import { toast } from 'sonner';

import { TableHeader, TableRow, TableHead, TableBody, TableCell, Table } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';

import { getBooks } from '@/utils/apis/books';
import { IBook } from '@/utils/types/books';
import AddBook from './add-book';

export default function AdminBooks() {
  const [data, setData] = useState<IBook[]>([]);

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    try {
      const response = await getBooks();
      setData(response.payload.datas);
    } catch (error) {
      toast.error((error as Error).message);
    }
  }

  return (
    <>
      <div className="flex items-center justify-between mb-6 gap-4">
        <div className="relative w-full max-w-md">
          <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
          <Input type="text" placeholder="Search books..." className="pl-10 w-full" />
        </div>
        <AddBook />
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>No.</TableHead>
            <TableHead>Title</TableHead>
            <TableHead>Author</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>ISBN</TableHead>
            <TableHead>Featured</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((book, index) => (
            <TableRow key={book.id}>
              <TableCell>{index + 1}</TableCell>
              <TableCell>{book.title}</TableCell>
              <TableCell>{book.author}</TableCell>
              <TableCell>{book.category}</TableCell>
              <TableCell>{book.isbn}</TableCell>
              <TableCell>{book.featured ? <Badge variant="secondary">Yes</Badge> : <Badge variant="outline">No</Badge>}</TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <Button variant="ghost" className="hover:bg-slate-200" size="icon">
                    <FaPencilAlt className="h-4 w-4 " />
                    <span className="sr-only">Edit</span>
                  </Button>
                  <Button variant="ghost" className="hover:bg-slate-200" size="icon">
                    <FaTrash className="h-4 w-4" />
                    <span className="sr-only">Delete</span>
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
}
