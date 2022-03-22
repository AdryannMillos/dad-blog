const postRepository = require("../repository/postRepository");

const findAllPosts = async (res) => {
  try {
    const posts = await postRepository.getAllPosts();
    return res.status(200).json(posts);
  } catch (err) {
    return res.status(500).json({ message: `Error:${err.message}` });
  }
};

async function createPosts(req, res) {
  try {
    const { authorId, parentPostId, title, content, categoryId } = req.body;

    const post = {
      authorId: authorId,
      parentPostId: parentPostId,
      title: title,
      content: content,
      categoryId: categoryId,
    };

    await postRepository.storePost(post);
    return res.status(201).json({ message: "Post Created successfully" });
  } catch (err) {
    return res.status(500).json({ message: `Error:${err.message}` });
  }
}

const updatePost = async (req, res) => {
  try {
    const { authorId, parentPostId, title, content, categoryId } = req.body;

    const postId = req.params.id;

    const postFound = await postRepository.getPostSpecificWithId(postId);

    if (!postFound) {
      return res.status(404).json({ message: `Post Not Found` });
    } else {
      const post = {
        authorId: authorId,
        parentPostId: parentPostId,
        title: title,
        content: content,
        categoryId: categoryId,
      };

      await postRepository.renewPost(post, postId);
      return res.status(200).json({ message: "Post Updated Successfully" });
    }
  } catch (err) {
    return res.status(500).json({ message: `Error:${err.message}` });
  }
};

const deletePost = async (req, res) => {
  const postId = req.params.id;

  const postFound = await postRepository.getPostSpecificWithId(postId);
  if (!postFound) {
    return res.status(404).json({ message: `Post Not Found` });
  } else {
    await postRepository.destroyPost(postId);
    return res.status(200).json({ message: `Post Deleted successfully` });
  }
};

const findSpecificPost = async (req) => {
  const postId = req.params.id;

  return await postRepository.getPostSpecificWithId(postId);
};

module.exports = {
  createPosts,
  findAllPosts,
  updatePost,
  deletePost,
  findSpecificPost,
};
