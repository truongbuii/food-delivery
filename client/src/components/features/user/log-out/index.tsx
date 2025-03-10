"use client";

import { Button } from "@/components/ui/button";
import { PATHNAME } from "@/configs";
import { useMessage } from "@/hooks/useMessage";
import useScreenMode from "@/hooks/useScreenMode";
import { IApiErrorResponse } from "@/interfaces";
import { useLogoutMutation } from "@/queries";
import { useAuthActions } from "@/stores";
import { useAddressStore } from "@/stores/address/address.store";
import { CirclePower } from "lucide-react";
import { useRouter } from "next/navigation";

const LogOut = () => {
  const { isMobile } = useScreenMode();
  const { push } = useRouter();
  const message = useMessage();
  const { resetAuth } = useAuthActions();
  const { resetAddress } = useAddressStore();
  const { mutateAsync } = useLogoutMutation();
  const handleLogout = () => {
    mutateAsync(
      {},
      {
        onSuccess: () => {
          resetAuth();
          resetAddress();
          push(PATHNAME.SIGN_IN);
        },
        onError: (err: IApiErrorResponse) => {
          message.error(err.message);
        },
      }
    );
  };
  return (
    <div className={`absolute ${isMobile ? "bottom-20" : "bottom-8"} px-6`}>
      <Button
        size={"sm"}
        className="m-auto mt-2 rounded-[40px] p-5 hover:bg-primary shadow-primaryBtnShadow"
        onClick={handleLogout}
      >
        <CirclePower size={26} />
        Log Out
      </Button>
    </div>
  );
};

export default LogOut;
