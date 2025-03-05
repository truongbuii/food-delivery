import RatingRestaurant from "@/components/features/restaurant/rating";
import { ButtonType } from "@/components/molecule";

const RatingRestaurantPage = () => {
  return (
    <>
      <ButtonType className="absolute top-2 left-2 w-auto" type="back" />
      <div className="px-6 py-6">
        <RatingRestaurant />
      </div>
    </>
  );
};

export default RatingRestaurantPage;
