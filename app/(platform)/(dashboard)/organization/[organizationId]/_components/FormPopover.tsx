"use client";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import BoardForm from "./BoardForm";

interface FormPopoverProp {
  children: React.ReactNode;
}

export default function FormPopover({ children }: FormPopoverProp) {
  return (
    <Popover>
      <PopoverTrigger asChild>{children}</PopoverTrigger>
      <PopoverContent className="w-80">
        <p>Create a new board</p>
        <BoardForm />
      </PopoverContent>
    </Popover>
  );
}
