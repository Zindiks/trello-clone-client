import { useState } from "react";
import { useBoards } from "@/hooks/useBoards";
import { Button } from "@/components/ui/button";
import { z } from "zod";

import { useToast } from "@/components/ui/use-toast";

import { Input } from "@/components/ui/input";



interface BoardFormProps {
  id:string
  errors: string | null
}


const BoardForm = ({id,errors}:BoardFormProps) => {
  const [formData, setFormData] = useState({ title: "" });
  const { createBoard } = useBoards();

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };



  return (
    <>

      <Input
        id={id}
        name={id}
        required
        placeholder="Enter a board title"
        className="mb-2"
        value={formData.title}
        onChange={handleInputChange}
      />

      {errors && <p className="text-red-500">{errors}</p>}
    </>



  );
};

export default BoardForm;
