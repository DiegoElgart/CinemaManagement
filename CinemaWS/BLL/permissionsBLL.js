const permissionsDAL = require("../DAL/permissionsDAL");

const getPermissions = async () => {
    const { permissions } = await permissionsDAL.getPermissions();
    return permissions;
};

const getPermissionById = async id => {
    const permissions = await getPermissions();
    const permission = permissions.find(per => per._id === id);
    return permission;
};

const setUserPermissions = async obj => {
    const permissions = await getPermissions();
    permissions.push(obj);
    const data = { permissions };
    const result = await permissionsDAL.setPermissions(data);
    return result;
};
const setPermissions = async obj => {
    const result = await permissionsDAL.setPermissions(obj);
    return result;
};
const updatePermissionsById = async (id, obj) => {
    const permissions = await getPermissions();
    const index = permissions.findIndex(permission => permission._id === id);
    if (index !== -1) {
        permissions[index] = { _id: id, permissions: obj };

        const data = { permissions };

        const result = await permissionsDAL.setPermissions(data);
        return result;
    }
};
module.exports = {
    getPermissions,
    setPermissions,
    getPermissionById,
    updatePermissionsById,
    setUserPermissions,
};
