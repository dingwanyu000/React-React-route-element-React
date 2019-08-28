import React from 'react'
import 'element-theme-default'
import { Input, Layout, Form, Card, Button, Message } from 'element-react'
import Background from './../static/img/Background.png';
import _ from 'lodash';

export default class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            form: {
                username: '',
                password: '',
            },
            rules: {
                username: [
                    { required: true, message: '请输入用户名', trigger: 'blur' }
                ],
                password: [
                    { required: true, message: '请输入密码', trigger: 'change' }
                ],
            }
        };
    }

    render() {
        return (
            <div>
                <Layout.Row style={{ backgroundImage: `url(${Background})`, height: window.innerHeight + "px", backgroundSize: "100%" }}>
                    <Layout.Col span="14" style={{ height: "150px" }}></Layout.Col>
                    <Layout.Col span="6"> <Card className="box-card" style={{
                        marginTop: "200px"
                    }}>
                        < div style={{ textAlign: "center", marginBottom: "20px", fontWeight: "bold" }}>邮箱账号登录</div>
                        <Form ref="form" rules={this.state.rules} model={this.state.form} labelWidth="0" onSubmit={this.onSubmit.bind(this)} style={{ textAlign: "center" }}>
                            <Form.Item prop="username" label="">
                                <Input
                                    style={{ width: "80%" }}
                                    value={this.state.form.username}
                                    onChange={this.onChange.bind(this, 'username')}
                                    placeholder="请输入用户名"
                                />
                            </Form.Item>
                            <Form.Item prop="password" label="">
                                <Input
                                    style={{ width: "80%" }}
                                    value={this.state.form.password}
                                    onChange={this.onChange.bind(this, 'password')}
                                    placeholder="请输入密码"
                                />
                            </Form.Item>
                            <Form.Item>
                                <Button style={{ width: "80%" }} type="primary" nativeType="submit">立即创建</Button>
                            </Form.Item>
                            <Form.Item>
                                <Button type="text">注册新账号</Button>
                            </Form.Item>

                        </Form>
                    </Card></Layout.Col>
                    <Layout.Col span="4"></Layout.Col>
                </Layout.Row >
            </div >
        );
    }

    onSubmit(e) {
        e.preventDefault();
        this.refs.form.validate(async (valid) => {
            if (valid) {
                await $post("/api/login", { username: this.state.form.username, password: this.state.form.password }).then(e => {
                    if (e.state) {
                        window.sessionStorage.setItem("userInfo", JSON.stringify({ username: this.state.form.username, password: this.state.form.password }))
                        this.props.history.push('/home')
                        Message({ message: '登录成功', type: 'success' });
                    } else {
                        Message.error('登录失败！请联系管理员');
                    }
                })
            } else {
                return false;
            }
        });
    }

    onChange(key, value) {
        this.setState({
            form: Object.assign({}, this.state.form, { [key]: value })
        });
    }
}
