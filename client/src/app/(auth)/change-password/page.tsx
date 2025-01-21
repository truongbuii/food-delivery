import { ChangePasswordForm } from "@/components/features/auth/change-password";
import { ButtonType } from "@/components/molecule/ButtonType";
import { PATHNAME } from "@/configs";

const ChangePasswordPage = () => {
  return (
    <>
      <ButtonType type="back" expectPath={PATHNAME.SIGN_IN} />
      <div className="absolute w-full px-6 pb-6">
        <div className="mt-40 w-full flex flex-col mb-14 gap-4">
          <span className="w-full h-[40px] text-4xl font-semibold">
            Change Password
          </span>
          <span className="w-[247px] h-[40px] text-sm text-lightGray">
            Please enter your new password and confirm it to change
          </span>
          <ChangePasswordForm />
        </div>
      </div>
    </>
  );
};

export default ChangePasswordPage;
