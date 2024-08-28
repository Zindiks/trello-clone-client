"use client"
import React from "react";
import { useQuery } from "@tanstack/react-query"; // Проверьте правильность импорта

import axios from "axios";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/store/store";
import Head from "next/head";
import BoardNavBar from "@/app/(platform)/(dashboard)/board/[boardId]/_components/BoardNavBar";






interface BoardIdLayoutProps {
  children: React.ReactNode;
  params: { boardId: string };
}



const fetchBoard = async (boardId: string) => {
  try {
    const response = await axios.get(`http://localhost:4000/api/boards/${boardId}`);
    return response.data;
  } catch (error) {
    throw new Error(`Error fetching boards: ${error}`);
  }
};



const BoardIdLayout: React.FC<BoardIdLayoutProps> = ({ children, params }) => {
  const { boardId } = params;


const { data, isLoading } = useQuery({
  queryKey: ["board", boardId],
  queryFn: () => fetchBoard(boardId),
});




  if(isLoading){
    return <h1>...</h1>
  }




  return (
  <>
    <Head>
      <title>{data?.title ?? "Board"}</title>
    </Head>

    <div style={{backgroundImage: `url(${data.imageFullUrl})`}} className={"h-full w-full bg-cover"}>



      <BoardNavBar data={data} />

      <div className={"absolute inset-0 bg-black/10"} />
        <main className="relative pt-12 p-2">
      {children}
    </main>

    </div>

  </>

  );
};

export default BoardIdLayout;