import { useRouter } from "next/navigation";
import { useCallback } from "react";
import { IUserInfo } from "@/interfaces";
import { PATHNAME } from "@/configs";

const useRedirect = () => {
  const { push } = useRouter();

  const onRedirect = useCallback(
    (user: IUserInfo) => {
      if (!user.emailVerified) {
        push(PATHNAME.VERIFICATION);
        return;
      }

      if (user && user.emailVerified) {
        push(PATHNAME.HOME);
        return true;
      }
    },
    [push]
  );

  return { onRedirect };
};

export default useRedirect;

// const redirectToHomePage = useCallback(() => {
//   const redirectPaths = [PATHNAME.SIGN_IN, PATHNAME.SIGN_UP];
//   if (
//     userInfo &&
//     userInfo.emailVerified &&
//     redirectPaths.includes(pathname)
//   ) {
//     push(PATHNAME.HOME);
//     return true;
//   }
//   if (
//     userInfo?.emailVerified === true &&
//     pathname === PATHNAME.VERIFICATION
//   ) {
//     push(PATHNAME.HOME);
//     return true;
//   }
//   return false;
// }, [userInfo, pathname, push]);

// const redirectToSignInPage = useCallback(() => {
//   const redirectPaths = [PATHNAME.HOME, PATHNAME.VERIFICATION];
//   if (!userInfo && redirectPaths.includes(pathname)) {
//     push(PATHNAME.SIGN_IN);
//     return true;
//   }
//   return false;
// }, [userInfo, pathname, push]);

// useEffect(() => {
//   if (redirectToHomePage()) return;
//   if (redirectToSignInPage()) return;
//   if (redirectToOnboarding()) return;

//   if (userInfo) {
//     onRedirect(userInfo);
//   }
// }, [
//   userInfo,
//   onRedirect,
//   push,
//   pathname,
//   redirectToHomePage,
//   redirectToSignInPage,
//   redirectToOnboarding,
// ]);
