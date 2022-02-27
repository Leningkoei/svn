import Editor from "@monaco-editor/react";
import React from "react";
import { connect } from "react-redux";
import { Input } from "antd";
import style from "./style.scss";

export default connect(
  state => ({ lang: state.lang }),
  {}
)(class Text extends React.Component {
  render() {
    const content = this.props.content;
    const disabled = this.props.disabled;
    const lang = this.props.lang;

    return (
        <Editor
          className={style.text}
          height={this.state.heightOfEditor}
          onChange={disabled ? undefined : this.onChange}
          defaultValue={content}
          language={lang}
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
});

