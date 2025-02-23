export type Client = {
  id: string;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  type: "contact" | "prospect";
  country: string;
  createdAt: string;
  updatedAt: string;
};
