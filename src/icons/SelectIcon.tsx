import type { SVGProps } from "react";

const SelectIcon = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="12"
      height="12"
      viewBox="0 0 18 18"
      {...props}
    >
      <path
        fill="inherit"
        fillOpacity="1"
        fillRule="nonzero"
        stroke="none"
        d="M14.872 8.859 3.646 2.072l-.98-.592.231 1.121 2.683 13 .243 1.178.664-1.003 3.038-4.59 5.22-1.417 1.127-.306-1-.604zM4.108 3.52l9.247 5.59-4.274 1.16-.182.05-.104.156-2.479 3.746L4.108 3.52z"
      ></path>
    </svg>
  );
};

export default SelectIcon;
