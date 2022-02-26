import React from "react";
import style from "./style.scss";

export default class Video extends React.Component {
  render() {
    return (
      <div className={style.img}>
        <video
          src={this.props.src}
          controls={true}
          width="100%"
        />
      </div>
    );
  };
};

