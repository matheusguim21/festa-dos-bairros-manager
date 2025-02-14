
import {Routes, Route, BrowserRouter} from "react-router"
import { Dashboard } from "./pages/dashboard"

export function AppRoutes (){

  return(


    <BrowserRouter>
    
      <Routes>
        <Route path="/" element={<Dashboard/>}/>

        


      </Routes>
    
    </BrowserRouter>
  )

}