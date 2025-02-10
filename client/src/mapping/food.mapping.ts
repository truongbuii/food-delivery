import { IFoodResponse } from "@/interfaces";

const MapperFood = (food: Record<string, any>): IFoodResponse => {
  return {
    id: food.id ?? "",
    name: food.name ?? "",
    price: food.price ?? 0,
    imageUrl: food.imageUrl ?? "",
    description: food.description ?? "",
    ingredient: food.ingredient ?? "",
    totalStars: food.totalStars ?? 0,
    totalReviews: food.totalReviews ?? 0,
    slug: food.slug ?? "",
    restaurantId: food.restaurantId ?? "",
    addons: food.addons ?? [],
  };
};

export { MapperFood };
