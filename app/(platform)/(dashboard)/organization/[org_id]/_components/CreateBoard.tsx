import { HelpCircleIcon } from "lucide-react";
import Hint from "./Hint";

interface CreateBoardProps {
    amount:number
}

export default function CreateBoard({amount}:CreateBoardProps) {
    return (
      <div
        className=" relative aspect-video w-full h-full bg-muted rounded-sm flex flex-col gap-y-1 items-center justify-center hover:opacity-75 transition"
      >
        <p className="text-sm">Create new board</p>
        <span className="text-xs">{amount} remaining</span>

        <Hint
          sideOffset={40}
          description={`Free workspaces can have up to 5 open boards`}
        >
          <HelpCircleIcon className="absolute bottom-2 right-2 h-[14px] w-[14px]" />
        </Hint>
      </div>
    );
}