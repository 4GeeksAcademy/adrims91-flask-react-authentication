const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			isAuthenticated: !!sessionStorage.getItem('token')
		},
		actions: {
			signup: async (email, password) => {
				try{
					const response = await fetch('https://musical-broccoli-97qvx4wxr77p3xr75-3001.app.github.dev/api/users', {
						method: 'POST',
						headers: {
							"Content-Type": "application/json"
						},
						body: JSON.stringify({email, password})
					})
					if (response.ok){
						const data = await response.json()
						return data
					}
				}catch(error){
					console.error('Error fetching data.', error)
				}
			},
			login: async (email, password) => {
				try{
					const response = await fetch('https://musical-broccoli-97qvx4wxr77p3xr75-3001.app.github.dev/api/token', {
						method: 'POST',
						headers: {
							"Content-Type": "application/json"
						},
						body: JSON.stringify({email, password})
					})
					if (response.ok){
						const data = await response.json()
						sessionStorage.setItem('token', data.token)
						setStore({isAuthenticated: true})
						return data
					}
				}catch(error){
					console.error('Error, server not responding.', error)
				}
			},
			logout: async () => {
				sessionStorage.removeItem('token')
				setStore({isAuthenticated: false})
			}
		}
	};
};

export default getState;
