import React from "react";
import { FileOutlined } from "@ant-design/icons";
import "./style.scss";

export default class File extends React.Component {
    render() {
        const name = this.props.originalname;
        const path = this.props.path;

        return (
            <div className="file">
                <span className="icon"><FileOutlined /></span>
                <span>{name}</span>
            </div>
        );
    };
};

