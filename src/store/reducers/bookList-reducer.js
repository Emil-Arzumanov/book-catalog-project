import {createSlice} from "@reduxjs/toolkit";

const bookListSlice = createSlice({
    name: 'bookList',
    initialState: {
        book: ""
    },
    reducers: {
        updateBook(state, action) {
            state.book = action.payload;
        },
    },
})

const { actions, reducer } = bookListSlice
export const {
    updateBook
} = actions
export default reducer