import React, { useState, useEffect, useContext } from "react";
import { Context } from "../store/appContext";


export const Signup = () => {
	const { actions } = useContext(Context);
	const [email, setEmail] = useState()
	const [password, setPassword] = useState()


	return (
		<form onSubmit={(e) => {
			e.preventDefault()
			actions.signup(email, password)
		}}>
			<input
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
				value={"create user"}
				type="submit"></input>
		</form>
	);
};
