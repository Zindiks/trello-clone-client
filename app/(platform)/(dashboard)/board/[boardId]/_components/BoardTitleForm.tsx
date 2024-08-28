"use client"

import { Board } from "@/app/(platform)/(dashboard)/board/[boardId]/types";

interface BoardTitleFormProps {

  data: Board;
}

import { Button } from "@/components/ui/button";
import { ElementRef, useRef, useState } from "react";
import { useBoards } from "@/hooks/useBoards";





const BoardTitleForm = ({data}:BoardTitleFormProps) => {

const [isEditing,setIsEditing] = useState(false);

const formRef = useRef<ElementRef<"form">>(null);
const inputRef = useRef<ElementRef<"input">>(null);

  const {updateBoardTitle} =useBoards(data.orgId)

const disableEditing = () => {
  setIsEditing(false);
}


const enableEditing = () => {
  //TODO: Focus input
  setTimeout(()=>{
    inputRef.current?.focus();
    inputRef.current?.select();
  })
  setIsEditing(true);
}



const onSubmit = (formData:FormData) => {

  const title = formData.get("title") as string
  const id = data.id


  if(title === data.title){
    disableEditing()
    return
  }

  updateBoardTitle.mutate({title,id}, {
    onSuccess: () => {
      disableEditing();
    }
    }
    )


}


const onBlur = () =>{
  formRef.current?.requestSubmit();

}

if (isEditing) {
  return (
    <form className={"flex items-center gap-x-2"} ref={formRef} action={onSubmit}>
      {/*<FormInput ref={inputRef}  id={"title"} onBlur={()=>{}} defaultValue={data.title} className={"text-lg font-bold px-[7px] py-1 h-7 bg-transparent focus-visible:outline-none focus-visible:ring-transparent border-none"}/>*/}

      <input ref={inputRef}
             id={"title"}
             name={"title"}
             onBlur={onBlur}
             defaultValue={data.title}
             className={"text-lg font-bold py-2 px-2 h-7 bg-transparent focus-visible:outline-none focus-visible:ring-transparent border-none rounded-sm"} />

    </form>
  )
}



  return (
    <Button
      onClick={enableEditing}
      className={"font-bold text-lg h-auto w-auto p-1 px-2"}
      variant={"transparent"}

    >
      {data.title}
    </Button>
  )
}

export default BoardTitleForm