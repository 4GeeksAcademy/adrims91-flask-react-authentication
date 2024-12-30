import React, { useContext, useState, useEffect } from "react";
import { appContext } from "../store/appContext";

export const UserInfo = () => {
    const { state, fetchUser } = useContext(appContext);




    useEffect(() => {
        fetchUser();
    }, [state.token]);

    if (state.loading) {
        return <p>Loading user info...</p>;
    }

    if (state.error) {
        return <p>Error loading user info: {state.error}</p>;
    }


    return (
        <>
            <div>
                <p>Usuario autenticado {state.user}</p>
            </div>
        </>
    );
};


