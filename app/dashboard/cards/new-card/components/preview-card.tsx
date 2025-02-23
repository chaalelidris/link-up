import { CardForm } from "@/app/utils/types/card.type";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Image from "next/image";
import React from "react";
import {
  User,
  Call,
  FolderOpen,
  Gallery,
  Instagram,
  Link2,
  MusicLibrary2,
} from "iconsax-react";
import { Facebook, Linkedin } from "lucide-react";
import TwitterIcon from "@/components/icons/twitter-icon";
import TiktokIcon from "@/components/icons/tiktok-icon";
import { cn } from "@/lib/utils";
import { SocialIcon } from "@/components/icons/social-icon";

export const fieldIcons = {
  website: Link2,
  phone: Call,
  instagram: Instagram,
  facebook: Facebook,
  linkedin: Linkedin,
  x: TwitterIcon,
  tiktok: TiktokIcon,
  doucments: FolderOpen,
  gallery: Gallery,
  podcast: MusicLibrary2,
  forums: MusicLibrary2,
};

export default function PreviewCard({
  values,
  showSocialMedia = false,
}: {
  values: CardForm;
  showSocialMedia?: boolean;
}) {
  return (
    <div className="lg:sticky lg:top-4 col-span-12 lg:col-span-4 h-fit ">
      <Card className="relative overflow-hidden rounded-3xl shadow-xl">
        <Image
          src={`/images/cards/${values.design}-bg.${
            values.design === "classic" ? "svg" : "png"
          }`}
          alt={values.design || "Card"}
          width={1000}
          height={800}
          className={cn(
            `h-56 w-full absolute top-0 inset-x-0 object-cover object-center z-0`
          )}
        />
        <div className="relative flex flex-col items-center p-6 z-10 gap-5">
          <Avatar className="h-32 w-32 border-2">
            <AvatarImage
              src={values.profileSrc || ""}
              alt="User avatar"
              className="object-cover object-center"
            />
            <AvatarFallback>
              {values.profileSrc ? (
                <User className="h-32 w-32" />
              ) : (
                <div className="size-full overflow-hidden rounded-3xl bg-gray-200">
                  <Image
                    src="/images/profile-placeholder.svg"
                    alt="Profile"
                    width={96}
                    height={96}
                    className="h-full w-full object-cover"
                  />
                </div>
              )}
            </AvatarFallback>
          </Avatar>
          <div className="text-center">
            <h2 className="text-xl font-[900] text-center text-gray-700 max-w-80">
              {`${values?.prefix ? `${values.prefix.toUpperCase()} ` : ""}${
                values.firstName?.toUpperCase() || ""
              }${
                values?.middleName ? ` ${values.middleName.toUpperCase()} ` : ""
              } ${values.lastName?.toUpperCase() || ""}${
                values?.suffix ? ` ${values.suffix.toUpperCase()}` : ""
              }`}
            </h2>
            {values.accreditations && (
              <p className="text-base text-muted-foreground">
                {values.accreditations}
              </p>
            )}
            {values.affiliation && (
              <>
                {values.affiliation.title && (
                  <p className="text-base font-semibold text-gray-700">
                    {values.affiliation.title}
                  </p>
                )}
                {values.affiliation.department && (
                  <p className="text-base font-semibold text-primary">
                    {values.affiliation.department}
                  </p>
                )}
                {values.affiliation.company && (
                  <p className="text-base italic">
                    {values.affiliation.company}
                  </p>
                )}
                {values.affiliation.headline && (
                  <p className="text-base italic text-muted-foreground">
                    {values.affiliation.headline}
                  </p>
                )}
              </>
            )}
          </div>

          {values.fields && values.fields?.length >= 1 && (
            <>
              <Button className="w-full">Add Contacts</Button>
              <div className="grid grid-cols-3 gap-4 w-full">
                {values.fields.map((field, index) => (
                  <div
                    key={`field-${index}`}
                    className="group flex flex-col items-center cursor-pointer"
                  >
                    <div className="mb-2 rounded-full group-hover:bg-primary bg-primary/5 p-3 size-20 flex items-center justify-center">
                      {(() => {
                        const Icon =
                          fieldIcons[field.type as keyof typeof fieldIcons];
                        return (
                          <Icon className="size-9 text-primary group-hover:text-white" />
                        );
                      })()}
                    </div>
                    <span className="text-xs">{field.label}</span>
                  </div>
                ))}
              </div>
            </>
          )}
          {showSocialMedia && (
            <div className="space-y-4">
              <p className="text-center text-accent-foreground">SOCIAL MEDIA</p>
              <div className="flex justify-center gap-4">
                <SocialIcon icon={Facebook} />
                <SocialIcon icon={Linkedin} />
                <SocialIcon icon={Instagram} />
                <SocialIcon icon={TwitterIcon} />
                <SocialIcon icon={TiktokIcon} />
              </div>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
}
