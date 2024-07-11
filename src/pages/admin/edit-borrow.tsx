import { useNavigate, useParams } from 'react-router-dom';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { CustomFormDatePicker } from '@/components/custom-formfield';
import { DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import Layout from '@/components/layout';

import { borrowPayload, BorrowPayload, IBorrow } from '@/utils/types/borrows';
import { getBorrowById, updateBorrow } from '@/utils/apis/borrows';

function EditBorrow() {
  const [borrow, setBorrow] = useState<IBorrow>();
  const navigate = useNavigate();
  const params = useParams();

  const form = useForm<BorrowPayload>({
    resolver: zodResolver(borrowPayload),
    defaultValues: {
      borrow_date: new Date(),
      due_date: new Date(),
      return_date: undefined,
    },
  });

  useEffect(() => {
    if (params.id_borrow) {
      fetchBorrow(Number(params.id_borrow));
    }
  }, [params.id_borrow]);

  useEffect(() => {
    if (borrow) {
      form.setValue('borrow_date', new Date(borrow.borrow_date));
      form.setValue('due_date', new Date(borrow.due_date));
      form.setValue('return_date', borrow.return_date ? new Date(borrow.return_date) : undefined);
    }
  }, [borrow]);

  async function onSubmit(data: BorrowPayload) {
    try {
      const updatedData = {
        ...data,
        borrow_date: new Date(data.borrow_date),
        due_date: new Date(data.due_date),
        return_date: data.return_date ? new Date(data.return_date) : undefined,
      };
      await updateBorrow(Number(params.id_borrow), updatedData);
      toast.success('Borrow updated successfully');
      navigate('/dashboard/borrows');
    } catch (error) {
      toast.error((error as Error).message);
    }
  }

  async function fetchBorrow(id_borrow: number) {
    try {
      const response = await getBorrowById(id_borrow);
      setBorrow(response.payload);
    } catch (error) {
      toast.error((error as Error).message);
    }
  }

  return (
    <Layout>
      <div className="flex justify-center my-8">
        <Card className="w-full max-w-2xl">
          <CardHeader>
            <CardTitle>Edit Borrow</CardTitle>
            <CardDescription>Update Your Borrow Information</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-6">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <CustomFormDatePicker control={form.control} name="borrow_date" label="Borrow Date" placeholder="Select Borrow Date" />
                <CustomFormDatePicker control={form.control} name="due_date" label="Due Date" placeholder="Select Due Date" />
                <CustomFormDatePicker control={form.control} name="return_date" label="Return Date" placeholder="Select Return Date" />
                <DialogFooter>
                  <Button type="submit" disabled={form.formState.isSubmitting} aria-disabled={form.formState.isSubmitting}>
                    Save Borrow
                  </Button>
                </DialogFooter>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}

export default EditBorrow;
