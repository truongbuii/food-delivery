"use client";

import { Avatar, RatingForm } from "@/components/molecule";
import { HeartButton } from "@/components/molecule/CardItem";
import { IconChecked } from "@/components/molecule/svgs";
import { Skeleton } from "@/components/ui/skeleton";
import { MapperRestaurant } from "@/mapping/restaurant.mapping";
import { useGetRestaurantBySlug } from "@/queries";
import Image from "next/image";
import { useParams } from "next/navigation";
import { Suspense } from "react";

const RatingRestaurant = () => {
  const param = useParams();

  const { data: restaurant } = useGetRestaurantBySlug(param.slug as string);
  const _restaurant = restaurant?.data
    ? MapperRestaurant(restaurant.data)
    : null;

  return (
    <>
      {_restaurant && (
        <>
          <div className="relative flex">
            <div className="relative w-full h-36 rounded-2xl overflow-hidden">
              <Image
                src={_restaurant.coverUrl}
                alt={_restaurant.name}
                fill
                sizes="100%"
                priority
                className="object-cover"
              />
            </div>
            <HeartButton favorite={_restaurant.favorite} />
            <div className="absolute flex justify-center items-center w-[104px] h-[104px] bg-background rounded-full z-10 left-1/2 -translate-x-1/2 bottom-0 translate-y-1/2">
              <div className="relative">
                <Avatar
                  className="w-20 h-20"
                  avatarURL={_restaurant.avatarUrl}
                />
                {_restaurant.verifiedBadge && (
                  <div className="absolute w-[22px] h-[22px] flex justify-center items-center bg-background rounded-full bottom-0 right-1">
                    <IconChecked width={15} height={15} />
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="flex flex-col items-center gap-1 mt-12">
            <h1 className="font-semibold text-xl">{_restaurant.name}</h1>
            <p className="text-lightGray text-xs">{_restaurant.address}</p>
          </div>
          <div className="mt-2 text-center text-2xl font-medium">
            <p>How was your last</p>
            <p>order from {_restaurant.name}?</p>
          </div>
          <Suspense
            fallback={
              <div className="grid grid-cols-2 grid-rows-2 gap-2">
                <Skeleton className="h-10 w-10 rounded-md" />
                <Skeleton className="h-10 w-10 rounded-md" />
                <Skeleton className="h-10 w-10 rounded-md" />
                <Skeleton className="h-10 w-10 rounded-md" />
              </div>
            }
          >
            <RatingForm subjectId={_restaurant.id} type="restaurant" />
          </Suspense>
        </>
      )}
    </>
  );
};

export default RatingRestaurant;
