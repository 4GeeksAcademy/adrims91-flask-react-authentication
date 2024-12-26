import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom'

export const UserInfo = () => {

    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const navigate = useNavigate()

    useEffect(() => {
        const token = sessionStorage.getItem('token')
        if (!token) {
            navigate("/api/login")
        }

        const fetchUser = async () => {
            try {
                const response = await fetch('https://musical-broccoli-97qvx4wxr77p3xr75-3001.app.github.dev/api/user', {
                    method: 'GET',
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": "Bearer " + token
                    }
                })
                if (response.ok) {
                    const data = await response.json()
                    setUser(data)
                    setLoading(false)
                }
            } catch (error) {
                setError(error)
                setLoading(false)
            }
        }
        fetchUser()
    }, [])

    if (loading) {
        return <p>Loading user info...</p>
    }
    if (error) {
        return <p>error loading user, {error.message}</p>
    }

    return (
        user ? <>
            <div>
                <h1>{user}</h1>
            </div>
        </> : ''
    )

}