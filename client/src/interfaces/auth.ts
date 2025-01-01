interface IUserInfo {
  id?: number;
  email?: string;
  emailVerified?: boolean;
  fullName?: string;
  phoneNumber?: string;
  dob?: string;
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

interface IUserResponse extends IUserInfo {
  accessToken: string;
}

export type { IUserInfo, ISignUp, ISignIn, IUserResponse };
