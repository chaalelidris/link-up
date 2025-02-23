"use client";
import { ACCEPTED_IMAGE_TYPES, MAX_FILE_SIZE } from "@/app/schemas/formSchema";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { CardAdd } from "iconsax-react";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";

import * as z from "zod";
import PersonalInfoStep from "./steps/personal-info-step";
import ContactInfoStep from "./steps/contact-info-step";
import ProfileImageStep from "./steps/profile-image-step";
import { isValidPhoneNumber } from "react-phone-number-input";
import PhoneStep from "./steps/phone-step";
import EmailStep from "./steps/email-step";
import { useToast } from "@/hooks/use-toast";

// Define your initial schema
const formSchema = z.object({
  fullName: z.string().min(2, "Full name must be at least 2 characters"),
  title: z.string().optional(),
  company: z.string().optional(),
  email: z.string().email("Invalid email address"),
  phone: z
    .string()
    .refine((value) => !value || isValidPhoneNumber(value), {
      message: "Invalid phone number",
    })
    .optional(),
  profileImage: z
    .any()
    .refine(
      (file) => !file || file instanceof File,
      "Profile image is required"
    )
    .refine(
      (file) => !file || (file instanceof File && file?.size <= MAX_FILE_SIZE),
      `Max file size is 5MB.`
    )
    .refine(
      (file) =>
        !file ||
        (file instanceof File && ACCEPTED_IMAGE_TYPES.includes(file?.type)),
      "Only .jpg, .jpeg, .png, .webp and .gif formats are supported."
    )
    .optional(),
});

