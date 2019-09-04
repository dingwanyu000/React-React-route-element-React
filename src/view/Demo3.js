import React from 'react'
import { Icon, Card, Row, Col } from 'antd';
import echarts from "echarts";
import '../../node_modules/echarts/map/js/world.js'

export default class Demo3 extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            liStyle: {
                fontSize: "18px",
                listStyleType: "none",
                fontWeight: "bold"
            },
            firstLiStyle: {
                fontSize: "18px",
                listStyleType: "none",
                fontWeight: "bold"
            }
        };
    }
    /**
         * 生命周期
         * @author dwy
         */
    componentDidMount() {
        this.initChart();
    }

    initChart() {
        this.chart = echarts.init(this.refs.myEchart);
        window.onresize = echarts.init(this.refs.myEchart).resize;
        // 把配置和数据放这里
        this.chart.setOption({
            title: {
                sublink: 'http://esa.un.org/wpp/Excel-Data/population.htm',
                left: 'center',
                top: 'top'
            },
            visualMap: {
                min: 0,
                max: 1000000,
                text: ['High', 'Low'],
                realtime: false,
                calculable: true,
                color: ['orangered', 'yellow', 'lightskyblue']
            },
            series: [
                {
                    name: 'World Population (2010)',
                    type: 'map',
                    mapType: 'world',
                    roam: true,
                    itemStyle: {
                        emphasis: { label: { show: true } }
                    },
                    data: [
                        { name: 'Afghanistan', value: 228397.812 },
                        { name: 'Angola', value: 19549.124 },
                        { name: 'China', value: 129549.124 },
                        { name: 'United States', value: 829549.124 }
                    ]
                }
            ]
        });
    }
    render() {
        return (
            <div>
                <Row gutter={10}>
                    <Col span={8}><Card className="box-card">
                        <Icon type="credit-card" theme="twoTone" style={{ fontSize: '70px', float: "left" }} />
                        <ul style={{ float: "left", marginTop: "10px" }}>
                            <li style={this.state.firstLiStyle}>待办事项</li>
                            <li style={this.state.liStyle}>12</li>
                        </ul>
                    </Card></Col>
                    <Col span={8}><Card className="box-card">
                        <Icon type="mail" theme="twoTone" style={{ fontSize: '70px', float: "left" }} />
                        <ul style={{ float: "left", marginTop: "10px" }}>
                            <li style={this.state.firstLiStyle}>系统消息</li>
                            <li style={this.state.liStyle}>8</li>
                        </ul>
                    </Card></Col>
                    <Col span={8}><Card className="box-card">
                        <Icon type="folder" theme="twoTone" style={{ fontSize: '70px', float: "left" }} />
                        <ul style={{ float: "left", marginTop: "10px" }}>
                            <li style={this.state.firstLiStyle}>代码量</li>
                            <li style={this.state.liStyle}>5218</li>
                        </ul>
                    </Card></Col>
                </Row>
                <Row style={{ marginTop: "10px" }}>
                    <Card className="box-card">
                        <div ref="myEchart" style={{ height: "460px" }}></div>
                    </Card>
                </Row>
            </div>
        );
    }
}
