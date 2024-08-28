import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios, { AxiosResponse } from "axios";
import { useToast } from "@/components/ui/use-toast";
import { auth } from "@clerk/nextjs/server";


export interface ResponseList {
  id: string;
  title: string;
  boardId: string;
  order: number;

  createdAt: string;
  updatedAt: string;
}

export interface CreateList {
  title: string;
  boardId: string;
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




export const useLists = (boardId:string) => {
  const queryClient = useQueryClient();

  const { toast } = useToast();

  const fetchLists = async (boardId: string) => {
    try {
      const response = await axios.get(`http://localhost:4000/api/lists/${boardId}`);
      return response.data; // Получаем данные из response.data
    } catch (error) {
      throw new Error(`Error fetching boards: ${error}`);
    }
  };

  const lists = useQuery<
    ResponseList[],
    FetchError
  >({
    queryKey: ["list",boardId],
    queryFn: () => fetchLists(boardId),
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

      console.log(data)
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


