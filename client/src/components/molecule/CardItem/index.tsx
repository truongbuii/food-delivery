import { IconStar } from "@/components/molecule/svgs";
import Tag from "@/components/molecule/Tag";
import { Button } from "@/components/ui/button";
import { IMAGES_CONST } from "@/configs";
import useScreenMode from "@/hooks/useScreenMode";
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
  "flex justify-center items-center bg-white rounded-2xl",
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
            variant === "sm" ? "text-[8px]" : "text-[9px]"
          )}
        >
          (+{count})
        </span>
      </div>
    </div>
  );
};

const FeeAndTimeDelivery: FC<{ fee: number; time: string }> = ({
  fee,
  time,
}) => (
  <div className="flex gap-2 text-lightGray font-medium">
    <div className="flex gap-1 items-center">
      <Bike size={12} strokeWidth={2} className="text-primary" />
      <span className="text-xs">{fee === 0 ? "free" : fee}</span>
    </div>
    <div className="flex gap-1 items-center">
      <Timer size={12} strokeWidth={2} className="text-primary" />
      <span className="text-xs">{time} mins</span>
    </div>
  </div>
);

const InfoSection: FC<{ type: "restaurant" | "item" }> = ({ type }) => (
  <>
    {type === "restaurant" ? (
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-1">
          <span className="font-semibold">McDonalds</span>
          <CircleCheck
            color="#029094"
            strokeWidth={3}
            size={12}
            className="mt-1"
          />
        </div>
        <FeeAndTimeDelivery fee={0} time="10-15" />
        <div className="flex gap-2">
          <Tag title="Fast Food" />
          <Tag title="Chicken" />
          <Tag title="Burger" />
        </div>
      </div>
    ) : (
      <div className="mt-2">
        <div className="flex items-center gap-1">
          <span className="font-semibold">McDonalds</span>
          <CircleCheck
            color="#029094"
            strokeWidth={3}
            size={12}
            className="mt-1"
          />
        </div>
        <div className="text-xs text-lightGra">Other type content...</div>
      </div>
    )}
  </>
);

interface cardItemShadowProps {
  type: "restaurant" | "item";
}

const HorizontalCard: FC<cardItemShadowProps> = ({ type }) => {
  const isItem = type === "item";

  return (
    <div
      className={`relative flex flex-col w-[266px] rounded-2xl bg-cardItem shadow-cardItemShadow`}
    >
      <div className="relative">
        <Image
          src={IMAGES_CONST.common.restaurant}
          alt=""
          width={266}
          height={224}
          layout="intrinsic"
          objectFit="cover"
          className="w-full h-full rounded-2xl"
        />
        <HeartButton />
        <RatingBadge
          rating={4.5}
          count={25}
          className="absolute top-2 left-2 "
        />
        {isItem && (
          <RatingBadge
            rating={4.9}
            count={25}
            className="absolute right-4 -bottom-2 shadow-primaryBtnShadow"
            variant="sm"
          />
        )}
      </div>
      <div className="py-2 px-4">
        <div className="flex flex-col">
          <InfoSection type={type} />
        </div>
      </div>
    </div>
  );
};

const VerticalCard: FC<cardItemShadowProps> = ({ type }) => {
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
              className={`flex items-center justify-center ${
                isMobile ? "w-16 h-16" : "w-14 h-14"
              } rounded-2xl shadow-socialBtnShadow bg-white`}
            >
              <Image
                src={IMAGES_CONST.common.defaultAvatar}
                alt=""
                width={isMobile ? 57 : 42}
                height={isMobile ? 57 : 42}
                objectFit="cover"
                className="rounded-full"
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
            <FeeAndTimeDelivery fee={0} time="10-15" />
            <div className="flex gap-2">
              <Tag title="Chicken" size={"sm"} />
              <Tag title="Burger" size={"sm"} />
            </div>
          </div>
        </div>
      ),
      item: (
        <div
          className={`${isMobile} ? "w-full": "w-[153px]" shadow-cardItemShadow bg-cardItem rounded-2xl`}
        >
          <div className="relative w-full max-h-36 rounded-2xl overflow-hidden">
            <Image
              src={IMAGES_CONST.common.defaultAvatar}
              alt=""
              layout={isMobile ? "" : "responsive"}
              className="w-full h-full"
            />
            <HeartButton />
            <RatingBadge rating={4.5} count={25} />
            {type === "item" && <RatingBadge rating={4.9} count={25} />}
          </div>
          <div className="flex flex-col gap-1 p-2">
            <span className="font-semibold text-sm">McDonald</span>
            <p className="text-xs text-lightGray">Chicken, Cheese</p>
          </div>
        </div>
      ),
    }),
    [isMobile, type]
  );

  return renderByType[type];
};

export { HorizontalCard, VerticalCard };