const finalFormSchema = formSchema.partial().extend({
  fullName: z.string().min(2, "Full name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
});

type FormData = z.infer<typeof formSchema>;

const steps = [
  "Full Name",
  "Company details",
  "Profile Image",
  "Phone Number",
  "Email",
];

export function NewCardDialog() {
  const { toast } = useToast();
  const [isOpen, setOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const methods = useForm<FormData>({
    resolver: zodResolver(finalFormSchema),
    mode: "onChange",
    defaultValues: {
      fullName: "",
      title: "",
      company: "",
      email: "",
      phone: "",
      profileImage: undefined,
    },
  });
  const simulateSubmit = () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(true);
      }, 5000); // Simulate a 2-second wait
    });
  };
  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true); // Start loading
    console.log("Submitting form...", data);

    // Simulate a submission process
    await simulateSubmit();

    console.log("Form submitted successfully:", data);
    setIsSubmitting(false); // End loading
    toast({
      title: "Card created successfully",
    });
    setOpen(false);
    handleReset();
    // Handle form submission here
  };

  const nextStep = async () => {
    let fieldsToValidate: (keyof FormData)[] = [];
    switch (currentStep) {
      case 0:
        fieldsToValidate = ["fullName"];
        break;
      case 1:
        fieldsToValidate = ["title", "company"];
        break;
      case 2:
        fieldsToValidate = ["profileImage"];
        break;
      case 3:
        fieldsToValidate = ["phone"];
        break;
      case 4:
        fieldsToValidate = ["email"];
        break;
      default:
        break;
    }
    const isValid = await methods.trigger(fieldsToValidate);
    if (isValid && currentStep < steps.length - 1) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  };
  const handleReset = () => {
    methods.reset();
    setCurrentStep(0);
  };
  const handleSkip = () => {
    switch (currentStep) {
      case 1:
        methods.resetField("title");
        methods.resetField("company");
        break;
      case 2:
        methods.resetField("profileImage");
        break;
      case 3:
        methods.resetField("phone");
        break;
      default:
        break;
    }
    setCurrentStep(currentStep + 1); // Proceed to the next step
  };

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(isOpen) => {
        setOpen(isOpen);
        if (!isOpen) handleReset();
      }}
    >
      <DialogTrigger asChild>
        <Button className="flex items-center gap-2 md:text-lg py-3 h-auto font-bold bg-primary text-primary-foreground shadow hover:bg-secondary rounded-lg px-4">
          <CardAdd className="!size-6" />
          <span lang="fr">Créer une nouvelle carte</span>
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-xl p-0 overflow-hidden">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-center w-full mx-auto py-6 px-16 bg-white z-10 gap-1">
            {steps.map((_, index) => (
              <div key={index} className="flex items-center gap-1">
                <div
                  className={cn(
                    "w-4 h-4 rounded-full transition-colors",
                    currentStep >= index
                      ? "bg-primary"
                      : "bg-muted border border-input"
                  )}
                />
                {index < steps.length - 1 && (
                  <div
                    className={cn(
                      "w-10 h-2 transition-colors rounded-full",
                      currentStep > index ? "bg-primary" : "bg-muted"
                    )}
                  />
                )}
              </div>
            ))}
          </DialogTitle>
        </DialogHeader>
        <FormProvider {...methods}>
          <form
            onSubmit={methods.handleSubmit(onSubmit)}
            noValidate
            className="contents"
          >
            {isSubmitting ? (
              <div className="px-16 py-4  flex items-center flex-col">
                <h1 className="text-2xl md:text-4xl font-bold text-primary text-center">
                  Adding the finishing touches ✨
                </h1>
                <svg
                  width="20"
                  height="20"
                  fill="currentColor"
                  className="size-20 animate-spin fill-muted-foreground my-14"
                  viewBox="0 0 1792 1792"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M526 1394q0 53-37.5 90.5t-90.5 37.5q-52 0-90-38t-38-90q0-53 37.5-90.5t90.5-37.5 90.5 37.5 37.5 90.5zm498 206q0 53-37.5 90.5t-90.5 37.5-90.5-37.5-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm-704-704q0 53-37.5 90.5t-90.5 37.5-90.5-37.5-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm1202 498q0 52-38 90t-90 38q-53 0-90.5-37.5t-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm-964-996q0 66-47 113t-113 47-113-47-47-113 47-113 113-47 113 47 47 113zm1170 498q0 53-37.5 90.5t-90.5 37.5-90.5-37.5-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm-640-704q0 80-56 136t-136 56-136-56-56-136 56-136 136-56 136 56 56 136zm530 206q0 93-66 158.5t-158 65.5q-93 0-158.5-65.5t-65.5-158.5q0-92 65.5-158t158.5-66q92 0 158 66t66 158z"></path>
                </svg>
              </div>
            ) : (
              <div className="px-16 py-4 flex flex-col items-center gap-4">
                {currentStep === 0 && <PersonalInfoStep />}
                {currentStep === 1 && <ContactInfoStep />}
                {currentStep === 2 && <ProfileImageStep />}
                {currentStep === 3 && <PhoneStep />}
                {currentStep === 4 && <EmailStep />}
              </div>
            )}

            <DialogFooter className="px-16 pb-6 flex items-center justify-center">
              {!isSubmitting && currentStep !== 0 && (
                <Button
                  variant="ghost"
                  type="button"
                  onClick={prevStep}
                  className="text-primary"
                >
                  Back
                </Button>
              )}
              {currentStep < steps.length - 1 && (
                <Button
                  type="button"
                  onClick={nextStep}
                  className="w-full py-3 h-auto"
                >
                  SUIVANT
                </Button>
              )}
              <Button
                type="submit"
                className={cn(
                  "hidden w-full py-3 h-auto",
                  currentStep === steps.length - 1 ? "block" : ""
                )}
                disabled={isSubmitting}
              >
                Done
              </Button>

              {currentStep !== 0 && currentStep < steps.length - 1 && (
                <Button
                  variant="ghost"
                  type="button"
                  onClick={handleSkip}
                  className="text-primary"
                >
                  Skip
                </Button>
              )}
            </DialogFooter>
          </form>
        </FormProvider>
      </DialogContent>
    </Dialog>
  );
}
