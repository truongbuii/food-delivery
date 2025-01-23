"use client";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useState } from "react";

const DatePicker = () => {
  const [date, setDate] = useState<Date>();
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          style={{
            width: "100%",
            height: "55px",
            borderRadius: "10px",
            marginTop: "4px",
            padding: "14px 12px",
          }}
        >
          <CalendarIcon className="mr-2 h-4 w-4 text-lightGray" />
          <div className="text-foreground">
            {date ? (
              format(date, "PPP")
            ) : (
              <span className="text-lightGray">Pick a date</span>
            )}
          </div>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
};

export default DatePicker;
