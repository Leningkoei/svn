import axios from "axios";
import React from "react";
import { connect } from "react-redux";
import { DeleteOutlined } from "@ant-design/icons";

export default connect(
    () => ({}),
    { refreshRootDirectory: data => ({ type: "refreshRootDirectory", data })}
)(class DirectoryDeleteButton extends React.Component {
    render() {
        const isHover = this.state.isHover;

        return (
            <span
                onMouseEnter={() => this.setState({ isHover: true })}
                onMouseLeave={() => this.setState({ isHover: false })}
                style={{ marginLeft: "8px" }}
            >
                <DeleteOutlined
                    onClick={this.deleteDirectory}
                    style={{
                        color: isHover ? "red" : "black",
                        fontSize: "24px"
                    }}
                />
            </span>
        );
    };

    state = { isHover: false };

    deleteDirectory = async () => {
        const path = this.props.path;

        const res = await axios.get(
            "http://127.0.0.1:1024/server/delete-directory",
            { params: { name: "admin", path } }
        );

        this.props.refreshRootDirectory(res.data);
    };
});

