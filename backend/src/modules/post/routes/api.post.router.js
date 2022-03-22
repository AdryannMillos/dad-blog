const express = require("express");
const router = express.Router();
const postController = require("../controllers/postController");

router.get("/", postController.index);
router.post("/create", postController.store);
router.put("/update/:id", postController.update);
router.delete("/delete/:id", postController.destroy);

module.exports = router;
