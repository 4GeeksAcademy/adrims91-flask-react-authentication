import React, { useState, useContext, useEffect } from "react";
import { appContext } from "../store/appContext";

export const Signup = () => {
	const { state, signup } = useContext(appContext);
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [showMessage, setShowMessage] = useState(false);

	useEffect(() => {
		if (state.message) {
			setShowMessage(true);
			const timer = setTimeout(() => {
				setShowMessage(false);
				state.message = null
				state.error = null
			}, 2000);
			return () => clearTimeout(timer);
		}
	}, [state.message]);

	return (
		<>
			<div className="text-center mt-5 mb-3">
				<form onSubmit={(e) => {
					e.preventDefault();
					signup(email, password);
					setEmail("");
					setPassword("");
				}}>
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
				{showMessage && <div className="alert alert-info m-auto" role="alert">{state.message}</div>}
			</div>
		</>
	);
};
