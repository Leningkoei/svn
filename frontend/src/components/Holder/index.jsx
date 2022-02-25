import React from "react";
import { connect } from "react-redux";
import Directory from "./Directory";
import style from "./style.scss";

export default connect(
    state => ({
        API: state.API,
        rootDirectory: state.rootDirectory
    }),
    { refreshRootDirectory: data => ({ type: "refreshRootDirectory", data }) }
)(class Holder extends React.Component {
    render() {
        const rootDirectory = this.props.rootDirectory;

        return (
            <div className={style["holder"]}>
                {rootDirectory
                    ? <Directory key={rootDirectory.name} {...rootDirectory} />
                    : <></>}
            </div>
        );
    };

    async componentDidMount() {
        const API = this.props.API;

        try {
            const res = await API.getRootDirectory();

            if (res.data.result) {
              this.props.refreshRootDirectory(res.data.content);
            } else {
              throw new Error(res.data.msg);
            };
        } catch (err) {
            alert(err);
        };
    };
});

