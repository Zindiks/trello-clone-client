import { Board } from "@/app/(platform)/(dashboard)/board/[boardId]/types";
import BoardTitleForm from "@/app/(platform)/(dashboard)/board/[boardId]/_components/BoardTitleForm";


interface BoardNavBarProps {
  data: Board;
}



const BoardNavBar = ({data}: BoardNavBarProps) => {



  return (
    <div className="w-full h-14 z-[40] bg-black/50 fixed top-14 flex items-center px-6 gap-x-4 text-white"><BoardTitleForm data={data} /></div>
  )
}

export default BoardNavBar;




