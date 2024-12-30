import React, { useContext, useState, useEffect } from "react";
import { appContext } from "../store/appContext";

export const UserInfo = () => {
    const { state } = useContext(appContext);
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);




    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await fetch('https://musical-broccoli-97qvx4wxr77p3xr75-3001.app.github.dev/api/user', {
                    method: 'GET',
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": "Bearer " + state.token
                    }
                });
                if (response.ok) {
                    const data = await response.json();
                    sessionStorage.setItem('user', data.email)
                    setUser(data);
                    setLoading(false);
                } else {
                    throw new Error('Failed to fetch user data');
                }
            } catch (error) {
                setError(error.message);
                setLoading(false);
            }
        };

        fetchUser();
    }, [state.token]);

    if (loading) {
        return <p>Loading user info...</p>;
    }

    if (error) {
        return <p>Error loading user info: {error}</p>;
    }





    return (
        <>
            <div>
                <p>Usuario autenticado {state.user}</p>
            </div>
        </>
    );
};


