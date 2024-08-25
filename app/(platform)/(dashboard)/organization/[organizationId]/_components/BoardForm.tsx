import { useState } from "react";
import { useBoards } from "@/hooks/useBoards";
import { Button } from "@/components/ui/button";
import { z } from "zod";

import { useToast } from "@/components/ui/use-toast";

import { Input } from "@/components/ui/input";


const boardSchema = z.object({
  title: z
    .string()
    .min(3, "Title must be at least 3 characters")
    .max(36, "Title must be at most 36 characters"),
});

const BoardForm = () => {
  const { toast } = useToast();

  const [formData, setFormData] = useState({ title: "" });
  const [errors, setErrors] = useState<string | null>(null);
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

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const validation = boardSchema.safeParse(formData);

    if (!validation.success) {
      setErrors(validation.error.errors[0]?.message || "Invalid input");
      toast;

      return;
    }

    setErrors(null);
    createBoard.mutate(formData);
    setFormData({ title: "" });
  };

  return (
    <form onSubmit={handleSubmit}>
      <Input
        id="title"
        name="title"
        required
        placeholder="Enter a board title"
        className="border-black border p-1"
        value={formData.title}
        onChange={handleInputChange}
      />
      <Button type="submit">Submit</Button>

      {/* Отображение ошибки, если валидация не прошла */}
      {errors && <p className="text-red-500">{errors}</p>}

    </form>
  );
};

export default BoardForm;
