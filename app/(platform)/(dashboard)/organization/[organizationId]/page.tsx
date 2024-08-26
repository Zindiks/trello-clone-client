"use client"
import BoardList from "./_components/BoardList";
import { useAuth,} from "@clerk/nextjs";

const OrganizationIdPage = () => {

  // const {isLoaded, userId, orgId} = useAuth()
  

  // if(!isLoaded){
  //   return (<div>Loading...</div>)
  // }


      // console.log(userId);
      // console.log(orgId);

  


  return (
    <div className="w-full">
      {/* <BoardForm /> */}
      <BoardList />
    </div>
  );
};

export default OrganizationIdPage;
