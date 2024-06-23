import type { SVGProps } from "react";

const RectangleIcon = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" {...props}>
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
