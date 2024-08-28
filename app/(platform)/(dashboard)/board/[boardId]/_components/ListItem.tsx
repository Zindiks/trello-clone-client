"use client";

import { List } from "../types";
import ListHeader from "./ListHeader";

interface ListItemProps {
  index: number;
  data: List;
}

const ListItem = ({ index, data }: ListItemProps) => {
  return (
    <li className="shrink-0 h-full w-[272px] select-none">
      <div className="w-full rounded-md bg-[#f1f1ff8f]">


        <ListHeader data={data} />
      </div>
    </li>
  );
};

export default ListItem;
