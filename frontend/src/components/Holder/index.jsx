import axios from "axios";
import React from "react";
import { connect } from "react-redux";
import Directory from "../Directory";
import "./style.scss";

export default connect(
    state => ({
        rootDirectory: state.rootDirectory
    }),
    {
        refreshRootDirectory: data => ({ type: "refreshRootDirectory", data })
    }
)(class Holder extends React.Component {
    render() {
        const rootDirectory = this.props.rootDirectory;

        return (
            <div className="holder">
                <Directory key={rootDirectory.name} {...rootDirectory} />
            </div>
        );
    };

    componentDidMount() {
        this.props.refreshRootDirectory({ name: "admin" });
    };
});

