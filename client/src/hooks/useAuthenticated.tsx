import { usePathname, useRouter } from "next/navigation";
import { clientStorage, useAuthStore } from "@/stores";
import useRedirect from "./useRedirect";
import { PATHNAME, PUBLIC_PATH } from "@/configs";
import { useCallback, useEffect } from "react";
import { ONBOARDING_STORAGE_KEY } from "@/configs";

const PATH_PUBLIC_MAP = Object.keys(PUBLIC_PATH).map(
  (key) => (PUBLIC_PATH as any)[key]
);

const useAuthenticated = () => {
  const { push } = useRouter();
  const { userInfo, token } = useAuthStore();
  const { onRedirect } = useRedirect();
  const pathname = usePathname();

  const getAccessToken = useCallback(() => {
    let accessToken = "";
    if (token?.length === 0) return;
    accessToken = token;
    return accessToken;
  }, [token]);

  const fetchCurrentUser = async () => {
    if (!userInfo) {
      push(PATHNAME.SIGN_IN);
      return;
    }

    if (userInfo) {
      onRedirect(userInfo);
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname, getAccessToken]);
};

export default useAuthenticated;
