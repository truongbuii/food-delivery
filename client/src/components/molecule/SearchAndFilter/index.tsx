"use client";

import ButtonType from "@/components/molecule/ButtonType";
import { SheetTrigger } from "@/components/ui/sheet";
import { PATHNAME } from "@/configs";
import { Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

const SearchAndFilter = () => {
  const [keyword, setKeyword] = useState<string>("");
  const router = useRouter();

  const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && keyword.trim() !== "") {
      router.push(
        `${PATHNAME.LIST.SEARCH}?query=${encodeURIComponent(keyword)}`
      );
    }
  };

  return (
    <div className="flex justify-between">
      <div className="flex gap-2 items-center bg-destructive border border-border rounded-[12px] py-2 px-4 w-[80%]">
        <Search
          strokeWidth={1.5}
          size={18}
          style={{
            color: "hsl(var(--foreground))",
          }}
        />
        <input
          type="text"
          placeholder="Find for food or restaurant..."
          className="w-5/6 p-1 text-sm border-none bg-transparent focus:outline-none focus:ring-0"
          onChange={(e) => setKeyword(e.target.value)}
          onKeyDown={handleSearch}
        />
      </div>
      <SheetTrigger asChild>
        <div>
          <ButtonType type="filter" />
        </div>
      </SheetTrigger>
    </div>
  );
};

export default SearchAndFilter;
