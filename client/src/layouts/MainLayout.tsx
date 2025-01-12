"use client";

import { SplashScreen } from "@/components/molecule";
import { Button } from "@/components/ui/button";
import { PATHNAME, PUBLIC_PATH } from "@/configs";
import useScreenMode from "@/hooks/useScreenMode";
import { ChevronLeft } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useCallback, useMemo, useState } from "react";

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

  return (
    <div
      className={`w-full mx-auto min-h-screen relative ${
        isMobile ? "" : "max-w-[23.4375rem]"
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

export const CustomBackBtn = ({
  expectPath,
  type,
}: {
  expectPath?: string;
  type: "sign-out" | "back";
}) => {
  const { push } = useRouter();
  // const { reset } = useAuthStore();

  const onExit = useCallback(() => {
    // reset();
    push(PATHNAME.SIGN_IN);
  }, [push]);

  const renderByType = useMemo(
    () => ({
      "sign-out": (
        <Button
          onClick={onExit}
          className="absolute text-sm z-[99] bg-white h-[36px] rounded-[12px] top-8 left-6 shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:bg-primary hover:text-white"
        >
          Exit
        </Button>
      ),
      back: (
        <Button
          onClick={() => push(expectPath as string)}
          className="absolute z-[99] bg-secondary w-[36px] h-[36px] rounded-[12px] top-6 left-6 shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:bg-primary"
        >
          <ChevronLeft
            style={{
              color: "hsl(var(--foreground))",
            }}
          />
        </Button>
      ),
    }),
    [expectPath, onExit, push]
  );
  return renderByType[type];
};
