import ButtonType from "@/components/molecule/ButtonType";
import { Search } from "lucide-react";

const SearchAndFilter = () => {
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
        />
      </div>
      <ButtonType type="filter" />
    </div>
  );
};

export default SearchAndFilter;
