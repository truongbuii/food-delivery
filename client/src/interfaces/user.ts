interface IProfile {
  email?: string;
  fullName?: string;
  phoneNumber?: string;
  dob?: string;
  avatar?: File;
}

interface IDeliveryAddress {
  id: string;
  name: string;
  phoneNumber: string;
  state: string;
  city: string;
  street: string;
}

interface IDeliveryAddressResponse {
  id: string;
  name: string;
  phoneNumber: string;
  address: string;
}

export type { IProfile, IDeliveryAddress, IDeliveryAddressResponse };
