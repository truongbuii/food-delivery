import FoodProfile from "@/components/features/food/food-profile";
import { ButtonType } from "@/components/molecule";

const FoodDetailPage = () => {
  return (
    <div className="relative">
      <ButtonType className="absolute top-2 left-2 w-auto" type="back" />
      <div className="px-6 py-6">
        <FoodProfile />
      </div>
    </div>
  );
};

export default FoodDetailPage;
