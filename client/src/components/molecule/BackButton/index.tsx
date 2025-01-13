"use client";

import { AlignLeft, ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

import { useMemo } from "react";
import { useRouter } from "next/navigation";

export const CustomBackBtn = ({
  expectPath,
  type,
}: {
  expectPath?: string;
  type: "side-menu" | "back";
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
        <Button
          onClick={() => push(expectPath as string)}
          className="absolute z-[99] bg-secondary w-10 h-10 rounded-[12px] top-6 left-6 shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:bg-primary"
        >
          <ChevronLeft
            style={{
              color: "hsl(var(--foreground))",
            }}
          />
        </Button>
      ),
    }),
    [expectPath, push]
  );
  return renderByType[type];
};
