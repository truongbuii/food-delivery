import { IUserInfo } from "@/interfaces";

const MapperUser = (user: Record<string, any>): IUserInfo => {
  return {
    id: user.id ?? "",
    email: user.email ?? "",
    emailVerified: user.emailVerified ?? false,
    fullName: user.fullName ?? "",
    phoneNumber: user.phoneNumber ?? "",
    dob: user.dob ?? "",
    avatarUrl: user.avatarUrl ?? "",
    isActive: user.isActive ?? true,
    role: user.role ?? "",
  };
};

export { MapperUser };
