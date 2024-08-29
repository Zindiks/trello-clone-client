"use client";

import { useOrganizationList } from "@clerk/nextjs";
import { useParams } from "next/navigation";
import { useEffect } from "react";

export default function OrgContol() {
  const params = useParams();

  const { setActive } = useOrganizationList();

  useEffect(() => {
    if (!setActive) return;

    setActive({
      organization: params.org_id as string,
    });
  }, [setActive, params.org_id]);

  return null;
}
