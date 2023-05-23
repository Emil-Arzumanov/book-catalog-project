import React from 'react';
import cl from "./BookRedactor.module.css";
import {useDispatch, useSelector} from "react-redux";
import {Formik} from "formik";
import {checkIfBookAlreadyExists} from "../../../helpers/helpers";

const BookRedactor = ({submitFunction, buttonName, menuSwitcher}) => {
    const booksSlice = useSelector((state) => state.books);
    const elementData = booksSlice.currentlyEditingBookData;
    const dispatch = useDispatch();

    return (
        <section className={cl.redactorWrap}>
            <div className={cl.redactorWrap__redactor}>
                <Formik
                    initialValues={{
                        title: elementData ? elementData.title : "",
                        authors: elementData ? elementData.authors.join(",") : "",
                        year: elementData ? elementData.releaseDate : "",
                        rating: elementData ? elementData.rating : 0,
                        ISBN: elementData ? elementData.ISBN : ""
                    }}
                    validate={values => {
                        const errors = {};
                        if (!values.title) {
                            errors.title = 'Required';
                        }
                        if (values.title.length > 100) {
                            errors.title = 'No more than 100 characters';
                        }
                        if (!values.authors) {
                            errors.authors = 'At least one author is required';
                        }
                        if (values.year < 1800 && values.year !== "") {
                            errors.year = 'Not earlier than 1800';
                        }
                        if (values.rating < 0 || values.rating > 10) {
                            errors.rating = 'Must be a number from 0 to 10';
                        }
                        return errors;
                    }}
                    onSubmit={(values, {setSubmitting}) => {
                        if (!elementData && checkIfBookAlreadyExists(values.title,booksSlice.books)) {
                            alert("Book with this title already exists")
                            setSubmitting(false);
                        } else {
                            let authorsArray = values.authors.split(",");
                            dispatch(submitFunction({
                                id: elementData ? elementData.id : null,
                                title: values.title,
                                authors: authorsArray,
                                releaseDate: values.year,
                                rating: values.rating,
                                ISBN: values.ISBN
                            }))
                            dispatch(menuSwitcher())
                            setSubmitting(false);
                        }
                    }}
                >
                    {({values, errors, handleChange, handleSubmit, isSubmitting}) => (
                        <form className={cl.redactor__form} onSubmit={handleSubmit}>
                            <div className={cl.form__h2Wrap}>
                                <h2>Enter Book Details</h2>
                            </div>
                            <div className={cl.form_inputs}>
                                <div className={cl.inputs_left}>
                                    <div>
                                        <p>Title</p>
                                        <input
                                            type="title"
                                            name="title"
                                            onChange={handleChange}
                                            value={values.title}
                                            className={errors.title ? cl.input__error : ""}
                                        />
                                        <span>{errors.title}</span>
                                    </div>
                                    <div className={cl.left__authors}>
                                        <p>Authors</p>
                                        <input
                                            type="authors"
                                            name="authors"
                                            onChange={handleChange}
                                            value={values.authors}
                                            className={errors.authors ? cl.input__error : ""}
                                        />
                                        <span>{errors.authors}</span>
                                        <p>Example: Kass Morgan, Danielle Paige</p>
                                    </div>
                                </div>
                                <div className={cl.inputs_right}>
                                    <div>
                                        <p>Release Year</p>
                                        <input
                                            type="number"
                                            name="year"
                                            onChange={handleChange}
                                            value={values.year}
                                            className={errors.year ? cl.input__error : ""}
                                        />
                                        <span>{errors.year}</span>
                                    </div>
                                    <div>
                                        <p>Rating from 0 to 10</p>
                                        <input
                                            type="number"
                                            name="rating"
                                            onChange={handleChange}
                                            value={values.rating}
                                            className={errors.rating ? cl.input__error : ""}
                                        />
                                        <span>{errors.rating}</span>
                                    </div>
                                    <div>
                                        <p>ISBN</p>
                                        <input
                                            type="ISBN"
                                            name="ISBN"
                                            onChange={handleChange}
                                            value={values.ISBN}
                                            className={errors.ISBN ? cl.input__error : ""}
                                        />
                                        <span>{errors.ISBN}</span>
                                    </div>
                                </div>
                            </div>
                            <div className={cl.form__buttons}>
                                <button type="button" onClick={() => {
                                    dispatch(menuSwitcher())
                                }}>Cancel</button>
                                <button type="submit" disabled={isSubmitting}>{buttonName}</button>
                            </div>
                        </form>
                    )}
                </Formik>
            </div>
        </section>
    );
};

export default BookRedactor;