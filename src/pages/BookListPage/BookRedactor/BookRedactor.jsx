import React from 'react';
import cl from "./BookRedactor.module.css";
import {useDispatch, useSelector} from "react-redux";

const BookRedactor = () => {
    const booksSlice = useSelector((state) => state.books);
    const dispatch = useDispatch();

    return (
        <section className={cl.redactorWrap}>
            <div className={cl.redactorWrap__redactor}>
            </div>
        </section>
    );
};

export default BookRedactor;