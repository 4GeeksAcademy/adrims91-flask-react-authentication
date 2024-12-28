import React, { useState, useContext, useEffect } from "react";
import { appContext } from "../store/appContext";

export const Signup = () => {
	const { state, signup } = useContext(appContext);
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [message, setMessage] = useState(null);

	useEffect(() => {
		if (state.error) {
			setMessage('Error creating user.');
		}
		if (state.error === null && state.isAuthenticated) {
			setMessage('User created successfully.');
		}
	}, [state.error, state.isAuthenticated]);

	const handleSubmit = async (e) => {
		e.preventDefault();
		await signup(email, password);
		setEmail('');
		setPassword('');
	};

	return (
		<>
			<div className="text-center mt-5 mb-3">
				<form onSubmit={handleSubmit}>
					<input
						type="text"
						className="me-1"
						placeholder="Email"
						onChange={(e) => setEmail(e.target.value)}
						value={email}
					>
					</input>
					<input
						type="password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						placeholder="Password"
					>
					</input>
					<input
						className="ms-1"
						value={"Create User"}
						type="submit"></input>
				</form>
				{message && <div className="alert alert-info m-auto" role="alert">{message}</div>}
			</div>
		</>
	);
};
