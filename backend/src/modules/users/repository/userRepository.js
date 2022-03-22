const Models = require("../../../models/index");

const getAllUsers = async () => await Models.User.findAll();

const getUserSpecificWithId = async (userId) => await Models.User.findByPk(userId);

const storeUser = async (user) => await Models.User.create(user);

const renewUser = async (user, userId) => await Models.User.update(user, { where: { id: userId } });

const destroyUser = async (userId) => await Models.User.destroy({ where: { id: userId } });

module.exports = {
  getAllUsers,
  storeUser,
  getUserSpecificWithId,
  destroyUser,
  renewUser,
};
