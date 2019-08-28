import React from 'react'
// import 'element-theme-default'
import { Row, Col, Form, Icon, Input, Button, Card } from 'antd'
import Background from './../static/img/Background.png';
import _ from 'lodash';

function hasErrors(fieldsError) {
    return Object.keys(fieldsError).some(field => fieldsError[field]);
}

class Login extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    login(e) {
        let userInfo = this.props.form.getFieldsValue();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                $post("/api/login", userInfo).then(e => {
                    if (e.state) {
                        window.sessionStorage.setItem("userInfo", JSON.stringify({ username: userInfo.username, password: userInfo.password }))
                        this.props.history.push('/home')
                        Message({ message: '登录成功', type: 'success' });
                    } else {
                        Message.error('登录失败！请联系管理员');
                    }
                })
            }
        })
    }

    componentDidMount() {
        this.props.form.validateFields();
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <div>
                <Row style={{ backgroundImage: `url(${Background})`, height: window.innerHeight + "px", backgroundSize: "100%" }}>
                    <Col span={14} style={{ height: "150px" }}></Col >
                    <Col span={6}> <Card className="box-card" style={{
                        marginTop: "200px"
                    }}>
                        < div style={{ textAlign: "center", marginBottom: "20px", fontWeight: "bold" }}>邮箱账号登录</div>
                        <Form className="login-form">
                            <Form.Item>
                                {getFieldDecorator('username', {
                                    rules: [{ required: true, message: 'Please input your username!' }],
                                })(
                                    <Input
                                        prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                        placeholder="Username"
                                    />,
                                )}
                            </Form.Item>
                            <Form.Item>
                                {getFieldDecorator('password', {
                                    rules: [{ required: true, message: 'Please input your Password!' }],
                                })(
                                    <Input
                                        prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                        type="password"
                                        placeholder="Password"
                                    />,
                                )}
                            </Form.Item>
                            <Form.Item>
                                <Button type="primary" onClick={this.login.bind(this)} className="login-form-button">
                                    立即登录
                                </Button>
                            </Form.Item>
                        </Form>
                    </Card></Col >
                    <Col span={4}></Col >
                </Row>
            </div >
        );
    }

}

export default Form.create()(Login);
