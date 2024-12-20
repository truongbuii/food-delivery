import VerificationForm from '@/components/features/auth/verification';
import { PATHNAME } from '@/configs';
import { CustomBackBtn } from '@/layouts';

const Verification = () => {
  return (
    <>
      <CustomBackBtn type="back" expectPath={PATHNAME.SIGN_IN} />
      <div className="absolute w-full px-6 pb-6">
        <div className="mt-40 w-full flex flex-col gap-10">
          <div className="flex flex-col gap-2">
            <span className="w-full h-[40px] text-4xl font-semibold">
              Verification Code
            </span>
          </div>
        </div>
        <VerificationForm />
      </div>
    </>
  );
};

export default Verification;
