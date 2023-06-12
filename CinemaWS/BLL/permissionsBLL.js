const permissionsDAL = require("../dal/permissionsDAL");

const getPermissions = async () => {
    const permissions = await permissionsDAL.getPermissions();

    return permissions;
};

const getPermissionById = async id => {
    const allPermissions = await getPermissions();
    const permission = allPermissions.permissions.find(per => per._id === id);
    return permission.permissions;
};

const setPermissions = async obj => {
    const permissions = await getPermissions();
    permissions.push(obj);
    const data = { permissions };
    const result = await permissionsDAL.setPermissions(data);
    return result;
};
module.exports = { getPermissions, setPermissions, getPermissionById };
