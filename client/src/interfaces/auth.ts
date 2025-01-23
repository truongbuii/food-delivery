interface IUserInfo {
  id?: number;
  email?: string;
  emailVerified?: boolean;
  fullName?: string;
  phoneNumber?: string;
  dob?: Date;
  avatarUrl?: string;
  isActive?: boolean;
  role?: string;
}

interface ISignUp {
  fullName: string;
  email: string;
  password: string;
}

interface ISignIn {
  email: string;
  password: string;
}

interface IEmailPost {
  email: string;
}

interface IChangePassword {
  email: string;
  otp: string;
  password: string;
}

interface IPhoneRegister {
  email: string;
  phoneNumber: string;
}
interface ISendOtp {
  email: string;
}

interface IVerificationEmail {
  email: string;
  otp: string;
}

interface ISocialLogin {
  providerType: string;
  code?: string;
}

interface IUserResponse extends IUserInfo {
  accessToken: string;
}

export type {
  IUserInfo,
  ISignUp,
  ISignIn,
  IEmailPost,
  IChangePassword,
  IVerificationEmail,
  IPhoneRegister,
  ISendOtp,
  ISocialLogin,
  IUserResponse,
};
