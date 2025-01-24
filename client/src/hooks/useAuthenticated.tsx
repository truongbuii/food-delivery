import { usePathname, useRouter } from "next/navigation";
import { clientStorage, useTokenStore, useUserStore } from "@/stores";
import useRedirect from "./useRedirect";
import { PATHNAME, PUBLIC_PATH, ROOT_PATH } from "@/configs";
import { useCallback, useEffect } from "react";
import { ONBOARDING_STORAGE_KEY } from "@/configs";

const PATH_PUBLIC_MAP = Object.keys(PUBLIC_PATH).map(
  (key) => (PUBLIC_PATH as any)[key]
);

const useAuthenticated = () => {
  const { push } = useRouter();
  const { userInfo } = useUserStore.getState();

  const { checkRedirect } = useRedirect();
  const pathname = usePathname();

  const getAccessToken = useCallback(() => {
    const tokenState = useTokenStore.getState();
    return tokenState.token || "";
  }, []);

  const fetchCurrentUser = async () => {
    if (userInfo) {
      const redirectPath = checkRedirect(userInfo);
      if (redirectPath !== ROOT_PATH.HOME) {
        push(redirectPath);
      }
      return;
    }
  };

  useEffect(() => {
    const accessToken = getAccessToken();

    const isOnboarding = clientStorage.get(ONBOARDING_STORAGE_KEY);

    if (!isOnboarding) {
      push(PATHNAME.ONBOARDING);
      return;
    }
    if (accessToken) {
      fetchCurrentUser();
      return;
    } else {
      if (PATH_PUBLIC_MAP.includes(pathname)) {
        return;
      }

      push(PATHNAME.SIGN_IN);
    }
  }, [pathname, getAccessToken]);
};

export default useAuthenticated;
