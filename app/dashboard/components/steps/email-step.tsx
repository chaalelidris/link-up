import { useFormContext } from "react-hook-form";
import {
  FormField,
  FormItem,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Sms } from "iconsax-react";

export default function EmailStep() {
  const { control } = useFormContext();

  return (
    <>
      <h1 className="text-2xl md:text-4xl font-bold text-primary text-center">
        Finally, confirm the email you want on your card
      </h1>
      <div className="grid gap-6 w-full">
        <FormField
          control={control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <div className="grid gap-2 relative">
                <Sms className="absolute top-1/2 left-3 transform -translate-y-1/2 size-6 md:size-8 text-primary" />
                <FormControl>
                  <Input
                    {...field}
                    placeholder="Email Adresse"
                    type="email"
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
