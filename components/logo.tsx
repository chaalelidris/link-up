import { cx } from "class-variance-authority";
import React from "react";

const Logo = ({ className }: { className?: string }) => {
  return (
    <h1
      className={cx("text-3xl lg:text-5xl font-black text-primary", className)}
    >
      Link<span className="text-secondary">UP</span>
    </h1>
  );
};

export default Logo;
