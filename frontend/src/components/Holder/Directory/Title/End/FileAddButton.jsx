import React from "react";
import { connect } from "react-redux";
import { FileAddOutlined } from "@ant-design/icons";

export default connect(
    state => ({ API: state.API }),
    { refreshRootDirectory: data => ({ type: "refreshRootDirectory", data }) }
)(class FileAddButton extends React.Component {
    render() {
        const isHover = this.state.isHover;

        return (
            <div>
                <label
                    htmlFor={"/" + this.props.path.join("/")}
                    onMouseEnter={() => this.setState({ isHover: true })}
                    onMouseLeave={() => this.setState({ isHover: false })}
                >
                    <FileAddOutlined style={{
                        color: isHover ? "aqua" : "black",
                        fontSize: "24px"
                    }} />
                </label>
                <input
                    id={"/" + this.props.path.join("/")}
                    name="file"
                    type="file"
                    onChange={this.uploadFile}
                    style={{ display: "none" }}
                />
            </div>
        );
    };

    state = {
        isHover: false
    };

    uploadFile = async event => {
        const method = this.props.API.uploadFile;

        const formData = new FormData();

        const path = [ ...this.props.path ];
        const file = event.target.files[0];

        path.push(file.name);

        formData.append("name", "admin");
        formData.append("path", path);
        formData.append("file", file, file.name);

        try {
            const res = await method(formData);

            this.props.refreshRootDirectory(res.data);
        } catch (err) {
            alert(err);
        };
    };
});

