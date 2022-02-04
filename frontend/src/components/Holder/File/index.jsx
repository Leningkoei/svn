import React from "react";
import { FileOutlined } from "@ant-design/icons";
import End from "./End";
import "./style.scss";

export default class File extends React.Component {
    render() {
        const originalname = this.props.originalname;
        const path = this.props.path;

        const isHover = this.state.isHover;

        return (
            <div
                className="file"
                onMouseEnter={() => this.setState({ isHover: true })}
                onMouseLeave={() => this.setState({ isHover: false })}
                style={{ backgroundColor: isHover ? "#dddddd" : "#ffffff" }}
            >
                <div className="start/file">
                    <span className="icon"><FileOutlined /></span>
                    <span>{originalname}</span>
                </div>
                <End
                    originalname={originalname}
                    path={path}
                    isVisible={isHover}
                />
            </div>
        );
    };

    state = { isHover: false };
};

