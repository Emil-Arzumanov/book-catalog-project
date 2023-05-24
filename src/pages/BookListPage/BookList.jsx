import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {
    addBookToLibrary,
    getBooksForLibrary, getRecommendedBookForLibrary,
    updateIsAddBookMenuVisible,
} from "../../store/reducers/bookList-reducer";
import cl from "./BookList.module.css"
import BookListElement from "./BookListElement/BookListElement";
import BookMenu from "./BookMenu/BookMenu";
import book from "../../imgs/bookImg.png";

const BookList = () => {
    const booksSlice = useSelector((state) => state.books);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getRecommendedBookForLibrary({}))
        dispatch(getBooksForLibrary({filter:"releaseDate"}))
    },[])

    return (
        <main className={cl.main}>
            <section className={cl.main__sectionsWrap}>
                <section className={cl.sectionsWrap__filter}>
                    <p className={cl.filter__p}>Filter By:</p>
                    <section className={booksSlice.requestStatuses.isLibraryReceived === "pending"
                        ? cl.filter__options__pending
                        : cl.filter__options}>
                        <button className={booksSlice.chosenFilter === "releaseDate" ? cl.chosen : ""}
                                onClick={() => {
                                    if(booksSlice.chosenFilter !== "releaseDate")
                                        dispatch(getBooksForLibrary({filter:"releaseDate"}))
                                }}>YEAR</button>
                        <button className={booksSlice.chosenFilter === "authors" ? cl.chosen : ""}
                                onClick={() => {
                                    if(booksSlice.chosenFilter !== "authors")
                                        dispatch(getBooksForLibrary({filter:"authors"}))
                                }}>AUTHOR</button>
                        <button className={booksSlice.chosenFilter === "rating" ? cl.chosen : ""}
                                onClick={() => {
                                    if(booksSlice.chosenFilter !== "rating")
                                        dispatch(getBooksForLibrary({filter:"rating"}))
                                }}>RATING</button>
                    </section>
                </section>
                {
                    booksSlice.recommendedBook
                        ?
                        <section className={cl.sectionsWrap__recommendedBook}>
                            <h3>Recommended book:</h3>
                            <section className={cl.recommendedBook__element}>
                                <div className={cl.element__imgWrap}><img src={book} alt="BOOK"/></div>
                                <div className={cl.element__info}>
                                    <h2>{booksSlice.recommendedBook.title}</h2>
                                    <div className={cl.info__mainWrap}>
                                        <section className={cl.mainWrap__sectionWrap}>
                                            <div className={cl.sectionWrap__authors}>Authors: {booksSlice.recommendedBook.authors}</div>
                                            <p>Year: {booksSlice.recommendedBook ? booksSlice.recommendedBook.releaseDate : "No data"}</p>
                                        </section>
                                        <section className={cl.mainWrap__sectionWrap}>
                                            <p>Rating: {booksSlice.recommendedBook ? booksSlice.recommendedBook.rating : "No data"}</p>
                                            <p>ISBN: {booksSlice.recommendedBook ? booksSlice.recommendedBook.ISBN : "No data"}</p>
                                        </section>
                                    </div>
                                </div>
                            </section>
                        </section>
                        : ""
                }
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
                        ? <BookMenu buttonName={"Submit"}
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