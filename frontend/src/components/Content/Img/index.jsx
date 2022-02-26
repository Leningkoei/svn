import React from "react";
import style from "./style.scss";

export default class Img extends React.Component {
  render() {
    return (
      <div className={style.img}>
        <img src={this.props.src} />
      </div>
    );
  };
};

