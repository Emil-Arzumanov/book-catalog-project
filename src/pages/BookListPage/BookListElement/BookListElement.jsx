import React from 'react';
import book from "../../../imgs/bookImg.png";
import {useDispatch, useSelector} from "react-redux";
import cl from "./BookListElement.module.css";
import BookRedactor from "../BookRedactor/BookRedactor";
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
                booksSlice.books.map((elem,index,prev) => {
                    return (
                        <section key={elem.id}>
                            <section className={cl.list__element}>
                                <div className={cl.element__imgWrap}><img src={book} alt="BOOK"/></div>
                                <div className={cl.element__info}>
                                    <h2>{elem.title}</h2>
                                    <div className={cl.info__mainWrap}>
                                        <section className={cl.mainWrap__sectionWrap}>
                                            <div className={cl.sectionWrap__authors}>Authors:
                                                {elem.authors.map((author) => {
                                                    return <div key={author}>{author}</div>
                                                })}
                                            </div>
                                            <p>Year: {elem.releaseDate}</p>
                                        </section>
                                        <section className={cl.mainWrap__sectionWrap}>
                                            <p>Rating: {elem.rating}</p>
                                            <p>ISBN: {elem.ISBN}</p>
                                        </section>
                                    </div>
                                </div>
                                <div className={cl.element__buttons}>
                                    <button onClick={() => {
                                        dispatch(updateIsEditBookMenuVisible(elem))
                                    }}>Edit</button>
                                    <button onClick={() => {
                                        dispatch(deleteBookFromLibrary({id: elem.id}))
                                    }}>Delete</button>
                                </div>
                            </section>
                            {
                                booksSlice.isEditBookMenuVisible
                                    ? <BookRedactor buttonName={"Edit"}
                                                    menuSwitcher={updateIsEditBookMenuVisible}
                                                    submitFunction={editBookFromLibrary}
                                    />
                                    : ""
                            }
                        </section>
                    )
                })
            }
        </section>
    );
};

export default BookListElement;