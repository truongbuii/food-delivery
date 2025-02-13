"use client";

import { FilterForm, HorizontalCard } from "@/components/molecule";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Sheet, SheetTrigger } from "@/components/ui/sheet";
import { MapperFood } from "@/mapping/food.mapping";
import { useGetFoodsByParams } from "@/queries";
import { SlidersHorizontal } from "lucide-react";
import { useSearchParams } from "next/navigation";

const FoodsByCategory = () => {
  const param = useSearchParams();
  const category = param.get("category");
  const categoryId = category ? parseInt(category, 10) : null;

  const { data: foods } = useGetFoodsByParams(categoryId, null);
  const _foods = foods?.data?.map((food) => MapperFood(food));

  return (
    <Sheet key="right">
      <div className="w-full">
        <div className="flex flex-col gap-14">
          <div className="flex flex-col text-lightGray">
            <div className="font-bold text-primary">
              <p className="text-[43px] leading-10">Food</p>
              <p className="text-[43px]">Delivery</p>
            </div>
            <div>
              <span className="text-xl text-lightGray">
                {_foods?.length} types of food
              </span>
            </div>
          </div>
          <div className="flex flex-col gap-5">
            <div className="flex justify-between h-5">
              <div className="flex w-full h-5 gap-2">
                <span className="text-sm">Short by: </span>
                <Select>
                  <SelectTrigger className="flex justify-center items-center w-full h-5 text-sm max-w-24 border-none shadow-none focus:ring-0 focus:ring-none text-primary">
                    <SelectValue
                      placeholder="Select..."
                      className="text-primary"
                    />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="apple">Apple</SelectItem>
                      <SelectItem value="banana">Banana</SelectItem>
                      <SelectItem value="blueberry">Blueberry</SelectItem>
                      <SelectItem value="grapes">Grapes</SelectItem>
                      <SelectItem value="pineapple">Pineapple</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
              <SheetTrigger asChild>
                <Button
                  className="inline-flex items-center justify-center w-5 h-5 [&_svg]:pointer-events-none "
                  variant={"link"}
                >
                  <SlidersHorizontal
                    strokeWidth={2}
                    size={20}
                    style={{
                      color: "hsl(var(--primary))",
                    }}
                  />
                </Button>
              </SheetTrigger>
            </div>

            <div className="flex flex-col gap-3">
              {_foods?.map((food) => (
                <HorizontalCard
                  type="food"
                  key={food.id}
                  item={food}
                  className="w-full py-1"
                  variant="lg"
                />
              ))}
            </div>
          </div>
        </div>
      </div>
      <FilterForm />
    </Sheet>
  );
};

export default FoodsByCategory;
