import React from 'react';
import { Table, Tag, Pagination, Button, Card, Dialog, Form, Input, Message, MessageBox } from 'element-react'
export default class Demo1 extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            columns: [
                {
                    type: 'selection',
                    label: ""
                },
                {
                    label: "序号",
                    prop: "id",
                    width: 180
                },
                {
                    label: "用户名",
                    prop: "username",
                    width: 180
                },
                {
                    label: "密码",
                    prop: "password",
                    render: function (data) {
                        return <Tag>{data.password}</Tag>
                    }
                }

            ],
            data: [],
            page: {
                total: 0
            },
            dialogVisible: false,
            form: {
                username: '',
                password: ''
            },
            selection: [],
            state: ''
        }
    }

    render() {
        return (
            <div>
                <Card className="box-card">
                    <div style={{ marginBottom: "10px" }}>
                        <Button type="info" onClick={this.createUser.bind(this)}>新增</Button>
                        <Button type="success" onClick={this.updateUser.bind(this)}>修改</Button>
                        <Button type="danger" onClick={this.deleteUser.bind(this)}>删除</Button>
                    </div>
                    {/* <Card style={{ marginTop: "10px" }} className="box-card"> */}
                    <Table
                        style={{ width: '100%' }}
                        columns={this.state.columns}
                        maxHeight={200}
                        data={this.state.data}
                        onSelectChange={(selection) => { this.setState({ selection: selection }) }}
                    />

                    <Pagination style={{ float: "right" }} layout="total, sizes, prev, pager, next, jumper" total={this.state.page.total} pageSizes={[11, 30, 50, 100]} pageSize={10} currentPage={1} />
                </Card>
                {/* </Card> */}
                <Dialog
                    title="新增用户"
                    size="tiny"
                    visible={this.state.dialogVisible}
                    onCancel={() => this.setState({ dialogVisible: false })}
                    lockScroll={false}
                >
                    <Dialog.Body>
                        <Form ref="form" rules={this.state.rules} model={this.state.form} labelWidth="0" style={{ textAlign: "center" }}>
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
                        </Form>
                    </Dialog.Body>
                    <Dialog.Footer className="dialog-footer">
                        <Button onClick={() => this.setState({ dialogVisible: false })}>取消</Button>
                        <Button type="primary" onClick={this.saveData.bind(this)}>确定</Button>
                    </Dialog.Footer>
                </Dialog>
            </div>
        )
    }

    componentDidMount() {
        $get("/api/persons").then(e => {
            this.setState({ data: e.persons, page: { total: e.persons.length } })

        })
    }

    createUser() {
        this.setState({
            dialogVisible: true, form: {
                username: '',
                password: ''
            },
            state: 'create'
        })
    }

    updateUser() {
        if (this.state.selection.length != 1) {
            Message({ message: '请选择一条数据', type: 'info' });
        } else {
            this.setState({ form: this.state.selection[0], state: 'update', dialogVisible: true })
        }
    }

    deleteUser() {
        if (this.state.selection.length != 1) {
            Message({ message: '请选择一条数据', type: 'info' });
        } else {
            MessageBox.confirm('此操作将永久删除该用户, 是否继续?', '提示', {
                type: 'warning'
            }).then(() => {
                $post("/api/deletePerson", { id: this.state.selection[0].id }).then(e => {
                    this.setState({ dialogVisible: false })
                    Message({ message: '成功', type: 'success' });
                    this.componentDidMount();
                })
                Message({
                    type: 'success',
                    message: '删除成功!'
                });
            })
        }
    }

    onChange(key, value) {
        this.setState({
            form: Object.assign({}, this.state.form, { [key]: value })
        });
    }

    saveData(e) {
        $post(this.state.state == 'create' ? "/api/addPerson" : "/api/updatePerson", this.state.form).then(e => {
            this.setState({ dialogVisible: false })
            Message({ message: '成功', type: 'success' });
            this.componentDidMount();
        })
    }


}