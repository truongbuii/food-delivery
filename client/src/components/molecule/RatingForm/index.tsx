"use client";

import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import CustomFormField from "@/components/molecule/FormField";

const RATING_LABELS: Record<number, { text: string; emoji: string }> = {
  0: { text: "Rating me", emoji: "😐" },
  1: { text: "Poor", emoji: "😞" },
  2: { text: "Fair", emoji: "😕" },
  3: { text: "Average", emoji: "😃" },
  4: { text: "Good", emoji: "😊" },
  5: { text: "Excellent", emoji: "🤩" },
};

const ratingSchema = z.object({
  rating: z.number().min(1, "You must select a rating"),
  comment: z.string().min(1, "Your must write a comment"),
});

type RatingFormValues = z.infer<typeof ratingSchema>;

const RatingForm = () => {
  const [selectedRating, setSelectedRating] = useState<number>(0);

  const form = useForm<RatingFormValues>({
    resolver: zodResolver(ratingSchema),
    mode: "onSubmit",
    defaultValues: {
      rating: 0,
      comment: "",
    },
  });
  const { errors } = form.formState;
  const onSubmit = (data: RatingFormValues) => {
    console.log(data);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-5 mt-4"
      >
        <div className="flex flex-col items-center gap-2">
          <p className="text-primary">
            {`${RATING_LABELS[selectedRating].emoji} ${RATING_LABELS[selectedRating].text}`}
          </p>
          <div className="flex items-center justify-center gap-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                size={28}
                className={`cursor-pointer text-[#FFC529] ${
                  star <= selectedRating ? "fill-[#FFC529]" : ""
                }`}
                onClick={() => {
                  setSelectedRating(star);
                  form.setValue("rating", star, { shouldValidate: true });
                }}
              />
            ))}
          </div>
          {errors.rating && (
            <p className="px-1 text-[12px] font-normal text-[#ff402e]">
              {errors.rating.message}
            </p>
          )}
        </div>

        <CustomFormField
          control={form.control}
          name="comment"
          renderInput={({ id, value, onChange }) => (
            <textarea
              id={id}
              value={value || ""}
              onChange={onChange}
              placeholder="Write your review..."
              className="h-40 w-full p-4 bg-secondary focus-visible:outline-none rounded-2xl"
            />
          )}
        />
        <div className="w-full text-center">
          <Button
            size={"lg"}
            // loading={isPending}
            // disabled={isPending}
            className="m-auto mt-2 rounded-[40px] hover:bg-primary shadow-primaryBtnShadow"
          >
            Submit
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default RatingForm;
