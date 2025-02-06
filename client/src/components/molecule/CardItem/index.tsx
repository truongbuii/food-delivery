import BadgeNumber from "@/components/molecule/BadgeNumber";
import { IconStar } from "@/components/molecule/svgs";
import Tag from "@/components/molecule/Tag";
import { Button } from "@/components/ui/button";
import { IMAGES_CONST } from "@/configs";
import useScreenMode from "@/hooks/useScreenMode";
import { ICategory, IRestaurantResponse } from "@/interfaces";
import { cva } from "class-variance-authority";
import clsx from "clsx";
import { Bike, CircleCheck, Heart, Timer } from "lucide-react";
import Image from "next/image";
import { FC, useMemo } from "react";

const HeartButton: FC<{ onClick?: () => void }> = ({ onClick }) => (
  <Button
    onClick={onClick}
    className="absolute top-2 right-2 p-0 flex justify-center items-center w-7 h-7 bg-primary rounded-full hover:bg-primary"
  >
    <Heart strokeWidth={3} size={15} color="#fff" />
  </Button>
);

interface RatingBadgeProps {
  rating: number;
  count: number;
  className?: string;
  variant?: "default" | "sm";
}

const ratingBadgeVariants = cva(
  "flex justify-center items-center bg-ratingBadge rounded-2xl",
  {
    variants: {
      variant: {
        default: "w-[70px] h-7",
        sm: "w-[60px] h-5",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

const RatingBadge: FC<RatingBadgeProps> = ({
  rating,
  count,
  className,
  variant = "default",
}) => {
  return (
    <div className={clsx(ratingBadgeVariants({ variant }), className)}>
      <div className="flex text-xs items-center">
        <span
          className={clsx(
            "font-bold mr-1",
            variant === "sm" ? "text-[10px]" : "text-[12px]"
          )}
        >
          {rating}
        </span>
        <IconStar size={9} />
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
};

const PriceBadge: FC<{ price: number }> = ({ price }) => {
  return (
    <div className="absolute top-2 left-2 w-[70px] h-7 bg-white rounded-2xl text-center font-semibold">
      <span className="text-primary text-xs">$</span>
      <span className="text-lg text-black">{price}</span>
    </div>
  );
};

const FeeAndTimeDelivery: FC<{ free: boolean; time: string }> = ({
  free,
  time,
}) => (
  <div className="flex gap-2 text-lightGray">
    <div className="flex gap-1 items-center">
      <Bike size={12} strokeWidth={2} className="text-primary" />
      <span className="text-xs">{free == true ? "free" : "charge"}</span>
    </div>
    <div className="flex gap-1 items-center">
      <Timer size={12} strokeWidth={2} className="text-primary" />
      <span className="text-xs">{time} mins</span>
    </div>
  </div>
);

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
            <CircleCheck
              color="#029094"
              strokeWidth={3}
              size={12}
              className="mt-1"
            />
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
      <div className="mt-2">
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

interface cardItemProps {
  type: "restaurant" | "food";
  item: IRestaurantResponse | any;
}

const HorizontalCard: FC<cardItemProps> = ({ type, item }) => {
  const isFood = type === "food";

  return (
    <div
      className={`relative flex flex-col w-64 rounded-2xl bg-cardItem shadow-cardItemShadow`}
    >
      <div className="relative w-full h-[136px]">
        <Image
          src={item.coverUrl}
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
          className="absolute top-2 left-2 "
        />
        {isFood && (
          <RatingBadge
            rating={4.9}
            count={25}
            className="absolute right-4 -bottom-2 shadow-ratingBadgeShadow"
            variant="sm"
          />
        )}
      </div>
      <div className="py-2 px-4">
        <div className="flex flex-col">
          <InfoSection
            type={type}
            name={item.name}
            tags={item.categories}
            verifiedBadge={item.verifiedBadge}
            freeDelivery={item.freeDelivery}
          />
        </div>
      </div>
    </div>
  );
};

const VerticalCard: FC<cardItemProps> = ({ type }) => {
  const { isMobile } = useScreenMode();
  const renderByType = useMemo(
    () => ({
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
                src={IMAGES_CONST.common.defaultAvatar}
                alt=""
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
              src={IMAGES_CONST.common.defaultAvatar}
              alt=""
              className="w-full h-full rounded-2xl"
              style={{ objectFit: "cover" }}
            />
            <HeartButton />
            <RatingBadge
              rating={4.9}
              count={25}
              className="absolute left-2 -bottom-3 shadow-ratingBadgeShadow"
              variant="default"
            />
            <PriceBadge price={25.23} />
          </div>
          <div className="flex flex-col gap-1 py-2 px-4 mt-4">
            <span className="font-semibold text-sm">McDonald</span>
            <p className="text-xs text-lightGray">Chicken, Cheese</p>
          </div>
        </div>
      ),
    }),
    [isMobile]
  );

  return renderByType[type];
};

export { HorizontalCard, VerticalCard };
