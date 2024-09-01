import { EllipsisVertical, MoreHorizontal, X } from "lucide-react";
import { List } from "../types";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { PopoverClose } from "@radix-ui/react-popover";
import { useLists } from "@/hooks/useLists";
import { ElementRef, useRef } from "react";

interface ListOptionsProps {
  data: List;
  onAddCard: () => void;
}

//TODO: FORMS are unnecesary. I can use props data to get all necesarry fields to delete, copy or create card
// I will change it later

const ListOptions = ({ data, onAddCard }: ListOptionsProps) => {
  const closeRef = useRef<ElementRef<"button">>(null);
  const { deleteList, copyList } = useLists(data.board_id);

  const deleteHandler = (formData: FormData) => {
    const id = formData.get("id") as string;
    const board_id = formData.get("board_id") as string;

    deleteList.mutate(
      { id, board_id },
      {
        onSuccess: () => {
          closeRef.current?.click();
        },
      },
    );
  };

  const copyHandler = (formData: FormData) => {
    const id = formData.get("id") as string;
    const board_id = formData.get("board_id") as string;

    copyList.mutate(
      { id, board_id },
      {
        onSuccess: () => {
          closeRef.current?.click();
        },
      },
    );
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button className="h-auto w-auto p-1" variant={"ghost"}>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </PopoverTrigger>

      <PopoverContent className="px-0 pt-3 pb-3 " side="bottom" align="start">
        <div className="flex justify-between p-2 text-neutral-600 ">
          <div className="text-sm font-medium text-center w-full">
            List Actions
          </div>

          <PopoverClose ref={closeRef}>
            <X className="w-4 h-4" />
          </PopoverClose>
        </div>

        <div className="w-full ">
          <Button
            onClick={onAddCard}
            className="rounded-none w-full h-auto p-2 px-5 justify-start font-normal text-sm"
            variant={"ghost"}
          >
            Add card
          </Button>

          <form action={copyHandler}>
            <input hidden name="id" id="id" defaultValue={data.id} />
            <input
              hidden
              name="board_id"
              id="board_id"
              defaultValue={data.board_id}
            />

            <Button
              type="submit"
              className="rounded-none w-full h-auto p-2 px-5 justify-start font-normal text-sm"
              variant={"ghost"}
            >
              Copy list
            </Button>
          </form>

          <form action={deleteHandler}>
            <input hidden name="id" id="id" defaultValue={data.id} />
            <input
              hidden
              name="board_id"
              id="board_id"
              defaultValue={data.board_id}
            />

            <Button
              type="submit"
              className="rounded-none w-full h-auto p-2 px-5 justify-start font-normal text-sm"
              variant={"ghost"}
            >
              Delete list
            </Button>
          </form>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default ListOptions;
