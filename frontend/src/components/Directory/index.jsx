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
                            {fold ? <RightOutlined /> : <DownOutlined />}
                        </span>
                        <span className="icon">
                            {fold ? <FolderOutlined /> : <FolderOpenOutlined />}
                        </span>
                        <span>{name}</span>
                    </div>
                    {mouse ? (
                        <div className="end">
                            <FolderAddOutlined
                                onClick={this.openModal}
                                style={{ fontSize: "30px" }}
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
                        <div
                            onClick={this.changeFold}
                            onMouseEnter={this.handleMouse(true)}
                            onMouseLeave={this.handleMouse(false)}
                            style={{
                                backgroundColor: mouse ? "#dddddd" : "#ffffff"
                            }}
                        >
                            <hr />
                        </div>
                        <div className="children">
                            {children.map(child => this.map[child.type](child))}
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
    map = {
        directory: child => <Directory key={child.name} {...child} />,
        file: child => <File key={child.name} {...child} />
    };

    closeModal = () => this.setState({ isModalVisible: false });
    handleMouse = mouse => () => this.setState({mouse});
    openModal = () => this.setState({ isModalVisible: true });

    changeFold = async () => {
        const path = this.props.path;

        try {
            const res = await axios.get(
                "http://127.0.0.1:1024/server/change-fold",
                { params: { name: "admin", path } }
            );

            this.props.refreshRootDirectory(res.data);
        } catch (err) {
            alert(err);
        };
    };
    createDirectory = async () => {
        const path = this.props.path;
        const dirname = this.dirname;

        path.push(dirname);

        try {
            const task = axios.get(
                "http://127.0.0.1:1024/server/create-directory",
                { params: { name: "admin", dirname, path } }
            );

            this.dirname = "";
            this.closeModal();

            const res = await task;

            this.props.refreshRootDirectory(res.data);
        } catch (err) {
            alert(err);
        };
    };
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

