import { IMAGES_CONST } from '@/configs';
import Image from 'next/image';
import { FC, ReactNode } from 'react';

const BackgroundAuth: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <div className="w-full relative h-[100dvh]">
      <div className="w-full relative">
        <Image
          width={60}
          src={IMAGES_CONST.auth.background1}
          alt={IMAGES_CONST.auth.background1.toString()}
          className="absolute top-[-5px] left-0 z-1"
        />
        <Image
          width={184}
          src={IMAGES_CONST.auth.background2}
          alt={IMAGES_CONST.auth.background2.toString()}
          className="absolute top-0 left-0 z-2"
        />
        <Image
          width={84}
          src={IMAGES_CONST.auth.background3}
          alt={IMAGES_CONST.auth.background3.toString()}
          className="absolute top-0 right-0"
        />
      </div>
      {children}
    </div>
  );
};

export default BackgroundAuth;
