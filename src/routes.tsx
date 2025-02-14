
import {Routes, Route, BrowserRouter} from "react-router"
import { Dashboard } from "./pages/dashboard"
import { AppLayout } from "./layouts/app.layout"
import { Stock } from "./pages/stock"

export function AppRoutes (){

  return(


    <BrowserRouter>
    
      <Routes>
        <Route path="/" element={<AppLayout/>}>
          <Route index element={<Dashboard/>} />
          <Route path="estoque" element={<Stock/>}/>
        </Route>

        


      </Routes>
    
    </BrowserRouter>
  )

}