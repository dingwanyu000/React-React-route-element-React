import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Row, Col, Menu, Icon, Breadcrumb } from 'antd'
import Demo1 from '@/view/Demo1';
import Demo2 from '@/view/Demo2';
import Demo3 from '@/view/Demo3';
import { post, get } from '@/api/Api'
const { SubMenu } = Menu;

window.$post = post
window.$get = get
export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
        };
    }
    componentWillMount() {
        this.setState({ username: JSON.parse(window.sessionStorage.getItem("userInfo")).username })
        this.props.history.push('/home/Demo1')
    }
    menuSelect(e) {
        this.props.history.push('/home/' + e.key)
    }
    cancel(e) {
        this.props.history.push('/')
    }
    render() {
        return (
            <div>
                <Row>
                    <Col span={24}>
                        <div style={{ backgroundColor: "#324157", height: "60px", color: "white" }}>
                            <div style={{ padding: "20px" }}><span>myFirstReactGo</span>
                                <div style={{ float: "right" }}>
                                    <span>你好，{this.state.username}&nbsp;&nbsp;|&nbsp;&nbsp;欢迎回来&nbsp;&nbsp;</span>
                                    <i onClick={this.cancel.bind(this)}><Icon type="poweroff" onClick={this.cancel.bind(this)} /></i>
                                </div>
                            </div>
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col span={3}>
                        <Menu defaultOpenKeys={['1']} defaultSelectedKeys={['Demo1']} mode="inline" ref="menu" style={{ height: window.window.innerHeight - 60 }} className="el-menu-vertical-demo" onClick={this.menuSelect.bind(this)}>
                            <SubMenu key="1" title={<span><i className="el-icon-message"></i>用户管理</span>}>
                                <Menu.Item key="Demo1">用户信息管理</Menu.Item>
                                <Menu.Item key="Demo2">Demo2</Menu.Item>
                                <Menu.Item key="Demo3">Demo3</Menu.Item>
                            </SubMenu>
                            <SubMenu key="2" title={<span><i className="el-icon-message"></i>系统管理</span>}>
                                <Menu.Item key="Demo4">权限管理</Menu.Item>
                            </SubMenu>
                        </Menu>
                    </Col>
                    <Col span={21} style={{ backgroundColor: "#F9FAFC", height: window.window.innerHeight - 60 }}>
                        <div style={{ margin: "30px" }}>
                            <Breadcrumb>
                                <Breadcrumb.Item>主页</Breadcrumb.Item>
                                <Breadcrumb.Item>
                                    用户管理
                                </Breadcrumb.Item>
                                <Breadcrumb.Item>
                                    <a href="/home/Demo2">用户信息管理</a>
                                </Breadcrumb.Item>
                            </Breadcrumb>
                            <Row>
                                <Switch>
                                    <Route path="/home/Demo1" component={Demo1} />
                                    <Route path="/home/Demo2" component={Demo2} />
                                    <Route path="/home/Demo3" component={Demo3} />
                                </Switch>
                            </Row>
                        </div>
                    </Col>
                </Row>
            </div >
        )
    }
}