"use client";

import { Avatar, ButtonType } from "@/components/molecule";
import { DrawerTrigger } from "@/components/ui/drawer";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";
import { useState } from "react";

const SelectAddress = () => {
  const [selectedValue, setSelectedValue] = useState("4102 Pretty View Lane");
  return (
    <div className="flex flex-col h-full font-medium ">
      <Select onValueChange={(value) => setSelectedValue(value)}>
        <SelectTrigger className="flex justify-center items-center w-full p-0 text-sm max-w-40 border-none shadow-none focus:ring-0 focus:ring-none">
          <p className="px-1">Deliver to</p>
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectItem key={1} value="4102 Pretty View Lane">
              4102 Pretty View Lane
            </SelectItem>
            <SelectItem key={2} value="4102 Pretty View Lane 2">
              4102 Pretty View Lane 2
            </SelectItem>
            <SelectItem key={3} value="4102 Pretty View Lane 3">
              4102 Pretty View Lane 3
            </SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
      <span className="text-sm text-primary">{selectedValue}</span>
    </div>
  );
};

const PageHeader = () => {
  return (
    <div className="flex justify-between h-10">
      <DrawerTrigger>
        <ButtonType type="side-menu" />
      </DrawerTrigger>
      {/* <div className="flex flex-col items-center h-full text-sm max-w-52">
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
      </div> */}
      <SelectAddress />
      <Avatar className="w-10 h-10" />
    </div>
  );
};

export default PageHeader;
