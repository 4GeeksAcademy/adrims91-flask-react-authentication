import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";

export const Login = () => {
	const { store, actions } = useContext(Context);
	const [email, setEmail] = useState("")
	const [password, setPassword] = useState("")
	const navigate = useNavigate()


	useEffect(() => {
		if (store.token && store.isAuthenticated) {
			alert('Authenticated.')
			navigate("/api/user")
		}
	}, [store.token])

	return (
		<>
		
		<div className="text-center mt-5">
			<form onSubmit={(e) => {
				e.preventDefault()
				actions.login(email, password)
				setEmail("")
				setPassword("")
			}}>
				<input
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
				<input type="submit"
					value={"Send"}
				></input>
			</form>
		</div>
		</>
	);
};
