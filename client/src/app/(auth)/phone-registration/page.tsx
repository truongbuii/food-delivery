import { PhoneRegistrationForm } from "@/components/features/auth/phone-registration";
import { ButtonType } from "@/components/molecule/ButtonType";
import { PATHNAME } from "@/configs";

const PhoneRegistrationPage = () => {
  return (
    <>
      <ButtonType type="back" expectPath={PATHNAME.SIGN_IN} />
      <div className="absolute w-full px-6 pb-6">
        <div className="mt-40 w-full flex flex-col mb-14 gap-4">
          <span className="w-full h-[40px] text-4xl font-semibold">
            Phone Registration
          </span>
          <span className="w-[247px] h-[40px] text-sm text-lightGray">
            Enter your phone number to verify your account
          </span>
          <PhoneRegistrationForm />
        </div>
      </div>
    </>
  );
};

export default PhoneRegistrationPage;
