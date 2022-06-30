import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { Layout, Typography } from 'antd';
import './App.css';

import { Navbar, Homepage, Exchanges, Cryptocurrencies, CryptoDetails, News } from './components'



function App() {
  return (
    <div className="app">
      <div className='navbar'>
        <Navbar />
      </div>
      <div className='main'>
        <Layout>
          <div className='routes'>
            <Routes>
              <Route path='/' element={<Homepage />} />
            </Routes>
            <Routes >
              <Route path="/crypto/:coinId/exchanges" element={<Exchanges />} />
            </Routes>
            <Routes>
              <Route path="/cryptocurrencies" element={<Cryptocurrencies />} />
            </Routes>
            <Routes>
              <Route path="/crypto/:coinId" element={<CryptoDetails />} />
            </Routes>
            <Routes>
              <Route path="/news" element={<News />} />
            </Routes>
          </div>
        </Layout>
        <div className='footer'>
          <Typography.Title level={5} style={{ color: 'white', textAlign: 'center' }}>
            CryptoLand <br />
            All Rights Reserved
          </Typography.Title>
        </div>
      </div>
    </div>
  );
}

export default App;
