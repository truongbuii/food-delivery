import { SignUpForm } from '@/components/features/auth/signup';
import { PATHNAME } from '@/configs';
import Link from 'next/link';

const SignUpPage = () => {
  return (
    <div className="absolute w-full px-6 pb-6">
      <div className="mt-20 w-full flex flex-col gap-6 mb-14">
        <span className="w-[247px] h-[40px] text-4xl font-semibold">
          Sign Up
        </span>
        <SignUpForm />
        <span className="text-sm font-normal text-center text-lightGray">
          Already have an account?
          <Link
            href={PATHNAME.SIGN_IN}
            className="mx-1 font-semibold text-primary underline"
          >
            {' '}
            Login{' '}
          </Link>
        </span>
      </div>
    </div>
  );
};

export default SignUpPage;
