import RestaurantProfile from "@/components/features/restaurant/restaurant-profile";
import { ButtonType } from "@/components/molecule";
import { PATHNAME } from "@/configs";

const RestaurantPage = () => {
  return (
    <>
      <ButtonType
        className="absolute top-2 left-2 w-auto"
        type="back"
        expectPath={PATHNAME.HOME}
      />
      <div className="px-6 py-6">
        <RestaurantProfile />
      </div>
    </>
  );
};

export default RestaurantPage;
