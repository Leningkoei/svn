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
            <div className={style["main"]}>
                <div className={style["content"]}>
                    <div
                        className={style["left"]}
                        style={{ width: `${leftWidth}` }}
                    >
                        <Holder />
                    </div>
                    <div
                        className={style["middle"]}
                        onMouseDown={() => this.setState({ isResizing: true })}
                        onMouseMove={this.resize}
                        onMouseUp={() => {
                            this.setState({ isResizing: false });
                            localStorage.setItem("leftWidth", leftWidth);
                        }}
                        onMouseLeave={() => {
                            this.setState({ isResizing: false });
                            localStorage.setItem("leftWidth", leftWidth);
                        }}
                    >
                        <div
                            className={style["hr"]}
                            style={{ borderColor: isResizing ? "orange" : "blue" }}
                        ></div>
                    </div>
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

    resize = event => {
        if (!this.state.isResizing) { return; };

        const width = this.width;
        const leftWidth = event.clientX;
        const rightWidth = width - leftWidth;

        this.setState({
            leftWidth: `${leftWidth}px`,
            rightWidth: `${rightWidth}px`
        });
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

