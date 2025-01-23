"use client";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format, parseISO } from "date-fns";
import { CalendarIcon } from "lucide-react";

interface DatePickerProps {
  id: string;
  value: string | undefined;
  onChange: (date: string | undefined) => void;
}

const DatePicker = ({ id, value, onChange }: DatePickerProps) => {
  const handleDateSelect = (selectedDate: Date | undefined) => {
    onChange(selectedDate ? selectedDate.toISOString() : undefined);
  };
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          id={id}
          variant={"outline"}
          className="w-full h-[55px] justify-start rounded-[10px] mt-1 py-[14px] px-[12px] bg-secondary hover:bg-secondary"
        >
          <CalendarIcon className="mr-2 h-4 w-4 text-lightGray" />
          <div className="text-foreground text-left font-normal ">
            {value ? (
              format(parseISO(value), "PPP")
            ) : (
              <span className="text-lightGray">Pick a date</span>
            )}
          </div>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={value ? parseISO(value) : undefined}
          onSelect={handleDateSelect}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
};

export default DatePicker;
