import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Layout, Menu, Breadcrumb, Button } from 'element-react'
import Demo1 from './Demo1';
import Demo2 from './Demo2';
import Demo3 from './Demo3';
import { post, get } from './../api/Api'
import 'element-theme-default'

window.$post = post
window.$get = get
export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: ''
        };
    }
    onSelect() {
    }
    onOpen() {
    }
    onClose() {
    }
    menuSelect(e) {
        this.props.history.push('/home/' + e)
    }
    cancel(e) {
        this.props.history.push('/')
    }
    componentWillMount() {
        this.setState({ username: JSON.parse(window.sessionStorage.getItem("userInfo")).username })
    }
    render() {
        return (
            <div>
                <Layout.Row>
                    <Layout.Col span="24">
                        <div style={{ backgroundColor: "#324157", height: "60px", color: "white" }}>
                            <div style={{ padding: "20px" }}><span>myFirstReactGo</span>
                                <div style={{ float: "right" }}>
                                    <span>你好，{this.state.username}&nbsp;&nbsp;|&nbsp;&nbsp;欢迎回来&nbsp;&nbsp;</span>
                                    <i onClick={this.cancel.bind(this)} className="el-icon-circle-cross" style={{ cursor: "pointer" }}></i>
                                </div>
                            </div>
                        </div>
                    </Layout.Col>
                </Layout.Row>
                <Layout.Row>
                    <Layout.Col span="3">
                        <Menu ref="menu" defaultActive="Demo1" style={{ height: window.window.innerHeight - 60 }} defaultActive="2" className="el-menu-vertical-demo" onSelect={this.menuSelect.bind(this)} onOpen={this.onOpen.bind(this)} onClose={this.onClose.bind(this)}>
                            <Menu.SubMenu index="1" title={<span><i className="el-icon-message"></i>用户管理</span>}>
                                <Menu.Item index="Demo1">用户信息管理</Menu.Item>
                                <Menu.Item index="Demo2">Demo2</Menu.Item>
                                <Menu.Item index="Demo3">Demo3</Menu.Item>
                            </Menu.SubMenu>
                        </Menu>
                    </Layout.Col>
                    <Layout.Col span="21" style={{ backgroundColor: "#F9FAFC", height: window.window.innerHeight - 60 }}>
                        <Layout.Row>
                            <Breadcrumb style={{ margin: 10 }} separator="/">
                                <Breadcrumb.Item>首页</Breadcrumb.Item>
                                <Breadcrumb.Item>活动管理</Breadcrumb.Item>
                                <Breadcrumb.Item>活动列表</Breadcrumb.Item>
                                <Breadcrumb.Item>活动详情</Breadcrumb.Item>
                            </Breadcrumb>
                        </Layout.Row>
                        <div style={{ margin: "30px" }}>
                            <Layout.Row>
                                <Switch>
                                    <Route path="/home/Demo1" component={Demo1} />
                                    <Route path="/home/Demo2" component={Demo2} />
                                    <Route path="/home/Demo3" component={Demo3} />
                                </Switch>
                            </Layout.Row>
                        </div>
                    </Layout.Col>
                </Layout.Row>
            </div >
        )
    }
}