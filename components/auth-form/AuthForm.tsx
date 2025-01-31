"use client";

import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { authFormSchema } from "@/lib/functions/auth-form";
import { FormType } from "@/lib/types/type";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const AuthForm = ({ type }: { type: FormType }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const formSchema = authFormSchema(type);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            fullName: "",
            email: "",
        },
    });

    function onSubmit(values: z.infer<typeof formSchema>) {
        console.log(values);
    }
    return (
        <>
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="flex max-h-[800px] w-full max-w-[580px] flex-col justify-center space-y-6 transition-all lg:h-full lg:space-y-8"
                >
                    <h1 className="h1 text-center text-light-100 md:text-left">
                        {type === "sign-in" ? "Sign In" : "Sign Up"}
                    </h1>

                    {type === "sign-up" && (
                        <FormField
                            control={form.control}
                            name="fullName"
                            render={({ field }) => (
                                <FormItem>
                                    <div className="flex h-[78px] flex-col justify-center rounded-xl border border-light-300 px-4 shadow-drop-1">
                                        <FormLabel>Full Name</FormLabel>
                                        <FormControl className="text-light-100 pt-2 text-[14px] leading-[20px] font-normal w-full ">
                                            <Input
                                                placeholder="Enter Full Name"
                                                {...field}
                                                className="border-none shadow-none p-0 outline-none ring-offset-transparent focus:ring-transparent focus:ring-offset-0 focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0 placeholder:text-light-200 text-[14px] leading-[20px] font-normal"
                                            />
                                        </FormControl>
                                    </div>

                                    <FormMessage className="text-red text-[14px] leading-[20px] font-normal ml-4" />
                                </FormItem>
                            )}
                        />
                    )}
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <div className="flex h-[78px] flex-col justify-center rounded-xl border border-light-300 px-4 shadow-drop-1">
                                    <FormLabel className=" text-light-100 pt-2 text-[14px] leading-[20px] font-normal w-full">
                                        Email
                                    </FormLabel>

                                    <FormControl>
                                        <Input
                                            placeholder="Enter your email"
                                            className="border-none shadow-none p-0 outline-none ring-offset-transparent focus:ring-transparent focus:ring-offset-0 focus-visible:outline-none
                                            focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0 placeholder:text-light-200 text-[14px] leading-[20px] font-normal"
                                            {...field}
                                        />
                                    </FormControl>
                                </div>

                                <FormMessage className=" text-red text-[14px] leading-[20px] font-normal ml-4" />
                            </FormItem>
                        )}
                    />
                    <Button
                        type="submit"
                        disabled={isLoading}
                        className="bg-brand hover:bg-brand-100 transition-all rounded-full text-[14px] leading-[20px] font-medium h-[66px]"
                    >
                        {type === "sign-in" ? "Sign In" : "Sign Up"}
                        {isLoading && (
                            <Image
                                src="/assets/icons/loader.svg"
                                alt="loader"
                                width={24}
                                height={24}
                                className="ml-2 animate-spin"
                            />
                        )}
                    </Button>

                    {errorMessage && (
                        <p className="text-[14px] leading-[20px] font-normal mx-auto w-fit rounded-xl bg-error/5 px-8 py-4 text-center text-error">
                            *{errorMessage}
                        </p>
                    )}

                    <div className="text-[14px] leading-[20px] font-normal flex justify-center">
                        <p className="text-light-100">
                            {type === "sign-in"
                                ? "Don't have an account?"
                                : "Already have an account?"}
                        </p>
                        <Link
                            href={type === "sign-in" ? "/sign-up" : "/sign-in"}
                            className="ml-1 font-medium text-brand"
                        >
                            {" "}
                            {type === "sign-in" ? "Sign Up" : "Sign In"}
                        </Link>
                    </div>
                </form>
            </Form>
        </>
    );
};

export default AuthForm;
