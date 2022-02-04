import axios from "axios";
import React from "react";
import { connect } from "react-redux";
import { DownloadOutlined } from "@ant-design/icons";

export default connect(
    () => ({}),
    { refreshRootDirectory: data => ({ type: "refreshRootDirectory", data })}
)(class FileDownloadButton extends React.Component {
    constructor(props) {
        super(props);

        const name = "admin";
        const originalname = props.originalname;
        const path = props.path;

        this.url = "http://127.0.0.1:1024/server/download-file";
        this.url += `?name=${name}&originalname=${originalname}`;

        for (let i = 0; i < path.length; i++) {
            this.url += `&path[]=${path[i]}`;
        };
    };

    url = "";

    render() {
        const isHover = this.state.isHover;

        return (
            <a
                href={this.url}
                onMouseEnter={() => this.setState({ isHover: true })}
                onMouseLeave={() => this.setState({ isHover: false })}
            >
                <DownloadOutlined
                    style={{
                        color: isHover ? "green" : "black",
                        fontSize: "24px"
                    }}
                />
            </a>
        );
    };

    state = { isHover: false };

    // downloadFile = async () => {
    //     const path = this.props.path;
    //     const originalname = this.props.originalname;

    //     const res = await axios.get(
    //         "http://127.0.0.1:1024/server/download-file",
    //         { params: { name: "admin", originalname, path } }
    //     );
    // };
});

