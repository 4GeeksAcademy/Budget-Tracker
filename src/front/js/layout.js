import React, { useContext, useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Context } from "./store/appContext"; // Import the context
import ScrollToTop from "./component/scrollToTop";
import { BackendURL } from "./component/backendURL";
import { Home } from "./pages/home";
import { Login } from "./pages/login";
import { Signup } from "./pages/signup";
import { Dashboard } from "./pages/dashboard";
import { Accounts } from "./pages/accounts";
import { Settings } from './pages/settings'
import injectContext from "./store/appContext";
import { Navbar } from "./component/navbar";
import "../styles/DarkMode.css";
import { Feedback } from './pages/feedback';
import AccountView from "./pages/accountView";
import Budgets from "./pages/budgets";

const Layout = () => {
    const { store } = useContext(Context); // Use the context to access the store

    useEffect(() => {
        // Toggle the 'dark-mode' class on the body element based on the isDarkMode state
        document.body.classList.toggle('dark-mode', store.isDarkMode);
    }, [store.isDarkMode]);

    const basename = process.env.BASENAME || "";

    if(!process.env.BACKEND_URL || process.env.BACKEND_URL == "") return <BackendURL />;

    return (
        <div>
            <BrowserRouter basename={basename}>
                <ScrollToTop>
                    <Routes>
                        <Route element={<div className="animated_gradient"><Login /></div>} path="/" />
                        <Route element={<div className="animated_gradient"><Login /></div>} path="/login/" />
                        <Route element={<div className="animated_gradient"><Signup /></div>} path="/signup/" />
                        <Route element={<Dashboard />} path="/dashboard/" />
                        <Route element={<Accounts />} path="/accounts/" />
                        <Route element={<AccountView />} path="/accounts/:accountId" />
                        <Route element={<Settings />} path="/settings/" />
                        <Route element={<Feedback />} path="/feedback/" />
                        <Route element={<Budgets />} path="/budgets/" />
                    </Routes>
                 </ScrollToTop>
            </BrowserRouter>
        </div>
    );
};

export default injectContext(Layout);
