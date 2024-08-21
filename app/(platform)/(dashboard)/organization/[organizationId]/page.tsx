"use client"

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import axios from "axios"

import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"

const OrganizationIdPage = () => {
  const { toast } = useToast()

  const queryClient = useQueryClient()

  const { data, isLoading, error } = useQuery({
    queryKey: ["check"],
    queryFn: () =>
      fetch("http://localhost:4000/api/boards/all").then((res) => res.json()),
  })

  const mutation = useMutation({
    mutationFn: (event) => {
      event.preventDefault()

      const formData = {
        title: event.target.title.value,
      }

      return axios.post(
        "http://localhost:4000/api/boards/create",
        JSON.stringify(formData),
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
    },

    onSuccess: () => {
      queryClient.invalidateQueries(["check"])

      toast({
        description: "Board succesfully created",
      })
    },
  })

  return (
    <div>
      <form onSubmit={mutation.mutate}>
        <input
          id="title"
          name="title"
          required
          placeholder="Enter a board title"
          className="border-black border p-1"
        />
        <button type="submit" disabled={mutation.isLoading}>
          {mutation.isLoading ? "Submitting..." : "Submit"}
        </button>
      </form>

      {mutation.isError && <div>Error: {mutation.error.message}</div>}

      <div>
        {data?.map((board) => {
          return <div key={board.id}>{board.title}</div>
        })}
      </div>
    </div>
  )
}

export default OrganizationIdPage
