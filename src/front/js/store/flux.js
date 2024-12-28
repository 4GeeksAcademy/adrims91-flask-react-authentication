const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			isAuthenticated: !!sessionStorage.getItem('token'),
			token: sessionStorage.getItem('token')
		},
		actions: {
			signup: async (email, password) => {
				const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
				if (!emailPattern.test(email)) {
					console.error('Email no válido');
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
						return data;
					} else {
						throw new Error('Signup failed');
					}
				} catch (error) {
					console.error('Error fetching data.', error);
				}
			},
			login: async (email, password) => {
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
						setStore({ isAuthenticated: true, token: data.token });
						return data;
					} else {
						throw new Error('Login failed');
					}
				} catch (error) {
					console.error('Error, server not responding.', error);
				}
			},
			logout: async () => {
				sessionStorage.removeItem('token');
				sessionStorage.removeItem('username')
				setStore({ isAuthenticated: false, token: null });
			}
		}
	};
};

export default getState;
