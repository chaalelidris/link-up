import React, { SetStateAction } from "react";
import QRCodeStyling from "qr-code-styling";
import { useEffect, useRef } from "react";

export default function QrCanvas({
  setQrCode,
  ...props
}: {
  setQrCode?: React.Dispatch<SetStateAction<QRCodeStyling | undefined>>;
  width?: number;
  height?: number;
  margin?: number;
}) {
  const ref = useRef(null);

  const qrCode = new QRCodeStyling({
    type: "canvas",
    shape: "square",
    width: 240,
    height: 240,
    data: "https://qr-code-styling.com",
    margin: 10,
    qrOptions: { typeNumber: 0, mode: "Byte", errorCorrectionLevel: "Q" },
    dotsOptions: { type: "rounded", color: "#4b99c9", roundSize: true },
    backgroundOptions: { round: 0, color: "#ffffff" },
    cornersSquareOptions: { type: "extra-rounded", color: "#4b99c9" },
    cornersDotOptions: { type: "extra-rounded", color: "#4b99c9" },
    ...props,
  });
  useEffect(() => {
    if (ref.current) qrCode.append(ref.current);
    if (setQrCode) setQrCode(qrCode);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return <div ref={ref} className="size-full" />;
}
