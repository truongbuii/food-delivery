import { IUserInfo } from "@/interfaces";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { AUTH_STORAGE_KEY } from "@/configs";
import { clientStorage } from "@/stores/client/client.store";

interface IAuthState {
  token: string;
  userInfo?: IUserInfo;
  setTokens: (token: string) => void;
  setUserInfo: (userInfo: IUserInfo) => void;
  reset: () => void;
}

export const useAuthStore = create<IAuthState>()(
  persist(
    (set) => ({
      token: "",
      userInfo: undefined,

      setTokens: (token: string) =>
        set((state) => ({
          ...state,
          token,
        })),

      setUserInfo: (userInfo: IUserInfo) =>
        set((state) => ({
          ...state,
          userInfo,
        })),

      reset: () => {
        set(() => ({
          token: "",
          userInfo: undefined,
        }));
        clientStorage.clear();
      },
    }),
    { name: AUTH_STORAGE_KEY }
  )
);
