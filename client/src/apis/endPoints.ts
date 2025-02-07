const API_CONFIG = {
  version: "v1",
  basePath: "/api",
};

const createPath = (base: string, endpoints: Record<string, any>) => {
  return Object.fromEntries(
    Object.entries(endpoints).map(([key, path]) => [key, `${base}/${path}`])
  );
};

const BASE_API = `${API_CONFIG.basePath}/${API_CONFIG.version}`;
const BASE_AUTH = `${BASE_API}/auth`;
const BASE_USER = `${BASE_API}/user`;
const BASE_ADDRESS = `${BASE_API}/deliver-address`;
export const BASE_CATEGORY = `${BASE_API}/category`;
export const BASE_RESTAURANT = `${BASE_API}/restaurant`;
export const BASE_FOOD = `${BASE_API}/food`;

const EndPoints = {
  AUTH: createPath(BASE_AUTH, {
    signIn: "sign-in",
    signUp: "sign-up",
    sendOtp: "send-otp",
    forgotPassword: "forgot-password",
    changePassword: "change-password",
    getNewAccessToken: "refresh-access-token",
    verificationEmail: "verification-email",
    setPhoneNumber: "set-phone-number",
    socialLogin: "social-login",
    socialCallback: "social-callback",
  }),
  USER: createPath(BASE_USER, {
    profile: "me",
  }),
  ADDRESS: createPath(BASE_ADDRESS, {
    get: "get",
    getAll: "all",
    create: "create",
    update: "update",
    delete: "delete",
  }),
  CATEGORY: {},
  RESTAURANT: createPath(BASE_RESTAURANT, {}),
} as const;

export default EndPoints;
