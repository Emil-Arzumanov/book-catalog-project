import React from 'react';
import {useDispatch, useSelector} from "react-redux";

const Main = () => {
    const shipsList = useSelector((state) => state.books);
    const dispatch = useDispatch();

    return (
        <div>
            Main
        </div>
    );
};

export default Main;