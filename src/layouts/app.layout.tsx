import { Header } from "@/components/app/header";
import { Outlet } from "react-router";

export function AppLayout(){
  return(
    <div>
      <Header/>

      <div>
        <Outlet/>
      </div>
    </div>
  );

}