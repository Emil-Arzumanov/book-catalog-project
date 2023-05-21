import {configureStore} from "@reduxjs/toolkit";
import bookListSlice from "./reducers/bookList-reducer"

const store = configureStore({
    reducer: {
        books: bookListSlice
    },
    devTools: true
})

export default store;