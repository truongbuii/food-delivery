import BadgeNumber from "@/components/molecule/BadgeNumber";
import { IconChecked, IconStar } from "@/components/molecule/svgs";
import Tag from "@/components/molecule/Tag";
import { Button } from "@/components/ui/button";
import useScreenMode from "@/hooks/useScreenMode";
import { ICategory, IFoodResponse, IRestaurantResponse } from "@/interfaces";
import { cva } from "class-variance-authority";
import clsx from "clsx";
import { Bike, CircleCheck, Heart, Timer } from "lucide-react";
import Image from "next/image";
import { FC, memo } from "react";

const HeartButtonComponent: FC<{ onClick?: () => void }> = ({ onClick }) => (
  <Button
    onClick={onClick}
    className="absolute top-2 right-2 p-0 flex justify-center items-center w-7 h-7 bg-primary rounded-full hover:bg-primary"
  >
    <Heart strokeWidth={3} size={15} color="#fff" />
  </Button>
);

export const HeartButton = memo(HeartButtonComponent);
HeartButton.displayName = "HeartButton";

const ratingBadgeVariants = cva(
  "flex justify-center items-center bg-ratingBadge rounded-2xl",
  {
    variants: {
      variant: {
        default: "w-[70px] h-7",
        sm: "w-[60px] h-6",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

const RatingBadgeComponent: FC<{
  rating: number;
  count: number;
  className?: string;
  variant?: "default" | "sm";
}> = ({ rating, count, className, variant = "default" }) => (
  <div className={clsx(ratingBadgeVariants({ variant }), className)}>
    <div className="flex gap-[2px] text-xs items-center">
      <span
        className={clsx(
          "font-bold",
          variant === "sm" ? "text-[10px]" : "text-[12px]"
        )}
      >
        {rating}
      </span>
      <IconStar size={10} />
      <span
        className={clsx(
          "text-lightGray",
          variant === "sm" ? "text-[7px]" : "text-[9px]"
        )}
      >
        (+{count})
      </span>
    </div>
  </div>
);

export const RatingBadge = memo(RatingBadgeComponent);
RatingBadge.displayName = "RatingBadge";

const PriceBadgeComponent: FC<{ price: number }> = ({ price }) => {
  return (
    <div className="absolute top-2 left-2 w-[70px] h-7 bg-white rounded-2xl text-center font-semibold">
      <span className="text-primary text-xs">$</span>
      <span className="text-lg text-black">{price}</span>
    </div>
  );
};

export const PriceBadge = memo(PriceBadgeComponent);
PriceBadge.displayName = "PriceBadge";

const FeeAndTimeDeliveryComponent: FC<{
  free: boolean;
  time: string;
  variant?: "default" | "lg";
}> = ({ free, time, variant = "default" }) => (
  <div
    className={clsx(
      "flex gap-2 text-lightGray",
      variant === "lg" ? "text-sm" : "text-xs"
    )}
  >
    <div className="flex gap-1 items-center">
      <Bike
        size={variant === "lg" ? 14 : 12}
        strokeWidth={2}
        className="text-primary"
      />
      <span>{free == true ? "free delivery" : "charge fee"}</span>
    </div>
    <div className="flex gap-1 items-center">
      <Timer
        size={variant === "lg" ? 14 : 12}
        strokeWidth={2}
        className="text-primary"
      />
      <span>{time} mins</span>
    </div>
  </div>
);

const FeeAndTimeDelivery = memo(FeeAndTimeDeliveryComponent);
FeeAndTimeDelivery.displayName = "FeeAndTimeDelivery";

interface InfoSectionProps {
  type: "restaurant" | "food";
  name: string;
  tags: ICategory[];
  verifiedBadge: boolean;
  freeDelivery: boolean;
  ingredient?: string;
}

const InfoSection: FC<InfoSectionProps> = ({
  type,
  name,
  tags,
  verifiedBadge,
  freeDelivery,
  ingredient,
}) => (
  <>
    {type === "restaurant" ? (
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <span className="font-semibold">{name}</span>
          {verifiedBadge && (
            <IconChecked width={12} height={12} className="mt-1" />
          )}
        </div>
        <FeeAndTimeDelivery free={freeDelivery} time="10-15" />
        <div className="flex gap-2">
          {tags.map((tag, index) => (
            <Tag key={index} title={tag.name} size={"sm"} />
          ))}
        </div>
      </div>
    ) : (
      <div className="flex flex-col gap-1 mt-2">
        <div className="flex items-center gap-1">
          <span className="font-semibold">{name}</span>
          <CircleCheck
            color="#029094"
            strokeWidth={3}
            size={12}
            className="mt-1"
          />
        </div>
        <div className="text-xs text-lightGray">{ingredient}</div>
      </div>
    )}
  </>
);

interface CardItemProps {
  type: "restaurant" | "food";
  item: IRestaurantResponse | IFoodResponse;
  className?: string;
  variant?: "default" | "lg";
}

const HorizontalCard: FC<CardItemProps> = ({
  type,
  item,
  className,
  variant = "default",
}) => {
  const isFood = type === "food";

  return (
    <div
      className={clsx(
        "relative flex flex-col w-64 rounded-2xl bg-cardItem shadow-cardItemShadow",
        className
      )}
    >
      <div
        className={clsx(
          "relative w-full",
          variant === "lg" ? "h-[165px]" : "h-[136px]"
        )}
      >
        <Image
          src={
            isFood
              ? (item as IFoodResponse).imageUrl
              : (item as IRestaurantResponse).avatarUrl
          }
          alt=""
          fill
          sizes="100%"
          priority
          className="object-cover rounded-2xl"
        />
        <HeartButton />
        <RatingBadge
          rating={item.totalStars}
          count={item.totalReviews}
          className={`${
            isFood
              ? "absolute left-4 -bottom-3"
              : "absolute top-4 left-4 bg-white text-black"
          }`}
          variant={isFood ? "sm" : "default"}
        />
        {isFood && <PriceBadge price={(item as IFoodResponse).price} />}
      </div>
      <div className="py-2 px-4">
        <div className="flex flex-col">
          <InfoSection
            type={type}
            name={item.name}
            tags={(item as IRestaurantResponse).categories}
            verifiedBadge={(item as IRestaurantResponse).verifiedBadge}
            freeDelivery={(item as IRestaurantResponse).freeDelivery}
            ingredient={(item as IFoodResponse).ingredient}
          />
        </div>
      </div>
    </div>
  );
};

const VerticalCard: FC<CardItemProps> = ({ type, item }) => {
  const { isMobile } = useScreenMode();

  const restaurant = item as IRestaurantResponse;
  const food = item as IFoodResponse;

  const renderByType = () => ({
    restaurant: (
      <div
        className={`flex flex-col gap-4 ${isMobile} ? "w-full" : "w-[153px]"
          } p-2 shadow-cardItemShadow bg-cardItem rounded-2xl`}
      >
        <div className="flex justify-between relative">
          <div
            className={`relative flex items-center justify-center ${
              isMobile ? "w-16 h-16" : "w-14 h-14"
            } rounded-2xl shadow-socialBtnShadow bg-white`}
          >
            <Image
              src={restaurant.avatarUrl}
              alt={restaurant.name}
              width={isMobile ? 55 : 42}
              height={isMobile ? 55 : 42}
              style={{ objectFit: "cover" }}
              className="rounded-full"
            />
            <BadgeNumber
              number={4.5}
              className="absolute -top-1 -right-2 w-[18px] h-[18px] text-[9px] leading-4 rounded-lg"
            />
          </div>
          <HeartButton />
        </div>
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-1">
            <span className="font-semibold">Burger King</span>
            <CircleCheck
              color="#029094"
              strokeWidth={2}
              size={10}
              className="mt-1"
            />
          </div>
          <FeeAndTimeDelivery free={false} time="10-15" />
          <div className="flex gap-2">
            <Tag title="Chicken" size={"sm"} />
            <Tag title="Burger" size={"sm"} />
          </div>
        </div>
      </div>
    ),
    food: (
      <div
        className={`${isMobile} ? "w-full": "w-[153px]" shadow-cardItemShadow bg-cardItem rounded-2xl`}
      >
        <div className="relative w-full h-36 max-h-36 ">
          <Image
            src={food.imageUrl}
            alt={food.name}
            fill
            sizes="100%"
            className="w-full h-full rounded-2xl"
            style={{ objectFit: "cover" }}
          />
          <HeartButton />
          <RatingBadge
            rating={food.totalStars}
            count={food.totalReviews}
            className="absolute left-2 -bottom-3 shadow-ratingBadgeShadow"
            variant="default"
          />
          <PriceBadge price={food.price} />
        </div>
        <div className="flex flex-col gap-1 py-3 px-3 mt-3">
          <span className="font-semibold text-sm">{food.name}</span>
          <p className="text-xs text-lightGray">{food.ingredient}</p>
        </div>
      </div>
    ),
  });

  return renderByType()[type];
};

export { HorizontalCard, VerticalCard, FeeAndTimeDelivery };
