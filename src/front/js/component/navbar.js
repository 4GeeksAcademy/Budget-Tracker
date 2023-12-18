import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";


export const Navbar = () => {
	const { store, actions } = useContext(Context);
	const handleLogout = () => {
		actions.logout();
		window.location.reload();
  };
	return (
		<nav className="navbar navbar-dark bg-dark">
			<div className="container">
				<Link to="/">
					<span className="navbar-brand mb-0 h1">JWT Flask React App</span>
				</Link>
				<div className="ml-auto">
					{ !store.token ? 
					<Link to="/login">
						<button className="btn btn-primary">Login</button>
					</Link>
					:
					<button onClick={ handleLogout }  className="btn btn-primary">Logout</button>
					
					}
					<Link to="/signup">
						<button className="btn btn-outline-light ms-3">Signup</button>
					</Link>
				</div>
			</div>
		</nav>
	);
};
