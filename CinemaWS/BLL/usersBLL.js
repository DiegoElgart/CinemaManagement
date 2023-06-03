const usersDAL = require("../DAL/usersDAL");
const User = require("../models/userModel");

const getUsers = async () => {
    const { users } = await usersDAL.getUsers();
    const dbUsers = await User.find();
    const mergedUsers = users.map(jsonUser => {
        const matchginId = dbUsers.find(dbUser => dbUser._id === jsonUser._id);
        return { ...jsonUser, ...matchginId };
    });
    return mergedUsers;
};
const setUsers = async obj => {
    const users = await getUsers();
    console.log(users);
    users.push(obj);
    const data = { users };
    const result = await usersDAL.setUsers(data);
    return result;
};

module.exports = { getUsers, setUsers };
