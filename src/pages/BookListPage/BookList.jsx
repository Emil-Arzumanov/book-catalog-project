import React from 'react';
import {useDispatch, useSelector} from "react-redux";

const BookList = () => {
    const shipsList = useSelector((state) => state.books);
    const dispatch = useDispatch();

    return (
        <div>
            BookList
        </div>
    );
};

export default BookList;