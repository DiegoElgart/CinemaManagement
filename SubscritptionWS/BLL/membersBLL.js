const membersDAL = require("../DAL/membersWS");
const Member = require("../models/memberModel");

const getAllMembers = async () => {
    let { data: members } = await membersDAL.getAllMembers();

    members = members.map(member => {
        return {
            name: member.name,
            email: member.email,
            city: member.address.city,
        };
    });

    const membersDB = await Member.find();

    if (membersDB.length < members.length) {
        await Member.insertMany(members);
        const newMembersDB = await Member.find();
        return newMembersDB;
    } else {
        return membersDB;
    }
};

const getMemberById = async id => {
    const member = Member.findById(id);
    return member;
};

const addMember = async obj => {
    const { email } = obj;
    const existingMember = await Member.findOne({ email });
    if (existingMember) {
        throw new Error("Member already exists with the given email");
    }
    const member = new Member(obj);
    await member.save();
    return "Member Created";
};

const updateMember = async (id, obj) => {
    await Member.findByIdAndUpdate(id, obj);
    return "Member Updated";
};

const deleteMember = async id => {
    await Member.findByIdAndDelete(id);
    return "Member Deleted";
};

module.exports = {
    getAllMembers,
    getMemberById,
    addMember,
    updateMember,
    deleteMember,
};
