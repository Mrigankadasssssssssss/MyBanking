import React from "react";
import {
    Form,
    FormControl,
    FormField,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Control } from "react-hook-form";
import { z } from "zod";
import { authFormSchema } from "@/lib/utils";

interface CustomInputProps {
    control: Control<z.infer<ReturnType<typeof authFormSchema>>>;
    name: keyof z.infer<ReturnType<typeof authFormSchema>>;
    label: string;
    placeholder: string;
    type: string;
}

const CustomInput = ({ control, name, label, placeholder, type }: CustomInputProps) => {
    return (
        <FormField
            control={control}
            name={name} // cast to string to avoid type error
            render={({ field }) => (
                <div className="form-item">
                    <FormLabel className="form-label">{label}</FormLabel>
                    <div className="flex w-full flex-col">
                        <FormControl>
                            <Input
                                placeholder={placeholder}
                                className="input-class"
                                type={type}
                                {...field}
                            />
                        </FormControl>
                        <FormMessage className="form-message mt-2" />
                    </div>
                </div>
            )}
        />
    );
};

export default CustomInput;
