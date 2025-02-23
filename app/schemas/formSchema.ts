import { z } from "zod";

export const MAX_FILE_SIZE = 3 * 1024 * 1024; // 5MB
export const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
];

export const colors = [
  "#D1D5DB",
  "#3B82F6",
  "#EF4444",
  "#F59E0B",
  "#8B5CF6",
  "#111827",
  "#F97316",
];

export const designs = [
  {
    id: "classic",
    name: "Classic",
    preview: "/images/cards/classic-bg.svg",
  },
  {
    id: "lite",
    name: "Lite",
    preview: "/images/cards/lite-bg.png",
  },
  {
    id: "background",
    name: "Background",
    preview: "/images/cards/background-bg.png",
  },
];

export const FieldSchema = z.object({
  id: z.string(),
  type: z.string().optional(),
  label: z.string().optional(),
  enabled: z.boolean().optional(),
  url: z.string().url().optional(),
  displayText: z.string().optional(),
});

export const formSchema = z.object({
  design: z.enum(["classic", "lite", "background"]),
  color: z.enum([
    "#D1D5DB",
    "#3B82F6",
    "#EF4444",
    "#F59E0B",
    "#8B5CF6",
    "#111827",
    "#F97316",
  ]),
  prefix: z.string().optional(),
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  middleName: z.string().optional(),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  suffix: z.string().optional(),
  accreditations: z.string().optional(),
  pronouns: z.string().optional(),
  affiliation: z.record(
    z.enum(["title", "department", "company", "headline"]),
    z.string().optional()
  ),
  fields: z.array(FieldSchema),
  profileImg: z
    .any()
    .refine((file) => file instanceof File, "Profile image is required")
    .refine((file) => file?.size <= MAX_FILE_SIZE, `Max file size is 5MB.`)
    .refine(
      (file) => ACCEPTED_IMAGE_TYPES.includes(file?.type),
      "Only .jpg, .jpeg, .png, .webp and .gif formats are supported."
    )
    .optional(),
  logoImg: z
    .any()
    .refine((file) => file instanceof File, "Logo image is required")
    .refine((file) => file?.size <= MAX_FILE_SIZE, `Max file size is 5MB.`)
    .refine(
      (file) => ACCEPTED_IMAGE_TYPES.includes(file?.type),
      "Only .jpg, .jpeg, .png, .webp and .gif formats are supported."
    )
    .optional(),
});

export const defaultValues: FormData = {
  design: "classic",
  color: "#D1D5DB",
  prefix: "",
  firstName: "",
  middleName: "",
  lastName: "",
  suffix: "",
  accreditations: "",
  pronouns: "",
  affiliation: {
    title: "",
    department: "",
    company: "",
    headline: "",
  },
  fields: [],
  profileImg: undefined,
  logoImg: undefined,
};
export type FormData = z.infer<typeof formSchema>;
export type FieldProps = z.infer<typeof FieldSchema>;

export const steps = ["display", "information", "fields", "card"];
