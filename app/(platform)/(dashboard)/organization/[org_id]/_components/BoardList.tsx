"use client";

import { User2 } from "lucide-react";
import { useBoards } from "@/hooks/useBoards";
import FormPopover from "./FormPopover";
import CreateBoard from "./CreateBoard";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/store/store";
import Link from "next/link";
import { Skeleton } from "@/components/ui/skeleton";

const BoardList = () => {

  const org = useSelector((state: RootState) => state.organization.org_id);
  const { boards} = useBoards(org);

  if (boards.isLoading) return <BoardList.Skeleton />;
  if (boards.isError) return <div>Error loading boards...</div>;

  return (
    <div className="space-y-4">
      <div className="flex items-center font-semibold text-lg text-neutral-700">
        <User2 className="h-6 w-6 mr-2" />
        Your boards
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">

        {boards.data?.map((board) => (
          <Link href={`/board/${board.id}`} key={board.id} style={{backgroundImage: `url(${board.image_thumb_url})`}} className={"group relative aspect-video bg-no-repeat bg-center bg-cover bg-sky-700 rounded-sm h-full w-full p-2 overflow-hidden"}>
            <div className={"absolute inset-0 bg-black/30 group-hover:bg-black/40 transition p-2"}>
              <p className={"relative text-white"}>{board.title}</p>
            </div>
          </Link>
        ))}

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



BoardList.Skeleton = function SkeletonBoardList(){
  return (
    <div className={"grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4"}>
      <Skeleton className={"aspect-video h-full w-full p-2"}/>
      <Skeleton className={"aspect-video h-full w-full p-2"}/>
      <Skeleton className={"aspect-video h-full w-full p-2"}/>
      <Skeleton className={"aspect-video h-full w-full p-2"}/>
      <Skeleton className={"aspect-video h-full w-full p-2"}/>
      <Skeleton className={"aspect-video h-full w-full p-2"}/>
      <Skeleton className={"aspect-video h-full w-full p-2"}/>
      <Skeleton className={"aspect-video h-full w-full p-2"}/>
    </div>
  )
}
