import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isOpen: false,
    Modaldata: {}
};

const modalSlice = createSlice({
    name: 'modal',
    initialState,
    reducers: {
        updateState: (state, action) => {
            state.Modaldata = action.payload;
        },
        closeModal: (state) => {
            state.isOpen = false
        },
        openModal: (state) => {
            state.isOpen = true
        }
    }
})

export const { updateState, openModal, closeModal } = modalSlice.actions

export default modalSlice.reducer