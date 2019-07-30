import React from 'react'
import { Button, Input, Layout, Form, Select, DatePicker, TimePicker, Switch, Checkbox, Radio } from 'element-react'
import 'element-theme-default'

export default class Demo3 extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            form: {
                name: '',
                region: '',
                date1: null,
                date2: null,
                delivery: false,
                type: [],
                resource: '',
                desc: ''
            }
        };
    }
    onSubmit(e) {
        e.preventDefault();
    }

    onChange(key, value) {
        this.state.form[key] = value;
        this.forceUpdate();
    }
    render() {
        return (
            <div>
                <Form model={this.state.form} labelWidth="80" onSubmit={this.onSubmit.bind(this)}>
                    <Form.Item label="活动名称">
                        <Input value={this.state.form.name} onChange={this.onChange.bind(this, 'name')}></Input>
                    </Form.Item>
                    <Form.Item label="活动区域">
                        <Select value={this.state.form.region} placeholder="请选择活动区域">
                            <Select.Option label="区域一" value="shanghai"></Select.Option>
                            <Select.Option label="区域二" value="beijing"></Select.Option>
                        </Select>
                    </Form.Item>
                    <Form.Item label="活动时间">
                        <Layout.Col span="11">
                            <Form.Item prop="date1" labelWidth="0px">
                                <DatePicker
                                    value={this.state.form.date1}
                                    placeholder="选择日期"
                                    onChange={this.onChange.bind(this, 'date1')}
                                />
                            </Form.Item>
                        </Layout.Col>
                        <Layout.Col className="line" span="2">-</Layout.Col>
                        <Layout.Col span="11">
                            <Form.Item prop="date2" labelWidth="0px">
                                <TimePicker
                                    value={this.state.form.date2}
                                    selectableRange="18:30:00 - 20:30:00"
                                    placeholder="选择时间"
                                    onChange={this.onChange.bind(this, 'date2')}
                                />
                            </Form.Item>
                        </Layout.Col>
                    </Form.Item>
                    <Form.Item label="即时配送">
                        <Switch
                            onText=""
                            offText=""
                            value={this.state.form.delivery}
                            onChange={this.onChange.bind(this, 'delivery')}
                        />
                    </Form.Item>
                    <Form.Item label="活动性质">
                        <Checkbox.Group value={this.state.form.type} onChange={this.onChange.bind(this, 'type')}>
                            <Checkbox label="美食/餐厅线上活动" name="type"></Checkbox>
                            <Checkbox label="地推活动" name="type"></Checkbox>
                            <Checkbox label="线下主题活动" name="type"></Checkbox>
                            <Checkbox label="单纯品牌曝光" name="type"></Checkbox>
                        </Checkbox.Group>
                    </Form.Item>
                    <Form.Item label="特殊资源">
                        <Radio.Group value={this.state.form.resource}>
                            <Radio value="线上品牌商赞助"></Radio>
                            <Radio value="线下场地免费"></Radio>
                        </Radio.Group>
                    </Form.Item>
                    <Form.Item label="活动形式">
                        <Input type="textarea" value={this.state.form.desc} onChange={this.onChange.bind(this, 'desc')}></Input>
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" nativeType="submit">立即创建</Button>
                        <Button>取消</Button>
                    </Form.Item>
                </Form>
            </div >
        );
    }
}
