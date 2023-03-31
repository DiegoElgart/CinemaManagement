const membersDAL = require("../DAL/membersWS");
const Member = require("../models/memberModel");

const getAllMembers = async () => {
    let { data: members } = await membersDAL.getAllMembers();

    members = members.map(member => {
        return {
            Name: member.name,
            Email: member.email,
            City: member.address.city,
        };
    });

    const memberDB = await Member.find();
    //  console.log(memberDB.length);
    if (memberDB.length <= 1) {
        await Member.insertMany(members);
        const membersDB = await Member.find();
        return membersDB;
    } else {
        return members;
    }
};

module.exports = { getAllMembers };
