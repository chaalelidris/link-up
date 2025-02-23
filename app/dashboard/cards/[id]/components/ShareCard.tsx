"use client";

import { Copy, Mail, Share } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

import Image from "next/image";
import QrCanvas from "./qr-canvas";
import { useState } from "react";
import QRCodeStyling from "qr-code-styling";

export function ShareCard() {
  const [qrCode, setQrCode] = useState<QRCodeStyling | undefined>();
  return (
    <>
      <Card className="p-0 grid grid-cols-1 lg:grid-cols-2 bg-muted">
        <div className="p-4 flex flex-col">
          <h3 className="text-lg font-semibold">Share your QR Code</h3>
          <div className="aspect-square w-full max-w-[240px] rounded-lg bg-white overflow-hidden self-center">
            <QrCanvas setQrCode={setQrCode} />
          </div>
        </div>
        <div className="p-4 border-t lg:border-t-0 lg:border-l">
          <h3 className="mb-4 text-lg font-semibold">Share your card</h3>
          <div className="space-y-4">
            <Button variant="outline" className="w-full justify-start gap-2">
              <Copy className="h-4 w-4" />
              Copy Link
            </Button>
            <div>
              <p className="mb-2 text-sm text-muted-foreground">Or share by</p>
              <div className="flex gap-2">
                <Button variant="outline" className="flex-1 gap-2">
                  <Mail className="h-4 w-4" />
                  Email
                </Button>
                <Button
                  variant="outline"
                  className="flex-1 gap-2"
                  onClick={() =>
                    qrCode?.download({
                      extension: "png",
                    })
                  }
                >
                  <Share className="h-4 w-4" />
                  Download
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Card>
      <h3 className="my-4 text-lg font-semibold">Here is your Printing Card</h3>
      <div className="relative w-full max-w-96">
        <h1 className={"absolute top-7 left-5 text-xl font-black text-white"}>
          LinkUP
        </h1>
        <p
          className={
            "absolute bottom-7 inset-x-5  flex items-end justify-between"
          }
        >
          <span className="text-xs font-black text-white">John Doe</span>
          <div className="aspect-square w-full max-w-20 rounded-lg bg-white overflow-hidden">
            <QrCanvas width={80} height={80} margin={0} />
          </div>
        </p>
        <Image
          width={300}
          height={200}
          src={"/images/cards/card-4.svg"}
          alt="Card 1"
          className="w-full h-auto"
        />
      </div>
    </>
  );
}
