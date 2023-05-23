import {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {
    addBookToLibrary,
    getBooksForLibrary,
    updateFilter,
    updateIsAddBookMenuVisible
} from "../../store/reducers/bookList-reducer";
import cl from "./BookList.module.css"
import BookListElement from "./BookListElement/BookListElement";
import BookRedactor from "./BookRedactor/BookRedactor";

const BookList = () => {
    const booksSlice = useSelector((state) => state.books);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getBooksForLibrary({}))
    },[booksSlice.chosenFilter])

    return (
        <main className={cl.main}>
            <section className={cl.main__sectionsWrap}>
                <section className={cl.sectionsWrap__filter}>
                    <p className={cl.filter__p}>Filter By:</p>
                    <section className={booksSlice.requestStatuses.isLibraryReceived === "pending"
                        ? cl.filter__options__pending
                        : cl.filter__options}>
                        <button className={booksSlice.chosenFilter === "year" ? cl.chosen : ""}
                                onClick={() => {
                                    dispatch(updateFilter("year"))
                                }}>YEAR</button>
                        <button className={booksSlice.chosenFilter === "author" ? cl.chosen : ""}
                                onClick={() => {
                                    dispatch(updateFilter("author"))
                                }}>AUTHOR</button>
                        <button className={booksSlice.chosenFilter === "rating" ? cl.chosen : ""}
                                onClick={() => {
                                    dispatch(updateFilter("rating"))
                                }}>RATING</button>
                    </section>
                </section>
                <section className={cl.sectionsWrap__addBook}>
                    <button onClick={() => {
                        dispatch(updateIsAddBookMenuVisible())
                    }}>ADD BOOK</button>
                    <p>CURRENTLY {booksSlice.books ? booksSlice.books.length : ""} BOOKS</p>
                </section>
                {
                    booksSlice.books
                        ? <BookListElement/>
                        : ""
                }
                {
                    booksSlice.isAddBookMenuVisible
                        ? <BookRedactor buttonName={"Submit"}
                                        menuSwitcher={updateIsAddBookMenuVisible}
                                        submitFunction={addBookToLibrary}
                        />
                        : ""
                }
            </section>
        </main>
    );
};

export default BookList;