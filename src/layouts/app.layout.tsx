import { Header } from "@/components/app/header";
import { View } from "lucide-react";
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