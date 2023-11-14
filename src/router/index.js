import React from "react";
import { Route, Routes, BrowserRouter } from "react-router-dom";

import SignUpScene from "../pages/auth/LoginScene";
import LoginScene from "../pages/auth/LoginScene";
import MainScene from "../pages/main/MainScene";
import AdminScene from "../pages/main/AdminScene";
import TVScene from "../pages/main/TVScene";

export default function Router() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<LoginScene />}></Route>
                <Route path="/main" element={<MainScene />}></Route>
                <Route path="/admin" element={<AdminScene />}></Route>
                {/* <Route path="/tv_show" element={<TVScene />}></Route> */}
                <Route path="/tv_show/:handle" element={<TVScene />}></Route>
            </Routes>
        </BrowserRouter>
    )
}