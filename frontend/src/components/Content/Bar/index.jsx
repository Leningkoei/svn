import { Button, Select } from "antd";
import React from "react";
import { connect } from "react-redux";
import style from "./style.scss";

export default connect(
  state => ({}),
  { sendLang: data => ({ type: "sendLang", data })}
)(class Bar extends React.Component {
  render() {
    const name = this.props.name;
    const isEdit = this.props.isEdit;

    return (
      <div className={style.bar}>
        <Select
          size="small"
          style={{ width: "100%", textAlign: "center" }}
          defaultValue="markdown"
          onChange={this.onChange}
        >
          <Select.Option value="markdown">markdown</Select.Option>
          <Select.Option value="javascript">javascript</Select.Option>
          <Select.Option value="typescript">typescript</Select.Option>
        </Select>
        <span className={style.name}>{name}</span>
        <Button
          type="primary"
          size="small"
          block={true}
          disabled={!isEdit}
          onClick={this.onClickSave}
        >Save</Button>
      </div>
    );
  };

  onChange = value => {
    this.props.sendLang(value);
  };
  onClickSave = () => {
    this.props.noticeSave();
  };
});

