import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios, { AxiosResponse } from "axios";
import { useToast } from "@/components/ui/use-toast";
import { auth } from "@clerk/nextjs/server";

export interface ResponseBoard {
  id: string;
  title: string;

  imageId: string;
  imageThumbUrl: string;
  imageFullUrl: string;
  imageLinkHTML: string;
  imageUserName: string;
}

export interface CreateBoard {
  title: string;
  orgId: string;
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

  const { data, error, isError, isLoading } = useQuery<
    ResponseBoard[],
    FetchError
  >({
    queryKey: ["boards"],
    queryFn: fetchBoards,
  });

  const createBoard = useMutation<AxiosResponse, FetchError, CreateBoard>({
    mutationFn: (formData) => {
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

      console.log(data)
      queryClient.invalidateQueries({
        queryKey: ["boards"],
      });
      toast({
        description: `Board ${data.title} successfully created`,
      });
    },
    onError: ({ response }) => {
      console.log(response)

      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: response.data.message,
      });
    },
  });

  const deleteBoard = useMutation<AxiosResponse, FetchError, string>({
    mutationFn: (boardId: string) => {
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
