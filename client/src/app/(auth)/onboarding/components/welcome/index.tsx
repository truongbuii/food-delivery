import { PageTransition } from '@/components/molecule';
import { Button } from '@/components/ui/button';
import { IMAGES_CONST, PATHNAME } from '@/configs';

import Image from 'next/image';
import Link from 'next/link';
import { FC } from 'react';

interface IWelcomeProps {
  onNext: () => void;
}

const Welcome: FC<IWelcomeProps> = ({ onNext }) => {
  return (
    <PageTransition>
      <div
        style={{
          backgroundImage: `url(${IMAGES_CONST.onboarding.background.src})`
        }}
        className="h-[100vh] bg-cover bg-no-repeat flex flex-col items-start justify-between p-8 gap-4 relative"
      >
        <div className="absolute inset-x-0 bottom-0 h-[70%] bg-gradient-to-t from-[#191B2F] to-transparent opacity-80 pointer-events-none z-0"></div>

        <div className="flex flex-col items-start justify-start gap-5 pt-32 relative z-10">
          <Image
            width={300}
            height={111}
            src={IMAGES_CONST.onboarding.title}
            alt={IMAGES_CONST.onboarding.title.toString()}
          />
          <p className="text-lg text-[#30384F] max-w-[266px]">
            Your favorites foods delivered fast at your door.
          </p>
        </div>

        <div className="flex flex-col items-center justify-center gap-6 w-full  relative z-10">
          <div className="z-10 w-full p-4">
            <div className="flex items-center justify-between py-2">
              <div className="bg-white bg-opacity-50 w-24 h-[1px]"></div>
              <span className="text-sm text-[#ffffff]">sign in with</span>
              <div className="bg-white bg-opacity-50 w-24 h-[1px]"></div>
            </div>
            <div className="flex justify-between">
              <Button className="w-32 h-14 rounded-[28px] p-4 bg-white hover:bg-lightGray/95">
                <Image
                  alt={IMAGES_CONST.auth.facebookIcon.toString()}
                  src={IMAGES_CONST.auth.facebookIcon}
                  className="w-9 h-9"
                />
                <span className="text-xs text-black">FACEBOOK</span>
              </Button>
              <Button className="w-32 h-14 rounded-[28px] p-4 bg-white hover:bg-lightGray/95">
                <Image
                  alt={IMAGES_CONST.auth.googleIcon.toString()}
                  src={IMAGES_CONST.auth.googleIcon}
                  className="w-8 h-8"
                />
                <span className="text-xs text-black">GOOGLE</span>
              </Button>
            </div>
          </div>
          <Button
            size={'lg'}
            className="h-12 rounded-[100px]"
            style={{
              backgroundColor: 'rgba(255, 255, 255, 0.3)',
              border: '1px solid #FFFFFF'
            }}
            onClick={onNext}
          >
            <span className="text-base text-white">Get started</span>
          </Button>
          <div className="flex items-center justify-center">
            <span className="text-white text-sm">Already have an account?</span>
            <Link
              href={PATHNAME.SIGN_IN}
              className="px-2 font-normal text-sm text-primary underline"
            >
              Sign in{' '}
            </Link>
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

export default Welcome;
