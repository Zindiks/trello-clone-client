"use client";
import { onClose, onOpen } from "@/lib/store/slices/mobileSidebarSlice";
import { RootState } from "@/lib/store/store";
import { useDispatch, useSelector } from "react-redux";

export default function Page() {
  const count = useSelector((state: RootState) => state.mobileSidebar.value);

  const org = useSelector((state: RootState) => state.organization.org_id);

  console.log(org)
  const dispatch = useDispatch();
  return (
    <div>
      {" "}

      <p className={"text-9xl"}>{org}</p>
      <span className="text-9xl">{count ? "true" : "false"}</span>
      <button aria-label="Increment value" onClick={() => dispatch(onOpen())}>
        on open
      </button>
      <button aria-label="Increment value" onClick={() => dispatch(onClose())}>
        on close
      </button>
    </div>
  );
}
