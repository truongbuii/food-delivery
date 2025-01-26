"use client";

import { AlignLeft, ChevronLeft, SlidersHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";

import { useMemo } from "react";
import { useRouter } from "next/navigation";

const ButtonType = ({
  expectPath,
  type,
  title,
}: {
  expectPath?: string;
  type: "side-menu" | "back" | "filter";
  title?: string;
}) => {
  const { push } = useRouter();

  const renderByType = useMemo(
    () => ({
      "side-menu": (
        <div className="inline-flex items-center justify-center gap-2 rounded-[12px] bg-secondary w-10 h-10 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 top-6 left-6 shadow-[0_8px_30px_rgb(0,0,0,0.12)]">
          <AlignLeft
            style={{
              color: "hsl(var(--foreground))",
            }}
          />
        </div>
      ),
      back: (
        <div className="relative flex items-center  z-[99] mt-6 w-full h-10">
          <Button
            onClick={() => push(expectPath as string)}
            className="absolute left-6 bg-secondary w-10 h-10 rounded-[12px] shadow-backBtnShadow hover:bg-primary "
          >
            <ChevronLeft size={18} className="text-foreground" />
          </Button>
          <p className="w-full h-full text-center leading-10 text-lg font-medium">
            {title}
          </p>
        </div>
      ),
      filter: (
        <Button className="inline-flex items-center justify-center gap-2 rounded-[12px] bg-secondary w-12 h-12 [&_svg]:pointer-events-none [&_svg]:shrink-0 top-6 left-6 shadow-[5px_10px_30px_-2px_rgb(0,0,0,0.1)]">
          <SlidersHorizontal
            strokeWidth={2}
            size={20}
            style={{
              color: "hsl(var(--primary))",
            }}
          />
        </Button>
      ),
    }),
    [expectPath, push, title]
  );
  return renderByType[type];
};

export default ButtonType;
