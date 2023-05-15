const permissionsDAL = require("../dal/permissionsDAL");

const getPermissions = () => {
    const { data: permissions } = permissionsDAL.getPermissions();
    return permissions;
};

const setPermissions = async obj => {
    const permissions = await getPermissions();
    permissions.push(obj);
    const data = { permissions };
    const result = await permissionsDAL.setPermissions(data);
    return result;
};
module.exports = { getPermissions, setPermissions };
