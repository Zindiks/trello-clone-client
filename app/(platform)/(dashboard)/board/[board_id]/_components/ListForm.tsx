"use client";

import ListWrapper from "./ListWrapper";
import { PlusIcon } from "lucide-react";
import { ElementRef, useRef, useState } from "react";
import { useEventListener, useOnClickOutside } from "usehooks-ts";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";

import { useLists } from "@/hooks/useLists";

const ListForm = () => {
  const formRef = useRef<ElementRef<"form">>(null);
  const inputRef = useRef<ElementRef<"input">>(null);

  const { board_id } = useParams();

  const [isEditing, setIsEditing] = useState(false);

  const enableEditing = () => {
    setIsEditing(true);
    setTimeout(() => {
      inputRef.current?.focus();
    });
  };

  const disableEditing = () => {
    setIsEditing(false);
  };

  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Escape") {
      disableEditing();
    }
  };

  useEventListener("keydown", onKeyDown);
  useOnClickOutside(formRef, disableEditing);

  const { createList } = useLists(board_id as string);

  const onSubmit = (formData: FormData) => {
    const title = formData.get("title") as string;
    const board_id = formData.get("board_id") as string;

    createList.mutate(
      { title, board_id },

      {
        onSuccess: ({ data }) => {
          console.log(data);
        },
        onError: () => {
          console.log("Something Wrong");
        },
      },
    );
  };

  if (isEditing) {
    return (
      <ListWrapper>
        <form
          ref={formRef}
          className={"w-full p-3 rounded-md bg-white space-y-4 shadow-md"}
          action={onSubmit}
        >
          <input
            ref={inputRef}
            id={"title"}
            name={"title"}
            className={
              "text-sm px-2 py-1 h-7 font-medium border-transparent hover:border-input focus:border-input transition "
            }
            placeholder={"Enter list title..."}
          />

          <input hidden defaultValue={board_id} name={"board_id"} />

          <div className={"flex items-center gap-x-1"}>
            <Button type="submit">Add list</Button>
          </div>
        </form>
      </ListWrapper>
    );
  }

  return (
    <ListWrapper>
      <button
        onClick={enableEditing}
        className={
          "w-full rounded-md bg-white/80 hover:bg-white/50 transition p-3 flex items-center font-medium text-sm"
        }
      >
        <PlusIcon className={"h-4 w-4 mr-2"} /> Add a List
      </button>
    </ListWrapper>
  );
};

export default ListForm;
