const initialState = {
	isAuthenticated: !!sessionStorage.getItem('token'),
	token: sessionStorage.getItem('token'),
	user: sessionStorage.getItem('user'),
	error: null,
	message: null,
	loading: true
};

const appReducer = (state, action) => {
	switch (action.type) {
		case 'SIGNUP_SUCCESS':
			return {
				...state,
				error: null,
				message: action.payload.message,
				user: action.payload.user
			};
		case 'SIGNUP_ERROR':
			return {
				...state,
				error: action.payload.error,
				message: action.payload.message
			};
		case 'LOGIN_SUCCESS':
			return {
				...state,
				isAuthenticated: true,
				token: action.payload.token,
				error: null,
				message: action.payload.message,
				user: action.payload.user
			};
		case 'LOGIN_ERROR':
			return {
				...state,
				error: action.payload.error,
				message: action.payload.message
			};
		case 'FETCH_USER_SUCCESS':
			return {
				...state,
				error: null,
				loading: false,
				message: action.payload.message
			}
		case 'FETCH_USER_ERROR':
			return {
				...state,
				error: action.payload.error,
				message: action.payload.message,
				loading: false
			}
		case 'LOGOUT':
			return {
				...state,
				isAuthenticated: false,
				token: null,
				error: null,
				message: action.payload.message,
				user: null
			};
		default:
			return state;
	}
};

export { appReducer, initialState };
