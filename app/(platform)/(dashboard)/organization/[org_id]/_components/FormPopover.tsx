"use client";

import { useBoards } from "@/hooks/useBoards";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import BoardForm from "./BoardForm";
import { FormPicker } from "./FormPicker";
import { Button } from "@/components/ui/button";
import { z } from "zod";
import React, { ElementRef, useRef, useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from "@clerk/clerk-react";
import { PopoverClose } from "@radix-ui/react-popover";
import { X } from "lucide-react";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/store/store";

interface FormPopoverProp {
  children: React.ReactNode;
}

const boardSchema = z.object({
  title: z
    .string({
      required_error: "title is required",
    })
    .min(3, "Title must be at least 3 characters")
    .max(36, "Title must be at most 36 characters"),
  org_id: z.string(),
  image_id: z.string(),
  image_thumb_url: z.string(),
  image_full_url: z.string(),
  image_link_html: z.string(),
  image_username: z.string(),
});

export default function FormPopover({ children }: FormPopoverProp) {
  const closeRef = useRef<ElementRef<"button">>(null);

  const [errors, setErrors] = useState<string | null>(null);

  const org = useSelector((state: RootState) => state.organization.org_id);

  const { createBoard } = useBoards(org);
  const { toast } = useToast();

  const onSubmit = (formData: FormData) => {
    const title = formData.get("title") as string;
    const image = formData.get("image") as string;

    if (image === null) {
      toast({
        title: "Please pick an image",
        description: "Image is required",
      });
      return;
    }

    const [image_id, image_thumb_url, image_full_url, image_link_html, image_username] =
      image.split("|");

    if (org !== null && org !== undefined) {
      const createBoardInput = {
        title,
        org_id: org,
        image_id,
        image_thumb_url,
        image_full_url,
        image_link_html,
        image_username,
      };

      const validation = boardSchema.safeParse(createBoardInput);

      if (!validation.success) {
        setErrors(validation.error.errors[0]?.message || "Invalid input");
        return;
      }

      setErrors(null);
      createBoard.mutate(createBoardInput);
      closeRef.current?.click()
    }
  };

  return (
    <Popover>
      <PopoverTrigger asChild>{children}</PopoverTrigger>
      <PopoverContent className="w-80">
        <p>Create a new board</p>

        <PopoverClose asChild ref={closeRef}>
          <Button className="h-auto w-auto p-2 absolute top-2 right-2 text-neutral-600">
            <X className="w-4 h-4" />
          </Button>
        </PopoverClose>

        <form action={onSubmit}>
          <FormPicker id="image" />
          <BoardForm id="title" errors={errors} />

          <Button className="w-full" type="submit">
            Submit
          </Button>
        </form>
      </PopoverContent>
    </Popover>
  );
}
