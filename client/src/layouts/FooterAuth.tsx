"use client";

import { Button } from "@/components/ui/button";
import { IMAGES_CONST } from "@/configs";
import { useMessage } from "@/hooks/useMessage";
import { useOauthLogin } from "@/queries";
import Image from "next/image";

const FooterAuth = () => {
  const message = useMessage();
  const { mutateAsync } = useOauthLogin();

  const handleSocialLogin = (provider: string) => {
    mutateAsync(provider, {
      onSuccess: (res) => {
        if (res && res.data) {
          window.location.href = res.data;
        }
      },
      onError: (err) => {
        message.error(err?.message);
      },
    });
  };

  return (
    <div className="absolute bottom-6 flex flex-col gap-2 px-6 w-full">
      <div className="flex items-center justify-between py-2">
        <div className="bg-gray-200 bg-opacity-50 w-28 h-[1px]"></div>
        <span className="text-sm text-[#9796A1]">Or sign in with</span>
        <div className="bg-gray-200 bg-opacity-50 w-28 h-[1px]"></div>
      </div>
      <div className="flex justify-between">
        <Button
          className="w-36 h-14 rounded-[28px] p-4 bg-white hover:bg-lightGray/50 shadow-socialBtn"
          onClick={() => handleSocialLogin("facebook")}
        >
          <Image
            alt={IMAGES_CONST.auth.facebookIcon.toString()}
            src={IMAGES_CONST.auth.facebookIcon}
            className="w-9 h-9"
          />
          <span className="w-16 text-black">FACEBOOK</span>
        </Button>
        <Button
          className="w-36 h-14 rounded-[28px] p-4 bg-white hover:bg-lightGray/50 shadow-socialBtn"
          onClick={() => handleSocialLogin("google")}
        >
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
};

export default FooterAuth;
