import RestaurantByParams from "@/components/features/restaurant/restaurants-by-params";
import { ButtonType } from "@/components/molecule";
import BackgroundCategory from "@/layouts/BackgroundCategory";

const ListRestaurantPage = () => {
  return (
    <div className="relative">
      <ButtonType className="absolute" type="back" />
      <BackgroundCategory>
        <div className="relative w-full px-6 pb-6 z-2">
          <div className="pt-28">
            <RestaurantByParams />
          </div>
        </div>
      </BackgroundCategory>
    </div>
  );
};

export default ListRestaurantPage;
