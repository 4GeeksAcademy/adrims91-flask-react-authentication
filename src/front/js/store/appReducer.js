const initialState = {
	isAuthenticated: !!sessionStorage.getItem('token'),
	token: sessionStorage.getItem('token'),
	user: sessionStorage.getItem('user'),
	error: null,
	message: null,
	username: sessionStorage.getItem('username')
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
				error: action.payload,
				message: action.payload
			};
		case 'LOGIN_SUCCESS':
			return {
				...state,
				isAuthenticated: true,
				token: action.payload.token,
				error: null,
				message: action.payload
			};
		case 'LOGIN_ERROR':
			return {
				...state,
				error: action.payload,
				message: action.payload
			};
		case 'LOGOUT':
			return {
				...state,
				isAuthenticated: false,
				token: null,
				error:null
			};
		default:
			return state;
	}
};

export { appReducer, initialState };
