import { nanoid } from "nanoid";
import React from "react";
import { connect } from "react-redux";
import {
    DownOutlined,
    FileAddOutlined,
    FolderAddOutlined,
    FolderOpenOutlined,
    FolderOutlined,
    RightOutlined
} from "@ant-design/icons";
import File from "../File";
import {
    changeFold,
    createDirectory,
    uploadFile
} from "../../redux/actions/directory.js";
import "./style.scss";

const Directory = connect(
    () => ({}),
    {
        changeFold,
        createDirectory,
        uploadFile
    }
)(class extends React.Component {
     render() {
        const path = this.props.path;
        const name = path[path.length - 1];
        const children = this.props.children;
        const fold = this.props.fold;
        const mouse = this.state.mouse;

        return (
            <div
                className="directory"
            >
                <div
                    className="title"
                    onMouseEnter={this.handleMouse(true)}
                    onMouseLeave={this.handleMouse(false)}
                    style={{backgroundColor: mouse ? "#dddddd" : "#ffffff"}}
                >
                    <div className="start">
                        <span className="fold-button" onClick={this.changeFold}>
                            {
                                fold ? <RightOutlined /> : <DownOutlined />
                            }
                        </span>
                        <span className="icon">
                            {fold ? <FolderOutlined /> : <FolderOpenOutlined />}
                        </span>
                        <span>{name}</span>
                    </div>
                    {mouse ? (
                        <div className="end">
                            <FolderAddOutlined onClick={this.createDirectory} />
                            {/* #region AMAZING!!! */}
                            <label htmlFor="file-uploader">
                                <FileAddOutlined />
                            </label>
                            <input
                                id="file-uploader"
                                type="file"
                                onChange={this.uploadFile}
                                style={{display: "none"}}
                            />
                            {/* #endregion */}
                        </div>
                    ) : <></>}
                </div>
                {fold || !children.length ? <></> : (
                    <div className="content">
                        <hr />
                        <div className="children">
                            {children.map(child => ({
                                directory: (
                                    <Directory
                                        key={child.id}
                                        {...child}
                                    />
                                ),
                                file: <File key={child.id} {...child} />
                            }[child.type]))}
                        </div>
                    </div>
                )}
            </div>
        );
    };

    state = {
        mouse: false
    };

    changeFold = () => {
        this.props.changeFold([ ...this.props.path ]);
    };
    createDirectory = () => {
        this.props.createDirectory([ ...this.props.path ]);
    };
    uploadFile = () => {
        this.props.uploadFile([ ...this.props.path ]);
    };
    handleMouse = mouse => () => this.setState({mouse});
});

export default Directory;

