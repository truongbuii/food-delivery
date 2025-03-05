"use client";

import { Avatar, VerticalCard } from "@/components/molecule";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PATHNAME } from "@/configs";
import { MapperFood } from "@/mapping/food.mapping";
import { MapperRestaurant } from "@/mapping/restaurant.mapping";
import { useGetFavoriteFoods, useGetFavoriteRestaurants } from "@/queries";
import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";

const FavoriteTabScreen = () => {
  const router = useRouter();
  const { data: _favoritesFood } = useGetFavoriteFoods();
  const { data: _favoritesRestaurant } = useGetFavoriteRestaurants();
  const favoritesFood = _favoritesFood?.data?.map((food) => MapperFood(food));
  const favoritesRestaurant = _favoritesRestaurant?.data?.map((restaurant) =>
    MapperRestaurant(restaurant)
  );

  return (
    <div>
      <div className="relative py-6 flex items-center z-[50] w-full">
        <Button
          className="bg-secondary w-10 h-10 rounded-[12px] shadow-backBtnShadow hover:bg-primary"
          onClick={() => router.push(PATHNAME.HOME)}
        >
          <ChevronLeft size={18} className="text-foreground" />
        </Button>
        <p className="flex-1 w-full text-center leading-10 text-lg font-medium">
          Favorites
        </p>
        <Avatar className="w-10 h-10 rounded-xl" />
      </div>
      <Tabs defaultValue="restaurant">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="restaurant">Restaurant</TabsTrigger>
          <TabsTrigger value="food">Food</TabsTrigger>
        </TabsList>
        <div className="mt-4">
          <TabsContent value="restaurant">
            <div className="columns-2 gap-4">
              {favoritesRestaurant?.map((restaurant) => (
                <div key={restaurant.slug} className="break-inside-avoid mb-4">
                  <VerticalCard type="restaurant" item={restaurant} />
                </div>
              ))}
            </div>
          </TabsContent>
          <TabsContent value="food">
            <div className="columns-2 gap-4">
              {favoritesFood?.map((food) => (
                <div key={food.slug} className="break-inside-avoid mb-4">
                  <VerticalCard type="food" item={food} />
                </div>
              ))}
            </div>
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
};

export default FavoriteTabScreen;
