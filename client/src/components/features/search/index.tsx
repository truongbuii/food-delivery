"use client";

import {
  Avatar,
  FilterForm,
  SearchAndFilter,
  VerticalCard,
} from "@/components/molecule";
import { Button } from "@/components/ui/button";
import { Sheet } from "@/components/ui/sheet";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PATHNAME } from "@/configs";
import { MapperFood } from "@/mapping/food.mapping";
import { MapperRestaurant } from "@/mapping/restaurant.mapping";
import { useGetFoodsByParams, useGetRestaurantsByParams } from "@/queries";
import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

const SearchTabScreen = () => {
  const router = useRouter();
  const [selectedTab, setSelectedTab] = useState<string>("restaurant");
  const { data: foods } = useGetFoodsByParams(null, null);
  const { data: restaurants } = useGetRestaurantsByParams(null);
  const _restaurants = restaurants?.data?.map((restaurant) =>
    MapperRestaurant(restaurant)
  );
  const _foods = foods?.data?.map((food) => MapperFood(food));

  const handleTabChange = (value: string) => {
    setSelectedTab(value);
  };

  return (
    <Sheet key="right">
      <div className="relative py-6 flex items-center z-[50] w-full">
        <Button
          className="bg-secondary w-10 h-10 rounded-[12px] shadow-backBtnShadow hover:bg-primary"
          onClick={() => router.push(PATHNAME.HOME)}
        >
          <ChevronLeft size={18} className="text-foreground" />
        </Button>
        <p className="flex-1 w-full text-center leading-10 text-lg font-medium">
          {selectedTab === "restaurant" ? "Search Restaurant" : "Search Food"}
        </p>
        <Avatar className="w-10 h-10 rounded-xl" />
      </div>
      <div className="py-4">
        <SearchAndFilter />
      </div>
      <div className="py-3">
        <Tabs defaultValue="restaurant" onValueChange={handleTabChange}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="restaurant">Restaurant</TabsTrigger>
            <TabsTrigger value="food">Food</TabsTrigger>
          </TabsList>
          <div className="mt-4">
            <TabsContent value="restaurant">
              <div className="columns-2 gap-4">
                <div className="break-inside-avoid pb-10">
                  <p className="text-3xl font-semibold">Found</p>
                  <span className="text-3xl font-semibold">
                    {_restaurants?.length} results
                  </span>
                </div>
                {_restaurants?.map((restaurant) => (
                  <div key={restaurant.id} className="break-inside-avoid mb-4">
                    <VerticalCard type="restaurant" item={restaurant} />
                  </div>
                ))}
              </div>
            </TabsContent>
            <TabsContent value="food">
              <div className="columns-2 gap-4">
                <div className="break-inside-avoid pb-10">
                  <p className="text-3xl font-semibold">Found</p>
                  <span className="text-3xl font-semibold">
                    {_foods?.length} foods
                  </span>
                </div>
                {_foods?.map((food) => (
                  <div key={food.id} className="break-inside-avoid mb-4">
                    <VerticalCard type="food" item={food} />
                  </div>
                ))}
              </div>
            </TabsContent>
          </div>
        </Tabs>
      </div>
      <FilterForm />
    </Sheet>
  );
};

export default SearchTabScreen;
