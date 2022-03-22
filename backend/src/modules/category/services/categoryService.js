const categoryRepository = require("../repository/categoryRepository");
Category;

const findAllCategory = async (res) => {
  try {
    const category = await categoryRepository.getAllCategory();
    return res.status(200).json(category);
  } catch (err) {
    return res.status(500).json({ message: `Error:${err.message}` });
  }
};

async function createCategory(req, res) {
  try {
    const { categoryName } = req.body;

    const category = {
      categoryName: categoryName,
    };

    await categoryRepository.storeCategory(category);
    return res.status(201).json({ message: "Category Created successfully" });
  } catch (err) {
    return res.status(500).json({ message: `Error:${err.message}` });
  }
}

const updateCategory = async (req, res) => {
  try {
    const { categoryName } = req.body;

    const categoryId = req.params.id;

    const categoryFound = await categoryRepository.getCategorySpecificWithId(
      categoryId
    );

    if (!categoryFound) {
      return res.status(404).json({ message: `Category Not Found` });
    } else {
      const category = {
        categoryName: categoryName,
      };

      await categoryRepository.renewCategory(category, categoryId);
      return res.status(200).json({ message: "Category Updated Successfully" });
    }
  } catch (err) {
    return res.status(500).json({ message: `Error:${err.message}` });
  }
};

const deleteCategory = async (req, res) => {
  const categoryId = req.params.id;

  const categoryFound = await categoryRepository.getCategorySpecificWithId(
    categoryId
  );
  if (!categoryFound) {
    return res.status(404).json({ message: `Category Not Found` });
  } else {
    await categoryRepository.destroyPost(categoryId);
    return res.status(200).json({ message: `Category Deleted successfully` });
  }
};

const findSpecificCategory = async (req) => {
  const categoryId = req.params.id;

  return await categoryRepository.getCategorySpecificWithId(categoryId);
};

module.exports = {
  createCategory,
  findAllCategory,
  updateCategory,
  deleteCategory,
  findSpecificCategory,
};
