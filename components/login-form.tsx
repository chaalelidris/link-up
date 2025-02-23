"use client";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { PasswordCheck, UserSquare } from "iconsax-react";
import Link from "next/link";

export function LoginForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const navigate = useRouter();
  return (
    <div className={cn("flex flex-col gap-6 w-full", className)} {...props}>
      <Card>
        <CardHeader className="flex items-center justify-center gap-6">
          <CardTitle>
            <Image
              src={"/images/task_list.svg"}
              width={273}
              height={197}
              alt="task list"
              className="h-28 md:h-48 w-auto"
            />
          </CardTitle>
          <CardDescription className="text-xl md:text-4xl text-primary font-bold">
            Veuillez vous identifier
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              navigate.push("/dashboard");
            }}
          >
            <div className="grid gap-6">
              <div className="grid gap-2 relative">
                <UserSquare className="absolute top-1/2 left-3 transform -translate-y-1/2 size-6 md:size-8 text-primary" />
                <Input
                  id="email"
                  type="email"
                  placeholder="Nom d’utilisateur ou adresse mail"
                  className="pl-10 md:pl-12 text-base py-4 h-auto rounded-lg"
                  required
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <a
                    href="#"
                    className="ml-auto text-sm underline-offset-4 hover:underline"
                  >
                    Forgot your password?
                  </a>
                </div>
                <div className="relative">
                  <PasswordCheck className="absolute top-1/2 left-3 transform -translate-y-1/2 size-6 md:size-8 text-primary" />
                  <Input
                    id="password"
                    type="password"
                    placeholder="Mot de passe"
                    required
                    className="pl-10 md:pl-12 text-base py-4 h-auto rounded-lg"
                  />
                </div>
              </div>
              <Button
                type="submit"
                className="w-full md:text-lg py-3 md:py-5 h-auto font-bold"
              >
                Se connecter
              </Button>
            </div>
          </form>
          <Link
            href="/signup"
            className="w-full md:text-lg py-3 md:py-5 font-bold text-primary mt-4 md:mt-8 block border-2 border-primary rounded-lg text-center hover:bg-primary/10"
          >
            Créer un nouveau compte
          </Link>
        </CardContent>
      </Card>
      <div className="text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 [&_a]:hover:text-primary  ">
        © Tous droits réservés
      </div>
    </div>
  );
}
