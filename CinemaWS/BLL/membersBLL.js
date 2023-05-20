const membersDAL = require("../DAL/membersWS");

const getAllMembers = async () => {
    const { data: members } = await membersDAL.getAllMembers();

    return members;
};

const getMemberById = async id => {
    const members = await getAllMembers();
    const member = members.find(member => member._id === id);
    return member;
};

const addMember = async obj => {
    await membersDAL.addMember(obj);
    return "Member Added!";
};

const updateMember = async (id, obj) => {
    await membersDAL.updateMember(id, obj);
    return "Member Updated!";
};

const deleteMember = async id => {
    await membersDAL.deleteMember(id);
    return "Member Deleted!";
};

module.exports = {
    getAllMembers,
    getMemberById,
    addMember,
    updateMember,
    deleteMember,
};
