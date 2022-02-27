import React from "react";
import style from "./style.scss";

export default class Video extends React.Component {
  render() {
    const maxHeight = innerHeight - 104

    return (
      <div className={style.img}>
        <video
          src={this.props.src}
          controls={true}
           style={{ maxHeight: `${maxHeight}px` }}
          width="100%"
        />
      </div>
    );
  };
};

