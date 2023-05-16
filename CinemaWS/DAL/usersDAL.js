const jsonfile = require("jsonfile");
const file = "./data/users.json";

const getUsers = () => {
    return jsonfile.readFile(file);
};

const setUsers = async obj => {
    return await jsonfile.writeFile(file, obj);
};

module.exports = { getUsers, setUsers };
