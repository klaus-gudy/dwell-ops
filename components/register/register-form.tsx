"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { RegisterSchema } from "@/schemas";
import Link from "next/link";
import { registerUser } from "@/actions/register";

export default function RegisterForm() {
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  async function onSubmit(data: z.infer<typeof RegisterSchema>) {
    setIsLoading(true);
    registerUser(data)
      .then((response) => {
        if (response?.error) {
          console.log(response.error);
          toast.error(response.error);
        } else if (response?.success) {
          console.log(response.success);
          toast.success(response.success);
          form.reset();
        } else {
          toast.error("Unexpected server response.");
        }
      })
      .catch((error) => {
        console.error("Registration error:", error);
        toast.error(
          "An error occurred while creating your account. Please try again."
        );
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  async function handleGoogleSignIn() {
    setIsLoading(true);
    // TODO: send data to server
    setIsLoading(false);
  }
  return (
    <Card className="w-full max-w-md">
      <CardHeader className="space-y-1 text-sky-900">
        <CardTitle className="text-2xl font-bold text-center">
          Create an Account
        </CardTitle>
        <CardDescription className="text-center">
          Enter your information to get started
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Form {...form}>
          <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sky-900">Name</FormLabel>
                  <FormControl>
                    <Input placeholder="John Doe" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sky-900">Email</FormLabel>
                  <FormControl>
                    <Input placeholder="name@example.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sky-900">Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="••••••••" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Creating account..." : "Create account"}
            </Button>
          </form>
        </Form>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">
              Or continue with
            </span>
          </div>
        </div>
        <Button
          variant="outline"
          type="button"
          disabled={isLoading}
          onClick={handleGoogleSignIn}
          className="w-full"
        >
          {/* <GoogleIcon className="mr-2 h-4 w-4" /> */}
          Google
        </Button>
        <div className="text-sm text-center text-gray-500">
          Don&apos;t have an account?{" "}
          <Link href="/sign-up" className="text-ocean-500 hover:underline">
            Sign up
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}