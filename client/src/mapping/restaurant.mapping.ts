import { IRestaurantResponse } from "@/interfaces";

const MapperRestaurant = (
  restaurant: Record<string, any>
): IRestaurantResponse => {
  return {
    id: restaurant.id ?? "",
    name: restaurant.name ?? "",
    address: restaurant.address ?? "",
    avatarUrl: restaurant.avatarUrl ?? "",
    coverUrl: restaurant.coverUrl ?? "",
    verifiedBadge: restaurant.verifiedBadge ?? false,
    freeDelivery: restaurant.freeDelivery ?? false,
    openingHours: restaurant.openingHours ?? "",
    closingHours: restaurant.closingHours ?? "",
    totalStars: restaurant.totalStars ?? 0,
    totalReviews: restaurant.totalReviews ?? 0,
    slug: restaurant.slug ?? "",
    categories: restaurant.categories ?? [],
  };
};

export { MapperRestaurant };
