import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { Link, useNavigate } from "react-router-dom";


export const Navbar = () => {
	const { store, actions } = useContext(Context);
	const navigate = useNavigate();
	const handleLogout = () => {
		actions.logout();
		navigate("/login"); // Navigate to the login page
  };
	return (
		<nav className="navbar navbar-dark bg-dark navbar-style">
			<div className="container">
				<Link to="/">
					<span className="navbar-brand mb-0 h2 logo-title">Budget Tracker</span>
				</Link>
				<div className="ml-auto">
							{!store.token ? (
						<>
							<Link to="/login">
							<button className="btn btn-primary">Login</button>
							</Link>
							<Link to="/signup">
							<button className="btn btn-outline-light ms-3">Signup</button>
							</Link>
						</>
						) : (
						<>
							<Link to="/dashboard">
							<button className="btn btn-danger me-3">Dashboard</button>
							</Link>
							<button onClick={handleLogout} className="btn btn-primary">
							Logout
							</button>
						</>
						)}
				
				</div>
			</div>
		</nav>
	);
};