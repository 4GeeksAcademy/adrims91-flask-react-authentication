import React, { useContext, useEffect } from "react";
import { appContext } from "../store/appContext";
import { useNavigate } from "react-router-dom";

export const Home = () => {
    const { state } = useContext(appContext)
    const navigate = useNavigate()

    useEffect(() => {
        if (!state.token) {
            navigate('/login')
        }
    }, [state.token, navigate])

    return (
        <>
            <h1>Bienvenido {state.username ? state.username : state.user}!</h1>
        </>
    );
};