import React from "react";
import { connect } from "react-redux";
import style from "./style.scss";

export default connect(
    state => ({ API: state.API }),
    { refreshRootDirectory: data => ({ type: "refreshRootDirectory", data }) }
)(class User extends React.Component {
    render() {
        return (
            <div className={style["user"]}>
                <h1>Hello</h1>
            </div>
        );
    };
});

