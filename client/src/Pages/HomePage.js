import React from "react";
import { useNavigate } from "react-router-dom";
import MainMenu from "./MainMenu";

const HomePage = ({ permissions }) => {
	const navigate = useNavigate();
	const isLogged = localStorage.getItem("accessToken");
	return (
		<div className='container'>
			{!isLogged ? (
				<span>
					{" "}
					<h1>Welcome to Cinema Management!</h1>
					<div className='button-container'>
						<button className='button' onClick={() => navigate("/login")}>
							Log in
						</button>
						<button className='button' onClick={() => navigate("/register")}>
							Sign Up
						</button>
					</div>
				</span>
			) : (
				<MainMenu permissions={permissions} />
			)}
		</div>
	);
};

export default HomePage;
