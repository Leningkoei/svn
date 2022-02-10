import React from "react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import Main from "../pages/Main";
import SignIn from "../pages/SignIn";
import SignUp from "../pages/SignUp";
import style from "./style.scss";

export default class App extends React.Component {
    render() {
        const token = localStorage.getItem("token");

        return (
            <div className={style["app"]}>
                <BrowserRouter>
                    <Switch>
                        <Route path="/404" component={NotFound} />
                        <Route path="/main" component={Main} />
                        <Route path="/sign-in" component={SignIn} />
                        <Route path="/sign-up" component={SignUp} />
                        <Redirect
                            to={location.href[location.href.length - 1] == "/"
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

