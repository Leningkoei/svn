import React from "react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import Main from "../pages/Main";
import SignIn from "../pages/SignIn";
import SignUp from "../pages/SignUp";
import "./style.scss";

export default class App extends React.Component {
    render() {
        const token = localStorage.getItem("token");
        console.log(location.href);

        return (
            <div className="app">
                <BrowserRouter>
                    <Switch>
                        <Route path="/404" component={NotFound} />
                        <Route path="/main" component={Main} />
                        <Route path="/sign-in" component={SignIn} />
                        <Route path="/sign-up" component={SignUp} />
                        <Redirect
                            to={location.href.length == 22
                                ? token ? "/main" : "/sign-in" : "/404"}
                        />
                    </Switch>
                </BrowserRouter>
            </div>
        );
    };
};

class NotFound extends React.Component {
    render() {
        return <h1>Not Found</h1>;
    };
};

