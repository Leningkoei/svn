import { Avatar, Button } from "antd";
import React from "react";
import { connect } from "react-redux";
import defaultAvatar from "../../assets/avatar.jpg";
import style from "./style.scss";

export default connect(
    state => ({ API: state.API }),
    {}
)(class User extends React.Component {
    render() {
        return (
            <div className={style.user}>
              <span
                className={style.username}
              >username: {this.state.name}</span>
              <div className={style["user-avatar"]}>
                <Avatar
                  src={defaultAvatar}
                  size={64}
                  shape="square"
                />
              </div>
              <Button
                type="primary"
                block={true}
                style={{ height: "100%" }}
              >Sign Out</Button>
            </div>
        );
    };

    state = {
      name: ""
    };

    componentDidMount = async () => {
      const method = this.props.API.getUsername;
      const res = await method();

      if (res.data.result) {
        this.setState({ name: res.data.content });
      } else {
        alert(res.data.msg);
      };
    };
});

