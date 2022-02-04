import React from "react";
import File from "../File";
import Content from "./Content";
import Title from "./Title";
import "./style.scss";

export default class Directory extends React.Component {
     render() {
        const children = this.props.children;
        const fold = this.props.fold;
        const path = this.props.path;
        const name = this.props.name;

        const mouse = this.state.mouse;

        return (
            <div
                className="directory"
            >
                <Title
                    name={name}
                    fold={fold}
                    path={path}
                    mouse={mouse}
                    handleMouse={this.handleMouse}
                />
                <Content
                    isVisible={fold || !children ? false : true}
                    children={children}
                    mouse={mouse}
                    handleMouse={this.handleMouse}
                />
            </div>
        );
    };

    state = {
        mouse: false
    };

    map = {
        directory: child => <Directory key={child.name} {...child} />,
        file: child => <File key={child.name} {...child} />
    };

    handleMouse = mouse => () => this.setState({mouse});
};

