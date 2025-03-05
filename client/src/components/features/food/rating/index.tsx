"use client";

import { RatingForm } from "@/components/molecule";
import { HeartButton } from "@/components/molecule/CardItem";
import { IMAGES_CONST } from "@/configs";
import Image from "next/image";

const RatingFood = () => {
  return (
    <>
      <div className="relative">
        <div className="relative w-full h-36 rounded-2xl overflow-hidden">
          <Image
            src={IMAGES_CONST.common.restaurant}
            alt="Pizza Hut"
            fill
            sizes="100%"
            priority
            className="object-cover"
          />
        </div>
        <HeartButton favorite={true} />
      </div>
      <div className="mt-6 text-center text-2xl font-medium">
        <p>How was your last</p>
        <p>order Pizza Hut?</p>
      </div>
      <RatingForm />
    </>
  );
};

export default RatingFood;
