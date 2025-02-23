export interface CardForm {
  // display
  design?: "classic" | "lite" | "background";
  profileSrc?: string;
  color?: string;
  logoSrc?: string;
  // informations
  prefix?: string;
  firstName?: string;
  middleName?: string;
  lastName?: string;
  suffix?: string;
  accreditations?: string;
  pronouns?: string;
  affiliation?: {
    title?: string;
    department?: string;
    company?: string;
    headline?: string;
  };
  // fields
  fields?: {
    id: string;
    type?: string;
    icon?: string;
    label?: string;
    enabled?: boolean;
    url?: string;
    displayText?: string;
  }[];
}
