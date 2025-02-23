import Link from "next/link";
import Image from "next/image";
import Logo from "@/components/logo";

export default function Footer() {
  return (
    <footer className="relative">
      <Image
        src="/images/rectangles.svg"
        alt="rectangles"
        width={255}
        height={198.15}
        className="h-48 w-auto absolute top-2 right-0 -z-50"
      />
      <Image
        src="/images/dots.svg"
        alt="Customize by domain"
        width={200}
        height={200}
        className="size-40 absolute right-56 bottom-0 -z-10"
      />
      <div className="container mx-auto px-4 py-20 text-center flex flex-col gap-4 ">
        <Link href="/">
          <Logo />
        </Link>
        <p className="text-gray-600 text-sm">© Tous droits réservés</p>
      </div>
    </footer>
  );
}
