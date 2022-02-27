import { Popover } from "antd";
import React from "react";
import { connect } from "react-redux";
import { FileAddOutlined } from "@ant-design/icons";

export default connect(
    state => ({ API: state.API }),
    {
      refreshRootDirectory: data => ({ type: "refreshRootDirectory", data })
    }
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
                  <Popover
                    content={this.state.content}
                    visible={this.state.content.length}
                  >
                    <FileAddOutlined style={{
                      color: isHover ? "aqua" : "black",
                      fontSize: "24px"
                    }} />
                  </Popover>
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
        isHover: false,
        content: []
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

        const ref = React.createRef();
        const item = <span ref={ref} key={file.name} style={{ display: "block" }} >{file.name}: 0%</span>
        try {
          this.setState({ content: [ ...this.state.content, item ] });

          const res = await method(formData, progressEvent => {
            this.setState({
              progress:
                (progressEvent.loaded / progressEvent.total * 100).toFixed(2)
              })
            ref.current.innerText = file.name + ": " + ((progressEvent.loaded / progressEvent.total) * 100).toFixed(2) + "%";
          });

          if (res.data.result) {
              this.props.refreshRootDirectory(res.data.content);
          } else {
              throw new Error(res.data.msg);
          };
      } catch (err) {
          alert(err);
      } finally {
        this.setState({ content: this.state.content.filter(node => node !== item) });
      };
    };
});

