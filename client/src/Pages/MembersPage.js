import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { deleteMember, fetchAllMembers, selectAllMembers } from "../slices/members/membersSlice";
import SubscriptionsComponent from "../Components/SubscriptionsComponent";
import { fetchMovies } from "../slices/movies/moviesSlice";
import { useNavigate } from "react-router-dom";
import { deleteSubscriptionByMemberId } from "../slices/subscriptions/subscriptionsSlice";

const MembersPage = () => {
	const dispatch = useDispatch();
	const allMembers = useSelector(selectAllMembers);
	const navigate = useNavigate();

	const [members, setMembers] = useState([]);

	useEffect(() => {
		dispatch(fetchAllMembers());
		dispatch(fetchMovies());
	}, [dispatch]);

	useEffect(() => {
		setMembers(allMembers);
	}, [allMembers]);

	const handleDelete = async (e, memberId) => {
		e.preventDefault();
		await dispatch(deleteMember(memberId));
		await dispatch(deleteSubscriptionByMemberId(memberId));
		window.location.reload();
	};
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
									<button className='button' onClick={() => navigate(`/subscriptions/members/${member._id}`)}>
										Edit
									</button>
									<button className='button' onClick={e => handleDelete(e, member._id)}>
										Delete
									</button>
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
