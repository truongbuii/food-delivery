"use client";

import { Skeleton } from "@/components/ui/skeleton";
import useRedirect from "@/hooks/useRedirect";
import { ISocialLogin, OAuthProvider } from "@/interfaces";
import { useExchangeOauthCodeForToken } from "@/queries";
import { useAuthActions } from "@/stores";
import { useSearchParams } from "next/navigation";
import { useEffect, useRef } from "react";

const OauthCallback = () => {
  const isCalled = useRef(false);
  const providerType = OAuthProvider.GOOGLE;

  const params = useSearchParams();
  const { onRedirect } = useRedirect();
  const { setAuth } = useAuthActions();
  const { mutateAsync, isPending } = useExchangeOauthCodeForToken();

  useEffect(() => {
    if (!isCalled.current) {
      const code = params.get("code");
      if (code) {
        const value: ISocialLogin = { code, providerType };
        mutateAsync(value).then((response) => {
          if (response && response.data) {
            const { ...userInfo } = response.data;
            setAuth(userInfo);
            onRedirect(userInfo);
          }
        });
        isCalled.current = true;
      }
    }
  }, [mutateAsync, onRedirect, params, providerType, setAuth]);

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
