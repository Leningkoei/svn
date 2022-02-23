import { Input, Modal } from "antd";
import React from "react";
import { connect } from "react-redux";
import { FolderAddOutlined } from "@ant-design/icons";

export default connect(
    state => ({ API: state.API }),
    { refreshRootDirectory: data => ({ type: "refreshRootDirectory", data }) }
)(class FolderAddButton extends React.Component {
    render() {
        const isHover = this.state.isHover;
        const isModalVisible = this.state.isModalVisible;

        return (
            <>
                <span
                    onMouseEnter={() => this.setState({ isHover: true })}
                    onMouseLeave={() => this.setState({ isHover: false })}
                >
                    <FolderAddOutlined
                        onClick={this.openModal}
                        style={{
                            color: isHover ? "aqua" : "black",
                            fontSize: "30px"
                        }}
                    />
                </span>
                <Modal
                    visible={isModalVisible}
                    onOk={this.createDirectory}
                    onCancel={this.closeModal}
                >
                    <Input
                        key={new Date()}
                        placeholder="Directory Name"
                        onChange={event => this.dirname = event.target.value}
                    />
                </Modal>
            </>
        );
    };

    state = {
        isHover: false,
        isModalVisible: false
    };

    dirname = "";

    closeModal = () => this.setState({ isModalVisible: false });
    openModal = () => this.setState({ isModalVisible: true });

    createDirectory = async () => {
        const method = this.props.API.createDirectory;

        const path = [ ...this.props.path ];
        const dirname = this.dirname;

        path.push(dirname);

        try {
            const task = method({ dirname, path });

            this.dirname = "";
            this.closeModal();

            const res = await task;

            if (res.data.result) {
                this.props.refreshRootDirectory(res.data.content);
            } else {
                throw new Error(res.data.msg);
            };
        } catch (err) {
            alert(err);
        };
    };
});

