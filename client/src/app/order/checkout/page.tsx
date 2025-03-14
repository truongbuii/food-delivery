import PaymentMethod from "@/components/features/order/checkout";
import { Skeleton } from "@/components/ui/skeleton";
import { Suspense } from "react";

const PaymentPage = () => {
  return (
    <div className="relative w-full px-6 pb-6 z-2">
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
        <PaymentMethod />
      </Suspense>
    </div>
  );
};

export default PaymentPage;
