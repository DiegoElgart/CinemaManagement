import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { fetchAllMembers, selectAllMembers } from "../slices/members/membersSlice";
import SubscriptionsComponent from "../Components/SubscriptionsComponent";
import { fetchMovies, selectAllMovies } from "../slices/movies/moviesSlice";

const MembersPage = () => {
	const dispatch = useDispatch();
	const allMembers = useSelector(selectAllMembers);

	const [members, setMembers] = useState([]);

	useEffect(() => {
		dispatch(fetchAllMembers());
		dispatch(fetchMovies());
	}, []);

	useEffect(() => {
		setMembers(allMembers);
	}, [allMembers]);

	return (
		<div>
			{members
				? members.map(member => {
						return (
							<div key={member._id} className='card'>
								<h1 className='title'>{member.name}</h1>
								<span className='content'>
									<h4>Email: {member.email}</h4>
									<h4>City: {member.city}</h4>
								</span>
								<div className='button-container'>
									<button className='button'>Edit</button>
									<button className='button'>Delete</button>
								</div>
								<SubscriptionsComponent memberId={member._id} />
							</div>
						);
				  })
				: null}
		</div>
	);
};

export default MembersPage;
