import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";

export const Home = () => {

    const { store } = useContext(Context)


    return (
        <>
            {!store.isAuthenticated ? <h3>Inicia sesión para ver todas las funciones!</h3> : <h1>Bienvenido!</h1>}
        </>

    );

};