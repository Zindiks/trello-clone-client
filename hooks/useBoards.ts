import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios, { AxiosResponse } from "axios";
import { useToast } from "@/components/ui/use-toast";

export interface ResponseBoard {
  id: string;
  title: string;
  org_id: string;

  image_id: string;
  image_thumb_url: string;
  image_full_url: string;
  image_link_html: string;
  image_username: string;

  created_at: string;
  updated_at: string;
}

export interface CreateBoard {
  title: string;
  org_id: string;
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

export const useBoards = (org_id:string) => {
  const queryClient = useQueryClient();

  const { toast } = useToast();

  const fetchBoards = async (org_id: string) => {
    try {
      const response = await axios.get(`http://localhost:4000/api/boards/all/${org_id}`);
      return response.data; // Получаем данные из response.data
    } catch (error) {
      throw new Error(`Error fetching boards: ${error}`);
    }
  };

  const boards = useQuery<
    ResponseBoard[],
    FetchError
  >({
    queryKey: ["boards",org_id],
    queryFn: () => fetchBoards(org_id),
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
    mutationFn: (board_id: string) => {
      return axios.delete(`http://localhost:4000/api/boards/${board_id}`);
    },
    onSuccess: ({ data }) => {

      console.log(data)

      queryClient.invalidateQueries({
        queryKey: ["board"],
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


