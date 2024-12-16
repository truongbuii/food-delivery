'use client';

import { PATHNAME, PUBLIC_PATH } from '@/configs';
import useScreenMode from '@/hooks/useScreenMode';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

const PATH_CONTAINS_SPLASH_SCREEN = [
  PATHNAME.HOME,
  ...Object.values(PUBLIC_PATH)
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
    isLoading
  };
};

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  const { isMobile } = useScreenMode();
  const { isSplash, isLoading } = useLayout();

  return (
    <div
      className={`w-full mx-auto min-h-screen relative ${
        isMobile ? '' : 'max-w-[23.4375rem]'
      }`}
    >
      {!isLoading && isSplash ? <div>Load...</div> : children}
    </div>
  );
};

export default MainLayout;
