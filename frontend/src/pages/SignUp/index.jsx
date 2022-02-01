import axios from "axios";
import { Button, Form, Input } from "antd";
import React from "react";
import homeWithBlueDoor from "../../assets/home-with-blue-door.jpg";
import "./style.scss";

export default class SignUp extends React.Component {
    render() {
        return (
            <div className="sign-up">
                <div className="content">
                    <img
                        id="home-with-blue-door"
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
                            <div className="buttons">
                                <Button htmlType="reset">Reset</Button>
                                <Button
                                    type="primary"
                                    onClick={this.signUp}
                                >Sign Up</Button>
                                <Button
                                    onClick={this.gotoSignIn}
                                >Sign In</Button>
                            </div>
                        </Form.Item>
                    </Form>
                </div>
            </div>
        );
    };

    name = "";
    password = "";

    gotoSignIn = () => this.props.history.replace("/sign-in");
    signUp = async () => {

        const name = this.name;
        const password = this.password;

        try {
            const res = await axios.post(
                "http://127.0.0.1:1024/server/sign-up",
                { name, password }
            );

            if (res.data.result) {
                this.props.history.replace("/main");
            } else {
                throw new Error(res.data.msg);
            };
        } catch (err) {
            alert(err);
        };
    };
};

