import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function HeroSection() {
  return (
    <section className="container mx-auto px-4">
      <div className="grid md:grid-cols-5 gap-12 items-center">
        <div className="grid-cols-1 md:col-span-3">
          <h1 className="text-4xl md:text-6xl font-bold text-primary mb-6">
            Carte de visite intelligente en quelques clics..
          </h1>
          <p className="text-xl font-light text-secondary mb-8">
            Finies les cartes de visite papier, passez au numérique. Vous
            n&apos;avez jamais de carte de visite mais vous avez toujours votre
            téléphone dans la poche !
          </p>
          <Link
            href={"/login"}
            className="flex w-fit items-center gap-2 bg-primary text-primary-foreground shadow hover:bg-secondary rounded-full text-base md:text-lg py-2 px-4 md:py-4 md:px-8 h-auto"
          >
            Commencez maintenant
            <ArrowRight className="size-4 md:!size-6" />
          </Link>
        </div>
        <div className="relative grid-cols-1 md:col-span-2">
          <Image
            src="/images/done.svg"
            alt="Phone illustration"
            width={500}
            height={500}
            className="max-w-96 mx-auto md:w-full"
          />
        </div>
      </div>
    </section>
  );
}
