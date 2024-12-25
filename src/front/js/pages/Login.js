import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";


export const Login = () => {
	const { actions } = useContext(Context);
	const [email, setEmail] = useState()
	const [password, setPassword] = useState()

	return (
		<div className="text-center mt-5">
			<form onSubmit={(e) => {
				e.preventDefault()
				actions.login(email, password)
			}}>
				<input
					placeholder="Email"
					onChange={(e) => setEmail(e.target.value)}
					value={email}
				></input>
				<input
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
	);
};
