const API_CONFIG = {
  version: "v1",
  basePath: "/api",
};

const createPath = (base: string, endpoints: Record<string, string>) => {
  return Object.fromEntries(
    Object.entries(endpoints).map(([key, path]) => [key, `${base}/${path}`])
  );
};

const BASE_API = `${API_CONFIG.basePath}/${API_CONFIG.version}`;
const BASE_AUTH = `${BASE_API}/auth`;
const BASE_USER = `${BASE_API}/user`;

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
  USER: createPath(BASE_USER, {}),
} as const;

export default EndPoints;
