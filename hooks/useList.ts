import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios, { AxiosResponse } from "axios";
import { useToast } from "@/components/ui/use-toast";

export interface ResponseList {
  id: string;
  title: string;
  board_id: string;
  order: number;

  created_at: string;
  updated_at: string;
}

export interface CreateList {
  title: string;
  board_id: string;
}

// export interface UpdateBoardTitle {
//   id: string;
//   title: string;
// }

export interface FetchError {
  message: string;
  response: {
    data: {
      message: string;
    };
  };
}




export const useLists = (board_id:string) => {
  const queryClient = useQueryClient();

  const { toast } = useToast();

  const fetchLists = async (board_id: string) => {
    try {
      const response = await axios.get(`http://localhost:4000/api/lists/${board_id}`);
      return response.data; // Получаем данные из response.data
    } catch (error) {
      throw new Error(`Error fetching boards: ${error}`);
    }
  };

  const lists = useQuery<
    ResponseList[],
    FetchError
  >({
    queryKey: ["lists",board_id],
    queryFn: () => fetchLists(board_id),
  });



  const createList = useMutation<AxiosResponse, FetchError, CreateList>({
    mutationFn: (formData) => {
      return axios.post(
        "http://localhost:4000/api/lists/create",
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
        queryKey: ["list"],
      });
      toast({
        description: `List ${data.title} successfully created`,
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

  // const deleteBoard = useMutation<AxiosResponse, FetchError, string>({
  //   mutationFn: (boardId: string) => {
  //     return axios.delete(`http://localhost:4000/api/boards/${boardId}`);
  //   },
  //   onSuccess: ({ data }) => {
  //     queryClient.invalidateQueries({
  //       queryKey: ["boards"],
  //     });
  //     toast({
  //       description: `Board ${data.title} successfully deleted`,
  //     });

  //   },
  //   onError: ({ message }) => {
  //     toast({
  //       variant: "destructive",
  //       title: "Uh oh! Something went wrong.",
  //       description: message,
  //     });
  //   },
  // });

  // const updateBoardTitle = useMutation<AxiosResponse, FetchError, UpdateBoardTitle>({
  //   mutationFn: (formData) => {


  //     console.log(formData);
  //     return axios.patch(
  //       "http://localhost:4000/api/boards/update",
  //       JSON.stringify(formData),
  //       {
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //       },
  //     );
  //   },
  //   onSuccess: () => {
  //     queryClient.invalidateQueries({
  //       queryKey: ["board"],
  //     });
  //     toast({
  //       description:  `Board title has been changed`,
  //     });
  //   },
  //   onError: ({ response }) => {
  //     toast({
  //       variant: "destructive",
  //       title: "Uh oh! Something went wrong.",
  //       description: response.data.message,
  //     });
  //   },
  // });


  return {
    lists,
    createList

  };
};


// data,
//   error,
//   isError,
//   isLoading,


