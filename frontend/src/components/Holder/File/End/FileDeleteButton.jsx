import axios from "axios";
import React from "react";
import { connect } from "react-redux";
import { DeleteOutlined } from "@ant-design/icons";

export default connect(
    state => ({ API: state.API }),
    { refreshRootDirectory: data => ({ type: "refreshRootDirectory", data })}
)(class FileDeleteButton extends React.Component {
    render() {
        const isHover = this.state.isHover;

        return (
            <span
                onMouseEnter={() => this.setState({ isHover: true })}
                onMouseLeave={() => this.setState({ isHover: false })}
                style={{ marginLeft: "8px" }}
            >
                <DeleteOutlined
                    onClick={this.deleteFile}
                    style={{
                        color: isHover ? "red" : "black",
                        fontSize: "24px"
                    }}
                />
            </span>
        );
    };

    state = { isHover: false };

    deleteFile = async () => {
        const method = this.props.API.deleteFile;

        const path = this.props.path;
        const originalname = this.props.originalname;

        try {
            const res = await method({ originalname, path });

            this.props.refreshRootDirectory(res.data);
        } catch (err) {
            alert(err);
        };
    };
});

