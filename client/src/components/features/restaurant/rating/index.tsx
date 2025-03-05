"use client";

import { Avatar, RatingForm } from "@/components/molecule";
import { HeartButton } from "@/components/molecule/CardItem";
import { IconChecked } from "@/components/molecule/svgs";
import { IMAGES_CONST } from "@/configs";
import Image from "next/image";

const RatingRestaurant = () => {
  return (
    <>
      <div className="relative flex">
        <div className="relative w-full h-36 rounded-2xl overflow-hidden">
          <Image
            src={IMAGES_CONST.common.restaurant}
            alt="restaurant"
            fill
            sizes="100%"
            priority
            className="object-cover"
          />
        </div>
        <HeartButton favorite={true} />
        <div className="absolute flex justify-center items-center w-[104px] h-[104px] bg-background rounded-full z-10 left-1/2 -translate-x-1/2 bottom-0 translate-y-1/2">
          <div className="relative">
            <Avatar
              className="w-20 h-20"
              avatarURL={IMAGES_CONST.common.defaultAvatar}
            />
            <div className="absolute w-[22px] h-[22px] flex justify-center items-center bg-background rounded-full bottom-0 right-1">
              <IconChecked width={15} height={15} />
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center gap-1 mt-12">
        <h1 className="font-semibold text-xl">Pizza Hut</h1>
        <p className="text-lightGray text-xs">1402 Pretty View Land</p>
      </div>
      <div className="mt-2 text-center text-2xl font-medium">
        <p>How was your last</p>
        <p>order from Pizza Hut?</p>
      </div>
      <RatingForm />
    </>
  );
};

export default RatingRestaurant;
