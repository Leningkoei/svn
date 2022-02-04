import React from "react";
import End from "./End";
import Start from "./Start";
import "./style.scss";

export default class Title extends React.Component {
    render() {
        const name = this.props.name;
        const fold = this.props.fold;
        const path = this.props.path;
        const mouse = this.props.mouse;
        const handleMouse = this.props.handleMouse;

        return (
            <div
                className="title"
                style={{ backgroundColor: mouse ? "#dddddd" : "#ffffff" }}
                onMouseEnter={handleMouse(true)}
                onMouseLeave={handleMouse(false)}
            >
                <Start name={name} fold={fold} path={path} />
                <End isVisible={mouse} path={path} />
            </div>
        );
    };
};

