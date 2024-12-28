import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { BackendURL } from "./component/backendURL";
import { Home } from "./pages/Home";
import { AppProvider } from "./store/appContext";
import { Navbar } from "./component/navbar";
import { Login } from "./pages/Login";
import { Signup } from "./pages/Signup";
import { UserInfo } from "./pages/UserInfo";

const Layout = () => {
    const basename = process.env.BASENAME || "";

    if (!process.env.BACKEND_URL || process.env.BACKEND_URL === "") return <BackendURL />;

    return (
        <div>
            <AppProvider>
                <Router basename={basename}>
                    <Navbar />
                    <Routes>
                        <Route element={<Home />} path="/" />
                        <Route element={<Login />} path="/api/login" />
                        <Route element={<Signup />} path="/api/signup" />
                        <Route element={<UserInfo />} path="/api/user" />
                        <Route element={<h1>Not found!</h1>} path="*" />
                    </Routes>
                </Router>
            </AppProvider>
        </div>
    );
};

export default Layout;
