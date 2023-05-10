const jsonfile = require("jsonfile");
const file = "./data/permissions.jsn";

const getPermissions = () => {
    return jsonfile.readFile(file);
};

const setPermissions = async obj => {
    await jsonfile.writeFile(file, obj);
    return "Permissions written in json!";
};

module.exports = { getPermissions, setPermissions };
