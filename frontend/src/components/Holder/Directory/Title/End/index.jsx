import { Input, Modal } from "antd";
import axios from "axios";
import React from "react";
import { FileAddOutlined } from "@ant-design/icons";
import DirectoryDeleteButton from "./DirectoryDeleteButton";
import FileAddButton from "./FileAddButton";
import FolderAddButton from "./FolderAddButton";
import style from "./style.scss";

export default class End extends React.Component {
    render() {
        const isVisible = this.props.isVisible;
        const path = this.props.path;

        return (
            <div
                className={style["end"]}
                style={{ display: isVisible ? "flex" : "none" }}
            >
                <FolderAddButton path={path} />
                <FileAddButton path={path} />
                <DirectoryDeleteButton path={path} />
            </div>
        );
    };
};

