import { useFormContext } from "react-hook-form";
import {
  FormField,
  FormItem,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

export default function ContactInfoStep() {
  const { control } = useFormContext();

  return (
    <>
      <h1 className="text-2xl md:text-4xl font-bold text-primary text-center">
        Next, add your title and company
      </h1>
      <div className="grid gap-6 w-full">
        <FormField
          control={control}
          name="title"
          render={({ field }) => (
            <FormItem className="grid gap-2">
              <FormControl>
                <Input
                  {...field}
                  placeholder="Title"
                  className="text-base p-4 h-auto rounded-lg"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="company"
          render={({ field }) => (
            <FormItem className="grid gap-2">
              <FormControl>
                <Input
                  {...field}
                  placeholder="Company"
                  className="text-base p-4 h-auto rounded-lg"
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
