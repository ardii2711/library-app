import { Link, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

import { Form } from '@/components/ui/form';
import Layout from '@/components/layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { userLogin } from '@/utils/apis/auth';
import { loginSchema, LoginSchema } from '@/utils/types/auth';
import { CustomFormField } from '@/components/custom-formfield';

function Login() {
  const navigate = useNavigate();

  const form = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  async function onSubmit(data: LoginSchema) {
    try {
      const response = await userLogin(data);

      Cookies.set('token', response.payload.token);
      toast.success(response.message);
      navigate('/');
    } catch (error) {
      toast.error((error as Error).message);
    }
  }

  return (
    <Layout>
      <div className="flex min-h-[100dvh] items-center justify-center bg-background px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto w-full max-w-md space-y-6">
          <div className="text-center">
            <h1 className="text-3xl font-bold tracking-tight text-foreground">Welcome to Book Quest</h1>
            <p className="mt-2 text-muted-foreground">Sign in to your account to continue</p>
          </div>
          <Form {...form}>
            <form data-testid="form-login" onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <CustomFormField control={form.control} name="email" label="Email">
                {(field) => (
                  <Input
                    data-testid="input-email"
                    placeholder="johndoe@mail.com"
                    type="email"
                    disabled={form.formState.isSubmitting}
                    aria-disabled={form.formState.isSubmitting}
                    {...field}
                  />
                )}
              </CustomFormField>
              <CustomFormField control={form.control} name="password" label="Password">
                {(field) => (
                  <Input
                    data-testid="input-password"
                    placeholder="Password"
                    type="password"
                    disabled={form.formState.isSubmitting}
                    aria-disabled={form.formState.isSubmitting}
                    {...field}
                  />
                )}
              </CustomFormField>
              <Button
                data-testid="btn-submit"
                type="submit"
                className="w-full"
                disabled={form.formState.isSubmitting}
                aria-disabled={form.formState.isSubmitting}
              >
                Sign in
              </Button>
            </form>
          </Form>
          <div className="text-center">
            <p className="text-muted-foreground">
              Don't have an account?{' '}
              <Link to={'/register'} className="font-medium text-primary hover:underline">
                Register
              </Link>
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Login;
