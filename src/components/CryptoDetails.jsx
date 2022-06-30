import React, { useState, useEffect } from 'react';
import Loader from './Loader';
import HTMLReactParser from 'html-react-parser';
import { useParams, Link } from 'react-router-dom';
import millify from 'millify';
import { Col, Row, Typography, Select, Button } from 'antd';
import { MoneyCollectOutlined, DollarCircleOutlined, FundOutlined, ExclamationCircleOutlined, StopOutlined, TrophyOutlined, CheckOutlined, NumberOutlined, ThunderboltOutlined } from '@ant-design/icons';

import { useGetCryptoQuery, useGetCryptoHistoryQuery } from '../services/cryptoApi';
import Linechart from './Linechart';

const { Title, Text } = Typography;
const { Option } = Select;

const CryptoDetails = () => {
    const statsModel = [
        { title: 'Price to USD', value: `$ 0`, icon: <DollarCircleOutlined />, key: 'price' },
        { title: 'Rank', value: 0, icon: <NumberOutlined />, key: 'rank' },
        // { title: '24h Volume', value: '0', icon: <ThunderboltOutlined />, key: '24hVolume' },
        { title: 'Market Cap', value: `$ 0`, icon: <DollarCircleOutlined />, key: 'marketCap' },
        { title: 'All-time-high(daily avg.)', value: `$ 0`, icon: <TrophyOutlined />, key: { allTimeHigh: { key: 'price' } } },
    ]

    const genericStatsModel = [
        { title: 'Number Of Markets', value: 0, icon: <FundOutlined />, key: 'numberOfMarkets' },
        { title: 'Number Of Exchanges', value: 0, icon: <MoneyCollectOutlined />, key: 'numberOfExchanges' },
        { title: 'Total Supply', value: 0, icon: <ExclamationCircleOutlined />, key: { supply: { key: 'total' } } },
        { title: 'Circulating Supply', value: 0, icon: <ExclamationCircleOutlined />, key: { supply: { key: 'circulating' } } },
    ]

    const chartDataModel = {
        history: [{ price: '', timestamp: '' }],
        change: null,
        currentPrice: null,
        name: ''
    }

    const { coinId } = useParams();
    const [timePeriod, setTimePeriod] = useState('7d');
    const [coinDetail, setCoinDetail] = useState();
    const [stats, setStats] = useState(statsModel);
    const [genericStats, setGenericStats] = useState(genericStatsModel);
    const [chartData, setChartData] = useState(chartDataModel)

    const { data: cryptoDetails, isFetching } = useGetCryptoQuery(coinId);
    const { data: cryptoHistory } = useGetCryptoHistoryQuery({ coinId, timePeriod })


    const time = ['3h', '24h', '7d', '30d', '1y', '3m', '3y', '5y'];

    useEffect(() => {
        console.log('Histoey Data', cryptoHistory)
        setCoinDetail(() => cryptoDetails?.data?.coin)
    }, [cryptoDetails]);

    useEffect(() => {
        setStats((prev) => updateModel(prev));

        setGenericStats((prev) => updateModel(prev));

        setChartData(() => {
            return {
                history: cryptoHistory?.data?.history,
                change: cryptoHistory?.data?.change,
                name: coinDetail?.name,
                currentPrice: (coinDetail?.price && millify(coinDetail?.price))
            }
        })
    }, [coinDetail, cryptoHistory])

    const updateModel = (prevState) => {

        const newState = prevState.map((item) => {
            let newItem = {};

            if (typeof (item.key) !== 'object') {
                newItem = {
                    ...item,
                    value: `${item.key !== 'rank' ? '$' : ''}  ${coinDetail?.[item.key] && millify(coinDetail?.[item.key])}`
                }
            } else {
                const temp = item.key;

                const key1 = Object.keys(temp)[0]

                newItem = {
                    ...item,
                    value: `$ ${coinDetail?.[key1]?.[temp[key1].key] && millify(coinDetail?.[key1]?.[temp[key1].key])}`
                }
            }

            return newItem;
        })

        return newState
    }

    return (
        <>
            {
                isFetching ?
                    <Loader /> : (
                        <Col className='coin-detail-container'>
                            <Col className='coin-heading-container'>
                                <Title level={2} className='coin-name'>
                                    {coinDetail?.name}
                                </Title>
                                <p>
                                    {coinDetail?.name} live price in US dollars.
                                    View value statistics, market cap and supply
                                </p>
                            </Col>
                            <Select
                                defaultValue='7d'
                                className='select-timeperiod'
                                placeholder='Select Time Period'
                                onChange={(value) => setTimePeriod(value)}
                                style={{ marginBottom: '1rem' }}
                            >
                                {time.map((period, index) => (<Option key={index} value={period}>{period}</Option>))}
                            </Select>

                            {
                                chartData &&
                                <Linechart
                                    coinHistory={chartData.history}
                                    currentPrice={chartData.currentPrice}
                                    change={chartData.change}
                                    coinName={chartData.name}
                                />
                            }

                            <div className="exchange-button">
                                <Button type='primary' shape='round'>
                                    <Link to={`/crypto/${coinDetail?.uuid}/exchanges`}>
                                        Check Exchanges for {coinDetail?.name}
                                    </Link>
                                </Button>
                            </div>

                            <Col className='stats-container'>
                                <Col className='coin-value-statistics'>
                                    <Col className='coin-value-statistics-heading'>
                                        <Title level={3} className='coin-detailes-heading'>
                                            {coinDetail?.name} Market Statistics
                                        </Title>
                                        <p>
                                            An Overview showing the stats of {coinDetail?.name}
                                        </p>
                                    </Col>
                                    {
                                        stats?.map(({ icon, title, value }, index) => (
                                            <Col className='coin-stats' key={index}>
                                                <Col className='coin-stats-name'>
                                                    <Text>{icon}</Text>
                                                    <Text>{title}</Text>
                                                </Col>
                                                <Text className='stats'>{value}</Text>
                                            </Col>
                                        ))
                                    }
                                    <Col className='coin-stats'>
                                        <Col className='coin-stats-name'>
                                            <Text><ThunderboltOutlined /></Text>
                                            <Text>24h Volume</Text>
                                        </Col>
                                        <Text className='stats'>{coinDetail?.['24hVolume'] && millify(coinDetail?.['24hVolume'])}</Text>
                                    </Col>
                                </Col>
                                <Col className='other-stats-info'>
                                    <Col className='coin-value-statistics-heading'>
                                        <Title level={3} className='coin-detailes-heading'>
                                            All Crypto Statistics
                                        </Title>
                                        <p>
                                            An Overview showing the stats of All Cryptocurrencies.
                                        </p>
                                    </Col>
                                    {
                                        genericStats?.map(({ icon, title, value }, index) => (
                                            <Col className='coin-stats' key={index}>
                                                <Col className='coin-stats-name'>
                                                    <Text>{icon}</Text>
                                                    <Text>{title}</Text>
                                                </Col>
                                                <Text className='stats'>{value}</Text>
                                            </Col>
                                        ))
                                    }
                                    <Col className='coin-stats'>
                                        <Col className='coin-stats-name'>
                                            <Text>
                                                <ExclamationCircleOutlined />
                                            </Text>
                                            <Text>Approved Supply</Text>
                                        </Col>
                                        <Text className='stats'>{coinDetail?.supply?.confirmed ? <CheckOutlined /> : <StopOutlined />}</Text>
                                    </Col>
                                </Col>
                            </Col>
                            <Col className='coin-desc-link'>
                                <Row className='coin-desc'>
                                    <Title level={3} className="coin-detail-heading">
                                        What is {coinDetail?.name}
                                        {coinDetail?.description && HTMLReactParser(coinDetail?.description)}
                                    </Title>
                                </Row>
                                <Col className='coin-links'>
                                    <Title level={3} className="coin-details-heading">
                                        {coinDetail?.name} Links
                                    </Title>
                                    {coinDetail?.links.map((link) => (
                                        <Row className='coin-link' key={link.name}>
                                            <Title level={5} className="link-name">
                                                {link.type}
                                            </Title>
                                            <a href={link.url} target="_blank">
                                                {link.name}
                                            </a>
                                        </Row>
                                    ))}
                                </Col>
                            </Col>
                        </Col>
                    )
            }
        </>
    )
}

export default CryptoDetails