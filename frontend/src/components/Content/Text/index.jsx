import React from "react";
import { Input } from "antd";
import style from "./style.scss";

export default class Text extends React.Component {
  render() {
    const content = this.props.content;
    const disabled = this.props.disabled;

    return (
      <div className={style.text}>
        <Input.TextArea
          disabled={disabled}
          onChange={this.onChange}
          onBlur={this.onBlur}
          defaultValue={content}
        />
      </div>
    );
  };

  onChange = event => {
    this.props.noticeIsEdit(event.target.value !== this.props.content);
  };
  onBlur = event => {
    this.props.noticeTextChange(event.target.value);
  };
};

