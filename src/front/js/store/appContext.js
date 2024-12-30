import React, { createContext, useReducer } from 'react';
import { appReducer, initialState } from './appReducer';

export const appContext = createContext();

export const AppProvider = ({ children }) => {
	const [state, dispatch] = useReducer(appReducer, initialState);

	const signup = async (email, password) => {
		const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		if (!emailPattern.test(email)) {
			dispatch({ type: 'SIGNUP_ERROR', payload: { error: 'Email not valid', message: 'Email not valid' } });
			return;
		}
		try {
			const response = await fetch('https://musical-broccoli-97qvx4wxr77p3xr75-3001.app.github.dev/api/users', {
				method: 'POST',
				headers: {
					"Content-Type": "application/json"
				},
				body: JSON.stringify({ email, password })
			});
			if (response.ok) {
				const data = await response.json();
				dispatch({ type: 'SIGNUP_SUCCESS', payload: { error: null, message: 'Signup success.', user: data.email } });
				return data;
			} else {
				const errorData = await response.json();
				dispatch({ type: 'SIGNUP_ERROR', payload: { error: errorData.error, message: errorData.message } });
			}
		} catch (error) {
			dispatch({ type: 'SIGNUP_ERROR', payload: { error: error.message, message: 'Network or Server error.' } });
		}
	};

	const login = async (email, password) => {
		try {
			const response = await fetch('https://musical-broccoli-97qvx4wxr77p3xr75-3001.app.github.dev/api/token', {
				method: 'POST',
				headers: {
					"Content-Type": "application/json"
				},
				body: JSON.stringify({ email, password })
			});
			if (response.ok) {
				const data = await response.json();
				sessionStorage.setItem('token', data.token);
				sessionStorage.setItem('user', data.email)
				dispatch({ type: 'LOGIN_SUCCESS', payload: { token: data.token, user: data.email, message: 'Success.' } });
				return data;
			} else {
				const errorData = await response.json();
				dispatch({ type: 'LOGIN_ERROR', payload: { error: errorData.error, message: 'Bad username or password.' } });
			}
		} catch (error) {
			dispatch({ type: 'LOGIN_ERROR', payload: { error: error.message, message: 'Network or server error' } });
		}
	};
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
				dispatch({ type: 'FETCH_USER_SUCCESS', payload: { message: 'User data fetched.' } });
			} else {
				throw new Error('Failed to fetch user data');
			}
		} catch (error) {
			dispatch({ type: '' })
			setError(error.message);
			setLoading(false);
		}
	}

	const logout = () => {
		sessionStorage.removeItem('token');
		dispatch({ type: 'LOGOUT', payload: { message: 'Logout successful.' } });
	};

	return (
		<appContext.Provider value={{ state, signup, login, logout, fetchUser }}>
			{children}
		</appContext.Provider>
	);
};
