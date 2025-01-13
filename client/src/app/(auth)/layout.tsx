"use client";

import { PageTransition } from "@/components/molecule";
import { PATHNAME } from "@/configs";
import useRouterProgress from "@/hooks/useRouterProgress";
import { BackgroundAuth } from "@/layouts";
import FooterAuth from "@/layouts/FooterAuth";
import { usePathname } from "next/navigation";

const FOOTER_FOR_AUTH = [PATHNAME.SIGN_UP, PATHNAME.SIGN_IN];

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  const pathName = usePathname();
  useRouterProgress();

  if (pathName === PATHNAME.ONBOARDING) {
    return <div className="h-[100dvh]">{children}</div>;
  }
  return (
    <PageTransition>
      <div className="h-[100dvh] bg-background">
        <BackgroundAuth>{children}</BackgroundAuth>
        {FOOTER_FOR_AUTH.includes(pathName) ? <FooterAuth /> : null}
      </div>
    </PageTransition>
  );
};

export default AuthLayout;
