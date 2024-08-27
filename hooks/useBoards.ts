import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios, { AxiosResponse } from "axios";
import { useToast } from "@/components/ui/use-toast";
import { auth } from "@clerk/nextjs/server";

export interface ResponseBoard {
  id: string;
  title: string;
  orgId: string;

  imageId: string;
  imageThumbUrl: string;
  imageFullUrl: string;
  imageLinkHTML: string;
  imageUserName: string;

  createdAt: string;
  updatedAt: string;
}

export interface CreateBoard {
  title: string;
  orgId: string;
}

export interface UpdateBoardTitle {
  id: string;
  title: string;
}

export interface FetchError {
  message: string;
  response: {
    data: {
      message: string;
    };
  };
}

export const useBoards = (orgId:string) => {
  const queryClient = useQueryClient();

  const { toast } = useToast();

  const fetchBoards = async (orgId: string) => {
    try {
      const response = await axios.get(`http://localhost:4000/api/boards/all/${orgId}`);
      return response.data; // Получаем данные из response.data
    } catch (error) {
      throw new Error(`Error fetching boards: ${error}`);
    }
  };

  const boards = useQuery<
    ResponseBoard[],
    FetchError
  >({
    queryKey: ["boards",orgId],
    queryFn: () => fetchBoards(orgId),
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

  const updateBoardTitle = useMutation<AxiosResponse, FetchError, UpdateBoardTitle>({
    mutationFn: (formData) => {


      console.log(formData);
      return axios.patch(
        "http://localhost:4000/api/boards/update",
        JSON.stringify(formData),
        {
          headers: {
            "Content-Type": "application/json",
          },
        },
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["board"],
      });
      toast({
        description:  `Board title has been changed`,
      });
    },
    onError: ({ response }) => {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: response.data.message,
      });
    },
  });


  return {
    boards,
    createBoard,
    deleteBoard,
    updateBoardTitle,
  };
};


// data,
//   error,
//   isError,
//   isLoading,


