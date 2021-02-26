import React from "react";
import { Row, Col, Container } from "reactstrap";
import {
    Button, Label, Input,
    Form, FormGroup
} from "reactstrap";
import axios from 'axios';
import { Bar } from "react-chartjs-2";

let baseEnd = "http://localhost:9100/api/v1";
class Home extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            listAge: [],
            listSalary: [],
            pandemic: 0
        }
    }

    componentDidMount() {
        this.getAgeAvg();
        this.getSalaryAvg();
    }

    getAgeAvg() {
        let url = `${baseEnd}/employee/age`;
        this.hitApi(url).then(({ data }) => {
            this.setState({
                listAge: data.data
            });
        })
    }

    getSalaryAvg() {
        let url = `${baseEnd}/employee/salary`;
        this.hitApi(url).then(({ data }) => {
            this.setState({
                listSalary: data.data
            });
        })
    }

    generateAbsSalary() {
        let url = `${baseEnd}/employee`;
        axios.get(url, {
            headers: { "Content-Type": "application/json;charset=utf-8" },
            params: {
                limit: 0,
                offset: 10,
                pandemic: this.state.pandemic
            }
        }).then(({ data }) => {
            if (data.status == 'ok') {
                alert("DONE")
            }
        })
    }

    hitApi(endpoint) {
        return axios.get(endpoint, {
            headers: { "Content-Type": "application/json;charset=utf-8" }
        })
    }

    renderChart = (obj, title) => {
        // Initiate data
        let avgAge = [];
        for (const k in obj) {
            avgAge.push(obj[k].average);
        }
        const data = {
            labels: Object.keys(obj),
            datasets: [{
                label: title,
                data: avgAge,
                backgroundColor: [
                  'rgba(255, 99, 132, 0.2)',
                  'rgba(54, 162, 235, 0.2)',
                  'rgba(255, 206, 86, 0.2)',
                  'rgba(75, 192, 192, 0.2)',
                  'rgba(153, 102, 255, 0.2)',
                  'rgba(255, 159, 64, 0.2)',
                ],
                borderColor: [
                  'rgba(255, 99, 132, 1)',
                  'rgba(54, 162, 235, 1)',
                  'rgba(255, 206, 86, 1)',
                  'rgba(75, 192, 192, 1)',
                  'rgba(153, 102, 255, 1)',
                  'rgba(255, 159, 64, 1)',
                ],
                borderWidth: 1,
            }],
        }
          
        const options = {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true,
                    },
                }],
            },
            responsive: true,
            maintainAspectRatio: true
        }
        
        return (
            <Bar data={data} options={options} />
        )
    }

    render() {
        let { listAge, listSalary } = this.state;
        return (
            <div>
                <Container>
                    <Col md='12'>
                        <Row>
                            <Col md='6'
                                style={{
                                    position: 'absolute',
                                    width: '45vw'
                            }}>
                                {this.renderChart(listAge, 'Average Employee Age')}
                            </Col>
                            <Col md='6'
                                style={{
                                    position: 'absolute',
                                    width: '45vw',
                                    left: '50vw'
                                }}
                            >
                                {this.renderChart(listSalary, 'Average Employee Salary')}
                            </Col>
                        </Row>
                        <Row>
                            <Col style={{
                                position: 'absolute',
                                top: '55vh',
                                margin: '10px'
                            }}>
                                <Button onClick={() => {
                                    this.generateAbsSalary()
                                }}>
                                    {'Generate Absence and Salary'}
                                </Button>
                            </Col>
                            <Col style={{
                                position: 'absolute',
                                top: '50vh',
                                margin: '10px'
                            }}>
                                <Form>
                                    <FormGroup check>
                                        <Label>Pandemic?</Label>
                                        <Label check>
                                            <Input type="radio" name="radio1"
                                                onClick={() => {
                                                    this.setState({
                                                        pandemic: 1
                                                    })
                                                }}
                                            />{' '}Yes
                                        </Label>
                                        <Label check>
                                            <Input type="radio" name="radio1"
                                                onClick={() => {
                                                    this.setState({
                                                        pandemic: 0
                                                    })
                                                }}
                                            />{' '}No
                                        </Label>
                                    </FormGroup>
                                </Form>
                            </Col>
                        </Row>
                    </Col>
                </Container>
            </div>
        )
    }

}

export default Home;