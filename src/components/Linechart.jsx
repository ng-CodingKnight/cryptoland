import React from 'react';
import { Line } from 'react-chartjs-2';
import { Col, Row, Typography } from 'antd';
import { useEffect } from 'react';
import {
    Chart as ChartJs,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { useState } from 'react';

ChartJs.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
)

// const { Title } = Typography

const Linechart = ({ coinHistory, currentPrice, coinName, change }) => {

    const [coinPrice, setCoinPrice] = useState([]);
    const [coinTimeStamp, setCoinTimeStamp] = useState([]);

    useEffect(() => {
        const priceArr = coinHistory?.map(coin => coin.price);
        const timeArr = coinHistory?.map(coin => coin.timestamp);

        setCoinPrice(() => priceArr);
        setCoinTimeStamp(() => timeArr)

    }, [coinHistory])

    const data = {
        labels: coinTimeStamp,
        datasets: [
            {
                label: 'Price In USD',
                data: coinPrice,
                fill: false,
                backgroundColor: '#0071bd',
                borderColor: '#0071bd',
            },
        ],
    }



    const options = {
        scales: {
            y:
            {
                ticks: {
                    beginAtZero: true,
                },
            },

        },
    };


    return (
        <>
            <Row className='chart-header'>
                <Typography.Title level={2} className="chart-title">
                    {coinName} Price Chart
                </Typography.Title>
                <Col className='price-container'>
                    <div className='price-change'>Change: {change} %</div>
                    <div className='price-change'>Current {coinName}'s Price $ {currentPrice} </div>
                </Col>
            </Row>
            <Line data={data} options={options} />
        </>
    )
}

export default Linechart;