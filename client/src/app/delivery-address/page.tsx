import { DeliverAddress } from "@/components/features/user/deliver-address";
import { ButtonType } from "@/components/molecule";

const DeliveryAddressPage = () => {
  return (
    <>
      <ButtonType type="back" title="Delivery Address" />
      <DeliverAddress />
    </>
  );
};

export default DeliveryAddressPage;
