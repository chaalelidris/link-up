import { colors, designs, FormData } from "@/app/schemas/formSchema";
import AvatarUpload from "@/components/avatar-upload";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { cn } from "@/lib/utils";
import { ReceiveSquare } from "iconsax-react";
import Image from "next/image";
import { useFormContext } from "react-hook-form";

export default function DisplayManager() {
  const { control } = useFormContext<FormData>();
  return (
    <>
      {/* Design Selection */}
      <FormField
        control={control}
        name="design"
        render={({ field }) => (
          <FormItem className="space-y-3">
            <FormLabel className="text-lg font-semibold">Design</FormLabel>
            <FormControl>
              <RadioGroup
                onValueChange={field.onChange}
                defaultValue={field.value}
                className="flex items-center gap-4"
              >
                {designs.map((design) => (
                  <FormItem
                    key={design.id}
                    className={cn(
                      "rounded-3xl p-4 text-center", // Added cursor-pointer here
                      field.value === design.id &&
                        "border-2 border-primary bg-primary/5"
                    )}
                  >
                    <FormLabel
                      htmlFor={design.id}
                      className="cursor-pointer" // Ensure the cursor-pointer is applied here
                    >
                      <FormControl className="hidden">
                        <RadioGroupItem value={design.id} />
                      </FormControl>
                      <FormLabel className="text-sm font-medium cursor-pointer">
                        <div className="mb-2 aspect-square w-full overflow-hidden rounded-3xl bg-white">
                          <Image
                            src={design.preview}
                            alt={design.name}
                            width={1000}
                            height={1000}
                            className="size-24 object-cover object-center"
                            priority
                          />
                        </div>
                        {design.name}
                      </FormLabel>
                    </FormLabel>
                  </FormItem>
                ))}
              </RadioGroup>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* Profile Photo */}
      <FormField
        control={control}
        name="profileImg"
        render={() => (
          <AvatarUpload
            title="Profile Photo"
            name="profileImg"
            src="/images/profile-placeholder.svg"
          />
        )}
      />

      {/* Color Selection */}
      <FormField
        control={control}
        name="color"
        render={({ field }) => (
          <FormItem className="space-y-3">
            <FormLabel className="text-lg font-semibold">Color</FormLabel>
            <FormControl>
              <RadioGroup
                onValueChange={field.onChange}
                defaultValue={field.value}
                className="flex items-center gap-4"
              >
                {colors.map((color) => (
                  <FormItem
                    key={color}
                    className={cn(
                      "h-8 w-8 rounded-full flex items-center justify-center",
                      field.value === color &&
                        "ring-2 ring-primary ring-offset-2"
                    )}
                    style={{ backgroundColor: color }}
                  >
                    <FormLabel
                      htmlFor={color}
                      className="cursor-pointer" // Ensure the cursor-pointer is applied here
                    >
                      <FormControl className="hidden">
                        <RadioGroupItem value={color} />
                      </FormControl>
                      <FormLabel className="flex cursor-pointer size-8 items-center justify-center">
                        {field.value === color && (
                          <ReceiveSquare className="size-5 text-white" />
                        )}
                      </FormLabel>
                    </FormLabel>
                  </FormItem>
                ))}
              </RadioGroup>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* Logo */}
      <FormField
        control={control}
        name="logoImg"
        render={() => (
          <AvatarUpload
            title="Logo"
            name="logoImg"
            src="/images/logo-placeholder.svg"
          />
        )}
      />
    </>
  );
}
