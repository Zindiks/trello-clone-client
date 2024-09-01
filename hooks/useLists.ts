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

export interface UpdateListTitle {
  id: string;
  title: string;
  board_id: string;
}

export interface DeleteList {
  id: string;
  board_id: string;
}

export interface CopyList {
  id: string;
  board_id: string;
}

export interface FetchError {
  message: string;
  response: {
    data: {
      message: string;
    };
  };
}

export const useLists = (board_id: string) => {
  const queryClient = useQueryClient();

  const { toast } = useToast();

  const fetchLists = async (board_id: string) => {
    try {
      const response = await axios.get(
        `http://localhost:4000/api/lists/${board_id}`,
      );
      return response.data; // Получаем данные из response.data
    } catch (error) {
      throw new Error(`Error fetching boards: ${error}`);
    }
  };

  const lists = useQuery<ResponseList[], FetchError>({
    queryKey: ["lists", board_id],
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
      console.log(response);

      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: response.data.message,
      });
    },
  });

  const copyList = useMutation<AxiosResponse, FetchError, CopyList>({
    mutationFn: (formData) => {
      return axios.post(
        "http://localhost:4000/api/lists/copy",
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
      console.log(response);

      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: response.data.message,
      });
    },
  });

  const updateListTitle = useMutation<
    AxiosResponse,
    FetchError,
    UpdateListTitle
  >({
    mutationFn: (formData) => {
      return axios.patch(
        "http://localhost:4000/api/lists/update",
        JSON.stringify(formData),
        {
          headers: {
            "Content-Type": "application/json",
          },
        },
      );
    },
    onSuccess: () => {
      // queryClient.invalidateQueries();
      toast({
        description: `List title has been changed`,
        duration: 1000,
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


  // TODO: Replace temporary Type any
  const updateListsOrder = useMutation<AxiosResponse, FetchError, any>({
    mutationFn: ([formData, board_id]) => {
      return axios.put(
        "http://localhost:4000/api/lists/order/" + board_id,
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
        queryKey: ["list"],
      });
      toast({
        description: `lists succesfully reordered`,
        duration: 1000,
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

  const deleteList = useMutation<AxiosResponse, FetchError, DeleteList>({
    mutationFn: ({ id, board_id }) => {
      return axios.delete(
        `http://localhost:4000/api/lists/${id}/board/${board_id}`,
      );
    },
    onSuccess: ({ data }) => {
      queryClient.invalidateQueries({
        queryKey: ["list"],
      });
      toast({
        description: `List ${data.title} successfully deleted`,
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
    lists,
    createList,
    deleteList,
    copyList,
    updateListTitle,
    updateListsOrder,
  };
};
