const usersDAL = require("../DAL/usersDAL");
const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const saltRounds = 10;

const getUsers = async () => {
    const { users } = await usersDAL.getUsers();
    const dbUsers = await User.find();
    const mergedUsers = users.map(jsonUser => {
        const matchginId = dbUsers.find(dbUser => dbUser._id === jsonUser._id);
        return { ...jsonUser, ...matchginId };
    });
    return mergedUsers;
};

const getUserById = async id => {
    const { users } = await usersDAL.getUsers();
    const jsonUser = users.find(user => user._id === id);
    const dbUser = await User.findById(id);
    const user = {
        fname: jsonUser.fname,
        lname: jsonUser.lname,
        createdDate: jsonUser.createdDate,
        username: dbUser.username,
        sessionTimeOut: jsonUser.sessionTimeOut,
    };
    return user;
};
const setUsers = async obj => {
    const users = await getUsers();
    console.log(users);
    users.push(obj);
    const data = { users };
    const result = await usersDAL.setUsers(data);
    return result;
};

const checkIfUserExistsAndUpdatePassword = async obj => {
    const user = await User.findOne({ username: obj.username });
    if (obj.password && user.password === "") {
        const hashPassword = await bcrypt.hash(obj.password, saltRounds);
        user.password = hashPassword;
        user.save();
        const prepareUserForJson = {
            _id: user._id,
            fname: "",
            lname: "",
            createdDate: new Date(),
            sessionTimeOut: "",
        };
        await setUsers(prepareUserForJson);
        return user;
    } else {
        return null;
    }
};

module.exports = {
    getUsers,
    setUsers,
    checkIfUserExistsAndUpdatePassword,
    getUserById,
};
