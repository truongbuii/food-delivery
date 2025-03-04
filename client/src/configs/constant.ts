import { ORDER_STATUS } from "@/interfaces";

export const ONBOARDING_STORAGE_KEY = "fd-onboarding";
export const AUTH_STORAGE_KEY = "fd-auth";
export const USER_STORAGE_KEY = "fd-user";
export const REFRESH_TOKEN_EXPIRED_MESSAGE = "You need to login!";
export const VIEWER_CONTAINER_ID = "sheet-id";
export const SHIPPING_ADDRESS = "fd-shipping-address";

export const ORDER_STATUS_COLOR: Record<ORDER_STATUS, string> = {
  [ORDER_STATUS.PENDING]: "text-[#e8c81c]",
  [ORDER_STATUS.SHIPPING]: "text-[#ffbc42]",
  [ORDER_STATUS.DELIVERED]: "text-[#4EE476]",
  [ORDER_STATUS.REFUND]: "text-[#b3b3b3]",
  [ORDER_STATUS.CANCELLED]: "text-[#be1201]",
};
