import FoodProfile from "@/components/features/food/food-profile";
import { ButtonType } from "@/components/molecule";
import { PATHNAME } from "@/configs";

const FoodDetailPage = () => {
  return (
    <>
      <ButtonType
        className="absolute top-2 left-2 w-auto"
        type="back"
        expectPath={PATHNAME.HOME}
      />
      <div className="px-6 py-6">
        <FoodProfile />
      </div>
    </>
  );
};

export default FoodDetailPage;
