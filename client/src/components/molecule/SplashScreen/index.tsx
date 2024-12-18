'use client';

import { IMAGES_CONST } from '@/configs';
import Image from 'next/image';
import { FC, useEffect } from 'react';
import { IconLogo } from '../svgs';

interface SplashScreenProps {
  finishLoading: () => void;
}

const SplashScreen: FC<SplashScreenProps> = ({ finishLoading }) => {
  useEffect(() => {
    const time_splash = setTimeout(() => {
      finishLoading();
    }, 1500); // 1.5s

    return () => {
      clearTimeout(time_splash);
    };
  }, [finishLoading]);

  return (
    <div className="w-full bg-primary h-[100dvh] flex items-center justify-center flex-col">
      <IconLogo fontSize={'8.5rem'} className="animate-scale" />
      <Image
        width={182}
        height={60}
        src={IMAGES_CONST.splash.title}
        alt="image logo"
      />
    </div>
  );
};

export default SplashScreen;
