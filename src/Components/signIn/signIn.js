import React, { Component } from 'react';
import { Form, Input, Button, Checkbox } from 'antd';
import "../signIn/signIn.css";
import { tokenKey } from '../constants/constants'
import { SetLocalstorage } from '../../utilits';
import { signin } from '../../server/user/user';
import {
    BrowserRouter as Router,
    Redirect
} from "react-router-dom";
class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isSignin: false,
            isMessage: false,
        }
    }
    render() {
        const { isSignin, isMessage } = this.state;
        const onFinish = (values) => {
            console.log(values)
            signin(values).then(res => {
                if (res && res.data && res.data.token) {
                    SetLocalstorage(tokenKey, res.data.token)
                    this.setState({
                        isSignin: true,
                        isMessage: false,
                    })
                } else {
                    this.setState({
                        isSignin: false,
                        isMessage: true
                    })
                }
            }).catch(res => {
                this.setState({
                    isSignin: false,
                    isMessage: true
                })
            })
        };
        return (
            <div className='back_login'>
                <div className='onlogin'>
                <div className='droper bg-light'>
                    {isSignin ?
                        <Redirect to={"/testing"} /> : ''
                    }
                    <Form
                        className='signIn'
                        name="basic"
                        initialValues={{ remember: true }}
                        onFinish={onFinish}
                    // onFinishFailed={onFinishFailed}
                    >
                        <p className="danger-message">{isMessage ? 'Login yoki parol xato !' : ''}</p>
                        <Form.Item
                            label="Username"
                            name="phoneNumber"
                            rules={[{ required: true, message: 'Please input your username!' }]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            label="Password"
                            name="password"
                            rules={[{ required: true, message: 'Please input your password!' }]}
                        >
                            <Input.Password />
                        </Form.Item>

                        <Form.Item className='inline-block' name="remember" valuePropName="checked">
                            <Checkbox>Remember me</Checkbox>
                        </Form.Item>

                        <Form.Item className='inline-block'>
                            <Button className='sign_button' type="primary" htmlType="submit">
                                Submit
                    </Button>
                        </Form.Item>
                    </Form>
                </div>
                </div>
            </div>
        );
    }
}

export default Login;