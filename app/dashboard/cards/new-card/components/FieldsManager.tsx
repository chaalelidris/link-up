"use client";

import { useFormContext } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { FieldProps, FormData } from "@/app/schemas/formSchema";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { SortableItem } from "@/components/ui/sortable-item";
import React, { useEffect } from "react";
import { SearchNormal1 } from "iconsax-react";
import { fieldIcons } from "./preview-card";

export default function FieldsManager() {
  const { control, setValue, watch } = useFormContext<FormData>(); // Use the context of the parent form

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const fields = watch("fields");

  const addField = (field: FieldProps) => {
    const newField = {
      id: Date.now().toString(),
      type: field.id,
      label: field.label,
      enabled: true,
      url: "",
      displayText: field.id === "website" ? "" : undefined,
    };
    setValue("fields", [...fields, newField], { shouldValidate: true });
  };
  const allFields = [
    {
      title: "Most Popular",
      fields: [
        { id: "website", label: "Website" },
        {
          id: "phone",
          label: "Phone Number",
        },
        {
          id: "instagram",
          label: "Instagram",
        },
        {
          id: "facebook",
          label: "Facebook",
        },
      ],
    },
    {
      title: "Social Media",
      fields: [
        {
          id: "instagram",
          label: "Instagram",
        },
        {
          id: "facebook",
          label: "Facebook",
        },
        {
          id: "linkedin",
          label: "Linkedin",
        },
        {
          id: "x",
          label: "X (twitter)",
        },
        {
          id: "tiktok",
          label: "Tiktok",
        },
      ],
    },
    {
      title: "Work",
      fields: [
        {
          id: "doucments",
          label: "Doucments",
        },
        {
          id: "gallery",
          label: "Gallery",
        },
        {
          id: "podcast",
          label: "Podcast",
        },
        {
          id: "forums",
          label: "Forums",
        },
      ],
    },
  ];
  function handleDragEnd(event) {
    const { active, over } = event;

    if (active.id !== over.id) {
      const oldIndex = fields.findIndex((field) => field.id === active.id);
      const newIndex = fields.findIndex((field) => field.id === over.id);
      const newArray = arrayMove(fields, oldIndex, newIndex);

      setValue("fields", newArray, { shouldValidate: true });
    }
  }
  function handleRemove(id: string) {
    setValue(
      "fields",
      fields.filter((item) => item.id !== id),
      { shouldValidate: true }
    );
  }

  useEffect(() => {
    // Ensure all field values are properly set in the form
    fields.forEach((field, index) => {
      setValue(`fields.${index}`, field, { shouldValidate: true });
    });
  }, [fields, setValue]);
  return (
    <div className="grid gap-6 md:grid-cols-2">
      {/* Dynamic Fields Section */}
      <Card className="p-0 shadow-none border-0">
        <h3 className="mb-4 text-lg font-semibold">Additional Fields</h3>
        <ScrollArea className="h-[600px] border border-dashed border-primary rounded-xl bg-muted p-4">
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
          >
            <div className="flex flex-col gap-5">
              <SortableContext
                items={fields.map((field) => field.id)}
                strategy={verticalListSortingStrategy}
              >
                {fields.map((field, index) => (
                  <SortableItem
                    key={field.id}
                    field={field}
                    onRemove={handleRemove}
                    index={index}
                  >
                    {field.enabled && (
                      <CardContent>
                        <FormField
                          control={control}
                          name={`fields.${index}.url`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>URL</FormLabel>
                              <FormControl>
                                <Input
                                  {...field}
                                  placeholder="www.example.com"
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        {field.displayText !== undefined && (
                          <FormField
                            control={control}
                            name={`fields.${index}.displayText`}
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Display Text</FormLabel>
                                <FormControl>
                                  <Input
                                    {...field}
                                    placeholder="Display Text"
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        )}
                      </CardContent>
                    )}
                  </SortableItem>
                ))}
              </SortableContext>
            </div>
          </DndContext>
        </ScrollArea>
      </Card>

      {/* Field Selection Section */}
      <Card className="p-0 shadow-none border-0">
        <div className="mb-4">
          <h3 className="text-lg font-semibold">Fields</h3>
        </div>
        <div className="flex-1 relative mb-4">
          <SearchNormal1 className="absolute top-1/2 left-3 transform -translate-y-1/2 size-6 text-muted-foreground" />
          <Input
            id="search"
            type="search"
            placeholder="Tapez quelque chose à rechercher"
            className="bg-white w-full pl-10 pr-4 text-base py-4 h-auto rounded-lg"
          />
        </div>
        <div className="space-y-4">
          {allFields.map((fieldItem) => (
            <div key={`field-${fieldItem.title}`}>
              <h4 className="mb-2 text-sm font-medium">{fieldItem.title}</h4>
              <div className="flex flex-wrap gap-2">
                {fieldItem.fields.map((field) => (
                  <Button
                    key={field.id}
                    variant="outline"
                    className="h-8"
                    onClick={() => addField(field)}
                  >
                    {(() => {
                      const Icon =
                        fieldIcons[field.id as keyof typeof fieldIcons];
                      return <Icon className="size-6" />;
                    })()}
                    {field.label}
                  </Button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
