import { SignInForm } from '@/components/features/auth/signin';
import { PATHNAME } from '@/configs';
import Link from 'next/link';

const SignInPage = () => {
  return (
    <div className="absolute w-full px-6 pb-6">
      <div className="mt-36 w-full flex flex-col gap-7 mb-14">
        <span className="w-[247px] h-[40px] text-4xl font-semibold">Login</span>
        <SignInForm />
        <span className="text-sm font-normal text-center text-lightGray">
          Don’t have an account?
          <Link
            href={PATHNAME.SIGN_UP}
            className="mx-1 font-semibold text-primary underline"
          >
            {' '}
            Sign Up{' '}
          </Link>
        </span>
      </div>
    </div>
  );
};

export default SignInPage;
