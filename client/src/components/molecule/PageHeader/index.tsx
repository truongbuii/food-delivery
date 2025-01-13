"use client";

import { CustomBackBtn } from "@/components/molecule/BackButton";
import { DrawerTrigger } from "@/components/ui/drawer";
import { ChevronDown } from "lucide-react";
import { useState } from "react";

interface CustomSelectProps {
  options: string[];

  placeholder?: string;
}

const CustomSelect: React.FC<CustomSelectProps> = ({
  options,
  placeholder = "Select an option",
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const handleSelect = (option: string) => {
    setSelectedOption(option);
    setIsOpen(false);
  };

  return (
    <div className="relative text-center w-52">
      {/* Select Button */}
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex items-center justify-center gap-2 w-full text-sm font-medium transition-all text-primary"
      >
        <span className="block truncate max-w-52">
          {selectedOption || placeholder}
        </span>
        <ChevronDown
          className={`h-4 w-4 shrink-0 text-muted-foreground transition-transform ${
            isOpen ? "rotate-180" : "rotate-0"
          }`}
        />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <ul className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-40 overflow-auto">
          {options.map((option, index) => (
            <li key={index}>
              <button
                className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-border hover:text-indigo-900"
                onClick={() => handleSelect(option)}
              >
                {option}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

const PageHeader = () => {
  return (
    <div className="flex justify-between h-10">
      <DrawerTrigger>
        <CustomBackBtn type="side-menu" />
      </DrawerTrigger>
      <div className="flex flex-col items-center h-full text-sm max-w-52">
        <p>Delivery to</p>
        <CustomSelect
          options={[
            "4102 Pretty View Land 1",
            "4102 Pretty View Land 2",
            "4102 Pretty View Land 3",
            "4102 Pretty View Land 4",
          ]}
          placeholder="Choose an option"
        />
      </div>
      <div>avatar</div>
    </div>
  );
};

export default PageHeader;
