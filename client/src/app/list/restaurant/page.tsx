import RestaurantByParams from "@/components/features/restaurant/restaurants-by-params";
import { ButtonType } from "@/components/molecule";
import { Skeleton } from "@/components/ui/skeleton";
import BackgroundCategory from "@/layouts/BackgroundCategory";
import { Suspense } from "react";

const ListRestaurantPage = () => {
  return (
    <div className="relative">
      <ButtonType className="absolute" type="back" />
      <BackgroundCategory>
        <div className="relative w-full px-6 pb-6 z-2">
          <div className="pt-28">
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
              <RestaurantByParams />
            </Suspense>
          </div>
        </div>
      </BackgroundCategory>
    </div>
  );
};

export default ListRestaurantPage;
