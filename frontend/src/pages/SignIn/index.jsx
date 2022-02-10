import { Button, Form, Input } from "antd";
import axios from "axios";
import React from "react";
import homeWithBlueDoor from "../../assets/home-with-blue-door.jpg";
import host from "../../../host.js";
import style from "./style.scss";

export default class SignIn extends React.Component {
    render() {
        return (
            <div className={style["sign-in"]}>
                <div className={style["content"]}>
                    <img
                        id={style["home-with-blue-door"]}
                        alt="home with blue door"
                        src={homeWithBlueDoor}
                    />
                    <Form
                        labelCol={{ span: 8 }}
                    >
                        <Form.Item
                            label="name"
                            name="name"
                            rules={[ {
                                required: true,
                                message: "Please input your name!"
                            } ]}
                        >
                            <Input
                                onBlur={event => this.name = event.target.value}
                            />
                        </Form.Item>
                        <Form.Item
                            label="password"
                            name="password"
                            rules={[ {
                                required: true,
                                message: "Please input your password!"
                            } ]}
                        >
                            <Input.Password
                                onBlur={event =>
                                    this.password = event.target.value}
                            />
                        </Form.Item>
                        <Form.Item>
                            <div className={style["buttons"]}>
                                <Button htmlType="reset">Reset</Button>
                                <Button
                                    type="primary"
                                    onClick={this.signIn}
                                >Sign In</Button>
                                <Button
                                    onClick={this.gotoSignUp}
                                >Sign Up</Button>
                            </div>
                        </Form.Item>
                    </Form>
                </div>
            </div>
        );
    };

    name = "";
    password = "";

    gotoSignUp = () => this.props.history.replace("/sign-up");
    signIn = async () => {
        const name = this.name;
        const password = this.password;

        try {
            const res = await axios.post(
                `${host}:1024/server/sign-in`,
                { name, password }
            );

            if (res.data.result) {
                const token = res.data.token;

                localStorage.setItem("token", token);

                this.props.history.replace("/main");
            } else {
                this.props.history.replace("/sign-in");
            };
        } catch (err) {
            alert(err);
        };
    };
};

