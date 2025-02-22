import { memo } from "react";

const IconStar = ({
  size = 18,
  ...props
}: { size?: number } & React.SVGProps<SVGSVGElement>) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 18 17"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M14.3919 17L8.89921 14.1104L3.40648 17L4.45598 10.8805L0 6.54616L6.14598 5.65359L8.89234 0L11.6387 5.65359L17.7847 6.54616L13.3395 10.8805L14.3919 17Z"
        fill="#FFC529"
      />
    </svg>
  );
};

export default memo(IconStar);
