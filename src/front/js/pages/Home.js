import React, { useContext } from "react";
import { appContext } from "../store/appContext";

export const Home = () => {

    const { state } = useContext(appContext)


    return (
        <>
            {!state.isAuthenticated ? <h3>Inicia sesión para ver todas las funciones!</h3> : <h1>Bienvenido!</h1>}
        </>

    );

};