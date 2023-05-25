import React from 'react';
import book from "../../../imgs/bookImg.png";
import {useDispatch, useSelector} from "react-redux";
import cl from "./BookListElement.module.css";
import BookMenu from "../BookMenu/BookMenu";
import {
    deleteBookFromLibrary,
    editBookFromLibrary,
    updateIsEditBookMenuVisible
} from "../../../store/reducers/bookList-reducer";

const BookListElement = () => {
    const booksSlice = useSelector((state) => state.books);
    const dispatch = useDispatch();

    return (
        <section>
            {
                booksSlice.books.map((elementArr) => {
                    return elementArr.map((elem, index) => {
                        return (
                            <section key={elem.id}>
                                {
                                    index === 0
                                        ?
                                        <p className={cl.element__filter}>
                                            {booksSlice.chosenFilter.toUpperCase()}: {
                                            elem[booksSlice.chosenFilter] === 0 && booksSlice.chosenFilter === "releaseDate"
                                                ? "No data"
                                                : elem[booksSlice.chosenFilter]
                                        }
                                        </p>
                                        : ""
                                }
                                <section className={cl.list__element}>
                                    <div className={cl.element__imgWrap}><img src={book} alt="BOOK"/></div>
                                    <div className={cl.element__info}>
                                        <h2>{elem.title}</h2>
                                        <div className={cl.info__mainWrap}>
                                            <section className={cl.mainWrap__sectionWrap}>
                                                <div className={cl.sectionWrap__authors}>Authors: {elem.authors}</div>
                                                <p>Year: {elem.releaseDate ? elem.releaseDate : "No data"}</p>
                                            </section>
                                            <section className={cl.mainWrap__sectionWrap}>
                                                <p>Rating: {elem.rating}</p>
                                                <p>ISBN: {elem.ISBN ? elem.ISBN : "No data"}</p>
                                            </section>
                                        </div>
                                    </div>
                                    <div className={cl.element__buttons}>
                                        <button onClick={() => {
                                            dispatch(updateIsEditBookMenuVisible(elem))
                                        }}>Edit</button>
                                        <button onClick={() => {
                                            dispatch(deleteBookFromLibrary({id: elem.id,filter: booksSlice.chosenFilter}))
                                        }}>Delete</button>
                                    </div>
                                </section>
                                {
                                    booksSlice.isEditBookMenuVisible
                                        ? <BookMenu buttonName={"Edit"}
                                                    menuSwitcher={updateIsEditBookMenuVisible}
                                                    submitFunction={editBookFromLibrary}
                                        />
                                        : ""
                                }
                            </section>
                        );
                    })
                })
            }
        </section>
    );
};

export default BookListElement;