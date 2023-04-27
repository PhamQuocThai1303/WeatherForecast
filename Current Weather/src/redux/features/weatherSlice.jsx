import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    data: {},
};

const weatherSlice = createSlice({
    name: 'weather',
    initialState,
    reducers: {
        updateState: (state, action) => {
            state.data = action.payload;
        },
    }
})

export const { updateState } = weatherSlice.actions

export default weatherSlice.reducer