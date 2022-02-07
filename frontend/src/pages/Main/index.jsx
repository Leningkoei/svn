import { nanoid } from "nanoid";
import React from "react";
import Holder from "../../components/Holder";
import User from "../../components/User";
import style from "./style.scss";

export default class Main extends React.Component {
    render() {
        const leftWidth = innerWidth * 0.5 - 1;
        const rightWidth = innerWidth * 0.5 - 1;

        return (
            <div className={style["main"]}>
                <div className={style["content"]}>
                    <div
                        className={style["left"]}
                        style={{ width: `${leftWidth}px` }}
                    >
                        <Holder />
                    </div>
                    <hr className={style["hr"]} />
                    <div
                        className={style["right"]}
                        style={{ width: `${rightWidth}px` }}
                    >
                        <User />
                    </div>
                </div>
                <div className={style["footer"]}>
                </div>
            </div>
        );
    };
};

