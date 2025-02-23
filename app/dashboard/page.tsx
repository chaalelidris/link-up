"use client";
import { Button } from "@/components/ui/button";
import { CardAdd, Cards } from "iconsax-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { NewCardDialog } from "./components/new-card-dialog";
import { useRouter } from "next/navigation";
const CreditCard = ({
  fullName,
  cardSrc,
  onClick,
}: {
  fullName: string;
  cardSrc: string;
  onClick: () => void;
}) => (
  <div className="relative w-full max-w-96 cursor-pointer " onClick={onClick}>
    <h1 className={"absolute top-7 left-5 text-xl font-black text-white"}>
      LinkUP
    </h1>
    <p className={"absolute bottom-7 left-5 text-xs font-black text-white"}>
      {fullName}
    </p>
    <Image
      width={300}
      height={200}
      src={cardSrc}
      alt="Card 1"
      className="w-full h-auto"
    />
  </div>
);
export default function DashboardPage() {
  const [isEmpty, setIsEmpty] = useState(false);
  const router = useRouter();
  return (
    <>
      <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
        <h1 className="text-lg md:text-2xl font-black text-primary flex items-center gap-2">
          <Cards className="size-6" />
          Mes Cartes
        </h1>
        <div className="flex gap-2">
          <Button
            onClick={() => setIsEmpty((prev) => !prev)}
            variant="outline"
            className="py-3 h-auto"
          >
            Toggle Empty
          </Button>
          {!isEmpty && <NewCardDialog />}
        </div>
      </div>
      {isEmpty ? (
        <div className="flex flex-col items-center justify-center pt-20 gap-5">
          <Image
            src="/images/empty-state.svg"
            alt="empty"
            width={1000}
            height={700}
            className="h-24 md:h-40 w-auto"
          />
          <h1 className="text-2xl md:text-4xl">Welcome to your cards page !</h1>
          <Link
            href="/dashboard/cards/new-card"
            className="flex items-center gap-2 md:text-lg py-3 h-auto font-bold bg-primary text-primary-foreground shadow hover:bg-secondary rounded-lg px-4"
          >
            <CardAdd className="!size-6" />
            Créer une nouvelle carte
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 place-items-center">
          {[...Array(4)].map((_, i) => (
            <CreditCard
              key={i}
              fullName="John Doe"
              cardSrc={`/images/cards/card-${i + 1}.svg`}
              onClick={() => router.push(`/dashboard/cards/${i}`)}
            />
          ))}
        </div>
      )}
    </>
  );
}
