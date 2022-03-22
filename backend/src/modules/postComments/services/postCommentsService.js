const postCommentsRepository = require("../repository/postCommentsRepository");

const findAllPostsComments = async (res) => {
  try {
    const postsComments = await postCommentsRepository.getAllPostsComments();
    return res.status(200).json(postsComments);
  } catch (err) {
    return res.status(500).json({ message: `Error:${err.message}` });
  }
};

async function createPostsComments(req, res) {
  try {
    const { authorId, parentPostId, content } = req.body;

    const postComments = {
      authorId: authorId,
      parentPostId: parentPostId,
      content: content,
    };

    await postCommentsRepository.storePostComments(postComments);
    return res.status(201).json({ message: "Post Comments Created successfully" });
  } catch (err) {
    return res.status(500).json({ message: `Error:${err.message}` });
  }
}

const updatePostComments = async (req, res) => {
  try {
    const { authorId, parentPostId, title, content, categoryId } = req.body;

    const postCommentsId = req.params.id;

    const postCommentsFound = await postCommentsRepository.getPostCommentsSpecificWithId(postId);

    if (!postCommentsFound) {
      return res.status(404).json({ message: `Post Comments Not Found` });
    } else {
      const postComments = {
        authorId: authorId,
        parentPostId: parentPostId,
        content: content,
      };

      await postCommentsRepository.renewPostComments(postComments, postCommentsId);
      return res.status(200).json({ message: "Post Updated Successfully" });
    }
  } catch (err) {
    return res.status(500).json({ message: `Error:${err.message}` });
  }
};

const deletePostComments = async (req, res) => {
  const postCommentsId = req.params.id;

  const postCommentsFound = await postCommentsRepository.getPostCommentsSpecificWithId(postCommentsId);
  if (!postCommentsFound) {
    return res.status(404).json({ message: `Post Comments Not Found` });
  } else {
    await postCommentsRepository.destroyCommentsPost(postCommentsId);
    return res.status(200).json({ message: `Post Comments Deleted successfully` });
  }
};

const findSpecificPostComments = async (req) => {
  const postCommentsId = req.params.id;

  return await postCommentsRepository.getPostCommentsSpecificWithId(postCommentsId);
};

module.exports = {
  createPostsComments,
  findAllPostsComments,
  updatePostComments,
  deletePostComments,
  findSpecificPostComments,
};
