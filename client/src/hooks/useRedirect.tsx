import { useRouter } from "next/navigation";
import { useCallback } from "react";
import { IUserInfo } from "@/interfaces";
import { PATHNAME } from "@/configs";

const useRedirect = () => {
  const { push } = useRouter();

  const checkRedirect = useCallback((user: IUserInfo) => {
    if (!user) {
      return PATHNAME.SIGN_IN;
    }

    if (!user.emailVerified) {
      return PATHNAME.VERIFICATION;
    }

    if (user.phoneNumber === "") {
      return PATHNAME.PHONE_REGISTRATION;
    }

    return PATHNAME.HOME;
  }, []);

  const onRedirect = useCallback(
    (user: IUserInfo) => {
      const redirectPath = checkRedirect(user);
      console.log("redirectPath", redirectPath);

      push(redirectPath);
    },
    [checkRedirect, push]
  );

  return { onRedirect, checkRedirect };
};

export default useRedirect;
