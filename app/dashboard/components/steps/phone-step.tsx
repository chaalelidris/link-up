import { useFormContext } from "react-hook-form";
import {
  FormField,
  FormItem,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { PhoneInput } from "@/components/ui/phone-input";

export default function PhoneStep() {
  const { control } = useFormContext();
  return (
    <>
      <h1 className="text-2xl md:text-4xl font-bold text-primary text-center">
        Add your phone number
      </h1>
      <div className="grid gap-6 w-full">
        <FormField
          control={control}
          name="phone"
          render={({ field }) => (
            <FormItem className="flex flex-col items-start">
              <FormControl className="w-full">
                <PhoneInput
                  placeholder="Enter a phone number"
                  {...field}
                  defaultCountry="DZ"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </>
  );
}
