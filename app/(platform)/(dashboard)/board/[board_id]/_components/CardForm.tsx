"use client";

import { Button } from "@/components/ui/button";
import { PlusIcon, X } from "lucide-react";
import { forwardRef, useRef, ElementRef, KeyboardEventHandler } from "react";
import { FormTextarea } from "./FormTextarea";
import { useOnClickOutside, useEventListener } from "usehooks-ts";
import { useCards } from "@/hooks/useCards";

interface CardFormProps {
  list_id: string;
  enableEditing: () => void;
  disableEditing: () => void;
  isEditing: boolean;
}

const CardForm = forwardRef<HTMLTextAreaElement, CardFormProps>(
  ({ list_id, enableEditing, disableEditing, isEditing }, ref) => {
    const formRef = useRef<ElementRef<"form">>(null);

    const { createCard } = useCards();

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        disableEditing();
      }
    };

    useOnClickOutside(formRef, disableEditing);
    useEventListener("keydown", onKeyDown);

    const onTextareakeyDown: KeyboardEventHandler<HTMLTextAreaElement> = (
      e,
    ) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        formRef.current?.requestSubmit();
      }
    };

    const onSubmit = (formData: FormData) => {
      const title = formData.get("title") as string;
      const list_id = formData.get("list_id") as string;

      createCard.mutate(
        { title, list_id },
        {
          onSuccess: () => {},
          onError: () => {
            console.log("asdasd");
          },
        },
      );

      disableEditing();
    };

    if (isEditing) {
      return (
        <form
          className="m-1 py-0.5 px-1 space-y-4"
          action={onSubmit}
          ref={formRef}
        >
          <FormTextarea
            id="title"
            onKeyDown={onTextareakeyDown}
            ref={ref}
            placeholder="Enter a title for this card..."
          />

          <input hidden id="list_id" name="list_id" defaultValue={list_id} />

          <div className="flex items-center gap-x-1 justify-between">
            <Button variant={"ghost"}>Add card</Button>
            <Button variant={"ghost"} onClick={disableEditing} size={"sm"}>
              <X className="w-4 h-4" />
            </Button>
          </div>
        </form>
      );
    }

    return (
      <div className="pt-2 px-2 pb-2">
        <Button
          className="h-auto px-2 py-1.5 w-full justify-start text-muted-foreground text-sm"
          variant={"ghost"}
          onClick={enableEditing}
          size={"sm"}
        >
          <PlusIcon className="h-4 w-4 mr-2" />
          Add a card
        </Button>
      </div>
    );
  },
);

CardForm.displayName = "CardForm";

export default CardForm;
