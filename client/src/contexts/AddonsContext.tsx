import { IAddon } from "@/interfaces";
import { createContext, ReactNode, useContext, useState } from "react";

interface AddonsContextType {
  selectedAddons: IAddon[];
  toggleAddon: (addon: IAddon) => void;
}

export const AddonsContext = createContext<AddonsContextType | undefined>(
  undefined
);

export const useAddons = () => {
  const context = useContext(AddonsContext);
  if (!context) {
    throw new Error("useAddons must be used within AddonsProvider");
  }
  return context;
};

export const AddonsProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [selectedAddons, setSelectedAddons] = useState<IAddon[]>([]);

  const toggleAddon = (addonId: IAddon) => {
    setSelectedAddons((prev) =>
      prev.includes(addonId)
        ? prev.filter((id) => id !== addonId)
        : [...prev, addonId]
    );
  };

  return (
    <AddonsContext.Provider value={{ selectedAddons, toggleAddon }}>
      {children}
    </AddonsContext.Provider>
  );
};
