"use client";

import RestaurantFeaturedItems from "@/components/features/restaurant/featured-items";
import RestaurantFoods from "@/components/features/restaurant/restaurant-foods";
import { Avatar, Tag } from "@/components/molecule";
import { FeeAndTimeDelivery } from "@/components/molecule";
import { IconChecked, IconStar } from "@/components/molecule/svgs";
import { MapperRestaurant } from "@/mapping/restaurant.mapping";

import { useGetRestaurantBySlug } from "@/queries";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";

const RestaurantProfile = () => {
  const param = useParams();
  const { data: restaurant } = useGetRestaurantBySlug(param.slug as string);
  const _restaurant = restaurant?.data
    ? MapperRestaurant(restaurant.data)
    : null;

  return (
    <div className="flex flex-col w-full">
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
            <div className="absolute flex justify-center items-center w-[104px] h-[104px] bg-background rounded-full z-10 left-1/2 -translate-x-1/2 bottom-0 translate-y-1/2">
              <div className="relative">
                <Avatar
                  className="w-20 h-20"
                  avatarURL={_restaurant.avatarUrl}
                />
                {_restaurant.freeDelivery && (
                  <div className="absolute w-[22px] h-[22px] flex justify-center items-center bg-background rounded-full bottom-0 right-1">
                    <IconChecked width={15} height={15} />
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-5 mt-14">
            <div className="flex flex-col items-center gap-1">
              <h1 className="font-semibold text-xl">{_restaurant.name}</h1>
              <p className="text-lightGray text-xs">{_restaurant.address}</p>

              {_restaurant.categories && (
                <div className="flex gap-2 p-2">
                  {_restaurant.categories.map((category) => (
                    <Tag key={category.id} size="sm" title={category.name} />
                  ))}
                </div>
              )}

              <FeeAndTimeDelivery
                free={_restaurant.freeDelivery}
                time="10-15"
                variant="lg"
              />
              <div className="flex items-center gap-2 text-sm">
                <IconStar width={15} height={15} />
                <span>{_restaurant.totalStars}</span>
                <span className="text-lightGray">
                  ({_restaurant.totalReviews}+)
                </span>
                <Link href="" className="text-primary text-xs underline">
                  See Review
                </Link>
              </div>
            </div>
            <div>
              <RestaurantFeaturedItems restaurantSlug={param.slug as string} />
              <RestaurantFoods
                categories={_restaurant.categories}
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
