import axios from "axios";
import React from "react";
import { connect } from "react-redux";
import { Input, Modal } from "antd";
import {
    DownOutlined,
    FileAddOutlined,
    FolderAddOutlined,
    FolderOpenOutlined,
    FolderOutlined,
    RightOutlined
} from "@ant-design/icons";
import File from "../File";
import "./style.scss";

const Directory = connect(
    () => ({}),
    {
        refreshRootDirectory: data => ({ type: "refreshRootDirectory", data })
    }
)(class extends React.Component {
     render() {
        const children = this.props.children;
        const fold = this.props.fold;
        const path = this.props.path;

        const name = path[path.length - 1];

        const isModalVisible = this.state.isModalVisible;
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
                            <FolderAddOutlined
                                style={{ fontSize: "30px" }}
                                onClick={this.openModal}
                            />
                            <Modal
                                visible={isModalVisible}
                                onOk={this.createDirectory}
                                onCancel={this.closeModal}
                            >
                                <Input
                                    placeholder="Directory Name"
                                    onChange={event => this.dirname =
                                        event.target.value}
                                />
                            </Modal>
                            {/* #region AMAZING!!! */}
                            <label htmlFor="file-uploader">
                                <FileAddOutlined style={{ fontSize: "24px" }} />
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
        mouse: false,
        isModalVisible: false
    };

    dirname = "";

    changeFold = async () => {
        try {
            const res = await axios.get(
                "http://127.0.0.1:1024/server/change-fold",
                { params: { name: "admin" } }
            );

            this.props.refreshRootDirectory(res.data);
        } catch (err) {
            alert(err);
        };
    };
    closeModal = () => this.setState({ isModalVisible: false });
    createDirectory = async () => {
        const path = this.props.path;
        const dirname = this.dirname;

        path.push(dirname);
        this.dirname = "";
        this.closeModal();

        try {
            const res = await axios.get(
                "http://127.0.0.1:1024/server/create-directory",
                { params: { name: "admin", dirname, path } }
            );

            this.props.refreshRootDirectory(res.data);
        } catch (err) {
            alert(err);
        };
    };
    handleMouse = mouse => () => this.setState({mouse});
    openModal = () => this.setState({ isModalVisible: true });
    uploadFile = async () => {
        try {
            const res = await axios.get(
                "http://127.0.0.1:1024/server/upload-file",
                { params: { name: "admin" } }
            );

            this.props.refreshRootDirectory(res.data);
        } catch (err) {
            alert(err);
        };
    };
});

export default Directory;

