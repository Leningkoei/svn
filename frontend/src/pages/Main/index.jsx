import { nanoid } from "nanoid";
import React from "react";
import Content from "../../components/Content";
import Holder from "../../components/Holder";
import User from "../../components/User";
import style from "./style.scss";

export default class Main extends React.Component {
    render() {
        const leftWidth = this.state.leftWidth;
        const rightWidth = this.state.rightWidth;
        const isResizing = this.state.isResizing;

        return (
            <div
              id="main"
              className={style["main"]}
              onMouseUp={this.handleMouseUp}
            >
                <div className={style["content"]}>
                    <div
                        className={style["left"]}
                        style={{ width: `${leftWidth}` }}
                    >
                        <Holder />
                    </div>
                    <div
                      className={style["hr"]}
                      style={{
                        backgroundColor: isResizing ? "orange" : "blue"
                      }}
                      onMouseDown={event => this.setState({ isResizing: true })}
                    ></div>
                    <div
                        className={style["right"]}
                        style={{ width: `${rightWidth}` }}
                    >
                        <User />
                        <Content />
                    </div>
                </div>
                <div className={style["footer"]}>
                </div>
            </div>
        );
    };

    state = {
        leftWidth: "auto",
        rightWidth: "auto",
        isResizing: false
    };

    width = innerWidth;

    handleMouseUp = event => {
      if (this.state.isResizing) {
        this.setState({
          isResizing: false,
          leftWidth:`${event.clientX}px`,
          rightWidth: `${this.width - event.clientX}px`
        });
        localStorage.setItem("leftWidth", `${event.clientX}px`);
      };
    };

    componentDidMount() {
      if (localStorage.getItem("token")) {
        const width = this.width;
        const storagedLeftWidthStr = localStorage.getItem("leftWidth");
        const leftWidth =
            storagedLeftWidthStr ? Number(storagedLeftWidthStr.substring(
                0,
                storagedLeftWidthStr.length - 2
            )) : innerWidth * 0.3;
        const rightWidth = width - leftWidth;

        this.setState({
            leftWidth: `${leftWidth}px`,
            rightWidth: `${rightWidth}px`
        });
      } else {
        this.props.history.replace("/sign-in");
      };
    };
};

