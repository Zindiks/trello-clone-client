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
import React, { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from "@clerk/clerk-react";

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
  orgId: z.string(),
  imageId: z.string(),
  imageThumbUrl: z.string(),
  imageFullUrl: z.string(),
  imageLinkHTML: z.string(),
  imageUserName: z.string(),
});

export default function FormPopover({ children }: FormPopoverProp) {
  const [errors, setErrors] = useState<string | null>(null);

  const { orgId } = useAuth();
  const { createBoard } = useBoards();
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

    const [imageId, imageThumbUrl, imageFullUrl, imageLinkHTML, imageUserName] =
      image.split("|");

    if (orgId !== null && orgId !== undefined) {
      const createBoardInput = {
        title,
        orgId,
        imageId,
        imageThumbUrl,
        imageFullUrl,
        imageLinkHTML,
        imageUserName,
      };

      const validation = boardSchema.safeParse(createBoardInput);

      if (!validation.success) {
        setErrors(validation.error.errors[0]?.message || "Invalid input");

        return;
      }

      setErrors(null);

      createBoard.mutate(createBoardInput);
    }
  };

  return (
    <Popover>
      <PopoverTrigger asChild>{children}</PopoverTrigger>
      <PopoverContent className="w-80">
        <p>Create a new board</p>

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
