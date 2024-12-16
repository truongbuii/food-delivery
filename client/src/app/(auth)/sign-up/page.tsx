import { ModeToggle } from '@/components/molecule/dark';

const SignupPage = () => {
  return (
    <div className="absolute w-full px-6 pb-6">
      <div className="mt-24 w-full flex flex-col gap-7 mb-14">
        <span className="w-[247px] h-[40px]">Sign Up</span>
        <ModeToggle />
      </div>
    </div>
  );
};

export default SignupPage;
