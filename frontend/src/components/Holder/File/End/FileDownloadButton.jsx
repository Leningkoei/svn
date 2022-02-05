import React from "react";
import { connect } from "react-redux";
import { DownloadOutlined } from "@ant-design/icons";

export default connect(
    state => ({ API: state.API }),
    {}
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

    downloadFile = () => {
        const method = this.props.API.downloadFile;

        const origialname = this.props.originalname;
        const path = this.props.path;

        method(originalname, path);
    };
});

