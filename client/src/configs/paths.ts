export const PUBLIC_PATH = {
  ONBOARDING: "/onboarding",
  SIGN_IN: "/sign-in",
  SIGN_UP: "/sign-up",
  FORGOT_PASSWORD: "/forgot-password",
  VERIFICATION: "/verification",
  CHANGE_PASSWORD: "/change-password",
  PHONE_REGISTRATION: "/phone-registration",
  GOOGLE_AUTH_CALLBACK: "/oauth/google/callback",
};

export const ROOT_PATH = {
  HOME: "/",
  PROFILE: "/profile",
  DELIVERY_ADDRESS: "/delivery-address",
};
export const PATHNAME = { ...PUBLIC_PATH, ...ROOT_PATH };
