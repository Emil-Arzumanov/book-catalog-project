import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import { getDocs, collection } from "firebase/firestore";
import {dataBase} from "../../config/firebase-config";

export const getBooksForLibrary = createAsyncThunk(
    "books/getBooks",
    async ({},thunkAPI) => {
        try {
            const booksCollection = collection(dataBase, 'books');
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


const bookListSlice = createSlice({
    name: 'bookList',
    initialState: {
        isLibraryReceived: false,
        books: null,
        chosenFilter: "year",
        isAddBookMenuVisible: false,
        addBookMenuInputs: {
            title: "",
            authors:[],
            year: "",
            rating: "",
            ISBN: "",
        },
    },
    reducers: {
        updateFilter(state, action) {
            if (state.isLibraryReceived === "fulfilled")
                state.chosenFilter = action.payload;
        },
        updateIsAddBookMenuVisible(state) {
            state.isAddBookMenuVisible = ! state.isAddBookMenuVisible;
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
    },
})

const { actions, reducer } = bookListSlice
export const {
    updateFilter,
    updateIsAddBookMenuVisible
} = actions
export default reducer