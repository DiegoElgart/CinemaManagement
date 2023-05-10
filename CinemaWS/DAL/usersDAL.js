const jsonfile = require("jsonfile");
const file = "./data/users.json";

const getUsers = () => {
    return jsonfile.readFile(file);
};

const setUsers = async obj => {
    await jsonfile.writeFile(file, obj);
    return "User written in json!";
};

module.exports = { getUsers, setUsers };
