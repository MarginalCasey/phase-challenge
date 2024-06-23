import type { SVGProps } from "react";

const TextIcon = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="12"
      height="12"
      viewBox="0 -1 12 12"
      {...props}
    >
      <path
        fill="inherit"
        fillOpacity="1"
        fillRule="evenodd"
        stroke="none"
        d="M0 0h11v3h-1V1H6v8h1.5v1h-4V9H5V1H1v2H0V0z"
      ></path>
    </svg>
  );
};

export default TextIcon;
