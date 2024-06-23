import type { SVGProps } from "react";

const FrameIcon = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="12"
      height="12"
      viewBox="0 0 12 12"
      {...props}
    >
      <path
        fill="inherit"
        fillOpacity="1"
        fillRule="evenodd"
        stroke="none"
        d="M4 .5V3h4V.5h1V3h2.5v1H9v4h2.5v1H9v2.5H8V9H4v2.5H3V9H.5V8H3V4H.5V3H3V.5h1zM8 8V4H4v4h4z"
      ></path>
    </svg>
  );
};

export default FrameIcon;
