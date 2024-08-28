"use client";
import ListContainer from "@/app/(platform)/(dashboard)/board/[boardId]/_components/ListContainer";

import { useAuth } from "@clerk/nextjs";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { bigint } from "zod";

interface BoardIdPageProps {
  params: {
    boardId: string;
  };
}

const fetchBoard = async (boardId: string) => {
  try {
    const response = await axios.get(
      `http://localhost:4000/api/lists/${boardId}`,
    );
    return response.data;
  } catch (error) {
    throw new Error(`Error fetching boards: ${error}`);
  }
};

const BoardIdPage = ({ params }: BoardIdPageProps) => {
  const { boardId } = params;

  const { data, isLoading } = useQuery({
    queryKey: ["list", boardId],
    queryFn: () => fetchBoard(boardId),
  });

  if (isLoading) {
    return <p>loading...</p>;
  }

  console.log(data);

  return (
    <div className={"pt-20"}>
      <ListContainer boardId={boardId} data={data} />
    </div>
  );
};

export default BoardIdPage;
