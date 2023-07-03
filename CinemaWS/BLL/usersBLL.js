const usersDAL = require("../DAL/usersDAL");
const User = require("../models/userModel");
const permissionsBLL = require("../BLL/permissionsBLL");
const utils = require("../utils/dateFormatter");
const bcrypt = require("bcrypt");
const saltRounds = 10;

const getUsers = async () => {
	const { users } = await usersDAL.getUsers();
	const dbUsers = await User.find();
	const permissions = await permissionsBLL.getPermissions();
	const mergedUsers = users.map(jsonUser => {
		const matchginId = dbUsers.find(dbUser => dbUser._id === jsonUser._id);

		return { ...jsonUser, ...matchginId };
	});
	const fullUser = mergedUsers.map(user => {
		const userPermission = permissions.find(permision => permision._id === user._id);

		return { ...user, ...userPermission };
	});
	return fullUser;
};

const getUserById = async id => {
	const { users } = await usersDAL.getUsers();
	const jsonUser = users.find(user => user._id === id);
	const dbUser = await User.findById(id);
	const { permissions } = await permissionsBLL.getPermissionById(id);
	const user = {
		fname: jsonUser.fname,
		lname: jsonUser.lname,
		createdDate: jsonUser.createdDate,
		username: dbUser.username,
		sessionTimeOut: jsonUser.sessionTimeOut,
		permissions: permissions,
	};
	return user;
};

const updateUser = async (id, obj) => {
	const userDb = await User.findByIdAndUpdate(id, {
		username: obj.username,
	});
	userDb.save();
	const { users } = await usersDAL.getUsers();
	const user = users.find(user => user._id === id);

	user.fname = obj.fname;
	user.lname = obj.lname;
	user.sessionTimeOut = obj.sessionTimeOut;
	const index = users.findIndex(user => user._id === id);
	if (index !== -1) {
		users[index] = user;
		const data = { users };

		await usersDAL.setUsers(data);
	}

	await permissionsBLL.updatePermissionsById(id, obj.permissions);
	return "User Updated!";
};

const setUsers = async obj => {
	const { users } = await usersDAL.getUsers();

	users.push(obj);
	const data = { users };
	const result = await usersDAL.setUsers(data);
	return result;
};
const addNewUser = async obj => {
	const date = utils.dateFormatter();
	const userDb = new User({ username: obj.username, password: "" });
	await userDb.save();
	const jsonUser = await setUsers({
		_id: userDb._id,
		fname: obj.fname,
		lname: obj.lname,
		createdDate: date,
		sessionTimeOut: obj.sessionTimeOut,
	});
	console.log("Json User Result", jsonUser);

	const userPermissions = await permissionsBLL.setUserPermissions({
		_id: userDb._id,
		permissions: obj.permissions,
	});
	console.log("Permissions User Result", userPermissions);
};

const checkIfUserExistsAndUpdatePassword = async obj => {
	const user = await User.findOne({ username: obj.username });
	if (obj.password && user.password === "") {
		const hashPassword = await bcrypt.hash(obj.password, saltRounds);
		user.password = hashPassword;
		user.save();

		return user;
	} else {
		return null;
	}
};

const deleteUser = async id => {
	await User.findByIdAndDelete({ _id: id });

	const { users } = await usersDAL.getUsers();
	const usersJsonAfterDelete = users.filter(user => user._id !== id);
	await usersDAL.setUsers({ users: usersJsonAfterDelete });

	const permissions = await permissionsBLL.getPermissions();
	const permissionsAfterDelete = permissions.filter(perm => perm._id !== id);
	await permissionsBLL.setPermissions({
		permissions: permissionsAfterDelete,
	});

	return "User Deleted";
};

module.exports = {
	getUsers,
	setUsers,
	addNewUser,
	updateUser,
	checkIfUserExistsAndUpdatePassword,
	getUserById,
	deleteUser,
};
