"use client";

import { AlignLeft, ChevronLeft, SlidersHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";

import { useMemo } from "react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

const ButtonType = ({
  expectPath,
  type,
  title,
  className,
}: {
  expectPath?: string;
  type: "side-menu" | "back" | "filter";
  title?: string;
  className?: string;
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
        <div
          className={cn(
            "relative p-6 flex items-center z-[50] w-full",
            className
          )}
        >
          <Button
            onClick={() => expectPath && push(expectPath)}
            className="bg-secondary w-10 h-10 rounded-[12px] shadow-backBtnShadow hover:bg-primary "
          >
            <ChevronLeft size={18} className="text-foreground" />
          </Button>
          <p className="flex-1 w-full text-center leading-10 text-lg font-medium">
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
    [expectPath, push, title, className]
  );
  return renderByType[type];
};

export default ButtonType;
