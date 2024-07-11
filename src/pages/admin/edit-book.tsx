import { useNavigate, useParams } from 'react-router-dom';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { CustomFormField } from '@/components/custom-formfield';
import { DialogFooter } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form } from '@/components/ui/form';
import Layout from '@/components/layout';

import { editBookSchema, EditBookSchema, IBook } from '@/utils/types/books';
import { getBooks, updateBook } from '@/utils/apis/books';

function EditBook() {
  const [data, setData] = useState<IBook[]>([]);
  const navigate = useNavigate();
  const params = useParams();

  const form = useForm<EditBookSchema>({
    resolver: zodResolver(editBookSchema),
    defaultValues: {
      title: '',
      cover_image: new File([], ''),
      author: '',
      isbn: '',
      category: '',
      description: '',
    },
  });

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    const book = data.find((book) => book.id === Number(params.id_book));
    if (book) {
      form.setValue('title', book.title);
      form.setValue('author', book.author);
      form.setValue('isbn', book.isbn);
      form.setValue('category', book.category);
      form.setValue('description', book.description);
    }
  }, [data, params.id_book]);

  async function onSubmit(data: EditBookSchema) {
    try {
      const response = await updateBook(Number(params.id_book), data);
      toast.success(response.message);
      navigate('/dashboard/books');
    } catch (error) {
      toast.error((error as Error).message);
    }
  }

  async function fetchData() {
    try {
      const response = await getBooks();
      setData(response.payload.datas);
    } catch (error) {
      toast.error((error as Error).message);
    }
  }

  return (
    <Layout>
      <div className="flex justify-center my-8">
        <Card className="w-full max-w-2xl">
          <CardHeader>
            <CardTitle>Edit Book</CardTitle>
            <CardDescription>Update Your Book.</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-6">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <CustomFormField control={form.control} name="title" label="Title">
                  {(field) => (
                    <Input
                      {...field}
                      placeholder="Title book"
                      disabled={form.formState.isSubmitting}
                      aria-disabled={form.formState.isSubmitting}
                      value={field.value as string}
                    />
                  )}
                </CustomFormField>
                <CustomFormField control={form.control} name="cover_image" label="Cover Image">
                  {(field) => (
                    <Input
                      type="file"
                      accept="image/png, image/jpeg, image/jpg"
                      multiple={false}
                      disabled={form.formState.isSubmitting}
                      aria-disabled={form.formState.isSubmitting}
                      onChange={(e) => field.onChange(e.target.files ? e.target.files[0] : null)}
                    />
                  )}
                </CustomFormField>
                <CustomFormField control={form.control} name="author" label="Author">
                  {(field) => (
                    <Input
                      {...field}
                      placeholder="Author"
                      disabled={form.formState.isSubmitting}
                      aria-disabled={form.formState.isSubmitting}
                      value={field.value as string}
                    />
                  )}
                </CustomFormField>
                <CustomFormField control={form.control} name="isbn" label="ISBN">
                  {(field) => (
                    <Input
                      {...field}
                      placeholder="ISBN"
                      disabled={form.formState.isSubmitting}
                      aria-disabled={form.formState.isSubmitting}
                      value={field.value as string}
                    />
                  )}
                </CustomFormField>
                <CustomFormField control={form.control} name="category" label="Category">
                  {(field) => (
                    <Input
                      {...field}
                      placeholder="category"
                      disabled={form.formState.isSubmitting}
                      aria-disabled={form.formState.isSubmitting}
                      value={field.value as string}
                    />
                  )}
                </CustomFormField>
                <CustomFormField control={form.control} name="description" label="Description">
                  {(field) => (
                    <Textarea
                      {...field}
                      placeholder="Description"
                      disabled={form.formState.isSubmitting}
                      aria-disabled={form.formState.isSubmitting}
                      value={field.value as string}
                      className="h-32"
                    />
                  )}
                </CustomFormField>
                <DialogFooter>
                  <Button type="submit" disabled={form.formState.isSubmitting} aria-disabled={form.formState.isSubmitting}>
                    Save Book
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

export default EditBook;
