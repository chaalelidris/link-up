"use client";

import { Client } from "@/app/utils/types/client.type";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DocumentFilter,
  People,
  ProfileAdd,
  ProfileDelete,
  UserEdit,
} from "iconsax-react";
import dayjs from "dayjs";
import { clients } from "@/app/modals/clients";
import { useRouter } from "next/navigation";
const ClientCard = ({
  id,
  firstName,
  lastName,
  phone,
  email,
  type,
  country,
  createdAt,
}: Client) => {
  const navigate = useRouter();
  return (
    <Card
      className="group flex items-center p-5 gap-2 cursor-pointer"
      onClick={() => {
        navigate.push(`/profile/${id}`);
      }}
    >
      <div className="flex-1 grid grid-cols-6 gap-5 ">
        <p className="truncate">{`${firstName} ${lastName}`}</p>
        <p className="truncate">{`${phone}`}</p>
        <p className="truncate">{`${email}`}</p>
        <p className="truncate">{`${country}`}</p>
        <p className="truncate">{`${type}`}</p>
        <p className="truncate">{`${dayjs(createdAt).format(
          "DD MMM YYYY"
        )}`}</p>
      </div>
      <div className="lg:max-w-0 lg:overflow-hidden lg:opacity-0 flex gap-2 lg:transition-all lg:duration-300 lg:ease-in-out lg:group-hover:max-w-24 lg:group-hover:opacity-100">
        <Button
          className="!p-2 h-8"
          variant="ghost"
          onClick={(e) => {
            e.stopPropagation();
            console.log("edit");
          }}
        >
          <UserEdit className="!size-6" />
        </Button>
        <Button
          className="!p-2 h-8"
          variant="ghost"
          onClick={(e) => {
            e.stopPropagation();
            console.log("delete");
          }}
        >
          <ProfileDelete className="!size-6" />
        </Button>
      </div>
    </Card>
  );
};
export default function Page() {
  return (
    <>
      <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between md:flex-wrap">
        <h1 className="text-lg md:text-2xl font-black text-primary flex items-center gap-2">
          <People className="size-6" />
          Mes Clients
        </h1>
        <div className="flex items-center gap-5 flex-row flex-wrap">
          <Select>
            <SelectTrigger className="flex items-center gap-2 md:text-lg py-3  h-auto font-bold bg-primary text-white sm:w-fit">
              <div className="flex items-center gap-2">
                <DocumentFilter className="size-6" />
                <span className="text-muted">Filter by:</span>
                <SelectValue placeholder="Color" />
              </div>
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Colors</SelectLabel>
                {["red", "green", "blue", "yellow", "purple"].map((color) => (
                  <SelectItem key={color} value={color}>
                    <div className="flex items-center gap-2">
                      <div
                        className={`w-5 h-5 rounded-full border border-white`}
                        style={{ background: color }}
                      />
                      {color.charAt(0).toUpperCase() + color.slice(1)}
                    </div>
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
          <Select>
            <SelectTrigger className="flex items-center gap-2 md:text-lg py-3  h-auto font-bold bg-primary text-white sm:w-fit">
              <div className="flex items-center gap-2">
                <DocumentFilter className="size-6" />
                <span className="text-muted">Filter by:</span>
                <SelectValue placeholder="Type" />
              </div>
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Types</SelectLabel>
                {["contact", "prospect"].map((type) => (
                  <SelectItem key={type} value={type}>
                    <div className="flex items-center gap-2">
                      {type.charAt(0).toUpperCase() + type.slice(1)}
                    </div>
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
          <Button
            type="submit"
            className="flex items-center gap-2 md:text-lg py-3  h-auto font-bold w-full md:w-fit"
          >
            <ProfileAdd className="!size-6" />
            Créer une nouvelle Client
          </Button>
        </div>
      </div>
      <div className="overflow-x-scroll">
        <div className="grid grid-cols-1 gap-4 w-max lg:w-auto">
          {clients.map((client, i) => (
            <ClientCard key={i} {...client} />
          ))}
        </div>
      </div>
    </>
  );
}
