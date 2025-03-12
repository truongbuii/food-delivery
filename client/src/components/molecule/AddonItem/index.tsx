import { useAddons } from "@/contexts/AddonsContext";
import { IAddon } from "@/interfaces";
import Image from "next/image";
import { FC } from "react";

interface AddonItemProps {
  addon: IAddon;
}

const AddonItem: FC<AddonItemProps> = ({ addon }) => {
  const { toggleAddon, selectedAddons } = useAddons();
  const checked = selectedAddons.includes(addon);

  return (
    <div className="flex justify-between items-center pt-4">
      <div className="flex items-center gap-5">
        <div className="relative w-10 h-10">
          <Image
            src={addon.imageUrl}
            alt={addon.name}
            fill
            sizes="100%"
            className="rounded-full object-cover"
          />
        </div>
        <span className="text-sm font-medium">{addon.name}</span>
      </div>
      <div className="flex gap-5">
        <div>
          +<span className="font-semibold text-sm">${addon.price}</span>
        </div>
        <div
          className={`relative w-6 h-6 flex items-center justify-center rounded-full border-2 cursor-pointer transition-all
        ${checked ? "border-primary" : "border-lightGray"}`}
          onClick={() => toggleAddon(addon)}
        >
          {checked && (
            <div className="w-[13px] h-[13px] bg-primary rounded-full" />
          )}
        </div>
      </div>
    </div>
  );
};

export default AddonItem;
