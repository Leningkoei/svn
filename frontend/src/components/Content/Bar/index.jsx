import { Button } from "antd";
import React from "react";
import style from "./style.scss";

export default class Bar extends React.Component {
  render() {
    const name = this.props.name;

    return (
      <div className={style.bar}>
        <Button
          type="primary"
          size="small"
          block={true}
          disabled={true}
        >Edit</Button>
        <span className={style.name}>{name}</span>
        <Button
          type="primary"
          size="small"
          block={true}
          disabled={true}
        >Save</Button>
      </div>
    );
  };
};

