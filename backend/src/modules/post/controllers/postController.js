const postService = require("../services/postService");

async function index(req, res) {
    return await postService.findAllPosts(res);
}

async function store(req, res) {
  return await postService.createPosts(req, res);
}

async function update(req, res) {
  return await postService.updatePosts(req, res);
}

async function destroy(req, res) {
  return await postService.deletePosts(req, res);
}

module.exports = {
  index,
  store,
  update,
  destroy,
};
