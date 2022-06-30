import React, { useEffect, useState } from 'react';
import { Select, Typography, Row, Col, Avatar, Card } from 'antd';
import moment from 'moment';
import Loader from './Loader';
import { useGetCryptoNewsQuery } from '../services/cryptoNewsApi';
import { useGetCryptosQuery } from '../services/cryptoApi';

const { Title, Text } = Typography;
const { Option } = Select;

const demoImage = 'https://www.bing.com/th?id=OVFT.mpzuVZnv8dwIMRfQGPbOPC&pid=News';

const News = ({ simplified }) => {
    const count = simplified ? 6 : 12;

    const [newsList, setNewsList] = useState(null);
    const [newsCategoryList, setNewsCategoryList] = useState(null)
    const [newsCategory, setNewsCategory] = useState('Cryptocurrency')

    const { data: cryptoNewsList, isFetching } = useGetCryptoNewsQuery({ newsCategory: newsCategory, count: count });
    const { data: cryptoList } = useGetCryptosQuery(count);

    useEffect(() => {
        setNewsList(cryptoNewsList?.value);

        const coins = cryptoList?.data?.coins;

        setNewsCategoryList(() => coins?.map(coin => coin.name))
    }, [cryptoNewsList, newsCategory])
    return (
        <Row gutter={[24, 24]}>
            {
                !simplified &&
                <Col span={24}>
                    <Select
                        showSearch
                        className='select-news'
                        placeholder="Select a Crypto"
                        optionFilterProp='children'
                        onChange={(value) => setNewsCategory(value)}
                        filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                    >
                        <Option value="Cryptocurrency">Cryptocurrency</Option>
                        {newsCategoryList?.map((category, index) => (<Option value={category} key={index}>{category}</Option>))}
                    </Select>
                </Col>

            }
            {
                isFetching ?
                    <Loader /> :
                    (
                        newsList?.map((news, index) => (
                            <Col key={index} xs={24} sm={12} lg={8}>
                                <Card hoverable className='news-card'>
                                    <a href={news.url} target="_blank" rel="noreffer">
                                        <div className="news-image-container">
                                            <Title level={4} className="news-title">{news.name}</Title>
                                            <img src={news?.image?.thumbnail?.contentUrl || demoImage} alt="news" />
                                        </div>
                                        <p>
                                            {
                                                news.description > 75 ?
                                                    `${news.description.substring(0, 75)}...`
                                                    : news.description
                                            }
                                        </p>
                                        <div className="provider-container">
                                            <div className="">
                                                <Avatar src={news.provider[0]?.image?.thumbnail?.contentUrl || demoImage} alt="provider" />
                                                <Text className='provider-name'>{news.provider[0]?.name}</Text>
                                            </div>
                                            <Text>{moment(news?.datePublished).startOf('ss').fromNow()}</Text>
                                        </div>
                                    </a>
                                </Card>
                            </Col>
                        ))
                    )
            }
        </Row>
    )
}

export default News