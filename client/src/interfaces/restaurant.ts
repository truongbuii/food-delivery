import { ICategory } from "@/interfaces/category";

interface IRestaurantResponse {
  id: number;
  name: string;
  address: string;
  avatarUrl: string;
  coverUrl: string;
  verifiedBadge: boolean;
  freeDelivery: boolean;
  openingHours: string;
  closingHours: string;
  totalStars: number;
  totalReviews: number;
  slug: string;
  categories: ICategory[];
}

export type { IRestaurantResponse };
