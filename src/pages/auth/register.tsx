import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { CustomFormField } from "@/components/custom-formfield";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form } from "@/components/ui/form";
import Layout from "@/components/layout";

import { registerSchema, RegisterSchema } from "@/utils/types/auth";
import { userRegister } from "@/utils/apis/auth";

function Register() {
  const navigate = useNavigate();

  const form = useForm<RegisterSchema>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      full_name: "",
      email: "",
      password: "",
      repassword: "",
      address: "",
      phone_number: "",
    },
  });

  async function onSubmit(data: RegisterSchema) {
    try {
      const response = await userRegister(data);

      toast.success(response.message);
      navigate("/login");
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
            <p className="mt-2 text-muted-foreground">Sign up for a new account</p>
          </div>
          <Form {...form}>
            <form data-testid="form-login" onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <CustomFormField control={form.control} name="full_name" label="Full Name">
                {(field) => (
                  <Input
                    data-testid="input-full-name"
                    placeholder="John Doe"
                    disabled={form.formState.isSubmitting}
                    aria-disabled={form.formState.isSubmitting}
                    {...field}
                  />
                )}
              </CustomFormField>
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
              <CustomFormField control={form.control} name="repassword" label="Retype Password">
                {(field) => (
                  <Input
                    data-testid="input-repassword"
                    placeholder="Retype Password"
                    type="password"
                    disabled={form.formState.isSubmitting}
                    aria-disabled={form.formState.isSubmitting}
                    {...field}
                  />
                )}
              </CustomFormField>
              <CustomFormField control={form.control} name="address" label="Address">
                {(field) => (
                  <Input
                    data-testid="input-address"
                    placeholder="Lorem Ipsum Street"
                    disabled={form.formState.isSubmitting}
                    aria-disabled={form.formState.isSubmitting}
                    {...field}
                  />
                )}
              </CustomFormField>
              <CustomFormField control={form.control} name="phone_number" label="Phone Number">
                {(field) => (
                  <Input
                    data-testid="input-phone-number"
                    placeholder="+628xxxxxxxx"
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
                Sign up
              </Button>
            </form>
          </Form>
          <div className="text-center">
            <p className="text-muted-foreground">
              Already have an account?{" "}
              <Link to={"/login"} className="font-medium text-primary hover:underline">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Register;
