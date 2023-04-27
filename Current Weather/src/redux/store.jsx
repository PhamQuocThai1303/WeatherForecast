import { configureStore } from '@reduxjs/toolkit';

import weatherReducer from './features/weatherSlice';

import modalReducer from './features/modalSlice'

import { weatherApi } from './services/weatherAPI';

export const store = configureStore({
    reducer: {
        [weatherApi.reducerPath]: weatherApi.reducer,
        weather: weatherReducer,
        modal: modalReducer,

    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(weatherApi.middleware)
});
