import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

import Layout from "@/components/layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { userLogin } from "@/utils/apis/auth";
import { LoginSchema } from "@/utils/types/auth";

function Login() {
  const [body, setBody] = useState<LoginSchema>({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  async function handleSubmit() {
    try {
      const response = await userLogin(body);
      Cookies.set("token", response.payload.token);
      navigate("/");
    } catch (error) {
      alert(error);
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
          <div className="space-y-4">
            <div>
              <Label htmlFor="email" className="block text-sm font-medium text-foreground">
                Email
              </Label>
              <div className="mt-1">
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  className="block w-full rounded-md border-input bg-background px-3 py-2 text-foreground shadow-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                  value={body.email}
                  onChange={(e) =>
                    setBody({
                      ...body,
                      email: e.target.value,
                    })
                  }
                />
              </div>
            </div>
            <div>
              <Label htmlFor="password" className="block text-sm font-medium text-foreground">
                Password
              </Label>
              <div className="mt-1">
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  className="block w-full rounded-md border-input bg-background px-3 py-2 text-foreground shadow-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                  value={body.password}
                  onChange={(e) =>
                    setBody({
                      ...body,
                      password: e.target.value,
                    })
                  }
                />
              </div>
            </div>
          </div>
          <Button
            className="w-full rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-sm transition-colors hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
            onClick={() => handleSubmit()}
          >
            Sign in
          </Button>
          <div className="text-center">
            <p className="text-muted-foreground">
              Don't have an account?{" "}
              <Link to={"/register"} className="font-medium text-primary hover:underline">
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
