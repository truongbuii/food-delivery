interface IApiDataResponse<T> {
  code: number;
  message?: string;
  data?: T;
}

interface IApiErrorResponse {
  code: number;
  message: string;
}

interface IToken {
  token: string;
}

interface ICategory {
  id: number;
  name: string;
  imageUrl: string;
}

interface ICategoryResponse extends ICategory {
  slug: string;
}

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

interface IAddon {
  id: number;
  name: string;
  imageUrl: string;
  price: number;
}
interface IFoodResponse {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
  description: string;
  ingredient: string;
  totalStars: number;
  totalReviews: number;
  slug: string;
  restaurantId: number;
  addons: IAddon[];
}

interface ISelectedAddon {
  id: number;
  name: string;
  price: number;
}

interface ICartItem {
  cartItemId: number;
  foodId: number;
  quantity: number;
}
interface ICartItemResponse {
  id: number;
  userId: number;
  foodId: number;
  foodName: string;
  foodImageUrl: string;
  foodPrice: number;
  quantity: number;
  selectedAddons: ISelectedAddon[];
}

export type {
  IApiDataResponse,
  IApiErrorResponse,
  IToken,
  ICategory,
  ICategoryResponse,
  IRestaurantResponse,
  IFoodResponse,
  IAddon,
  ICartItem,
  ICartItemResponse,
};
