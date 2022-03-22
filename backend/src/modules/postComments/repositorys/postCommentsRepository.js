const Models = require("../../../models/index");

const getAllPostsComments = async () => await Models.PostComments.findAll();

const getPostCommentsSpecificWithId = async (id) => await Models.PostComments.findByPk(id);

const storePostComments = async (postComments) => await Models.PostComments.create(postComments);

const renewPostComments = async (postComments, id) =>
  await Models.PostComments.update(postComments, { where: { id: id } });

const destroyPostComments = async (id) =>
  await Models.PostComments.destroy({ where: { id: id } });

module.exports = {
  getAllPostsComments,
  getPostCommentsSpecificWithId,
  storePostComments,
  renewPostComments,
  destroyPostComments,
};
