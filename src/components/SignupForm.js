import React, { Component } from 'react';
import {Button, Modal, Form, Input, message} from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { signup } from "../utils";

class SignupForm extends Component {
    state = {
        displayModal: false
    }
    signupOnClick = () => {
        this.setState({displayModal: true})
    }
    handleCancel = () => {
        this.setState({displayModal: false})
    }
    onFinish = (data) => {
        // console.log('Received values of form', values);
        //1.collect all values
        //2. send sign up request to the server
        //3. analyze the response from the server
        //case1: success
        //case2: fail
        signup(data)
        .then(() => {
            this.setState({
            displayModal: false,
            });
            message.success(`Successfully signed up`);
        })
        .catch((err) => {
            message.error(err.message);
        });
    }
    render () {
        return (
            <>
                <Button shape="round" type="primary" onClick={this.signupOnClick}>
                    Signup
                </Button>
                <Modal 
                    title="Register" 
                    open={this.state.displayModal} 
                    onCancel={this.handleCancel}
                    footer={null}
                    destroyOnClose={true}
                >
                    
                <Form
                    name="normal_register"
                    onFinish={this.onFinish}
                    preserve={false}
                >
                    <Form.Item
                        name="email"
                        rules={[{ 
                            required: true, 
                            message: "Please input your email!" 
                        }]}
                    >
                    <Input 
                        prefix={<UserOutlined />} 
                        placeholder="Email" />
                    </Form.Item>
                    
                    <Form.Item
                        name="password"
                        rules={[
                        { 
                            required: true, 
                            message: "Please input your password!" },
                        ]}
                    >
                    <Input prefix={<LockOutlined />} placeholder="Password" />
                    </Form.Item>
                    <Form.Item
                        name="firstName"
                        rules={[
                            { required: true, message: "Please input your first name!" },
                        ]}
                        >
                        <Input placeholder="firstname" />
                    </Form.Item>
                    
                    <Form.Item
                        name="lastName"
                        rules={[
                            { required: true, message: "Please input your last name!" },
                        ]}
                        >
                    <Input placeholder="lastname" />
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                                Signup
                        </Button>
                    </Form.Item>
                </Form>
                </Modal>
            </>
        )
    }
}

export default SignupForm;