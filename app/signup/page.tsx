import Logo from "@/components/logo";
import { SignupForm } from "@/components/signup-form";
import Link from "next/link";

export default function SignupPage() {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
      <div className="flex w-full max-w-xl flex-col items-center gap-6">
        <Link href="/">
          <Logo />
        </Link>
        <SignupForm />
      </div>
    </div>
  );
}
