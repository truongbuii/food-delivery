import { ButtonType } from "@/components/molecule";
import CartAddress from "@/components/molecule/CardAddress";
import { PATHNAME } from "@/configs";

const DeliveryAddressPage = () => {
  return (
    <>
      <ButtonType
        type="back"
        title="Delivery Address"
        expectPath={PATHNAME.HOME}
      />
      <CartAddress />
    </>
  );
};

export default DeliveryAddressPage;
