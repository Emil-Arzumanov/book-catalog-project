import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import { getDocs, collection, addDoc, doc, updateDoc, deleteDoc, orderBy, query } from "firebase/firestore";
import {db} from "../../config/firebase-config";
import {findRecommended, sortBooksByAlphabet} from "../../helpers/helpers";

export const getBooksForLibrary = createAsyncThunk(
    "books/getBooks",
    async ({filter},thunkAPI) => {
        try {
            let booksQuery;
            if (filter === "authors") {
                booksQuery = query(collection(db, 'books'), orderBy(filter, "asc"));
            } else {
                booksQuery = query(collection(db, 'books'), orderBy(filter, "desc"));
            }
            const data = await getDocs(booksQuery);
            const response = data.docs.map((elem) => {
                return {...elem.data(), id: elem.id}
            });
            const sortedResponse = sortBooksByAlphabet(filter, response);
            thunkAPI.dispatch(updateFilter(filter))
            return sortedResponse;
        } catch (error) {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();
            console.log(error);
            return thunkAPI.rejectWithValue(message);
        }
    }
)

export const getRecommendedBookForLibrary = createAsyncThunk(
    "books/getRecommendedBook",
    async ({},thunkAPI) => {
        try {
            const booksQuery = query(collection(db, 'books'), orderBy("rating", "desc"));
            const data = await getDocs(booksQuery);
            const responseArray = data.docs.map((elem) => {
                return {...elem.data(), id: elem.id}
            });
            const response = findRecommended(responseArray);
            return response;
        } catch (error) {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();
            console.log(error);
            return thunkAPI.rejectWithValue(message);
        }
    }
)

export const addBookToLibrary = createAsyncThunk(
    "books/addBook",
    async ({id,title,authors,releaseDate,rating,ISBN,filter}, thunkAPI) => {
        try {
            const booksCollection = collection(db, 'books')
            await addDoc(booksCollection, {
                ISBN,
                authors,
                rating,
                releaseDate,
                title
            });
            thunkAPI.dispatch(getRecommendedBookForLibrary({}));
            thunkAPI.dispatch(getBooksForLibrary({filter: filter}));
        } catch (error) {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();
            console.log(error);
            return thunkAPI.rejectWithValue(message);
        }
    }
);

export const editBookFromLibrary = createAsyncThunk(
    "books/editBook",
    async ({id,title,authors,releaseDate,rating,ISBN,filter}, thunkAPI) => {
        try {
            const bookRef = doc(db, "books", id);
            await updateDoc(bookRef, {
                title,
                authors,
                releaseDate,
                rating,
                ISBN
            });
            thunkAPI.dispatch(getRecommendedBookForLibrary({}));
            thunkAPI.dispatch(getBooksForLibrary({filter: filter}));
        } catch (error) {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();
            console.log(error);
            return thunkAPI.rejectWithValue(message);
        }
    }
);

export const deleteBookFromLibrary = createAsyncThunk(
    "books/deleteBook",
    async ({id,filter}, thunkAPI) => {
        try {
            await deleteDoc(doc(db, "books", id));
            thunkAPI.dispatch(getRecommendedBookForLibrary({}));
            thunkAPI.dispatch(getBooksForLibrary({filter: filter}));
        } catch (error) {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();
            console.log(error);
            return thunkAPI.rejectWithValue(message);
        }
    }
);


const bookListSlice = createSlice({
    name: 'bookList',
    initialState: {
        requestStatuses: {
            isLibraryReceived: false,
            isRecommendedReceived: false,
        },
        recommendedBook: null,
        books: null,
        chosenFilter: "releaseDate",
        isAddBookMenuVisible: false,
        isEditBookMenuVisible: false,
        currentlyEditingBookData: null
    },
    reducers: {
        updateFilter(state, action) {
            state.chosenFilter = action.payload;
        },
        updateIsAddBookMenuVisible(state) {
            state.isAddBookMenuVisible = ! state.isAddBookMenuVisible;
        },
        updateIsEditBookMenuVisible(state, action) {
            state.isEditBookMenuVisible = ! state.isEditBookMenuVisible;
            if (state.currentlyEditingBookData) {
                state.currentlyEditingBookData = null
            } else {
                state.currentlyEditingBookData = action.payload
            }
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getBooksForLibrary.fulfilled, (state, action) => {
            state.books = action.payload;
            state.requestStatuses.isLibraryReceived = "fulfilled";
        })
        builder.addCase(getBooksForLibrary.pending, (state) => {
            state.requestStatuses.isLibraryReceived = "pending";
        })
        builder.addCase(getBooksForLibrary.rejected, (state) => {
            state.books = null;
            state.requestStatuses.isLibraryReceived = "rejected";
        })
        builder.addCase(getRecommendedBookForLibrary.fulfilled, (state, action) => {
            state.recommendedBook = action.payload;
            state.requestStatuses.isRecommendedReceived = "fulfilled";
        })
        builder.addCase(getRecommendedBookForLibrary.pending, (state) => {
            state.requestStatuses.isRecommendedReceived = "pending";
        })
        builder.addCase(getRecommendedBookForLibrary.rejected, (state) => {
            state.books = null;
            state.requestStatuses.isRecommendedReceived = "rejected";
        })
    },
})

const { actions, reducer } = bookListSlice
export const {
    updateFilter,
    updateIsAddBookMenuVisible,
    updateIsEditBookMenuVisible
} = actions
export default reducer