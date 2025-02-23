"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CardEdit } from "iconsax-react";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useForm, FormProvider, useWatch } from "react-hook-form";

import DisplayManager from "./components/display-manager";
import InformationsCard from "./components/informations-card";

import { zodResolver } from "@hookform/resolvers/zod";
import {
  defaultValues,
  FormData,
  formSchema,
  steps,
} from "@/app/schemas/formSchema";
import PreviewCard from "./components/preview-card";
import { CardForm } from "@/app/utils/types/card.type";
import { loadFile } from "@/app/utils/constants";
import FieldsManager from "./components/FieldsManager";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import isEqual from "lodash/isEqual";

export default function NewCardPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState(0);
  const [previewData, setPreviewData] = useState<CardForm>({
    ...defaultValues,
    firstName: "John",
    lastName: "Doe",
  });

  const methods = useForm<FormData>({
    resolver: zodResolver(formSchema),
    mode: "onChange",
    defaultValues: { ...defaultValues, firstName: "John", lastName: "Doe" },
  });

  const getCurrentStepFields = useCallback(
    (step: number): (keyof FormData)[] => {
      switch (step) {
        case 0:
          return ["design", "profileImg", "color", "logoImg"];
        case 1:
          return [
            "prefix",
            "firstName",
            "middleName",
            "lastName",
            "suffix",
            "accreditations",
            "pronouns",
            "affiliation",
          ];
        case 2:
          return ["fields"];
        default:
          return [];
      }
    },
    []
  ); // Get the fields to watch based on the current step

  const fieldsToWatch = useMemo((): (keyof FormData)[] => {
    return getCurrentStepFields(currentStep);
  }, [currentStep, getCurrentStepFields]); // List of fields to watch based on the current step

  const watchedValues = useWatch<FormData>({
    control: methods.control,
    name: fieldsToWatch as readonly (keyof FormData)[],
  }); // Watch the fields based on the current step

  // Helper function to process file inputs (e.g., profile image)
  const processProfileImage = async (profileImg?: File) => {
    if (profileImg) {
      try {
        const src = await loadFile(profileImg);
        return src as string;
      } catch (error) {
        console.error("Error reading file:", error);
      }
    }
    return undefined;
  };

  // Update previewData
  useEffect(() => {
    const updatePreview = async () => {
      const formValues = methods.getValues();
      const clonedValues: CardForm & { profileImg?: File; logoImg?: File } =
        structuredClone(formValues);

      if (currentStep === 0) {
        if (clonedValues.profileImg) {
          const profileSrc = await processProfileImage(clonedValues.profileImg);
          if (profileSrc) {
            clonedValues.profileSrc = profileSrc;
          }
        }

        if (!clonedValues.profileImg) {
          clonedValues.profileSrc = undefined;
        }
      }

      setPreviewData((prev) => {
        const updated = { ...prev, ...clonedValues };
        return isEqual(prev, updated) ? prev : updated;
      });
    };

    updatePreview();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [watchedValues, currentStep]);

  const nextStep = async () => {
    const fieldsToValidate: (keyof FormData)[] =
      getCurrentStepFields(currentStep);

    const isValid = await methods.trigger(fieldsToValidate);
    if (isValid && currentStep < steps.length - 1) {
      const formValues = methods.getValues();
      const clonedValues: CardForm & { profileImg?: File; logoImg?: File } =
        structuredClone(formValues);

      if (currentStep === 0 && clonedValues.profileImg) {
        const profileSrc = await processProfileImage(clonedValues.profileImg);
        if (profileSrc) {
          clonedValues.profileSrc = profileSrc;
        }
      }

      setPreviewData((prev) => ({ ...prev, ...clonedValues })); // Update the preview data
      setCurrentStep((prev) => prev + 1); // Move to the next step
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  };
  // console.log("errors=>", methods.formState.errors);

  const onSubmit = (data: FormData) => {
    console.log(data);
    // Handle form submission here
    router.replace("/dashboard");
    toast({
      title: "Card created successfully",
    });
  };

  return (
    <FormProvider {...methods}>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-black text-primary flex items-center gap-2">
          <CardEdit className="size-6" />
          Create New Card
        </h1>
      </div>
      <section className="grid grid-cols-12 gap-8">
        {/* Card Preview */}
        <PreviewCard values={previewData} showSocialMedia />
        {/* Settings */}
        <div className="col-span-12 lg:col-span-8">
          <form onSubmit={methods.handleSubmit(onSubmit)}>
            <Card className="pt-6 border-0 shadow-none">
              <CardContent>
                <Tabs
                  defaultValue="display"
                  onClick={() => {}}
                  value={steps[currentStep]}
                >
                  <TabsList className="mb-6 bg-transparent w-full border-b-2 rounded-none justify-start px-1 py-0 h-auto">
                    <TabsTrigger
                      className="data-[state=active]:bottom-ring"
                      value="display"
                    >
                      Display
                    </TabsTrigger>
                    <TabsTrigger
                      className="data-[state=active]:bottom-ring"
                      value="information"
                    >
                      Information
                    </TabsTrigger>
                    <TabsTrigger
                      className="data-[state=active]:bottom-ring"
                      value="fields"
                    >
                      Fields
                    </TabsTrigger>
                    <TabsTrigger
                      className="data-[state=active]:bottom-ring"
                      value="card"
                    >
                      Card
                    </TabsTrigger>
                  </TabsList>

                  {/* Tabs Content */}
                  <TabsContent value="display" className="space-y-8">
                    <DisplayManager />
                  </TabsContent>
                  <TabsContent value="information" className="space-y-8">
                    <InformationsCard />
                  </TabsContent>
                  <TabsContent value="fields">
                    <FieldsManager />
                  </TabsContent>
                  <TabsContent value="card">
                    <p className="h-96">Card Form</p>
                  </TabsContent>
                </Tabs>
              </CardContent>

              <CardFooter className="flex justify-between">
                <Button
                  type="button"
                  onClick={prevStep}
                  disabled={currentStep === 0}
                >
                  Previous
                </Button>
                {currentStep < steps.length - 1 && (
                  <Button type="button" onClick={nextStep}>
                    Next
                  </Button>
                )}

                <Button
                  type="submit"
                  className={cn(
                    currentStep === steps.length - 1 ? "block" : "hidden"
                  )}
                >
                  Submit
                </Button>
              </CardFooter>
            </Card>
          </form>
        </div>
      </section>
    </FormProvider>
  );
}
