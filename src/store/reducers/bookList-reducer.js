import {createSlice} from "@reduxjs/toolkit";

const bookListSlice = createSlice({
    name: 'bookList',
    initialState: {
        books: [
            {
                ISBN: "978-5-459-01044-2",
                authors: ["Роберт Мартин"],
                id: 1,
                rating: 5,
                releaseDate: 2011,
                title: "Идеальный программист. Как стать профессионалом разработки ПО"
            },
            {
                ISBN: "978-5-459-01044-2",
                authors: ["Роберт Мартин"],
                id: 2,
                rating: 5,
                releaseDate: 2011,
                title: "Идеальный программист. Как стать профессионалом разработки ПО"
            },
            {
                ISBN: "978-5-459-01044-2",
                authors: ["Роберт Мартин"],
                id: 3,
                rating: 5,
                releaseDate: 2011,
                title: "Идеальный программист. Как стать профессионалом разработки ПО"
            }
        ],
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