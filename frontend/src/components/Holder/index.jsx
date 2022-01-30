import React from "react";
import { connect } from "react-redux";
import Directory from "../Directory";
import "./style.scss";

export default connect(
    state => ({
        holder: state.holder
    }),
    {}
)(class Holder extends React.Component {
    render() {
        const holder = this.props.holder;

        return (
            <div className="holder">
                <Directory key={holder.id} {...holder} />
            </div>
        );
    };
});

