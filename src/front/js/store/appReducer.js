const initialState = {
	isAuthenticated: !!sessionStorage.getItem('token'),
	token: sessionStorage.getItem('token'),
	error: null
};

const appReducer = (state, action) => {
	switch (action.type) {
		case 'SIGNUP_SUCCESS':
			return {
				...state,
				error: null
			};
		case 'SIGNUP_ERROR':
			return {
				...state,
				error: action.payload
			};
		case 'LOGIN_SUCCESS':
			return {
				...state,
				isAuthenticated: true,
				token: action.payload.token,
				error: null
			};
		case 'LOGIN_ERROR':
			return {
				...state,
				error: action.payload
			};
		case 'LOGOUT':
			return {
				...state,
				isAuthenticated: false,
				token: null
			};
		default:
			return state;
	}
};

export { appReducer, initialState };
