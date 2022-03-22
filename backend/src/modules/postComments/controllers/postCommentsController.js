const postCommentsService = require("../services/postCommentsService");

async function index(req, res) {
    return await postCommentsService.findAllPostsComments(res);
}

async function store(req, res) {
  return await postCommentsService.createPostsComments(req, res);
}

async function update(req, res) {
  return await postCommentsService.updatePostComments(req, res);
}

async function destroy(req, res) {
  return await postCommentsService.deletePostsComments(req, res);
}

module.exports = {
  index,
  store,
  update,
  destroy,
};
