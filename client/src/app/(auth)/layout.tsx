'use client';

import { PATHNAME } from '@/configs';
import { BackgroundAuth } from '@/layouts';
import FooterAuth from '@/layouts/FooterAuth';
import { usePathname } from 'next/navigation';

const FOOTER_FOR_AUTH = [PATHNAME.SIGN_UP, PATHNAME.SIGN_IN];

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  const pathName = usePathname();
  if (pathName === PATHNAME.ONBOARDING) {
    return <div className="h-[100dvh]">{children}</div>;
  }
  return (
    <div className="h-[100dvh]">
      <BackgroundAuth>{children}</BackgroundAuth>
      {FOOTER_FOR_AUTH.includes(pathName) ? <FooterAuth /> : null}
    </div>
  );
};

export default AuthLayout;
