import Editor from "@monaco-editor/react";
import React from "react";
import { Input } from "antd";
import style from "./style.scss";

export default class Text extends React.Component {
  render() {
    const content = this.props.content;
    const disabled = this.props.disabled;

    return (
        <Editor
          className={style.text}
          height={this.state.heightOfEditor}
          onChange={this.onChange}
          defaultValue={content}
        />
    );
  };

  onChange = value => {
    this.props.noticeIsEdit(value !== this.props.content);
    this.props.noticeTextChange(value);
  };

  height = innerHeight;

  state = {
    heightOfEditor: "88vh"
  };

  componentDidMount = () => {
    this.setState({ heightOfEditor: `${this.height - 104}px` });
  };
};

