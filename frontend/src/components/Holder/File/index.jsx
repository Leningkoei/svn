import React from "react";
import { FileOutlined } from "@ant-design/icons";
import "./style.scss";

export default class File extends React.Component {
    render() {
        const path = this.props.path;
        const name = path[path.length - 1];

        return (
            <div className="file">
                <span className="icon"><FileOutlined /></span>
                <span>{name}</span>
            </div>
        );
    };
};

