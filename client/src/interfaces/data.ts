import { ORDER_STATUS } from "@/interfaces/enum";

interface IApiDataResponse<T> {
  code: number;
  message?: string;
  data?: T;
}

interface IPageData<T> {
  values: T;
  hasNext: boolean;
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
  favorite: boolean;
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
  favorite: boolean;
}

interface ISelectedAddon {
  id: number;
  name: string;
  price: number;
}

interface ICartPost {
  foodId: number;
  quantity: number;
  selectedAddons: ISelectedAddon[];
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

interface ICheckout {
  paymentMethod: string;
  address: string;
  discount: number;
  totalPrice: number;
  numberItem: number;
}

interface IOrderResponse {
  id: number;
  restaurantId: number;
  restaurantName: string;
  restaurantImage: string;
  verifiedBadge: boolean;
  totalPrice: number;
  status: ORDER_STATUS;
  numberItem: number;
  orderAddress: string;
  paymentMethod: string;
  paymentStatus: string;
  discount: number;
  updatedAt: string;
}

interface IOrderUpdate {
  id: number;
  status: ORDER_STATUS;
}

interface IRating {
  subjectId: number;
  rating: number;
  comment: string;
}

interface IReviewResponse {
  id: number;
  userId: number;
  userName: string;
  userImage: string;
  rating: number;
  comment: string;
  updatedAt: string;
}

export type {
  IApiDataResponse,
  IPageData,
  IApiErrorResponse,
  IToken,
  ICategory,
  ICategoryResponse,
  IRestaurantResponse,
  IFoodResponse,
  IAddon,
  ICartPost,
  ICartItem,
  ICartItemResponse,
  ICheckout,
  IOrderResponse,
  IOrderUpdate,
  IRating,
  IReviewResponse,
};
