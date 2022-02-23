import React from "react";
import { connect } from "react-redux";
import {
    DownOutlined,
    FolderOutlined,
    FolderOpenOutlined,
    RightOutlined
} from "@ant-design/icons";
import style from "./style.scss";

export default connect(
    state => ({ API: state.API }),
    { refreshRootDirectory: data => ({ type: "refreshRootDirectory", data }) }
)(class Start extends React.Component {
    render() {
        const fold = this.props.fold;

        return (
            <div className={style["start"]}>
                <span
                    className={style["fold-button"]}
                    onClick={this.changeFold}
                >
                    {fold ? <RightOutlined /> : <DownOutlined />}
                </span>
                <span className={style["icon"]}>
                    {fold ? <FolderOutlined /> : <FolderOpenOutlined />}
                </span>
                <span>{this.props.name}</span>
            </div>
        );
    };

    changeFold = async () => {
        const method = this.props.API.changeFold;

        const path = this.props.path;

        try {
            const res = await method({ path });

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

