import axios from "axios";
import React from "react";
import { connect } from "react-redux";
import { FileAddOutlined } from "@ant-design/icons";

export default connect(
    () => ({}),
    { refreshRootDirectory: data => ({ type: "refreshRootDirectory", data }) }
)(class FileAddButton extends React.Component {
    render() {
        const isHover = this.state.isHover;

        return (
            <>
                <label
                    htmlFor="file"
                    onMouseEnter={() => this.setState({ isHover: true })}
                    onMouseLeave={() => this.setState({ isHover: false })}
                >
                    <FileAddOutlined style={{
                        color: isHover ? "aqua" : "black",
                        fontSize: "24px"
                    }} />
                </label>
                <input
                    id="file"
                    name="file"
                    type="file"
                    onChange={this.uploadFile}
                    style={{ display: "none" }}
                />
            </>
        );
    };

    state = {
        isHover: false
    };

    uploadFile = async event => {
        const formData = new FormData();

        const path = this.props.path;
        const file = event.target.files[0];

        path.push(file.name);

        formData.append("name", "admin");
        formData.append("path", path);
        formData.append("file", file, file.name);

        try {
            const res = await axios({
                method: "post",
                url: "http://127.0.0.1:1024/server/upload-file",
                data: formData,
                headers: { "Content-Type": "multipart/form-data" },
                responseType: "json"
            });

            this.props.refreshRootDirectory(res.data);
        } catch (err) {
            alert(err);
        };
    };
});

