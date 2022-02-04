import React from "react";
import Directory from "../../Directory";
import File from "../../File";
import "./style.scss";

export default class Content extends React.Component {
    render() {
        const isVisible = this.props.isVisible;
        const children = this.props.children;
        const mouse = this.props.mouse;
        const handleMouse = this.props.handleMouse;

        return (
            <div
                className="content"
                style={{ display: isVisible ? "flex" : "none" }}
            >
                <div
                    onMouseEnter={handleMouse(true)}
                    onMouseLeave={handleMouse(false)}
                    style={{ backgroundColor: mouse ? "#dddddd" : "#ffffff" }}
                >
                    <hr />
                </div>
                <div className="children">
                    {children.map(child => this.map[child.type](child))}
                </div>
            </div>
        );
    };

    map = {
        directory: child => <Directory key={child.name} { ...child } />,
        file: child => <File key={child.originalname} { ...child } />
    };
};

