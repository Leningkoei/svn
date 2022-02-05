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
    state => ({ API: state.API }),
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
        const method = this.props.API.changeFold;

        const path = this.props.path;

        try {
            const res = await method({ path });

            this.props.refreshRootDirectory(res.data);
        } catch (err) {
            alert(err);
        };
    };
});

