import React from "react";
import { Link } from "react-router-dom";

export const Navbar = () => {
	return (
		<nav className="navbar d-flex">
			<div className="container-fluid">
			<Link to='/'>
				<button className="btn btn-secondary">Home</button>
			</Link>
				<div className="justify-content-end">
					<Link to="/api/login">
						<button className="btn btn-primary m-1">Login</button>
					</Link>
					<Link to="/demo">
							<button className="btn btn-primary">Register</button>
					</Link>
				</div>
			</div>
		</nav>
	);
};
