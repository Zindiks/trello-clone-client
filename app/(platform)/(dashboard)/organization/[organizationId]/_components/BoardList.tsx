"use client";
import { Button } from "@/components/ui/button";
import { HelpCircleIcon, Trash, User2 } from "lucide-react";
import { ResponseBoard, useBoards } from "@/hooks/useBoards";
import Hint from "./Hint";
import FormPopover from "./FormPopover";
import CreateBoard from "./CreateBoard";

const BoardList = () => {
  const { data, isLoading, isError, deleteBoard } = useBoards();

  // if (isLoading) return <div>Loading...</div>;
  // if (isError) return <div>Error loading boards...</div>;

  return (
    <div className="space-y-4">
      <div className="flex items-center font-semibold text-lg text-neutral-700">
        <User2 className="h-6 w-6 mr-2" />
        Your boards
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {/* {data?.map((board) => (
          <div
            key={board.id}
            role="button"
            className=" relative aspect-video w-full h-full bg-muted rounded-sm flex flex-col gap-y-1 items-center justify-center hover:opacity-75 transition"
          >
            <p className="text-sm">{board.title}</p>

            <Button
              variant={"destructive"}
              onClick={() => deleteBoard.mutate(board.id)}
            >
              <Trash className="w-5 h-5" />
            </Button>
          </div>
        ))} */}

        <FormPopover>
          <div role="button">
            <CreateBoard amount={5} />
          </div>
        </FormPopover>
      </div>
    </div>
  );
};

export default BoardList;
