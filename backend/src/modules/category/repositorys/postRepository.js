const Models = require("../../../models/index");

const getAllPosts = async () => await Models.Post.findAll();

const getPostSpecificWithId = async (id) => await Models.Post.findByPk(id);

const storePost = async (post) => await Models.Post.create(post);

const renewPost = async (post, id) =>
  await Models.Post.update(post, { where: { id: id } });

const destroyPost = async (id) =>
  await Models.Post.destroy({ where: { id: id } });

module.exports = {
  getAllPosts,
  storePost,
  getPostSpecificWithId,
  renewPost,
  destroyPost,
};
