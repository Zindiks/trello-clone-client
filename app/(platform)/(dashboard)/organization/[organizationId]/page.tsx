"use client";
import BoardList from "./_components/BoardList";
import { useAuth } from "@clerk/nextjs";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/lib/store/store";
import { Suspense, useEffect } from "react";
import { changeOrg } from "@/lib/store/slices/currentOrgSlice";

const OrganizationIdPage = () => {
  const { isLoaded, userId, orgId } = useAuth();

  const dispatch = useDispatch();
  const org = useSelector((state: RootState) => state.organization.orgId);

  useEffect(() => {
    if (orgId !== undefined && orgId !== null) {
      dispatch(changeOrg(orgId));
    }
  }, [orgId, dispatch]); // Добавляем dispatch в зависимости

  if (!isLoaded) {
    return <BoardList.Skeleton />;
  }


  return (
    <div className="w-full">

      <Suspense fallback={<BoardList.Skeleton />}>

        <BoardList />

      </Suspense>
    </div>
  );
};

export default OrganizationIdPage;
