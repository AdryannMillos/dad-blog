const categoryService = require("../services/categoryService");

async function index(req, res) {
    return await categoryService.findAllCategory(res);
}

async function store(req, res) {
  return await categoryService.createCategory(req, res);
}

async function update(req, res) {
  return await categoryService.updateCategory(req, res);
}

async function destroy(req, res) {
  return await categoryService.deleteCategory(req, res);
}

module.exports = {
  index,
  store,
  update,
  destroy,
};
