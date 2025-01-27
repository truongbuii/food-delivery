import VerificationForm from "@/components/features/auth/verification";
import { ButtonType } from "@/components/molecule";
import { PATHNAME } from "@/configs";

const Verification = () => {
  return (
    <>
      <ButtonType type="back" expectPath={PATHNAME.SIGN_IN} />
      <div className="absolute w-full px-6 pb-6">
        <div className="mt-10 w-full flex flex-col gap-10">
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
