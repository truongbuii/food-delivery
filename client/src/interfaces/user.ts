interface IProfile {
  email?: string;
  fullName?: string;
  phoneNumber?: string;
  dob?: string;
  avatar?: File;
}

interface IDeliveryAddress {
  id?: number;
  name?: string;
  phoneNumber?: string;
  state?: string;
  city?: string;
  street?: string;
}

interface IDeliveryAddressPost extends IDeliveryAddress {
  userId: number;
}

interface IDeliveryAddressResponse {
  id: number;
  name: string;
  phoneNumber: string;
  state: string;
  city: string;
  street: string;
  fullAddress: string;
}

export type {
  IProfile,
  IDeliveryAddress,
  IDeliveryAddressResponse,
  IDeliveryAddressPost,
};
