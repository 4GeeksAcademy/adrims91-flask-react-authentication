import React, { useState, useContext } from "react";
import { Context } from "../store/appContext";


export const Signup = () => {
	const { store, actions } = useContext(Context);
	const [email, setEmail] = useState("")
	const [password, setPassword] = useState("")



	return (
		<>
			<div className="text-center mt-5 mb-3">
				<form onSubmit={(e) => {
					e.preventDefault()
					actions.signup(email, password)
					alert('User created succesfully')
					setEmail('')
					setPassword('')
				}}>
					<input
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
						value={"create user"}
						type="submit"></input>
				</form>
			</div>
			{store.error ? <div style={{ width: '200px' }} className="alert alert-danger m-auto" role="alert">
				Invalid email
			</div> : ''}
		</>
	);
};

