import FoodsByCategory from "@/components/features/food/foods-by-category";
import { ButtonType } from "@/components/molecule";
import { PATHNAME } from "@/configs";
import BackgroundCategory from "@/layouts/BackgroundCategory";

const FoodCategoryPage = () => {
  return (
    <div className="relative">
      <ButtonType className="absolute" type="back" expectPath={PATHNAME.HOME} />
      <BackgroundCategory>
        <div className="relative w-full px-6 pb-6 z-2">
          <div className="pt-28">
            <FoodsByCategory />
          </div>
        </div>
      </BackgroundCategory>
    </div>
  );
};

export default FoodCategoryPage;
