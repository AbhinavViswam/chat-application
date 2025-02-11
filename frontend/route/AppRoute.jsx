import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "../components/Login";
function AppRoute(){
    return(
        <BrowserRouter>
        <Routes>
            <Route path="/login" element={<Login/>}/>
            {/* <Route path="/login"/> */}
        </Routes>
        </BrowserRouter>
    )
}

export default AppRoute