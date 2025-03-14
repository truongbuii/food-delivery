import SearchTabScreen from "@/components/features/search";
import { Skeleton } from "@/components/ui/skeleton";
import { Suspense } from "react";
const SearchPage = () => {
  return (
    <div className="relative w-full px-6 pb-6 z-2">
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
        <SearchTabScreen />
      </Suspense>
    </div>
  );
};

export default SearchPage;
