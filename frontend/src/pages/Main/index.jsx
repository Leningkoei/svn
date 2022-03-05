import { nanoid } from "nanoid";
import React from "react";
import Content from "../../components/Content";
import Holder from "../../components/Holder";
import User from "../../components/User";
import style from "./style.scss";

export default class Main extends React.Component {
    render() {
        const leftWidth = this.state.leftWidth;
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
                        style={{ width: `${leftWidth}%` }}
                    >
                        <Holder history={this.props.history} />
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
                        style={{ width: `${100 - leftWidth}%` }}
                    >
                        <User history={this.props.history} />
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
        isResizing: false
    };

    handleMouseUp = event => {
      if (this.state.isResizing) {
        const nextLeftWidth = event.clientX / innerWidth * 100;
        this.setState({
          isResizing: false,
          leftWidth: nextLeftWidth
        });
        localStorage.setItem("leftWidth", nextLeftWidth);
      };
    };

    componentDidMount() {
      if (localStorage.getItem("token")) {
        const storagedLeftWidth = Number(localStorage.getItem("leftWidth"));
        const leftWidth = storagedLeftWidth? storagedLeftWidth: 30;
        const rightWidth = 100 - leftWidth;

        this.setState({
            leftWidth: leftWidth
        });
      } else {
        this.props.history.replace("/sign-in");
      };
    };
};

