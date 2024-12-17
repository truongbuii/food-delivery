import { Button } from '@/components/ui/button';
import { IMAGES_CONST } from '@/configs';
import Image from 'next/image';

const FooterAuth = () => (
  <div className="fixed bottom-4 w-full px-6 max-w-[390px]">
    <div className="flex items-center justify-between py-2">
      <div className="bg-gray-200 bg-opacity-50 w-28 h-0.5"></div>
      <span>Or sign in with</span>
      <div className="bg-gray-200 bg-opacity-50 w-28 h-0.5"></div>
    </div>
    <div className="flex justify-between">
      <Button className="w-36 h-14 rounded-[28px] p-4 bg-white hover:bg-lightGray shadow-socialBtn">
        <Image
          alt={IMAGES_CONST.auth.facebookIcon.toString()}
          src={IMAGES_CONST.auth.facebookIcon}
          className="w-9 h-9"
        />
        <span className="w-16 text-black">FACEBOOK</span>
      </Button>
      <Button className="w-36 h-14 rounded-[28px] p-4 bg-white hover:bg-lightGray shadow-socialBtn">
        <Image
          alt={IMAGES_CONST.auth.googleIcon.toString()}
          src={IMAGES_CONST.auth.googleIcon}
          className="w-8 h-8"
        />
        <span className="w-16 text-black">GOOGLE</span>
      </Button>
    </div>
  </div>
);

export default FooterAuth;
