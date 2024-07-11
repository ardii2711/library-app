import { CheckIcon, FilePenIcon, SearchIcon, TrashIcon, XIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';

import { TableHeader, TableRow, TableHead, TableBody, TableCell, Table } from '@/components/ui/table';
import CustomAlert from '@/components/custom-alert';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Layout from '@/components/layout';
import AddBook from './add-book';

import { deleteBook, getBooks } from '@/utils/apis/books';
import { IBook } from '@/utils/types/books';

export default function AdminBooks() {
  const [data, setData] = useState<IBook[]>([]);
  const navigate = useNavigate();

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

  async function handleDelete(id_book: number) {
    try {
      const response = await deleteBook(id_book);
      toast.success(response.message);
      fetchData();
      navigate('/dashboard/books');
    } catch (error) {
      toast.error((error as Error).message);
    }
  }

  return (
    <Layout>
      <div className="flex flex-col gap-6 p-6 sm:p-8 md:p-10">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Admin Book</h1>
          <div className="flex items-center gap-4">
            <AddBook/>
          </div>
        </div>
        <div className="relative w-full max-w-md">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <SearchIcon className="w-5 h-5 text-muted-foreground" />
          </div>
          <Input
            type="search"
            placeholder="Search books..."
            className="w-full pl-10 pr-4 py-2 rounded-md bg-muted focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
          />
        </div>
        <div className="overflow-x-auto rounded-lg shadow-lg">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[50px]">#</TableHead>
                <TableHead>Title</TableHead>
                <TableHead>Author</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>ISBN</TableHead>
                <TableHead className="w-[100px]">Featured</TableHead>
                <TableHead className="w-[100px] text-center">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.map((book, index) => (
                <TableRow key={book.id} className={`transition-colors duration-300 ${index % 2 === 0 ? 'bg-muted/20' : 'bg-muted/10'} hover:bg-muted/30`}>
                  <TableCell className="font-medium">{index + 1}</TableCell>
                  <TableCell>{book.title}</TableCell>
                  <TableCell>{book.author}</TableCell>
                  <TableCell>{book.category}</TableCell>
                  <TableCell>{book.isbn}</TableCell>
                  <TableCell className="text-center">
                    {book.featured ? <CheckIcon className="w-5 h-5 text-primary" /> : <XIcon className="w-5 h-5 text-muted-foreground" />}
                  </TableCell>
                  <TableCell className="flex items-center justify-center gap-2">
                    <Link to={`/dashboard/books/${book.id}`}>
                      <FilePenIcon className="w-5 h-5 text-muted-foreground hover:text-primary transition-colors" />
                    </Link>
                    <CustomAlert
                      title="Delete Book"
                      description={`Are you sure you want to delete the book titled "${book.title}"? This action cannot be undone.`}
                      onAction={() => handleDelete(book.id)}
                      
                    >
                      <Button size="icon" variant="ghost">
                        <TrashIcon className="w-5 h-5 text-muted-foreground hover:text-red-500 transition-colors" />
                      </Button>
                    </CustomAlert>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </Layout>
  );
}
