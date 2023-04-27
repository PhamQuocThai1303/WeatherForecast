import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { useMutation } from 'react-query';
import axios from 'axios';



const API_key = `c398b06e8da4a38625ed23998f31cbcc`;


export const weatherApi = createApi({
    reducerPath: 'weatherApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://api.openweathermap.org',
    }),
    endpoints: (builder) => ({
        getCurrentWeather: builder.query({ query: ({ lat, lon }) => `/data/2.5/weather?lat=${lat}&lon=${lon}&exclude=current&appid=${API_key}` }),
        get5DaysWeather: builder.query({ query: ({ lat, lon }) => `/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_key}` }),
        getSearchLocation: builder.query({ query: (name) => `/geo/1.0/direct?q=${name}&limit=1&appid=${API_key}` }),
        getAirPollution: builder.query({ query: ({ lat, lon }) => `/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${API_key}` }),
    })
})

export const {
    useGetCurrentWeatherQuery,
    useGet5DaysWeatherQuery,
    useGetSearchLocationQuery,
    useGetAirPollutionQuery,
} = weatherApi
