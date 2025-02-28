import { ICartItemResponse } from "@/interfaces";
import { MapperCartItem } from "@/mapping/cartItem.mapping";
import { useGetCartItems } from "@/queries";
import { createContext, ReactNode, useContext, useMemo } from "react";

interface CartContextType {
  cartItems: ICartItemResponse[];
  totalQuantity: number;
  subTotal: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const { data: cartItems } = useGetCartItems();
  const _cartItems = useMemo(
    () => cartItems?.data?.map((category) => MapperCartItem(category)) ?? [],
    [cartItems]
  );

  const totalQuantity = useMemo(() => {
    return _cartItems.reduce((total, item) => total + item.quantity, 0);
  }, [_cartItems]);

  const subTotal = useMemo(() => {
    return _cartItems.reduce((total, item) => {
      const addonsTotal =
        item.selectedAddons?.reduce((sum, addon) => sum + addon.price, 0) || 0;
      return total + (item.foodPrice + addonsTotal) * item.quantity;
    }, 0);
  }, [_cartItems]);

  return (
    <CartContext.Provider
      value={{
        cartItems: _cartItems,
        totalQuantity,
        subTotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
