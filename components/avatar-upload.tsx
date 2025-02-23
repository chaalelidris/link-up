"use client";

import { useRef, useState, useEffect } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { User, Upload } from "lucide-react";
import Image from "next/image";
import {
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useFormContext } from "react-hook-form";
export default function AvatarUpload({
  title,
  name,
  src,
}: {
  title?: string;
  name: string;
  src: string;
}) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { setValue, watch } = useFormContext();
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const watchProfileImage = watch(name);

  useEffect(() => {
    if (watchProfileImage instanceof File) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(watchProfileImage);
    } else {
      setPreviewUrl(null);
    }
  }, [watchProfileImage]);

  return (
    <FormItem>
      {title && (
        <FormLabel className="text-lg font-semibold">{title}</FormLabel>
      )}
      <FormControl>
        <div className="flex flex-col items-start space-y-4">
          <label
            htmlFor={`${name}-upload`}
            className="cursor-pointer group relative"
          >
            <Avatar className="h-40 w-32 border-2 border-gray-200 group-hover:border-primary transition-colors duration-200 rounded-3xl">
              <AvatarImage
                src={previewUrl || ""}
                alt="User avatar"
                className="object-cover object-center"
              />
              <AvatarFallback>
                {previewUrl ? (
                  <User className="h-40 w-32" />
                ) : (
                  <div className="size-full overflow-hidden rounded-3xl bg-gray-200">
                    <Image
                      src={src}
                      alt="Profile"
                      width={96}
                      height={96}
                      className="h-full w-full object-cover"
                    />
                  </div>
                )}
              </AvatarFallback>
            </Avatar>
            <div className="absolute inset-0 bg-black bg-opacity-40 rounded-3xl flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              <Upload className="w-8 h-8 text-white" />
            </div>
          </label>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files?.[0] || null;
              setValue(name, file, { shouldValidate: true });
            }}
            className="hidden"
            id={`${name}-upload`}
          />
          {previewUrl && (
            <Button
              variant="outline"
              onClick={() => {
                setPreviewUrl(null);
                setValue(name, null); // Reset the field value in the form
                if (fileInputRef.current) {
                  fileInputRef.current.value = "";
                }
              }}
            >
              Remove
            </Button>
          )}
        </div>
      </FormControl>
      <FormMessage />
    </FormItem>
  );
}
