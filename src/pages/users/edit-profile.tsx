import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useEffect } from 'react';

import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form } from '@/components/ui/form';
import Layout from '@/components/layout';

import { deleteProfile, getProfile, updateProfile } from '@/utils/apis/users';
import { ProfileSchema, profileSchema } from '@/utils/types/users';
import { CustomFormField } from '@/components/custom-formfield';

function EditProfile() {
  const form = useForm<ProfileSchema>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      full_name: '',
      email: '',
      password: '',
      address: '',
      phone_number: '',
      profile_picture: new File([], ''),
    },
  });

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    try {
      const response = await getProfile();
      const profile = response.payload;

      form.setValue('address', profile.address);
      form.setValue('email', profile.email);
      form.setValue('full_name', profile.full_name);
      form.setValue('phone_number', profile.phone_number);
    } catch (error) {
      alert(error);
    }
  }

  async function handleUpdate(data: ProfileSchema) {
    try {
      const response = await updateProfile(data);

      alert(response.message);
    } catch (error) {
      alert(error);
    }
  }

  async function handleDelete() {
    try {
      const response = await deleteProfile();

      alert(response.message);
    } catch (error) {
      alert(error);
    }
  }

  return (
    <Layout>
      <div className="flex justify-center my-8">
        <Card className="w-full max-w-2xl">
          <CardHeader>
            <CardTitle>Edit Profile</CardTitle>
            <CardDescription>Update your profile information.</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-6">
            <Form {...form}>
              <form id="form-update" data-testid="form-update" onSubmit={form.handleSubmit(handleUpdate)} className="space-y-4">
                <CustomFormField control={form.control} name="email" label="Email">
                  {(field) => (
                    <Input
                      {...field}
                      data-testid="input-email"
                      placeholder="johndoe@mail.com"
                      type="email"
                      disabled={form.formState.isSubmitting}
                      aria-disabled={form.formState.isSubmitting}
                      value={field.value as string}
                    />
                  )}
                </CustomFormField>
                <CustomFormField control={form.control} name="full_name" label="Full Name">
                  {(field) => (
                    <Input
                      {...field}
                      data-testid="input-full-name"
                      placeholder="John Doe"
                      disabled={form.formState.isSubmitting}
                      aria-disabled={form.formState.isSubmitting}
                      value={field.value as string}
                    />
                  )}
                </CustomFormField>
                <CustomFormField control={form.control} name="password" label="Password">
                  {(field) => (
                    <Input
                      {...field}
                      data-testid="input-password"
                      placeholder="Password"
                      type="password"
                      disabled={form.formState.isSubmitting}
                      aria-disabled={form.formState.isSubmitting}
                      value={field.value as string}
                    />
                  )}
                </CustomFormField>
                <CustomFormField control={form.control} name="address" label="Address">
                  {(field) => (
                    <Input
                      {...field}
                      data-testid="input-address"
                      placeholder="Lorem Ipsum Street"
                      disabled={form.formState.isSubmitting}
                      aria-disabled={form.formState.isSubmitting}
                      value={field.value as string}
                    />
                  )}
                </CustomFormField>
                <CustomFormField control={form.control} name="phone_number" label="Phone Number">
                  {(field) => (
                    <Input
                      {...field}
                      data-testid="input-phone-number"
                      placeholder="+628xxxxxxxx"
                      disabled={form.formState.isSubmitting}
                      aria-disabled={form.formState.isSubmitting}
                      value={field.value as string}
                    />
                  )}
                </CustomFormField>
                <CustomFormField control={form.control} name="profile_picture" label="Profile Picture">
                  {(field) => (
                    <Input
                      data-testid="input-profile-picture"
                      type="file"
                      disabled={form.formState.isSubmitting}
                      aria-disabled={form.formState.isSubmitting}
                      onChange={(e) => field.onChange(e.target.files ? e.target.files[0] : null)}
                    />
                  )}
                </CustomFormField>
              </form>
            </Form>
          </CardContent>
          <CardFooter className="flex justify-end gap-2">
            <Button variant="destructive" onClick={() => handleDelete()}>
              Delete Account
            </Button>
            <Button type="submit" form="form-update">
              Save Changes
            </Button>
          </CardFooter>
        </Card>
      </div>
    </Layout>
  );
}

export default EditProfile;
