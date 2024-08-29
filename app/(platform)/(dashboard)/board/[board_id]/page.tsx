"use client";
import ListContainer from "@/app/(platform)/(dashboard)/board/[board_id]/_components/ListContainer";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

interface BoardIdPageProps {
  params: {
    board_id: string;
  };
}

const fetchBoard = async (board_id: string) => {
  try {
    const response = await axios.get(
      `http://localhost:4000/api/lists/${board_id}`,
    );
    return response.data;
  } catch (error) {
    throw new Error(`Error fetching boards: ${error}`);
  }
};

const BoardIdPage = ({ params }: BoardIdPageProps) => {
  const { board_id } = params;

  const { data, isLoading } = useQuery({
    queryKey: ["list", board_id],
    queryFn: () => fetchBoard(board_id),
  });

  if (isLoading) {
    return <p>loading...</p>;
  }


  return (
    <div className={"pt-20"}>
      <ListContainer board_id={board_id} data={data} />
    </div>
  );
};

export default BoardIdPage;
