import { Button } from "@/components/ui/button";
import Link from "next/link";

export const Footer = () => {
  return (
    <div className="fixed bottom-0  p-4 w-full px-4 border-t  bg-slate-100">
      <div className="mx-auto flex items-center w-full justify-between">
        <div className="flex selection:justify-between w-full">
          <Button size={"sm"} variant={"ghost"}>
            Privacy policy
          </Button>
          <Button size={"sm"} variant={"ghost"}>
            Terms of Service
          </Button>
        </div>
      </div>
    </div>
  );
};
