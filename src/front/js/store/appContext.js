import React, { createContext, useReducer } from 'react';
import { appReducer, initialState } from './appReducer';

export const appContext = createContext();

export const AppProvider = ({ children }) => {
	const [state, dispatch] = useReducer(appReducer, initialState);

	const signup = async (email, password) => {
		const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		if (!emailPattern.test(email)) {
			dispatch({ type: 'SIGNUP_ERROR', payload: 'Email no válido' });
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
				dispatch({ type: 'SIGNUP_SUCCESS' });
				return data;
			} else {
				throw new Error('Signup failed');
			}
		} catch (error) {
			dispatch({ type: 'SIGNUP_ERROR', payload: error.message });
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
				dispatch({ type: 'LOGIN_SUCCESS', payload: { token: data.token, user:data.email, message: 'Success.' } });
				return data;
			} else {
				throw new Error('Login failed');
			}
		} catch (error) {
			dispatch({ type: 'LOGIN_ERROR', payload: error.message });
		}
	};

	const logout = () => {
		sessionStorage.removeItem('token');
		dispatch({ type: 'LOGOUT' });
	};

	return (
		<appContext.Provider value={{ state, signup, login, logout }}>
			{children}
		</appContext.Provider>
	);
};
