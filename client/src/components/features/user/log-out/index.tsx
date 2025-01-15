"use client";

import { Button } from "@/components/ui/button";
import useScreenMode from "@/hooks/useScreenMode";
import { CirclePower } from "lucide-react";

const LogOut = () => {
  const { isMobile } = useScreenMode();

  return (
    <div className={`absolute ${isMobile ? "bottom-20" : "bottom-8"} px-6`}>
      <Button
        size={"sm"}
        className="m-auto mt-2 rounded-[40px] p-5 hover:bg-primary shadow-primaryBtn"
      >
        <CirclePower size={26} />
        Log Out
      </Button>
    </div>
  );
};

export default LogOut;
