import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import {
    fetchAllMembers,
    selectAllMembers,
} from "../slices/members/membersSlice";

const MembersPage = () => {
    const dispatch = useDispatch();
    const allMembers = useSelector(selectAllMembers);

    const [members, setMembers] = useState([]);

    useEffect(() => {
        dispatch(fetchAllMembers());
    }, []);

    useEffect(() => {
        setMembers(allMembers);
    }, [allMembers]);
    return (
        <div>
            {members.map(member => (
                <div key={member._id} className='card'>
                    <h1 className='title'>{member.Name}</h1>
                    <span className='content'>
                        <h4>Email: {member.Email}</h4>
                        <h4>City: {member.City}</h4>
                    </span>
                    <div className='button-container'>
                        <button className='button'>Edit</button>
                        <button className='button'>Delete</button>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default MembersPage;
