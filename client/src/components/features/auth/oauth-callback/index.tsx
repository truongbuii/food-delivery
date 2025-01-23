"use client";

import { Skeleton } from "@/components/ui/skeleton";
import useRedirect from "@/hooks/useRedirect";
import { ISocialLogin, OAuthProvider } from "@/interfaces";
import { MapperUser } from "@/mapping/user.mapping";
import { useExchangeOauthCodeForToken } from "@/queries";
import { useAuthStore } from "@/stores";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef } from "react";

const OauthCallback = () => {
  const params = useSearchParams();
  const { push } = useRouter();
  const isCalled = useRef(false);
  const providerType = OAuthProvider.GOOGLE;

  const { mutateAsync, isPending } = useExchangeOauthCodeForToken();
  const { setUserInfo, setTokens } = useAuthStore();
  const { onRedirect } = useRedirect();

  useEffect(() => {
    if (!isCalled.current) {
      const code = params.get("code");
      if (code) {
        const value: ISocialLogin = { code, providerType };
        mutateAsync(value).then((response) => {
          if (response && response.data) {
            const { accessToken, ...userInfo } = response.data;
            setUserInfo(MapperUser(userInfo));
            setTokens(accessToken);
            onRedirect(userInfo);
          }
        });
        isCalled.current = true;
      }
    }
  }, [
    params,
    mutateAsync,
    push,
    providerType,
    setUserInfo,
    setTokens,
    onRedirect,
  ]);

  return (
    <div className="grid grid-cols-2 grid-rows-2 gap-2">
      {isPending && (
        <>
          <Skeleton className="h-10 w-10 rounded-md" />
          <Skeleton className="h-10 w-10 rounded-md" />
          <Skeleton className="h-10 w-10 rounded-md" />
          <Skeleton className="h-10 w-10 rounded-md" />
        </>
      )}
    </div>
  );
};

export default OauthCallback;
