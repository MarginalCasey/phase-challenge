import type { SVGProps } from "react";

const RectangleIcon = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="12"
      height="12"
      viewBox="-1 -1 12 12"
      {...props}
    >
      <path
        d="M0.5 0.5H9.5V9.5H0.5V0.5Z"
        stroke="inherit"
        strokeWidth="1"
        fill="none"
      ></path>
    </svg>
  );
};

export default RectangleIcon;
