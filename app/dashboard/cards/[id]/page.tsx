import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Cards } from "iconsax-react";
import React from "react";
import PreviewCard from "../new-card/components/preview-card";
import { ShareCard } from "./components/ShareCard";
import { CardForm } from "@/app/utils/types/card.type";

export default function page() {
  const previewData: CardForm & { profileImg?: File; logoImg?: File } = {
    design: "classic",
    color: "#D1D5DB",
    prefix: "MR",
    firstName: "ABDELHAMID",
    middleName: "",
    lastName: "BACCOUCHE",
    suffix: "",
    accreditations: "USTHB",
    pronouns: "",
    affiliation: {
      title: "UI/UX Designer",
      department: "Marketing",
      company: "Innovate Skills",
      headline: "",
    },
    fields: [
      {
        label: "Phone",
        type: "phone",
        id: "",
      },
      {
        label: "Website",
        type: "website",
        id: "",
      },
      {
        label: "Documents",
        type: "doucments",
        id: "",
      },
      {
        label: "Work",
        type: "gallery",
        id: "",
      },
      {
        label: "Podcast",
        type: "podcast",
        id: "",
      },
    ],
    profileImg: undefined,
    logoImg: undefined,
  };
  return (
    <>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-black text-primary flex items-center gap-2">
          <Cards className="size-6" />
          Create New Card
        </h1>
      </div>
      <section className="grid grid-cols-12 gap-8">
        {/* Card Preview */}
        <PreviewCard values={previewData} showSocialMedia />
        {/* Settings */}
        <div className="col-span-12 lg:col-span-8">
          <Card className="pt-6">
            <CardContent>
              <Tabs defaultValue="share">
                <TabsList className="mb-6 bg-transparent w-full border-b-2 rounded-none justify-start px-1 py-0 h-auto">
                  <TabsTrigger
                    className="data-[state=active]:bg-primary"
                    value="share"
                  >
                    Share
                  </TabsTrigger>
                  <TabsTrigger
                    className="data-[state=active]:bottom-ring"
                    value="settings"
                  >
                    Settings
                  </TabsTrigger>
                </TabsList>
                <TabsContent value="share" className="space-y-8">
                  <ShareCard />
                </TabsContent>

                <TabsContent value="settings">
                  <p className="h-96">settings</p>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </section>
    </>
  );
}
