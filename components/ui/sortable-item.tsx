import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { GripVertical, X } from "lucide-react";
import { Button } from "./button";
import { FieldProps } from "@/app/schemas/formSchema";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { FormControl } from "./form";
import { FormItem } from "./form";
import { FormField } from "@/components/ui/form";

import { Switch } from "@/components/ui/switch";
import { useFormContext } from "react-hook-form";

export function SortableItem({
  field,
  children,
  onRemove,
  index,
}: {
  field: FieldProps;
  children: React.ReactNode;
  onRemove: (id: string) => void;
  index: number;
}) {
  const { control, setValue } = useFormContext();
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: field.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <Card ref={setNodeRef} style={style}>
      <CardHeader className="flex-row justify-between items-center">
        <div className="flex items-center">
          <button {...attributes} {...listeners} className="cursor-move mr-2">
            <GripVertical size={20} />
          </button>
          <CardTitle>{field.label}</CardTitle>
        </div>
        <div className="flex items-center gap-1">
          <FormField
            control={control}
            name={`fields.${index}.enabled`}
            render={({ field: switchField }) => (
              <FormItem className="flex items-center">
                <FormControl>
                  <Switch
                    checked={switchField.value}
                    onCheckedChange={(checked) =>
                      setValue(`fields.${index}.enabled`, checked)
                    }
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <Button variant="ghost" size="sm" onClick={() => onRemove(field.id)}>
            <X size={20} />
          </Button>
        </div>
      </CardHeader>
      {children}
    </Card>
  );
}
