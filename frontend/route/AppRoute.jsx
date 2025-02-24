import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "../components/Login";
import Register from "../components/Register";
import Home from "../components/Home";
import UserAuth from "../auth/UserAuth";

function AppRoute(){
    return(
        <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <Routes>
            <Route path="/login" element={<Login/>}/>
            <Route path="/register" element={<Register/>}/>
            <Route path="/" element={<UserAuth><Home/></UserAuth>}/>
        </Routes>
        </BrowserRouter>
    )
}

export default AppRoute