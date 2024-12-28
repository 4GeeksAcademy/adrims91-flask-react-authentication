import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";

export const Navbar = () => {
	const { store, actions } = useContext(Context)
	return (
		<nav className="navbar d-flex">
			<div className="container-fluid">
				<Link to='/'>
					<button className="btn btn-secondary">Home</button>
				</Link>
				<div className="justify-content-end">
					{store.isAuthenticated ? <> <Link to={"/api/user"}>
						<button className="btn btn-success">Profile</button>
					</Link>
						<Link to={"/api/login"} onClick={actions.logout} className="btn btn-danger m-1">Close session</Link>
					</>
						:
						<>
							<Link to="/api/login">
								<button className="btn btn-primary m-1">Login</button>
							</Link>
							<Link to="/api/signup">
								<button className="btn btn-primary">Register</button>
							</Link>
						</>
					}

				</div>
			</div>
		</nav>
	);
};
