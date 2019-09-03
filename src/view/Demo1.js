import React from 'react';
import { MessageBox } from 'element-react'
import { Table, Tag, Button, Modal, Form, Input, Icon, Card, message } from 'antd';
import { apiCenter } from "./../api/Apis"

class Demo1 extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            columns: [
                {
                    title: "序号",
                    key: "id",
                    dataIndex: 'id',
                    width: 180
                },
                {
                    title: "用户名",
                    key: "username",
                    dataIndex: 'username',
                    width: 180
                },
                {
                    title: "密码",
                    key: "password",
                    render: function (data) {
                        return <Tag>{data.password}</Tag>
                    }
                }

            ],
            data: [],
            page: {
                total: 0,
                pageSize: 0
            },
            dialogVisible: false,
            form: {
                id: null,
                username: '',
                password: ''
            },
            selection: [],
            state: '',
        }
    }

    /**
     * 生命周期
     * @author dwy
     */
    componentDidMount() {
        $get(apiCenter.personList).then(e => {
            this.setState({ data: e.persons, page: { total: e.persons.length, pageSize: 2 } })
        })
        this.props.form.validateFields();
    }

    /**
     * 创建用户
     * @author dwy
     */
    createUser() {
        this.setState({
            dialogVisible: true, form: {
                id: null,
                username: '',
                password: ''
            },
            state: 'create'
        })
    }

    /**
     * 更新用户
     * @author dwy
     */
    updateUser() {
        if (this.state.selection.length != 1) {
            message.info('请选择一条数据');
        } else {
            this.setState({ form: this.state.selection[0], state: 'update', dialogVisible: true })
        }
    }

    /**
     * 删除用户
     * @author dwy
     */
    deleteUser() {
        if (this.state.selection.length != 1) {
            message.info('请选择一条数据');
        } else {
            MessageBox.confirm('此操作将永久删除该用户, 是否继续?', '提示', {
                type: 'warning'
            }).then(() => {
                $post("/api/deletePerson", { id: this.state.selection[0].id }).then(e => {
                    this.setState({ dialogVisible: false })
                    message.success('删除成功');
                    this.componentDidMount();
                })
            })
        }
    }

    /**
     * 保存数据
     * @author dwy
     */
    saveData(e) {
        let userInfo = this.props.form.getFieldsValue();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                $post(this.state.state == 'create' ? "/api/addPerson" : "/api/updatePerson", userInfo).then(e => {
                    this.setState({ dialogVisible: false })
                    message.success('成功');
                    this.componentDidMount();
                })
            }
        })
    }

    /**
     * 显示总条数
     * @author dwy
     */
    showTotal() {
        return `Total ${this.state.page.total} items`;
    }

    /**
     * 分页页码修改方法
     * @author dwy
     */
    changePage() {

    }

    /**
     * 分页大小修改方法
     * @author dwy
     */
    changePageSize() {

    }

    render() {
        /**
         * 初始化form getFieldDecorator方法
         * @author dwy
         */
        const { getFieldDecorator } = this.props.form;
        /**
         * 初始化列表选中方法
         * @author dwy
         */
        const rowSelection = {
            onChange: (selectedRowKeys, selectedRows) => {
                this.setState({ selection: selectedRows })
            },
        }

        /**
         * 初始化分页参数
         * @author dwy
         */
        const paginationProps = {
            showSizeChanger: true,
            showQuickJumper: true,
            showTotal: () => `共${this.state.page.total}条`,
            pageSize: this.state.page.pageSize,
            // current: page.pageNum,
            total: this.state.page.total,
            onShowSizeChange: (current, pageSize) => this.changePageSize(pageSize, current),
            onChange: (current) => this.changePage(current),
        };
        return (
            <div>
                <Card className="box-card">
                    <div style={{ marginBottom: "10px" }}>
                        <Button style={{ marginLeft: "5px" }} type="primary" onClick={this.createUser.bind(this)}>新增</Button>
                        <Button style={{ marginLeft: "5px" }} type="primary" onClick={this.updateUser.bind(this)}>修改</Button>
                        <Button style={{ marginLeft: "5px" }} type="danger" onClick={this.deleteUser.bind(this)}>删除</Button>
                    </div>
                    <Table
                        rowKey={record => record.id}
                        style={{ width: '100%' }}
                        columns={this.state.columns}
                        maxHeight={200}
                        dataSource={this.state.data}
                        rowSelection={rowSelection}
                        pagination={paginationProps}
                    />
                </Card>
                {/* </Card> */}
                <Modal
                    title="新增用户"
                    visible={this.state.dialogVisible}
                    onOk={this.saveData.bind(this)}
                    onCancel={() => this.setState({ dialogVisible: false })}
                >
                    <Form ref="form" className="login-form">
                        <Form.Item style={{ display: "none" }}>
                            {getFieldDecorator('id', { initialValue: this.state.form.id }, {
                                rules: [{ required: true, message: 'Please input your username!' }],
                            })}
                        </Form.Item>
                        <Form.Item>
                            {getFieldDecorator('username', { initialValue: this.state.form.username }, {
                                rules: [{ required: true, message: 'Please input your username!' }],
                            })(
                                <Input
                                    prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                    placeholder="Username"
                                />,
                            )}
                        </Form.Item>
                        <Form.Item>
                            {getFieldDecorator('password', { initialValue: this.state.form.password }, {
                                rules: [{ required: true, message: 'Please input your Password!' }],
                            })(
                                <Input
                                    prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                    placeholder="Password"
                                />,
                            )}
                        </Form.Item>
                    </Form>
                </Modal>
            </div>
        )
    }

}

export default Form.create()(Demo1);