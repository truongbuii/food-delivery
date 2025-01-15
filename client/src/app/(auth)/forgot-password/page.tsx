import { ResetPasswordForm } from "@/components/features/auth/forgot-password";
import { ButtonType } from "@/components/molecule";
import { PATHNAME } from "@/configs";

const ForgotPasswordPage = () => {
  return (
    <>
      <ButtonType type="back" expectPath={PATHNAME.SIGN_IN} />
      <div className="absolute w-full px-6 pb-6">
        <div className="mt-40 w-full flex flex-col mb-14 gap-4">
          <span className="w-full h-[40px] text-4xl font-semibold">
            Reset Password
          </span>
          <span className="w-[247px] h-[40px] text-sm text-lightGray">
            Please enter your email address to request a password reset
          </span>
          <ResetPasswordForm />
        </div>
      </div>
    </>
  );
};

export default ForgotPasswordPage;
