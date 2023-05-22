import React from 'react';
import bookImg from "../../imgs/mainImage.png";
import cl from "./Main.module.css"
import {useNavigate} from "react-router-dom";

const Main = () => {
    const navigate = useNavigate();

    return (
        <main className={cl.main}>
            <section className={cl.main__buttonsWrap}>
                <div className={cl.main__buttons}>
                    <h1>Welcome to Bookler!</h1>
                    <button onClick={() => {
                        navigate("/library", {replace: true})
                    }}>To Library</button>
                </div>
            </section>
            <section className={cl.main__imgWrap}>
                <img src={bookImg} alt="BOOKS"/>
            </section>
        </main>
    );
};

export default Main;