import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Image from "next/image";
import React from "react";
import { Linkedin } from "lucide-react";
import Logo from "@/components/logo";
import {
  Facebook,
  Instagram,
  Call,
  FolderOpen,
  Gallery,
  Global,
  Map,
  MusicLibrary2,
  PlayCircle,
  SmsTracking,
} from "iconsax-react";
import TiktokIcon from "@/components/icons/tiktok-icon";
import TwitterIcon from "@/components/icons/twitter-icon";
import { SocialIcon } from "@/components/icons/social-icon";
export default function ProfilePage() {
  return (
    <div className="min-h-screen flex flex-col items-center py-8 px-4">
      <div className="w-full max-w-3xl">
        {/* Logo */}
        <Logo className="text-center" />

        {/* Main Card */}
        <Card className="bg-white p-6 pt-16 sm:pt-24 rounded-3xl relative mt-14 sm:mt-20">
          {/* Profile Section */}
          <div className="absolute inset-x-0 mx-auto -top-10 sm:-top-16 size-20 sm:size-36 rounded-full overflow-hidden border-2 border-primary">
            <Image
              src={"/images/profile-placeholder.svg"}
              alt="Profile"
              width={146}
              height={146}
              className="size-full object-cover"
            />
          </div>
          <div className="flex flex-col items-center mb-6">
            <h2 className="text-primary text-lg sm:text-xl font-bold mb-1 text-center">
              BACCOUCHE Abdelhamid
            </h2>
            <p className="text-gray-600 mb-4">GRAPHIC DESIGNER</p>
            <Button className="bg-primary hover:bg-primary/90 text-white rounded-full px-8">
              Add Contacts
            </Button>
          </div>

          {/* Contact Icons Grid */}
          <div className="grid grid-cols-3 md:grid-cols-4 gap-6 mb-8">
            {/* Top Row */}
            <IconLink icon={Call} label="Phone" active />
            <IconLink icon={SmsTracking} label="Email" />
            <IconLink icon={Global} label="Website" />
            <IconLink icon={Map} label="Adress" />

            {/* Bottom Row */}
            <IconLink icon={FolderOpen} label="Documents" />
            <IconLink icon={Gallery} label="Works" />
            <IconLink icon={PlayCircle} label="Videos" />
            <IconLink icon={MusicLibrary2} label="Podcast" />
          </div>

          {/* Social Media */}
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
        </Card>
        {/* Footer */}
        <p className="text-center text-sm text-gray-500 mt-6">
          © Tous droits réservés
        </p>
      </div>
    </div>
  );
}

function IconLink({
  icon: Icon,
  label,
  active,
}: {
  icon: React.ElementType;
  label: string;
  active?: boolean;
}) {
  return (
    <div className="flex flex-col items-center gap-2">
      <div
        className={`md:size-32 p-4 rounded-full flex items-center justify-center cursor-pointer ${
          active ? "bg-primary text-white" : "bg-[#dde7ef] text-primary"
        }`}
      >
        <Icon className="size-6 md:size-14" />
      </div>
      <span className="text-gray-600">{label}</span>
    </div>
  );
}
