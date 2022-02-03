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
            <div>
                <label
                    htmlFor={this.props.path.join("/")}
                    onMouseEnter={() => this.setState({ isHover: true })}
                    onMouseLeave={() => this.setState({ isHover: false })}
                    onClick={this.test}
                >
                    <FileAddOutlined style={{
                        color: isHover ? "aqua" : "black",
                        fontSize: "24px"
                    }} />
                </label>
                <input
                    id={this.props.path.join("/")}
                    name="file"
                    type="file"
                    onClick={this.test}
                    onChange={this.uploadFile}
                    style={{ display: "none" }}
                />
            </div>
        );
    };

    state = {
        isHover: false
    };

    test = () => console.log(this);
    uploadFile = async event => {
        const formData = new FormData();

        const path = [ ...this.props.path ];
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

