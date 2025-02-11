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
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { MapperFood } from "@/mapping/food.mapping";
import { useGetFoodsByParams } from "@/queries";
import { SlidersHorizontal } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const VIEWER_CONTAINER_ID = "sheet-id";

const FoodsByCategory = () => {
  const param = useSearchParams();
  const category = param.get("category");
  const categoryId = category ? parseInt(category, 10) : null;

  const { data: foods } = useGetFoodsByParams(categoryId, null);
  const _foods = foods?.data?.map((food) => MapperFood(food));

  const [container, setContainer] = useState<HTMLElement | null>(null);
  useEffect(() => {
    setContainer(document.getElementById(VIEWER_CONTAINER_ID));
  }, []);

  return (
    <Sheet>
      <div className="w-full" id={VIEWER_CONTAINER_ID}>
        <div className="flex flex-col gap-14">
          <div className="font-semibold text-lightGray">
            <p className="text-2xl">There&apos;re</p>
            <p className="text-3xl">more than </p>
            <div>
              <span className="text-4xl text-primary">{_foods?.length}</span>{" "}
              <span className="text-4xl">food items</span>
            </div>
          </div>
          <div className="flex flex-col gap-3">
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
                    strokeWidth={1.5}
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
      <SheetContent
        side={"right"}
        container={container}
        className="w-full z-[150]"
      >
        <SheetHeader>
          <SheetTitle></SheetTitle>
          <SheetDescription></SheetDescription>
        </SheetHeader>
        <FilterForm />
      </SheetContent>
    </Sheet>
  );
};

export default FoodsByCategory;
