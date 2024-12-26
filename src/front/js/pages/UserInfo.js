import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom'
import { Context } from "../store/appContext";

export const UserInfo = () => {

    const { store, actions } = useContext(Context)
    const navigate = useNavigate()

    useEffect(() => {
        if (!store.token) {
            navigate("/api/login")
        }
        actions.fetchUser()
    }, [navigate])

    if (store.loading) {
        return <p>Loading user info...</p>
    }
    if (store.error) {
        return <p>error loading user, {store.error.message}</p>
    }

    return (
        store.user ? <>
            <div>
                <h1>You are logged as {store.user.email}</h1>
            </div>
        </> : ''
    )

}