import { ChangePasswordForm } from "@/components/features/auth/change-password";
import { ButtonType } from "@/components/molecule";
import { Skeleton } from "@/components/ui/skeleton";
import { PATHNAME } from "@/configs";
import { Suspense } from "react";

const ChangePasswordPage = () => {
  return (
    <>
      <ButtonType type="back" expectPath={PATHNAME.SIGN_IN} />
      <div className="absolute w-full px-6 pb-6">
        <div className="mt-10 w-full flex flex-col mb-14 gap-4">
          <span className="w-full h-[40px] text-4xl font-semibold">
            Change Password
          </span>
          <span className="w-[247px] h-[40px] text-sm text-lightGray">
            Please enter your new password and confirm it to change
          </span>
          <Suspense
            fallback={
              <div className="grid grid-cols-2 grid-rows-2 gap-2">
                <Skeleton className="h-10 w-10 rounded-md" />
                <Skeleton className="h-10 w-10 rounded-md" />
                <Skeleton className="h-10 w-10 rounded-md" />
                <Skeleton className="h-10 w-10 rounded-md" />
              </div>
            }
          >
            <ChangePasswordForm />
          </Suspense>
        </div>
      </div>
    </>
  );
};

export default ChangePasswordPage;
