import FoodsByCategory from "@/components/features/food/foods-by-category";
import { ButtonType } from "@/components/molecule";
import { Skeleton } from "@/components/ui/skeleton";
import { PATHNAME } from "@/configs";
import BackgroundCategory from "@/layouts/BackgroundCategory";
import { Suspense } from "react";

const FoodCategoryPage = () => {
  return (
    <div className="relative">
      <ButtonType className="absolute" type="back" expectPath={PATHNAME.HOME} />
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
              <FoodsByCategory />
            </Suspense>
          </div>
        </div>
      </BackgroundCategory>
    </div>
  );
};

export default FoodCategoryPage;
