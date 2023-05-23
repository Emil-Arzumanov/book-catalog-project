import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import { getDocs, collection, addDoc, doc, updateDoc, deleteDoc } from "firebase/firestore";
import {db} from "../../config/firebase-config";

const booksCollection = collection(db, 'books');

export const getBooksForLibrary = createAsyncThunk(
    "books/getBooks",
    async ({},thunkAPI) => {
        try {
            const data = await getDocs(booksCollection);
            const response = data.docs.map((elem) => {
                return {...elem.data(), id: elem.id}
            });
            return response;
        } catch (error) {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();
            console.log(message);
            return thunkAPI.rejectWithValue(message);
        }
    }
)

export const addBookToLibrary = createAsyncThunk(
    "books/addBook",
    async ({id,title,authors,releaseDate,rating,ISBN}, thunkAPI) => {
        try {
            await addDoc(booksCollection, {
                ISBN,
                authors,
                rating,
                releaseDate,
                title
            });
            thunkAPI.dispatch(getBooksForLibrary({}));
        } catch (error) {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();
            console.log(message);
            return thunkAPI.rejectWithValue(message);
        }
    }
);

export const editBookFromLibrary = createAsyncThunk(
    "books/editBook",
    async ({id,title,authors,releaseDate,rating,ISBN}, thunkAPI) => {
        try {
            const bookRef = doc(db, "books", id);
            await updateDoc(bookRef, {
                title,
                authors,
                releaseDate,
                rating,
                ISBN
            });
            thunkAPI.dispatch(getBooksForLibrary({}));
        } catch (error) {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();
            console.log(message);
            return thunkAPI.rejectWithValue(message);
        }
    }
);

export const deleteBookFromLibrary = createAsyncThunk(
    "books/deleteBook",
    async ({id}, thunkAPI) => {
        try {
            await deleteDoc(doc(db, "books", id));
            thunkAPI.dispatch(getBooksForLibrary({}));
        } catch (error) {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();
            console.log(message);
            return thunkAPI.rejectWithValue(message);
        }
    }
);


const bookListSlice = createSlice({
    name: 'bookList',
    initialState: {
        requestStatuses: {
            isLibraryReceived: false,
            isBookCreated: false,
            isBookEdited: false,
            isBookDeleted: false,
        },
        books: null,
        chosenFilter: "year",
        isAddBookMenuVisible: false,
        isEditBookMenuVisible: false,
        currentlyEditingBookData: null
    },
    reducers: {
        updateFilter(state, action) {
            if (state.requestStatuses.isLibraryReceived === "fulfilled")
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
            state.isLibraryReceived = "fulfilled";
        })
        builder.addCase(getBooksForLibrary.pending, (state) => {
            state.isLibraryReceived = "pending";
        })
        builder.addCase(getBooksForLibrary.rejected, (state) => {
            state.books = null;
            state.isLibraryReceived = "rejected";
        })
        builder.addCase(addBookToLibrary.fulfilled, (state, action) => {
            state.isBookCreated = "fulfilled";
        })
        builder.addCase(addBookToLibrary.pending, (state) => {
            state.isBookCreated = "pending";
        })
        builder.addCase(addBookToLibrary.rejected, (state) => {
            state.isBookCreated = "rejected";
        })
        builder.addCase(editBookFromLibrary.fulfilled, (state, action) => {
            state.isBookEdited = "fulfilled";
        })
        builder.addCase(editBookFromLibrary.pending, (state) => {
            state.isBookEdited = "pending";
        })
        builder.addCase(editBookFromLibrary.rejected, (state) => {
            state.isBookEdited = "rejected";
        })
        builder.addCase(deleteBookFromLibrary.fulfilled, (state, action) => {
            state.isBookDeleted = "fulfilled";
        })
        builder.addCase(deleteBookFromLibrary.pending, (state) => {
            state.isBookDeleted = "pending";
        })
        builder.addCase(deleteBookFromLibrary.rejected, (state) => {
            state.isBookDeleted = "rejected";
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