import { ElementRef, useRef, useState } from "react";
import { List } from "../types";
import { useEventListener } from "usehooks-ts";
import { useLists } from "@/hooks/useLists";
import { useQueryClient } from "@tanstack/react-query";
import ListOptions from "./ListOptions";

interface ListHeaderProps {
  data: List;
  onAddCard: () => void;
}

const ListHeader = ({ data }: ListHeaderProps) => {
  const [title, setTitle] = useState(data.title);

  const queryClient = useQueryClient();

  const [isEditing, setIsEditing] = useState(false);

  const formRef = useRef<ElementRef<"form">>(null);
  const inputRef = useRef<ElementRef<"input">>(null);

  const { updateListTitle } = useLists(data.board_id);

  const enableEditing = () => {
    setIsEditing(true);
    setTimeout(() => {
      inputRef.current?.focus();
      inputRef.current?.select();
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

  const onSubmit = (formData: FormData) => {
    const id = formData.get("id") as string;
    const title = formData.get("title") as string;
    const board_id = formData.get("board_id") as string;

    if (title === data.title) {
      disableEditing();
      return;
    }

    updateListTitle.mutate(
      { id, title, board_id },
      {
        onSuccess: ({ data }) => {
          queryClient.invalidateQueries({ queryKey: ["list"] });
          setTitle(data.title);
          disableEditing();
        },
        onError: () => {
          console.log("Something Wrong");
        },
      },
    );
  };

  const onBlur = () => {
    formRef.current?.requestSubmit();
  };

  return (
    <div className="pt-2 px-2 text-sm font-semibold flex justify-between items-center gap-x-2 pb-2">
      {isEditing ? (
        <form ref={formRef} className="flex-1 px-[2px]" action={onSubmit}>
          <input hidden id="id" name="id" defaultValue={data.id} />
          <input
            hidden
            id="board_id"
            name="board_id"
            defaultValue={data.board_id}
          />

          <input
            ref={inputRef}
            onBlur={onBlur}
            id="title"
            name="title"
            placeholder="Enter list tile"
            defaultValue={title}
            className="w-full text-sm px-[7px] py-1 h-7 font-medium border-transparent hover:border-input focus:border-input transition truncate bg-transparent focus:bg-white "
          />

          <button hidden type="submit" />
        </form>
      ) : (
        <div
          onClick={enableEditing}
          className="w-full text-sm px-2.5 py-1 h-7 font-medium border-transparent"
        >
          {title}
        </div>
      )}

      <ListOptions data={data} onAddCard={() => {}} />
    </div>
  );
};

export default ListHeader;
