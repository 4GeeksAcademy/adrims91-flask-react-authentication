import React, { useContext, useEffect } from "react";
import { appContext } from "../store/appContext";
import { useNavigate } from "react-router-dom";

export const Home = () => {
    const { state } = useContext(appContext)
    const navigate = useNavigate()

    useEffect(() => {
        if (!state.token){
            navigate('/login')
        }
    }, [state.token, navigate])

    return (
        <>
            {!state.isAuthenticated ? <h3>Inicia sesión para ver todas las funciones!</h3> : <h1>Bienvenido!</h1>}
        </>

    );

};