"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios, { AxiosResponse } from "axios";

import { useToast } from "@/components/ui/use-toast";
import { useState } from "react";

interface Board {
  id: number;
  title: string;
}

interface FetchError {
  message: string;
  response: {
    data: {
      message: string;
    };
  };
}

import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";

const formSchema = z.object({
  title: z.string().min(3).max(36),
});

const OrganizationIdPage = () => {
  const [formData, setFormData] = useState({
    title: "",
  });

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = event.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const { toast } = useToast();

  const queryClient = useQueryClient();

  const { data} = useQuery<Board[], FetchError>({
    queryKey: ["check"],
    queryFn: () =>
      fetch("http://localhost:4000/api/boards/all").then((res) => res.json()),
  });

  const createMutation = useMutation<
    AxiosResponse,
    FetchError,
    React.FormEvent<HTMLFormElement>
  >({
    mutationFn: (event: React.FormEvent) => {
      event.preventDefault();

      return axios.post(
        "http://localhost:4000/api/boards/create",
        JSON.stringify(formData),
        {
          headers: {
            "Content-Type": "application/json",
          },
        },
      );
    },

    onSuccess: ({ data }) => {
      queryClient.invalidateQueries();

      setFormData({ title: "" });

      toast({
        description: `Board ${data.title} succesfully created`,
      });
    },

    onError: ({ message, response }) => {
      console.log(data);

      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: response.data.message,
      });
    },
  });

  const deleteMutation = useMutation<AxiosResponse, FetchError, number>({
    mutationFn: (boardId: number) => {
      return axios.delete(`http://localhost:4000/api/boards/${boardId}`);
    },

    onSuccess: ({ data }) => {
      queryClient.invalidateQueries();
      toast({
        description: `Board ${data.title} successfully deleted`,
      });
    },
    onError: ({ message }) => {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: message,
      });
    },
  });

  return (
    <div>
      <form onSubmit={createMutation.mutate}>
        <input
          id="title"
          name="title"
          required
          placeholder="Enter a board title"
          className="border-black border p-1"
          value={formData.title}
          onChange={handleInputChange}
        />
        <Button type="submit">{"Submit"}</Button>
      </form>

      {createMutation.isError && (
        <div>Error: {createMutation.error.message}</div>
      )}

      <div>
        {data?.map((board) => {
          return (
            <div key={board.id}>
              {board.title}{" "}
              <Button
                variant={"destructive"}
                onClick={() => deleteMutation.mutate(board.id)}
              >
                <Trash className="w-5 h-5" />
              </Button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default OrganizationIdPage;
