import React from "react";

export default function TwitterIcon({ className }: { className: string }) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path d="M11.8598 8.46156L19.1373 0.0020752H17.4128L11.0937 7.34735L6.04671 0.0020752H0.225586L7.85763 11.1094L0.225586 19.9805H1.95022L8.62331 12.2236L13.9533 19.9805H19.7744L11.8594 8.46156H11.8598ZM2.57161 1.30037H5.22054L17.4135 18.7413H14.7646L2.57161 1.30037Z" />
    </svg>
  );
}
