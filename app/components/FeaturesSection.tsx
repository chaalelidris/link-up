import { Card } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const FeatureItem = ({
  imgSrc,
  imgAlt,
  className,
  title,
  description,
  link,
  extraContent,
}: {
  imgSrc: string;
  imgAlt: string;
  className: string;
  title: string;
  description: string;
  link: string;
  extraContent?: React.ReactNode;
}) => (
  <Card className={className}>
    {extraContent}
    <div className="h-40 mb-14 flex justify-center">
      <Image
        src={imgSrc}
        alt={imgAlt}
        width={200}
        height={160}
        className="object-contain"
      />
    </div>
    <h3 className="text-xl font-semibold mb-3">{title}</h3>
    <p className="mb-16">{description}</p>
    <Link
      href={link}
      className="text-primary flex items-center hover:underline"
    >
      Learn more <ArrowRight className="ml-2 h-4 w-4" />
    </Link>
  </Card>
);

export default function FeaturesSection() {
  const featureItems = [
    {
      imgSrc: "/images/box-victor.svg",
      imgAlt: "Continuous updates",
      className:
        "max-w-96 p-6 md:p-12 h-fit mx-auto text-secondary shadow-primary-shodow border-0 relative",
      title: "Mise à jour continue",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      link: "#",
      extraContent: (
        <Image
          src="/images/dots.svg"
          alt="Customize by domain"
          width={200}
          height={200}
          className="size-40 absolute -left-28 inset-y-0 -z-10 my-auto"
        />
      ),
    },
    {
      imgSrc: "/images/feat-victor.svg",
      imgAlt: "Personnaliser par domaine",
      className:
        "max-w-96 p-6 md:p-12 mx-auto text-secondary shadow-primary-shodow border-0 relative",
      title: "Personnaliser par domaine",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      link: "#",
      extraContent: (
        <Image
          src="/images/dots.svg"
          alt="Customize by domain"
          width={200}
          height={200}
          className="size-40 absolute -right-28 -top-20 -z-10"
        />
      ),
    },
    {
      imgSrc: "/images/laptop-victor.svg",
      imgAlt: "Access from anywhere",
      className:
        "max-w-96 p-6 md:p-12 mx-auto text-secondary shadow-primary-shodow border-0",
      title: "Accès de n'importe où",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      link: "#",
    },
  ];
  return (
    <section className="relative overflow-x-visible">
      <Image
        src="/images/rectangles.svg"
        alt="rectangles"
        width={255}
        height={198.15}
        className="h-48 w-auto absolute top-0 right-0 -z-50"
      />
      <div className="container mx-auto px-4 py-16">
        <h2 className="text-xl md:text-3xl text-secondary mb-4">
          Avec <span className="font-bold">LinkUP</span>,<br /> vos coordonnées
          sont toujours à jour !
        </h2>
        <div className="grid md:grid-cols-2 gap-4 md:gap-8 mt-6 md:mt-12 items-center">
          <FeatureItem {...featureItems[0]} />
          <div className="flex flex-col gap-4 md:gap-28">
            {featureItems.slice(1).map((item, index) => (
              <FeatureItem key={index} {...item} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
