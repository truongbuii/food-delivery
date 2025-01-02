import { useRouter } from "next/navigation";
import { useCallback } from "react";
import { IUserInfo } from "@/interfaces";
import { PATHNAME } from "@/configs";

const useRedirect = () => {
  const { push } = useRouter();

  const onRedirect = useCallback(
    (user: IUserInfo) => {
      if (!user) {
        push(PATHNAME.SIGN_IN);
        return;
      }

      if (!user.emailVerified) {
        push(PATHNAME.VERIFICATION);
        return;
      }

      if (user.phoneNumber === "") {
        push(PATHNAME.PHONE_REGISTRATION);
        return;
      }
    },
    [push]
  );

  return { onRedirect };
};

export default useRedirect;
