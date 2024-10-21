"use client";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { ApiResponse } from "@/types/ApiResponse";
import { AxiosError } from "axios";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { EyeOffIcon, EyeIcon, Loader2 } from "lucide-react";
import { signInSchema } from "@/schemas/signInSchema";
 import { useSession, signIn, signOut } from "next-auth/react";

 



export default function LogIn() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);


  const { toast } = useToast();
  const router = useRouter();

  // Use zod validation schema for email and password
  const form = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "", // Updated from identifier to email
      password: "",
    },
  });
 
  const onSubmit = async (data: z.infer<typeof signInSchema>) => {
    setIsSubmitting(true);
    console.log(data)
    try {
      const result = await signIn("credentials", {
        redirect: false,
        email: data.email,
        password: data.password,
      });

      // Handle the sign-in result
      if (result?.error) {
        if (result.error === "CredentialsSignin") {
          toast({
            title: "Uh oh! Login Failed",
            description: "Incorrect username or password",
            variant: "destructive",
          });
        } else {
          toast({
            title: "Uh oh! Error",
            description: result.error,
            variant: "destructive",
          });
        }
      } else if (result?.url) {
        // Success case
        toast({
          title: "Login Successful",
          description: "Welcome back!",
        });
        router.replace("/dashboard");
      }
    } catch (error) {
      // Handle any unexpected errors
      const axiosError = error as AxiosError<ApiResponse>;
      const errorMessage =
        axiosError.response?.data.message ||
        "An unexpected error occurred. Please try again later.";

      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };


  return (
    <div className="w-full lg:grid lg:min-h-screen lg:grid-cols-2 sm:px-0 px-2">
      <div className="flex items-center justify-center py-12">
        <div className="mx-auto grid w-[350px] gap-6">
          <div className="grid gap-2 text-center">
            <h1 className="text-3xl font-bold">Login</h1>
          </div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="email" // Updated field name
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        required
                        placeholder="email"
                        {...field}
                        onChange={(e) =>
                          field.onChange(e.target.value.toLowerCase())
                        }
                      />
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
                    <FormLabel>Password</FormLabel>
                    <div className="relative">
                      <FormControl>
                        <Input
                          type={showPassword ? "text" : "password"}
                          placeholder="password"
                          {...field}
                          className=" mb-2"
                        />
                      </FormControl>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="absolute right-2 top-1/2 transform -translate-y-1/2 h-7 w-7"
                        onClick={() => setShowPassword(!showPassword)}
                        type="button"
                      >
                        {showPassword ? (
                          <EyeOffIcon className="h-4 w-4" />
                        ) : (
                          <EyeIcon className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                type="submit"
                className="w-full"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Please wait
                  </>
                ) : (
                  "Login"
                )}
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
}
