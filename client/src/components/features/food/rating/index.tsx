"use client";

import { RatingForm } from "@/components/molecule";
import { HeartButton } from "@/components/molecule/CardItem";
import { Skeleton } from "@/components/ui/skeleton";
import { MapperFood } from "@/mapping/food.mapping";
import { useGetFoodBySlug } from "@/queries";
import Image from "next/image";
import { useParams } from "next/navigation";
import { Suspense } from "react";

const RatingFood = () => {
  const param = useParams();
  const { data: food } = useGetFoodBySlug(param.slug as string);
  const _food = food?.data ? MapperFood(food.data) : null;
  return (
    <>
      {_food && (
        <>
          <div className="relative flex">
            <div className="relative w-full h-36 rounded-2xl overflow-hidden">
              <Image
                src={_food.imageUrl}
                alt={_food.name}
                fill
                sizes="100%"
                priority
                className="object-cover"
              />
            </div>
            <HeartButton favorite={_food.favorite} />
          </div>
          <div className="mt-2 text-center text-2xl font-medium">
            <p>How was your last</p>
            <p>order from {_food.name}?</p>
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
            <RatingForm subjectId={_food.id} type="food" />
          </Suspense>
        </>
      )}
    </>
  );
};

export default RatingFood;
