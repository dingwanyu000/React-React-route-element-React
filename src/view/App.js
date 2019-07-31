import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Button, Input, Layout, Menu, Breadcrumb, Form, Select, DatePicker, TimePicker, Checkbox, Radio } from 'element-react'
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
        };
    }
    onSelect() {
    }
    onOpen() {
    }
    onClose() {
    }
    menuSelect(e) {
        this.props.history.push('/' + e)
    }
    render() {
        return (
            <div>
                <Layout.Row>
                    <Layout.Col span="24"><Menu style={{ borderRadius: 0 }} theme="dark" defaultActive="1" className="el-menu-demo" mode="horizontal" onSelect={this.onSelect.bind(this)}>
                        <Menu.Item index="1">处理中心</Menu.Item>
                        <Menu.SubMenu index="2" title="我的工作台">
                            <Menu.Item index="2-1">选项1</Menu.Item>
                            <Menu.Item index="2-2">选项2</Menu.Item>
                            <Menu.Item index="2-3">选项3</Menu.Item>
                        </Menu.SubMenu>
                        <Menu.Item index="3">订单管理</Menu.Item>
                    </Menu></Layout.Col>
                </Layout.Row>
                <Layout.Row>
                    <Layout.Col span="3">
                        <Menu style={{ height: window.window.innerHeight - 60 }} defaultActive="2" className="el-menu-vertical-demo" onSelect={this.menuSelect.bind(this)} onOpen={this.onOpen.bind(this)} onClose={this.onClose.bind(this)}>
                            <Menu.SubMenu index="1" title={<span><i className="el-icon-message"></i>导航一</span>}>
                                <Menu.ItemGroup title="分组一">
                                    <Menu.Item index="Demo1">Demo1</Menu.Item>
                                    <Menu.Item index="Demo2">Demo2</Menu.Item>
                                </Menu.ItemGroup>
                                <Menu.ItemGroup title="分组2">
                                    <Menu.Item index="Demo3">Demo3</Menu.Item>
                                </Menu.ItemGroup>
                            </Menu.SubMenu>
                            {/* <Menu.Item index="2"><i className="el-icon-menu"></i>导航二</Menu.Item> */}
                            {/* <Menu.Item index="3"><i className="el-icon-setting"></i>导航三</Menu.Item> */}
                        </Menu>
                    </Layout.Col>
                    <Layout.Col span="21">
                        <Layout.Row>
                            <Breadcrumb style={{ margin: 10 }} separator="/">
                                <Breadcrumb.Item>首页</Breadcrumb.Item>
                                <Breadcrumb.Item>活动管理</Breadcrumb.Item>
                                <Breadcrumb.Item>活动列表</Breadcrumb.Item>
                                <Breadcrumb.Item>活动详情</Breadcrumb.Item>
                            </Breadcrumb>
                        </Layout.Row>
                        <Layout.Row>
                            <Switch>
                                <div>
                                    <Route path="/Demo1" component={Demo1} />
                                    <Route path="/Demo2" component={Demo2} />
                                    <Route path="/Demo3" component={Demo3} />
                                </div>
                            </Switch>
                            {/* <div style={{ backgroundColor: "#eef1f6", height: window.window.innerHeight - 113, margin: 10, marginTop: 0 }}></div> */}
                        </Layout.Row>
                    </Layout.Col>
                </Layout.Row>
            </div >
        )
    }
}