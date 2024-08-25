import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios, { AxiosResponse } from "axios";
import { useToast } from "@/components/ui/use-toast";

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

export const useBoards = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const fetchBoards = () =>
    fetch("http://localhost:4000/api/boards/all").then((res) => res.json());

  const { data, error, isError, isLoading } = useQuery<Board[], FetchError>({
    queryKey: ["boards"],
    queryFn: fetchBoards,
  });

  const createBoard = useMutation<AxiosResponse, FetchError, { title: string }>(
    {
      mutationFn: (formData) =>
        axios.post(
          "http://localhost:4000/api/boards/create",
          JSON.stringify(formData),
          {
            headers: {
              "Content-Type": "application/json",
            },
          },
        ),
      onSuccess: ({ data }) => {
        queryClient.invalidateQueries({
          queryKey: ["boards"],
        });
        toast({
          description: `Board ${data.title} successfully created`,
        });
      },
      onError: ({ response }) => {
        toast({
          variant: "destructive",
          title: "Uh oh! Something went wrong.",
          description: response.data.message,
        });
      },
    },
  );

  const deleteBoard = useMutation<AxiosResponse, FetchError, number>({
    mutationFn: (boardId: number) => {
      return axios.delete(`http://localhost:4000/api/boards/${boardId}`);
    },
    onSuccess: ({ data }) => {
      queryClient.invalidateQueries({
        queryKey: ["boards"],
      });
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

  return {
    data,
    error,
    isError,
    isLoading,
    createBoard,
    deleteBoard,
  };
};
