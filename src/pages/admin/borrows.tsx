import { FilePenIcon, SearchIcon, TrashIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { format, isValid } from 'date-fns';
import { toast } from 'sonner';

import { TableHeader, TableRow, TableHead, TableBody, TableCell, Table } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Layout from '@/components/layout';

import { getBorrows, deleteBorrow } from '@/utils/apis/borrows';
import { IBorrow } from '@/utils/types/borrows';
import CustomAlert from '@/components/custom-alert';

export default function AdminBorrows() {
  const [borrow, setBorrow] = useState<IBorrow[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchBorrows();
  }, []);

  const formatDate = (date: string | null) => {
    return date && isValid(new Date(date)) ? format(new Date(date), 'dd MMM yyyy') : '-';
  };

  async function fetchBorrows() {
    try {
      const response = await getBorrows();
      setBorrow(response.payload.datas);
    } catch (error) {
      toast.error((error as Error).message);
    }
  }

  async function handleDelete(id_borrow: number) {
    try {
      const response = await deleteBorrow(id_borrow);
      toast.success(response.message);
      fetchBorrows();
    } catch (error) {
      toast.error((error as Error).message);
    }
  }

  return (
    <Layout>
      <div className="flex flex-col gap-6 p-6 sm:p-8 md:p-10">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Admin Borrow</h1>
          <div className="flex items-center gap-4">
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
                <TableHead>User</TableHead>
                <TableHead>Book</TableHead>
                <TableHead>Borrow Date</TableHead>
                <TableHead>Due Date</TableHead>
                <TableHead>Return Date</TableHead>
                <TableHead className="w-[100px] text-center">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {borrow.map((borrow, index) => (
                <TableRow key={borrow.id} className={`transition-colors duration-300 ${index % 2 === 0 ? 'bg-muted/20' : 'bg-muted/10'} hover:bg-muted/30`}>
                  <TableCell className="font-medium">{index + 1}</TableCell>
                  <TableCell>{borrow.user.full_name}</TableCell>
                  <TableCell>{borrow.book.title}</TableCell>
                  <TableCell>{formatDate(borrow.borrow_date)}</TableCell>
                  <TableCell>{formatDate(borrow.due_date)}</TableCell>
                  <TableCell>{formatDate(borrow.return_date ?? '-')}</TableCell>
                  <TableCell className="flex items-center justify-center gap-2">
                    <Button size="icon" variant="ghost" onClick={() => navigate(`/dashboard/borrows/${borrow.id}`)}>
                      <FilePenIcon className="w-5 h-5 text-muted-foreground hover:text-primary transition-colors" />
                    </Button>
                    <CustomAlert
                      title="Delete Borrow"
                      description={`Are you sure you want to delete the borrow record for the book titled "${borrow.book.title}" borrowed by "${borrow.user.full_name}"? This action cannot be undone.`}
                      onAction={() => handleDelete(borrow.id)}
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
