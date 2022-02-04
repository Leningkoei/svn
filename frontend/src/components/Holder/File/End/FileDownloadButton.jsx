import axios from "axios";
import React from "react";
import { connect } from "react-redux";
import { DownloadOutlined } from "@ant-design/icons";

export default connect(
    () => ({}),
    { refreshRootDirectory: data => ({ type: "refreshRootDirectory", data })}
)(class FileDownloadButton extends React.Component {
    render() {
        const isHover = this.state.isHover;

        return (
            <span
                onMouseEnter={() => this.setState({ isHover: true })}
                onMouseLeave={() => this.setState({ isHover: false })}
            >
                <DownloadOutlined
                    onClick={this.downloadFile}
                    style={{
                        color: isHover ? "green" : "black",
                        fontSize: "24px"
                    }}
                />
            </span>
        );
    };

    state = { isHover: false };

    downloadFile = async () => {
        const path = this.props.path;
        const originalname = this.props.originalname;

        const res = await axios.get(
            "http://127.0.0.1:1024/server/download-file",
            { params: { name: "admin", originalname, path } }
        );

        this.props.refreshRootDirectory(res.data);
    };
});

