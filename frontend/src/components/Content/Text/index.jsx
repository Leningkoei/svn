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
    const height = this.state.windowHeight - 104;

    return (
        <Editor
          className={style.text}
          height={height}
          onChange={disabled ? undefined : this.onChange}
          defaultValue={content}
          language={lang}
        />
    );
  };

  onChange = value => {
    this.props.noticeTextChange(value);
  };

  state = {
    windowHeight: innerHeight
  };

  handleResize = () => this.setState({ windowHeight: innerHeight });

  componentDidMount = () =>
    window.addEventListener("resize", this.handleResize);
  componentWillUnmount = () =>
    window.removeEventListener("resize", this.handleResize);
});

