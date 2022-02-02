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
                {rootDirectory
                    ? <Directory key={rootDirectory.name} {...rootDirectory} />
                    : <></>}
            </div>
        );
    };

    async componentDidMount() {
        try {
            const res = await axios.get(
                "http://127.0.0.1:1024/server/get-root-directory",
                { params: { name: "admin" } }
            );

            this.props.refreshRootDirectory(res.data);
        } catch (err) {
            alert(err);
        };
    };
});

