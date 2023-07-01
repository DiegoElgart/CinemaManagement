import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { fetchMemberById, selectMemberToEdit, updateMember } from "../slices/members/membersSlice";

const EditMemberPage = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const { id } = useParams();
	const member = useSelector(selectMemberToEdit);

	const [memberToEdit, setMemberToEdit] = useState({
		name: "",
		email: "",
		city: "",
	});

	useEffect(() => {
		dispatch(fetchMemberById(id));
	}, [dispatch, id]);

	useEffect(() => {
		if (member) {
			setMemberToEdit(member);
		}
	}, [member]);

	const handleChange = e => {
		e.preventDefault();
		const { name, value } = e.target;
		setMemberToEdit(prevState => ({ ...prevState, [name]: value }));
	};
	const handleSubmit = async e => {
		e.preventDefault();
		dispatch(updateMember(memberToEdit));
		alert("Member Updated!");
		navigate(-1);
	};
	return (
		<div className='container'>
			<h1>Edit Member:</h1>
			{memberToEdit ? (
				<form className='form-container' onSubmit={handleSubmit}>
					<label>Name: </label>
					<input type='text' id='name' name='name' defaultValue={memberToEdit.name} onChange={handleChange} />
					<label>Email: </label>
					<input type='text' id='email' name='email' defaultValue={memberToEdit.email} onChange={handleChange} />
					<label>City: </label>
					<input type='text' id='city' name='city' defaultValue={memberToEdit.city} onChange={handleChange} />
					<div className='button-container'>
						<button type='submit'>Update</button>
						<button type='button' onClick={() => navigate(-1)}>
							Cancel
						</button>
					</div>
				</form>
			) : null}
		</div>
	);
};

export default EditMemberPage;
