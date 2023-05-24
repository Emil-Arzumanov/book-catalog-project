import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import { getDocs, collection, addDoc, doc, updateDoc, deleteDoc, orderBy, query } from "firebase/firestore";
import {db} from "../../config/firebase-config";

export const getBooksForLibrary = createAsyncThunk(
    "books/getBooks",
    async ({filter},thunkAPI) => {
        try {
            const booksQuery = query(collection(db, 'books'), orderBy(filter, "desc"));
            const data = await getDocs(booksQuery);
            const response = data.docs.map((elem) => {
                return {...elem.data(), id: elem.id}
            });
            thunkAPI.dispatch(updateFilter(filter))
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
        },
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
    },
})

const { actions, reducer } = bookListSlice
export const {
    updateFilter,
    updateIsAddBookMenuVisible,
    updateIsEditBookMenuVisible
} = actions
export default reducer