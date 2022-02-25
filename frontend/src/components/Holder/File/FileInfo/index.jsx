import React from "react";
import { FileOutlined } from "@ant-design/icons";
import { connect } from "react-redux";
import style from "./style.scss";

export default connect(
  state => ({}),
  { sendFileInfo: data => ({ type: "sendFileInfo", data })}
)(class FileInfo extends React.Component {
  render() {
    const name = this.props.name;

    return (
      <div
        className={style["file-info"]}
        onClick={this.onClick}
      >
        <span className={style.icon}><FileOutlined /></span>
        <span>{name}</span>
      </div>
    );
  };

  onClick = () => {
    this.props.sendFileInfo({
      name: this.props.name,
      path: this.props.path
    });
  };
});

