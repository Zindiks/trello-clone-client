"use client";

import { List } from "../types";
import ListForm from "../_components/ListForm";
import { useEffect, useState } from "react";
import ListItem from "./ListItem";

interface ListContainerProps {
  data: List[];
  boardId: string;
}

const ListContainer = ({ data, boardId }: ListContainerProps) => {





  const [orderedData, setOrderedData] = useState(data);

  useEffect(() => {
    setOrderedData(data);
  }, [data]);




  return (
    <ol className="flex gap-x-3 h-full">
      {orderedData?.map((list, index) => {
        return <ListItem key={list.id} index={index} data={list} />;
      })}
      <ListForm />
      <div className={"flex shrink-0 w-1"}></div>
    </ol>
  );
};

export default ListContainer;
