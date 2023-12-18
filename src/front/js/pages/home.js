import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";

export const Home = () => {
	const { store, actions } = useContext(Context);

	useEffect(() => {
		if(store.token && store.token!="" && store.token!=undefined)
			 actions.getMessage();
	}, [store.token])

	return (
		<div className="text-center mt-5">
			<p>
				<img src="https://miro.medium.com/v2/resize:fit:1280/format:webp/0*kTki4EOekmi5YjG_.png" />
				<img src="https://vegibit.com/wp-content/uploads/2018/07/JSON-Web-Token-Authentication-With-Node.png" />
			</p>
			<div className="alert alert-info">
				{store.message || "Login to reveal the secret message!"}
			</div>
			<p>
				This app is made with Python, Flask, React and JWT.
			</p>
		</div>
	);
};
