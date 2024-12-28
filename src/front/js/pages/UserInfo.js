import React, { useContext, useState, useEffect } from "react";
import { Context } from "../store/appContext";

export const UserInfo = () => {
    const { store } = useContext(Context);
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [username, setUsername] = useState('')
    const [inputValue, setInputValue] = useState('')
    
    

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await fetch('https://musical-broccoli-97qvx4wxr77p3xr75-3001.app.github.dev/api/user', {
                    method: 'GET',
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": "Bearer " + store.token
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
    }, [store.token]);

    if (loading) {
        return <p>Loading user info...</p>;
    }

    if (error) {
        return <p>Error loading user info: {error}</p>;
    }

    



    return (
        <>
            <div>
                {!username ? (<><p>Username: <input onKeyDown={(e) => {
                    if (e.key === "Enter") {
                        setUsername(inputValue)
                    }
                }} onChange={(e) => setInputValue(e.target.value)} value={inputValue}></input></p>
                    <p>Email: {user.email}</p></>) : (<><p>Username: {username}</p>
                        <p>Email: {user.email}</p></>)}
            </div>
        </>
    );
};


