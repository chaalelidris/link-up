import { useFormContext } from "react-hook-form";
import {
  FormField,
  FormItem,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { UserSquare } from "iconsax-react";

export default function PersonalInfoStep() {
  const { control } = useFormContext();

  return (
    <>
      <Image
        src="/images/empty-state.svg"
        alt="empty"
        width={1000}
        height={700}
        className="h-28 md:h-40 w-auto"
      />
      <h1 className="text-2xl md:text-4xl font-bold text-primary text-center">
        First, enter your full name
      </h1>
      <div className="grid gap-6 w-full">
        <FormField
          control={control}
          name="fullName"
          render={({ field }) => (
            <FormItem>
              <div className="grid gap-2 relative">
                <UserSquare className="absolute top-1/2 left-3 transform -translate-y-1/2 size-6 md:size-8 text-primary" />
                <FormControl>
                  <Input
                    {...field}
                    placeholder="Nom et Prénom"
                    className="pl-10 md:pl-12 text-base py-4 h-auto rounded-lg"
                  />
                </FormControl>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </>
  );
}
