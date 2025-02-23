import { LoginForm } from "@/components/login-form";
import Logo from "@/components/logo";
import Link from "next/link";

export default function LoginPage() {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
      <div className="flex w-full max-w-xl flex-col items-center gap-6">
        <Link href="/">
          <Logo />
        </Link>
        <LoginForm />
      </div>
    </div>
  );
}
