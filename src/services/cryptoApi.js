import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const cryptoHeaders = {
    'X-RapidAPI-Key': '4d313abdc6msh645112854c69c04p12799djsn632253bc59ad',
    'X-RapidAPI-Host': 'coinranking1.p.rapidapi.com'
}

const baseUrl = 'https://coinranking1.p.rapidapi.com';

const cryptoRequest = (url) => ({ url, headers: cryptoHeaders })

export const cryptoApi = createApi({
    reducerPath: 'cryptoApi',
    baseQuery: fetchBaseQuery({ baseUrl }),
    endpoints: (builder) => ({
        getCryptos: builder.query({
            query: (count) => cryptoRequest(`/coins?limit=${count}`)
        }),
        getExchanges: builder.query({
            query: ({ coinId, count }) => cryptoRequest(`coin/${coinId}/exchanges?limit=${count}`)
        }),
        getCrypto: builder.query({
            query: (coinId) => cryptoRequest(`/coin/${coinId}`)
        }),
        getCryptoHistory: builder.query({
            query: ({ coinId, timePeriod }) => cryptoRequest(`/coin/${coinId}/history?timePeriod=${timePeriod}`)
        })

    })
})

export const {
    useGetCryptosQuery,
    useGetExchangesQuery,
    useGetCryptoQuery,
    useGetCryptoHistoryQuery
} = cryptoApi;

// const options = {
//     method: 'GET',
//     url: ,
//     params: {
//       referenceCurrencyUuid: 'yhjMzLPhuIDl',
//       timePeriod: '24h',
//       'tiers[0]': '1',
//       orderBy: 'marketCap',
//       orderDirection: 'desc',
//       limit: '50',
//       offset: '0'
//     },
//     headers: {
//      
//     }
//   };