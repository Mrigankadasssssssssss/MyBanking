"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormField,
  FormLabel,
  FormMessage,
  FormControl,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import CustomInput from "./CustomInput";
import { authFormSchema } from "@/lib/utils";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { signUp,signIn, getLoggedInUser } from "@/lib/actions/user.actions";
import PlaidLink from "./PlaidLink";

const AuthForm = ({ type }: { type: string }) => {
  const router = useRouter()  
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  

  const schema = authFormSchema(type);

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      email: "",
      password: "",
      ...(type === "sign-up" && {
        firstName: "",
        lastName: "",
        address1: "",
        city: "",
        state: "",
        postalCode: "",
        dateOfBirth: "",
        ssn: "",
      }),
    },
  });

  const onSubmit=async (data: z.infer<typeof schema>)=> {
    setIsLoading(true)
    try {
        if(type === 'sign-up') {
            const userData = {
              firstName: data.firstName!,
              lastName: data.lastName!,
              address1: data.address1!,
              city: data.city!,
              state: data.state!,
              postalCode: data.postalCode!,
              dateOfBirth: data.dateOfBirth!,
              ssn: data.ssn!,
              email: data.email,
              password: data.password
            }
  
            const newUser = await signUp(userData);
  
            setUser(newUser);
          }
          if(type === 'sign-in') {
            const response = await signIn({
              email: data.email,
              password: data.password,
            })
  
            if(response) router.push('/')
          }
    } catch (error) {
        console.log(error)
    }finally{
        setIsLoading(false)
    }
  }

  return (
    <div>
      <section className="auth-form">
        <header className="flex flex-col gap-5 md:gap-8">
          <Link href="/" className="cursor-pointer flex items-center gap-2">
            <Image
              src="/icons/logo.svg"
              width={34}
              height={34}
              alt="Pocketvault logo"
              className="size-[24px] max-xl:size-14"
            />
            <h1 className="sidebar-logo">PocketVault</h1>
          </Link>
          <div className="flex flex-col gap-1 md:gap-3">
            <h1 className="text-24 lg:text-36 font-semibold text-gray-900">
              {user
                ? "Link Account"
                : type === "sign-in"
                ? "Sign In"
                : "Sign Up"}
              <p className="text-16 font-normal text-gray-500">
                {user
                  ? "Link Your Account to get started."
                  : "Please enter Your Details."}
              </p>
            </h1>
          </div>
        </header>
        {user ? (
          <div className="flex flex-col gap-4">
            <PlaidLink user={user} variant="primary"/> 
          </div>
         ) : ( 
          <>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8"
              >
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <div className="form-item">
                      <FormLabel className="form-label">Email</FormLabel>
                      <div className="flex w-full flex-col">
                        <FormControl>
                          <Input
                            placeholder="Enter your email..."
                            className="input-class"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage className="form-message mt-2" />
                      </div>
                    </div>
                  )}
                />
                
                {type === "sign-up" && (
                  <>
                    <div className="flex gap-5">

                    <CustomInput
                      control={form.control}
                      name="firstName"
                      label="First Name"
                      placeholder="Enter your first name..."
                      type="text"
                    />
                    <CustomInput
                      control={form.control}
                      name="lastName"
                      label="Last Name"
                      placeholder="Enter your last name..."
                      type="text"
                    />
                    </div>
                    <CustomInput
                      control={form.control}
                      name="address1"
                      label="Address"
                      placeholder="Enter your address..."
                      type="text"
                    />
                    <CustomInput
                      control={form.control}
                      name="city"
                      label="City"
                      placeholder="Enter your city..."
                      type="text"
                    />
                    <div className="flex gap-5">

                    <CustomInput
                      control={form.control}
                      name="state"
                      label="State"
                      placeholder="Enter your state..."
                      type="text"
                    />
                    <CustomInput
                      control={form.control}
                      name="postalCode"
                      label="Postal Code"
                      placeholder="Enter your postal code..."
                      type="text"
                    />
                    </div>
                    <div className="flex gap-5">
                        
                    <CustomInput
                      control={form.control}
                      name="dateOfBirth"
                      label="Date of Birth"
                      placeholder="Enter your date of birth..."
                      type="text"
                    />
                    <CustomInput
                      control={form.control}
                      name="ssn"
                      label="SSN"
                      placeholder="Enter your SSN..."
                      type="text"
                      
                    />
                    </div>
                  </>
                )}
                <CustomInput
                  control={form.control}
                  name="password"
                  label="Password"
                  placeholder="Enter your password..."
                  type="password"
                />
                <div className="flex flex-col gap-4">
                  <Button
                    type="submit"
                    className="form-btn"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <Loader2 size={20} className="animate-spin" /> &nbsp;
                        Loading ...
                      </>
                    ) : type === "sign-in" ? (
                      "Sign In"
                    ) : (
                      "Sign Up"
                    )}
                  </Button>
                </div>
              </form>
            </Form>
            <footer className="flex justify-center gap-1">
              <p className="text-14 font-normal text-gray-500">
                {type === "sign-in"
                  ? "Don't have an account?"
                  : "Already have an account?"}
              </p>
              <Link
                href={type === "sign-in" ? "/sign-up" : "/sign-in"}
                className="form-link"
              >
                {type === "sign-in" ? "Sign up" : "Sign in"}
              </Link>
            </footer>
          </>
         )} 
      </section>
    </div>
  );
};

export default AuthForm;
