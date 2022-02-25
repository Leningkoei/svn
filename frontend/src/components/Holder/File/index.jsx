import React from "react";
import FileInfo from "./FileInfo";
import End from "./End";
import style from "./style.scss";

export default class File extends React.Component {
    render() {
        const originalname = this.props.name;
        const path = this.props.path;

        const isHover = this.state.isHover;

        return (
            <div
                className={style.file}
                onMouseEnter={() => this.setState({ isHover: true })}
                onMouseLeave={() => this.setState({ isHover: false })}
                style={{ backgroundColor: isHover ? "#dddddd" : "#ffffff" }}
            >
                <FileInfo
                  name={originalname}
                  path={path}
                />
                <End
                    originalname={originalname}
                    path={path}
                    isVisible={isHover}
                />
            </div>
        );
    };

    state = { isHover: false };
};

