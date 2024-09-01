"use client";
import React from "react";
import { useQuery } from "@tanstack/react-query"; // Проверьте правильность импорта
import axios from "axios";

import Head from "next/head";
import BoardNavBar from "@/app/(platform)/(dashboard)/board/[board_id]/_components/BoardNavBar";

interface BoardIdLayoutProps {
  children: React.ReactNode;
  params: { board_id: string };
}

const fetchBoard = async (board_id: string) => {
  try {
    const response = await axios.get(
      `http://localhost:4000/api/boards/${board_id}`,
    );
    return response.data;
  } catch (error) {
    throw new Error(`Error fetching boards: ${error}`);
  }
};

const BoardIdLayout: React.FC<BoardIdLayoutProps> = ({ children, params }) => {
  const { board_id } = params;

  const { data, isLoading } = useQuery({
    queryKey: ["board", board_id],
    queryFn: () => fetchBoard(board_id),
  });

  if (isLoading) {
    return <h1>...</h1>;
  }

  return (
    <>
      <Head>
        <title>{data?.title ?? "Board"}</title>
      </Head>

      <div
        style={{ backgroundImage: `url(${data.image_full_url})` }}
        className={"h-full w-full bg-cover  "}
      >
        <BoardNavBar data={data} />

        <div className={"absolute inset-0 bg-black/10"} />
        <main className="relative pt-12 p-2 h-full w-full overflow-x-scroll">
          {children}
        </main>
      </div>
    </>
  );
};

export default BoardIdLayout;
