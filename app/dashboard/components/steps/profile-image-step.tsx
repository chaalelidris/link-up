import { useFormContext } from "react-hook-form";
import { FormField } from "@/components/ui/form";
import AvatarUpload from "@/components/avatar-upload";

export default function ProfileImageStep() {
  const { control } = useFormContext();

  return (
    <>
      <h1 className="text-2xl md:text-4xl font-bold text-primary text-center">
        Choose a picture of yourself
      </h1>
      <div className="flex items-center">
        {/* Logo */}
        <FormField
          control={control}
          name="profileImage"
          render={() => (
            <AvatarUpload
              name="profileImage"
              src="/images/profile-placeholder.svg"
            />
          )}
        />
      </div>
    </>
  );
}
