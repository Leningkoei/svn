import axios from "axios";
import React from "react";
import { connect } from "react-redux";
import {
    DownOutlined,
    FolderOutlined,
    FolderOpenOutlined,
    RightOutlined
} from "@ant-design/icons";
import "./style.scss";

export default connect(
    () => ({}),
    {
        refreshRootDirectory: data => ({ type: "refreshRootDirectory", data })
    }
)(class Start extends React.Component {
    render() {
        const fold = this.props.fold;

        return (
            <div className="start">
                <span className="fold-button" onClick={this.changeFold}>
                    {fold ? <RightOutlined /> : <DownOutlined />}
                </span>
                <span className="icon">
                    {fold ? <FolderOutlined /> : <FolderOpenOutlined />}
                </span>
                <span>{this.props.name}</span>
            </div>
        );
    };

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
});

