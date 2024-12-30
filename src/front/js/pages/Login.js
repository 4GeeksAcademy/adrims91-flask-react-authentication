import React, { useContext, useEffect, useState } from "react";
import { appContext } from "../store/appContext";
import { useNavigate } from "react-router-dom";

export const Login = () => {
	const { state, login } = useContext(appContext);
	const [email, setEmail] = useState("")
	const [password, setPassword] = useState("")
	const [showMessage, setShowMessage] = useState("");
	const navigate = useNavigate()


	useEffect(() => {
		if (state.token && state.isAuthenticated) {
			navigate("/user")
		}
		if (state.message) {
			setShowMessage(state.message);
			const timer = setTimeout(() => {
				setShowMessage(false);
				state.message = null;
			}, 3000);
			return () => clearTimeout(timer);
		}
	}, [state.message]);

	return (
		<>

			<div className="text-center mt-5">
				<form onSubmit={(e) => {
					e.preventDefault()
					login(email, password)
					setEmail("")
					setPassword("")
				}}>
					<input
						className="me-1"
						placeholder="Email"
						onChange={(e) => setEmail(e.target.value)}
						value={email}
					></input>
					<input
						type="password"
						placeholder="Password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
					>
					</input>
					<input className="ms-1" type="submit"
						value={"Send"}
					></input>
				</form>
				{showMessage && <div className="alert alert-info m-auto" role="alert">{state.message}</div>}
			</div>
		</>
	);
};
