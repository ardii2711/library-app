import { FaSearch, FaPencilAlt, FaTrash } from 'react-icons/fa';
import { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { toast } from 'sonner';

import { TableHeader, TableRow, TableHead, TableBody, TableCell, Table } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

import { getBorrows } from '@/utils/apis/borrows';
import { IBorrow } from '@/utils/types/borrows';

export default function AdminBorrows() {
  const [borrow, setBorrow] = useState<IBorrow[]>([]);

  useEffect(() => {
    fetchBorrows();
  }, []);

  async function fetchBorrows() {
    try {
      const response = await getBorrows();
      setBorrow(response.payload.datas);
    } catch (error) {
      toast.error((error as Error).message);
    }
  }

  return (
    <>
      <div className="relative w-full max-w-md mb-6">
        <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
        <Input type="text" placeholder="Search borrows..." className="pl-10 w-full" />
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>No.</TableHead>
            <TableHead>User</TableHead>
            <TableHead>Book</TableHead>
            <TableHead>Borrow Date</TableHead>
            <TableHead>Due Date</TableHead>
            <TableHead>Reaturn Date</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {borrow.map((borrow, index) => (
            <TableRow key={borrow.id}>
              <TableCell>{index + 1}</TableCell>
              <TableCell>{borrow.user.full_name}</TableCell>
              <TableCell>{borrow.book.title}</TableCell>
              <TableCell>{format(new Date(borrow.borrow_date), 'dd MMM yyyy')}</TableCell>
              <TableCell>{format(new Date(borrow.due_date), 'dd MMM yyyy')}</TableCell>
              <TableCell>{borrow.return_date ? format(new Date(borrow.return_date), 'dd MMM yyyy') : ''}</TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="icon">
                    <FaPencilAlt className="h-4 w-4" />
                    <span className="sr-only">Edit</span>
                  </Button>
                  <Button variant="ghost" size="icon">
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
