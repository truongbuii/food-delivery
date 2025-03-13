"use client";

import { Avatar, BadgeNumber } from "@/components/molecule";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { PATHNAME } from "@/configs";
import { useMessage } from "@/hooks/useMessage";
import { IApiErrorResponse } from "@/interfaces";
import {
  useDeleteRestaurantReviewMutation,
  useGetRestaurantReviews,
} from "@/queries";
import { useUserStore } from "@/stores";
import { ChevronLeft, Ellipsis, PencilLine, Plus, Trash2 } from "lucide-react";
import { useParams, useRouter } from "next/navigation";

const RestaurantReviews = () => {
  const param = useParams();
  const router = useRouter();
  const message = useMessage();
  const { userInfo } = useUserStore.getState();
  const { data: reviews } = useGetRestaurantReviews(param.slug as string);
  const { mutateAsync: deleteMutate } = useDeleteRestaurantReviewMutation();

  const handleDelete = async (id: number) => {
    deleteMutate(id, {
      onSuccess: () => {
        message.success("Review deleted successfully");
      },
      onError: (error: IApiErrorResponse) => message.error(error.message),
    });
  };

  return (
    <>
      <div className="relative py-6 flex items-center z-[50] w-full">
        <Button
          className="bg-secondary w-10 h-10 rounded-[12px] shadow-backBtnShadow hover:bg-primary"
          onClick={() => router.back()}
        >
          <ChevronLeft size={18} className="text-foreground" />
        </Button>
        <p className="flex-1 w-full text-center leading-10 text-lg font-medium">
          Favorites
        </p>
      </div>
      <div className="flex items-center h-[50px] mt-4 p-2 border border-tag rounded-lg">
        <Avatar className="w-8 h-8" avatarURL={userInfo?.avatarUrl} />
        <Input
          placeholder="Write your review..."
          className="w-auto flex-1 bg-transparent shadow-none border-none focus-visible:ring-0"
        />
        <Button
          size={"sm"}
          className="hover:bg-primary"
          onClick={() =>
            router.push(`${PATHNAME.RESTAURANT}/rating/${param.slug}`)
          }
        >
          <Plus />
        </Button>
      </div>
      <div className="flex flex-col gap-8 mt-8">
        {reviews &&
          reviews?.data?.map((review) => (
            <div key={review.id} className="flex flex-col items-center gap-1">
              <div className="flex w-full gap-8">
                <div className="relative">
                  <Avatar className="w-12 h-12" avatarURL={review.userImage} />
                  <BadgeNumber
                    className="absolute bottom-1 -right-2 w-[19px] h-[19px] text-[10px] leading-[15px] rounded-md"
                    number={review.rating}
                  />
                </div>
                <div className="flex justify-between flex-1">
                  <div className="flex flex-col gap-1">
                    <span className="text-[15px]">{review.userName}</span>
                    <span className="text-xs text-lightGray">
                      {review.updatedAt}
                    </span>
                  </div>
                  <Popover>
                    <PopoverTrigger
                      asChild
                      disabled={userInfo?.id !== review.userId}
                    >
                      <Button variant="ghost" className="p-0 h-fit">
                        <Ellipsis
                          strokeOpacity={1}
                          className="text-lightGray"
                        />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-20 p-0 bg-background">
                      <Button
                        variant="ghost"
                        size={"md"}
                        className="w-full px-2"
                        onClick={() =>
                          router.push(
                            `${PATHNAME.RESTAURANT}/rating/${param.slug}/?reviewId=${review.id}`
                          )
                        }
                      >
                        <div className="flex items-center gap-1 text-xs text-secondary-foreground">
                          Edit
                          <PencilLine size={14} strokeWidth={1} />
                        </div>
                      </Button>

                      <Button
                        variant="ghost"
                        size={"md"}
                        className="w-full px-2"
                        onClick={() => handleDelete(review.id)}
                      >
                        <div className="flex items-center gap-1 text-xs text-secondary-foreground">
                          Delete
                          <Trash2 size={14} strokeWidth={1} />
                        </div>
                      </Button>
                    </PopoverContent>
                  </Popover>
                </div>
              </div>
              <p className="text-lightGray text-sm">{review.comment}</p>
            </div>
          ))}
      </div>
    </>
  );
};

export default RestaurantReviews;
