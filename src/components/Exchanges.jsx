import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useGetExchangesQuery } from '../services/cryptoApi'
import millify from 'millify'
import Loader from './Loader'

import { Row, Col, Typography, Avatar } from 'antd'

const { Text } = Typography;

const Exchanges = () => {
  const count = 10;
  const [exchanges, setExchanges] = useState();
  const { coinId } = useParams();
  const { data: cryptoExchanges, isFetching } = useGetExchangesQuery({ coinId, count });

  useEffect(() => {
    setExchanges(() => cryptoExchanges?.data?.exchanges)
  }, [cryptoExchanges, count])
  return (
    <>
      {isFetching ?
        <Loader /> :
        (
          <>
            <Row style={{ borderBottom: '1px solid #777' }}>
              <Col span={2}>Rank</Col>
              <Col span={6}>Exchange</Col>
              <Col span={6}>24h Trade Volume</Col>
              <Col span={6}>Markets</Col>
            </Row>
            <Row style={{ display: 'flex', flexDirection: 'column' }}>
              {
                exchanges?.map((exchange, index) => (
                  <Row className='exchange-details'>
                    <Col span={2}>
                      <Text><strong>{exchange?.rank}</strong></Text>
                    </Col>
                    <Col span={6}>
                      <Avatar className='exchange-image' src={exchange?.iconUrl} />
                      <Text><strong>{exchange?.name}</strong></Text>
                    </Col>
                    <Col span={6}>{exchange?.['24hVolume'] && millify(exchange?.['24hVolume'])}</Col>
                    <Col span={6}>{exchange?.numberOfMarkets}</Col>
                  </Row>
                ))
              }

            </Row>
          </>
        )
      }
    </>
  )
}

export default Exchanges