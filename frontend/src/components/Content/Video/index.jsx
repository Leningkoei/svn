import React from "react";
import style from "./style.scss";

export default class Video extends React.Component {
  render() {
    const maxHeight = this.state.windowHeight - 104;

    return (
      <div className={style.img}>
        <video
          src={this.props.src}
          controls={true}
          style={{ maxHeight: `${maxHeight}px`, maxWidth: "100%" }}
        />
      </div>
    );
  }

  state = {
    windowHeight: innerHeight
  };

  handleResize = () => this.setState({ windowHeight: innerHeight });

  componentDidMount = () =>
    window.addEventListener("resize", this.handleResize);

  componentWillUnmount = () =>
    window.removeEventListener("resize", this.handleResize);
};

