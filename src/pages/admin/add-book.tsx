import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { CustomFormField } from '@/components/custom-formfield';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form } from '@/components/ui/form';

import { addBookSchema, AddBookSchema } from '@/utils/types/books';
import { addBook } from '@/utils/apis/books';

export default function AddBook() {
  const navigate = useNavigate();

  const form = useForm<AddBookSchema>({
    resolver: zodResolver(addBookSchema),
    defaultValues: {
      title: '',
      cover_image: new File([], ''),
      author: '',
      isbn: '',
      category: '',
      description: '',
    },
  });

  async function onSubmit(data: AddBookSchema) {
    try {
      const response = await addBook(data);

      toast.success(response.message);
      navigate('/dashboard');
    } catch (error) {
      toast.error((error as Error).message);
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="default">Add Book</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add a New Book</DialogTitle>
        </DialogHeader>
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
                />
              )}
            </CustomFormField>
            <DialogFooter>
              <Button type="submit" disabled={form.formState.isSubmitting} aria-disabled={form.formState.isSubmitting}>
                Add Book
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
