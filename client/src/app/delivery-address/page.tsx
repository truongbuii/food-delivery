import { DeliverAddress } from "@/components/features/user/deliver-address";
import { ButtonType } from "@/components/molecule";
import { PATHNAME } from "@/configs";

const DeliveryAddressPage = () => {
  return (
    <>
      <ButtonType
        type="back"
        title="Delivery Address"
        expectPath={PATHNAME.HOME}
      />
      <DeliverAddress />
    </>
  );
};

export default DeliveryAddressPage;
