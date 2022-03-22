const userService = require("../services/userService");

async function index(req, res) {
    return await userService.findAllUsers(res);
}

async function store(req, res) {
  return await userService.createUser(req, res);
}

async function update(req, res) {
  return await userService.updateUser(req, res);
}

async function destroy(req, res) {
  return await userService.deleteUser(req, res);
}

module.exports = {
  index,
  store,
  update,
  destroy,
};
