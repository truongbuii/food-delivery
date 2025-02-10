"use client";

import AddonItem from "@/components/molecule/AddonItem";
import { IAddon } from "@/interfaces";
import { FC } from "react";

const FoodAddons: FC<{ addons: IAddon[] }> = ({ addons }) => {
  return (
    <>
      {addons && (
        <div>
          <p className="text-lg font-semibold">Choice of Add on</p>
          {addons.map((addon) => (
            <AddonItem key={addon.id} addon={addon} />
          ))}
        </div>
      )}
    </>
  );
};

export default FoodAddons;
