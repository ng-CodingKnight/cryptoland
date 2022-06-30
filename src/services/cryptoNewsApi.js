import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const cryptoHeaders = {
    'X-BingApis-SDK': 'true',
    'X-RapidAPI-Key': '4d313abdc6msh645112854c69c04p12799djsn632253bc59ad',
    'X-RapidAPI-Host': 'bing-news-search1.p.rapidapi.com'
}

const baseUrl = 'https://bing-news-search1.p.rapidapi.com';

const cryptoRequest = (url) => ({ url, headers: cryptoHeaders });

export const cryptoNewsApi = createApi({
    reducerPath: 'cryptoNewsApi',
    baseQuery: fetchBaseQuery({ baseUrl }),
    endpoints: (builder) => ({
        getCryptoNews: builder.query({
            query: ({ newsCategory, count }) => cryptoRequest(`news/search?q=${newsCategory}&safeSearch=Off&textFormat=Raw&freshness=Day&count=${count}`)
        })
    })
})

export const {
    useGetCryptoNewsQuery
} = cryptoNewsApi

// const options = {
//     method: 'GET',
//     url: 'https://bing-news-search1.p.rapidapi.com/news',
//     params: {safeSearch: 'Off', textFormat: 'Raw'},
//     headers: {
//       'X-BingApis-SDK': 'true',
//       'X-RapidAPI-Key': 'SIGN-UP-FOR-KEY',
//       'X-RapidAPI-Host': 'bing-news-search1.p.rapidapi.com'
//     }
//   };

