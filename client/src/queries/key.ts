export const QUERIES_KEY = {
  AUTH: {
    SIGN_IN: "SIGN_IN_USER",
    SIGN_UP: "SIGN_UP_USER",
    SEND_OTP: "SEND_OTP",
    VERIFICATION_EMAIL: "VERIFICATION_EMAIL",
    FORGOT_PASSWORD: "FORGOT_PASSWORD",
    CHANGE_PASSWORD: "CHANGE_PASSWORD",
    PHONE_REGISTER: "PHONE_REGISTER",
    SOCIAL_CALLBACK: "SOCIAL_CALLBACK",
  },
  USER: {
    GET_PROFILE: "GET_PROFILE",
    UPDATE_PROFILE: "UPDATE_PROFILE",
  },
  ADDRESS: {
    GET: "GET_ADDRESS",
    GET_ALL: "GET_ALL_ADDRESS",
    CREATE: "CREATE_ADDRESS",
    UPDATE: "UPDATE_ADDRESS",
    DELETE: "DELETE_ADDRESS",
  },
  CATEGORY: {
    GET_ALL: "GET_ALL_CATEGORIES",
    CREATE: "CREATE_CATEGORY",
    UPDATE: "UPDATE_CATEGORY",
  },
  RESTAURANT: {
    GET_RESTAURANTS: "GET_RESTAURANTS",
    GET_RESTAURANT_BY_SLUG: "GET_RESTAURANT_BY_SLUG",
  },
  FOOD: {
    GET_ALL: "GET_FOODS",
    GET_FEATURED_BY_RESTAURANT_SLUG: "GET_FEATURED_FOODS_BY_RESTAURANT_SLUG",
    GET_BY_CATEGORY: "GET_FOODS_BY_CATEGORY",
    GET_BY_SLUG: "GET_FOOD_BY_SLUG",
  },
  CART: {
    GET: "GET_CART_ITEMS",
    ADD: "ADD_CART_ITEM",
    UPDATE: "UPDATE_CART_ITEM",
    DELETE: "DELETE_CART_ITEM",
  },
};
