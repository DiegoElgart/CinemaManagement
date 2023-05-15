const usersDAL = require("../DAL/usersDAL");

const getUsers = () => {
    const data = usersDAL.getUsers();
    return data;
};

const setUsers = async obj => {
    const users = await getUsers();
    users.push(obj);
    const data = { users };
    const result = await usersDAL.setUsers(data);
    return result;
};

module.exports = { getUsers, setUsers };
