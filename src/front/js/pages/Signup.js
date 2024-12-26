import React, { useState , useContext } from "react";
import { Context } from "../store/appContext";


export const Signup = () => {
	const { actions } = useContext(Context);
	const [email, setEmail] = useState("")
	const [password, setPassword] = useState("")


	return (
		<div className="text-center mt-5">
		<form onSubmit={(e) => {
			e.preventDefault()
			actions.signup(email, password)
			setEmail('')
			setPassword('')
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
		</div>
	);
};

