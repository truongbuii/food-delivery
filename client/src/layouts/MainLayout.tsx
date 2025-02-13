"use client";

import { SplashScreen } from "@/components/molecule";
import { PATHNAME, PUBLIC_PATH, VIEWER_CONTAINER_ID } from "@/configs";
import useRouterProgress from "@/hooks/useRouterProgress";
import useScreenMode from "@/hooks/useScreenMode";
import { usePathname } from "next/navigation";
import { useState } from "react";

const PATH_CONTAINS_SPLASH_SCREEN = [
  PATHNAME.HOME,
  ...Object.values(PUBLIC_PATH),
];

const useLayout = () => {
  const pathName = usePathname();
  const [isLoading, setIsLoading] = useState(true);
  const isSplash = PATH_CONTAINS_SPLASH_SCREEN.includes(pathName);

  const finishLoading = () => {
    setIsLoading(false);
  };

  return {
    finishLoading,
    isSplash,
    isLoading,
  };
};

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  const { isMobile } = useScreenMode();
  const { finishLoading, isSplash, isLoading } = useLayout();
  useRouterProgress();
  return (
    <div
      id={VIEWER_CONTAINER_ID}
      className={`w-full mx-auto min-h-screen relative bg-background ${
        isMobile ? "" : "max-w-[23.4375rem] overflow-hidden"
      }`}
    >
      {isLoading && isSplash ? (
        <SplashScreen finishLoading={finishLoading} />
      ) : (
        children
      )}
    </div>
  );
};

export default MainLayout;
