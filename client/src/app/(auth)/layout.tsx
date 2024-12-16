'use client';

import { PATHNAME } from '@/configs';
import { BackgroundAuth } from '@/layout';
import { usePathname } from 'next/navigation';

// const FOOTER_FOR_AUTH = [PATHNAME.SIGN_IN, PATHNAME.SIGN_IN];

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  const pathName = usePathname();
  if (pathName === PATHNAME.ONBOARDING) {
    return <div className="h-[100dvh]">{children}</div>;
  }
  return (
    <div className="h-[100dvh]">
      <BackgroundAuth>{children}</BackgroundAuth>
      {/* {FOOTER_FOR_AUTH.includes(pathName) ? <FooterForAuthen /> : null} */}
    </div>
  );
};

export default AuthLayout;
