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
    <div className="flex justify-between items-center pt-3">
      <div className="flex items-center gap-5">
        <Image
          src={addon.imageUrl}
          alt={addon.name}
          width={40}
          height={40}
          className="rounded-full"
        />
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
