import React from "react";
import { connect } from "react-redux";
import { DeleteOutlined } from "@ant-design/icons";

export default connect(
    state => ({ API: state.API }),
    { refreshRootDirectory: data => ({ type: "refreshRootDirectory", data })}
)(class DirectoryDeleteButton extends React.Component {
    render() {
        const path = this.props.path;

        const isHover = this.state.isHover;

        return (
            <span
                onMouseEnter={() => this.setState({ isHover: true })}
                onMouseLeave={() => this.setState({ isHover: false })}
                style={{ marginLeft: "8px" }}
            >
                <DeleteOutlined
                    onClick={path.length == 1
                        ? undefined : this.deleteDirectory}
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
        const method = this.props.API.deleteDirectory;

        const path = this.props.path;

        const res = await method({ path });
        this.props.refreshRootDirectory(res.data);
    };
});

