import React from "react";
import FileDeleteButton from "./FileDeleteButton";
import FileDownloadButton from "./FileDownloadButton";
import "./style.scss";

export default class End extends React.Component {
    render() {
        const originalname = this.props.originalname;
        const path = this.props.path;
        const isVisible = this.props.isVisible;

        return (
            <div
                className="end/file"
                style={{ display: isVisible ? "flex" : "none" }}
            >
                <FileDownloadButton originalname={originalname} path={path} />
                <FileDeleteButton originalname={originalname} path={path} />
            </div>
        );
    };
};

