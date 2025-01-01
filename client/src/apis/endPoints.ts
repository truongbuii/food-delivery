const VERSION = 'v1';
const PREFIX_PATH = (pathname: string) => `/api/${VERSION}/${pathname}`;

const EndPoints = {
  AUTH: {
    signIn: PREFIX_PATH('auth/sign-in'),
    signUp: PREFIX_PATH('auth/sign-up'),
    sendOtp: PREFIX_PATH('auth/send-otp'),
    forgotPassword: PREFIX_PATH('auth/forgot-password'),
    changePassword: PREFIX_PATH('auth/change-password'),
    getNewAccessToken: PREFIX_PATH('auth/refresh-access-token'),
    verificationEmail: PREFIX_PATH('users/verification-email'),
  },
  USER: {}
};

export default EndPoints;