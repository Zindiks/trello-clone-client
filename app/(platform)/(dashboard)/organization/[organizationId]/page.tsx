"use client"
import { OrganizationSwitcher } from "@clerk/nextjs"

import { useMutation, useQuery } from "@tanstack/react-query"

const OrganizationIdPage = () => {


  const { data } = useQuery({
    queryKey: ["messages"],
    queryFn: () => fetch("http://localhost:4000/healthcheck").then((res) => res.json()),
  })

  




  return (
    <div>
      <form>
        <input
          id="title"
          name="title"
          required
          placeholder="enter a board title"
          className="border-black border p-1"
        />
      </form>
    </div>
  )
}

export default OrganizationIdPage
