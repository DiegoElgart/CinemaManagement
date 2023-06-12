const jsonfile = require("jsonfile");
const file = "./data/permissions.json";

const getPermissions = async () => {
    const permissions = await jsonfile.readFile(file);
    return permissions;
};

const setPermissions = async obj => {
    return await jsonfile.writeFile(file, obj);
};

module.exports = { getPermissions, setPermissions };
