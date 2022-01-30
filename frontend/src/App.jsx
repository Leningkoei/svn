import React from "react";
import { Link, Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import Main from "./components/Main";
import "./style.scss";

export default class App extends React.Component {
    render() {
        return (
            <div className="app">
                <Routes>
                    <Route path="login" element={<Login />} />
                    <Route path="main" element={<Main />} />
                    <Route path="/" element={<Main />} />
                </Routes>
            </div>
        );
    };
};

