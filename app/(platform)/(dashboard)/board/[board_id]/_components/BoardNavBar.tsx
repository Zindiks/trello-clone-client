"use client";
import { useRouter } from "next/navigation"; // Используйте import из 'next/navigation'
import { Board } from "@/app/(platform)/(dashboard)/board/[board_id]/types";
import BoardTitleForm from "@/app/(platform)/(dashboard)/board/[board_id]/_components/BoardTitleForm";
import { TrashIcon } from "lucide-react";
import { useBoards } from "@/hooks/useBoards";

interface BoardNavBarProps {
  data: Board;
}

const BoardNavBar = ({ data }: BoardNavBarProps) => {
  const { deleteBoard } = useBoards(data.org_id);
  const router = useRouter();

  const handleDelete = (board_id: string) => {
    deleteBoard.mutate(board_id, {
      onSuccess: () => {
        router.push("/organization/" + data.org_id);
      },
    });
  };

  return (
    <div className="w-full h-14 z-[40] bg-black/50 fixed top-14 flex items-center px-6 gap-x-4 text-white">
      <BoardTitleForm data={data} />

      {/*TODO: Popover menu with additional info about board and so on*/}
      <div className={"ml-auto"}>
        <TrashIcon onClick={() => handleDelete(data.id)} />
      </div>
    </div>
  );
};

export default BoardNavBar;
