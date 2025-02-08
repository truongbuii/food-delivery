"use client";

import RestaurantFeaturedItems from "@/components/features/restaurant/featured-items";
import RestaurantFoods from "@/components/features/restaurant/restaurant-foods";
import { Avatar, Tag } from "@/components/molecule";
import { FeeAndTimeDelivery } from "@/components/molecule";
import { IconChecked, IconStar } from "@/components/molecule/svgs";

import { useGetRestaurantBySlug } from "@/queries";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";

const RestaurantProfile = () => {
  const param = useParams();
  const { data: restaurant } = useGetRestaurantBySlug(param.slug as string);

  return (
    <div className="flex flex-col w-full">
      {restaurant?.data && (
        <>
          <div className="relative flex">
            <div className="relative w-full h-36 rounded-2xl overflow-hidden">
              <Image
                src={restaurant.data.coverUrl}
                alt={restaurant.data.name}
                fill
                sizes="100%"
                priority
                className="object-cover"
              />
            </div>
            <div className="absolute flex justify-center items-center w-[104px] h-[104px] bg-background rounded-full z-10 left-1/2 -translate-x-1/2 bottom-0 translate-y-1/2">
              <div className="relative">
                <Avatar
                  className="w-20 h-20"
                  avatarURL={restaurant.data.avatarUrl}
                />
                {restaurant.data.freeDelivery && (
                  <div className="absolute w-[22px] h-[22px] flex justify-center items-center bg-background rounded-full bottom-0 right-1">
                    <IconChecked width={15} height={15} />
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-5 mt-14">
            <div className="flex flex-col items-center gap-1">
              <h1 className="font-semibold text-xl">{restaurant.data.name}</h1>
              <p className="text-lightGray text-xs">
                {restaurant.data.address}
              </p>

              {restaurant.data.categories && (
                <div className="flex gap-2 p-2">
                  {restaurant.data.categories.map((category) => (
                    <Tag key={category.id} size="sm" title={category.name} />
                  ))}
                </div>
              )}

              <FeeAndTimeDelivery
                free={restaurant.data.freeDelivery}
                time="10-15"
                variant="lg"
              />
              <div className="flex items-center gap-2 text-sm">
                <IconStar width={15} height={15} />
                <span>{restaurant.data.totalStars}</span>
                <span className="text-lightGray">
                  ({restaurant.data.totalReviews}+)
                </span>
                <Link href="" className="text-primary text-xs underline">
                  See Review
                </Link>
              </div>
            </div>
            <div>
              <RestaurantFeaturedItems restaurantSlug={param.slug as string} />
              <RestaurantFoods
                categories={restaurant.data.categories}
                restaurantSlug={param.slug as string}
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default RestaurantProfile;
