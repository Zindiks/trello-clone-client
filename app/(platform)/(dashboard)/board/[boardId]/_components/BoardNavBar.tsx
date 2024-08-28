"use client";
import { useRouter } from 'next/navigation'; // Используйте import из 'next/navigation'
import { Board } from "@/app/(platform)/(dashboard)/board/[boardId]/types";
import BoardTitleForm from "@/app/(platform)/(dashboard)/board/[boardId]/_components/BoardTitleForm";
import { TrashIcon } from "lucide-react";
import { useBoards } from "@/hooks/useBoards";

interface BoardNavBarProps {
  data: Board;
}

const BoardNavBar = ({ data }: BoardNavBarProps) => {
  const { deleteBoard } = useBoards(data.orgId);
  const router = useRouter();

  const handleDelete = (boardId: string) => {
    deleteBoard.mutate(boardId, {
      onSuccess: () => {
        router.push("/organization/" + data.orgId);
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