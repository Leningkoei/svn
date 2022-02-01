import { Button, Form, Input } from "antd";
import React from "react";
import homeWithBlueDoor from "../../assets/home-with-blue-door.jpg";
import "./style.scss";

export default class SignIn extends React.Component {
    render() {
        return (
            <div className="sign-in">
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
                            <Input />
                        </Form.Item>
                        <Form.Item
                            label="password"
                            name="password"
                            rules={[ {
                                required: true,
                                message: "Please input your password!"
                            } ]}
                        >
                            <Input.Password />
                        </Form.Item>
                        <Form.Item>
                            <div className="buttons">
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

    gotoSignUp = () => this.props.history.replace("/sign-up");
    signIn = () => this.props.history.replace("/main");
};

