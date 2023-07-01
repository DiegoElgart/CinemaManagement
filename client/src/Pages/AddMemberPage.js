import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addNewMember } from "../slices/members/membersSlice";
const AddMemberPage = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const [memberToAdd, setMemberToAdd] = useState({
		name: "",
		eamil: "",
		city: "",
	});

	const handleChange = e => {
		e.preventDefault();
		const { name, value } = e.target;
		setMemberToAdd(prevState => ({ ...prevState, [name]: value }));
	};

	const handleSubmit = async e => {
		e.preventDefault();
		await dispatch(addNewMember(memberToAdd));
		alert("Added New Member!");
		navigate(-1);
	};
	return (
		<div className='container'>
			<h1>Add New Member</h1>
			<form className='form-container' onSubmit={handleSubmit}>
				<label>Name: </label>
				<input type='text' id='name' name='name' onChange={handleChange} />
				<label>Email: </label>
				<input type='text' id='email' name='email' onChange={handleChange} />
				<label>City: </label>
				<input type='text' id='city' name='city' onChange={handleChange} />
				<div className='button-container'>
					<button type='submit'>Save</button>
					<button type='button' onClick={() => navigate(-1)}>
						Cancel
					</button>
				</div>
			</form>
		</div>
	);
};

export default AddMemberPage;
