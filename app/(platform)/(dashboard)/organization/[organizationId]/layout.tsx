import {startCase} from "lodash";

import OrgControl from "./_components/OrgControl";
import { auth } from "@clerk/nextjs/server";


export async function generateMetadata(){
  const {orgSlug} = auth()
  return {
    title:startCase(orgSlug || "organization"),
  }
}


export default function OrganizationIdLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {/* Organization Control */}

      <OrgControl />

      {children}
    </>
  );
}
